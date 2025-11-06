import fs from 'node:fs';
import { resolve } from 'node:path';
import type { RollupOptions } from 'rollup';
import { defineConfig } from 'vite';

// Получаем все HTML файлы из корня проекта
const htmlFiles: string[] = fs.readdirSync('.').filter((file: string) => file.endsWith('.html'));

// Явно указываем тип для input объекта
const input: Record<string, string> = htmlFiles.reduce((acc: Record<string, string>, file: string) => {
  const name: string = file.replace('.html', '');
  acc[name] = resolve(__dirname, file);
  return acc;
}, {} as Record<string, string>);

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input,
      output: {
        assetFileNames: (assetInfo: { name?: string }): string => {
          if (!assetInfo.name) return 'assets/[ext]/[name][extname]';

          const fullPath: string = assetInfo.name;
          const extType: string | undefined = assetInfo.name.split('.').pop()?.toLowerCase();

          if (extType && ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'ico', 'avif'].includes(extType)) {
            const imagesIndex: number = fullPath.indexOf('images/');
            if (imagesIndex !== -1) {
              return fullPath.slice(imagesIndex);
            }
            return `assets/images/${fullPath}`;
          }

          return 'assets/[ext]/[name][extname]';
        },
        chunkFileNames: 'assets/js/[name].[hash].js',
        entryFileNames: 'assets/js/[name].[hash].js'
      }
    } as RollupOptions
  },
  plugins: [
    {
      name: 'html-transform',
      transformIndexHtml(html: string): string {
        return html
          .replace(/ type="module"/g, '')
          .replace(/ crossorigin/g, '')
          .replace(/(<script[^>]*)(>)/g, '$1 defer$2');
      }
    }
  ],
  css: {
    devSourcemap: false
  }
});