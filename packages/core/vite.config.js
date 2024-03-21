// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import pkg from './package.json';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      name: pkg.name,
      fileName: 'simple-masonry-core',
    },
    rollupOptions: {
      external: [...Object.keys(pkg.dependencies)],
    },
    target: 'esnext',
  },
});
