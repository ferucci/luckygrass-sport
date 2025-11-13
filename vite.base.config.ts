import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Импортируем данные
import { articleData } from './src/data/pages/article-data';
import { blogData } from './src/data/pages/blog-data';

// Контекст для разных страниц
const getPageContext = (pageName: string) => {
  const pages = {
    'article': articleData,
    'blog': blogData
  };

  return pages[pageName as keyof typeof pages] || articleData;
};

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'src': resolve(__dirname, './src'),
      '@data': resolve(__dirname, './src/data')
    }
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/shared/html'),
      context: (pagePath: string | string[]) => {
        // Определяем страницу по пути
        if (pagePath.includes('article.html')) return getPageContext('article');
        if (pagePath.includes('blog.html')) return getPageContext('blog');
        return getPageContext('article'); // по умолчанию
      }
    })
  ],
});