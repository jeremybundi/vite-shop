// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(), 
  ],
  server: {
    proxy: {
  '/api': {
    target: 'http://0.0.0.0:8000',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
  }, } }
});