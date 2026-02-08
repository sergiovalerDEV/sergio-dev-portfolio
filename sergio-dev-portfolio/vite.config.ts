// vite.config.js COMPLETO y FUNCIONAL para tu proyecto
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/utilities/_variables.scss" as *;`  // ← Tu archivo EXISTENTE
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // Alias para toda la carpeta src/
    },
  },
})
