import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: false
      },
      '/media': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: false
      },
      '/admin': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: false
      },
      '/static': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: false
      }
    }
  }
})
