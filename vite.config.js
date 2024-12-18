/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { vitePluginVersionMark } from 'vite-plugin-version-mark';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginVersionMark({
      name: 'omiconvo',
      ifLog: false,
      command: 'git rev-parse --short HEAD',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@assets': `${path.resolve(__dirname, './src/assets/')}`,
      '@components': `${path.resolve(__dirname, './src/components/')}`,
      '@pages': `${path.resolve(__dirname, './src/pages/')}`,
      '@routes': `${path.resolve(__dirname, './src/routes/')}`,
      '@utility': `${path.resolve(__dirname, './src/utility/')}`,
    },
  },
  server: {
    port: 3000,
  },
});
