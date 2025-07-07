import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import stdLibBrowser from 'vite-plugin-node-stdlib-browser';
import polyfillNode from 'rollup-plugin-polyfill-node';

export default defineConfig({
  plugins: [
    stdLibBrowser(), // ✅ add this
    react()
  ],
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      buffer: 'buffer/',
    }
  },
  optimizeDeps: {
    include: ['crypto', 'stream', 'buffer'],
  },
  build: {
    rollupOptions: {
      plugins: [polyfillNode()],
    }
  }
});
