import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // @ points to src/
    },
  },
  server: {
    port: 5173, // optional: default Vite dev server port
  },
  build: {
    outDir: 'dist', // output folder for production
  },
});
