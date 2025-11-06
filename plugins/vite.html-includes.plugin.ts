import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Plugin } from 'vite';

export default function htmlIncludes(): Plugin {
  return {
    name: 'vite-plugin-html-includes',

    transformIndexHtml(html, ctx) {
      // Простая замена комментариев <!-- include file="path" -->
      const includeRegex = /<!--\s*include\s+file="([^"]+)"\s*-->/g;

      let result = html;
      let match;

      while ((match = includeRegex.exec(html)) !== null) {
        const [fullMatch, filePath] = match;
        try {
          // указывается путь к папке
          const partialPath = resolve(__dirname, 'src/shared', filePath);
          const content = readFileSync(partialPath, 'utf-8');
          result = result.replace(fullMatch, content);
        } catch (error) {
          console.warn(`HTML include failed: ${filePath}`, error);
        }
      }

      return result;
    }
  };
}