import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    target: 'es2015',
    outDir: 'dist',
    emptyOutDir: true
  }
})