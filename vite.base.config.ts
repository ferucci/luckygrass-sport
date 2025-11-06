// vite.base.config.ts
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'src': resolve(__dirname, './src')
    }
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/shared/html'),
    })
  ],
});