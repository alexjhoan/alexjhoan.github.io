/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://alexjhoan.github.io',
  test: {
    globals: true,
    environment: 'jsdom', // Configura para pruebas en entornos de navegador
    include: ['./tests/**/*.test.tsx']
  }
})
