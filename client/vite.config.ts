import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  base: process.env.NODE_ENV === 'production'
    ? '/hf-information-portal/'
    : '/',

  server: {
    proxy: {
      '/umbraco': {
        target: 'http://localhost:39327',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})