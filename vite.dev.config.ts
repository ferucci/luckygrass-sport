import { defineConfig } from 'vite';

export default defineConfig({
  base: './',

  css: {
    devSourcemap: true
  },

  server: {
    port: 3333,
    open: true,
    // headers: {
    //   'Content-Type': 'font/woff2'
    // }
  }
});