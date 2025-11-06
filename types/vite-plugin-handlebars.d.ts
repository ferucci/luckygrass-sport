declare module 'vite-plugin-handlebars' {
  import { Plugin } from 'vite';

  interface HandlebarsOptions {
    partialDirectory?: string;
    context?: Record<string, any>;
    helpers?: Record<string, Function>;
    reloadOnPartialChange?: boolean;
  }

  export default function handlebars(options?: HandlebarsOptions): Plugin;
}