import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import browserslistToEsbuild from 'browserslist-to-esbuild';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    target: browserslistToEsbuild(),
    outDir: '../dist',
  },
  css: {
    modules: {
      generateScopedName: '[folder]__[local]___[hash:base64:5]',
    },
  },
  plugins: [react(), svgr()],
});
