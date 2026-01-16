import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  root: 'src/dashboard',
  plugins: [vue()],
  publicDir: '../../icons',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  base: './'
})
