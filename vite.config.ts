import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '@': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/shared/styles/index.scss')
    },
  },
  plugins: [
    vue(),
  ]
})