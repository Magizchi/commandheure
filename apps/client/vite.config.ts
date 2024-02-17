import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4001,
    hmr: {
      port: 4001,
    },
    watch: {
      usePolling: true
    },
    proxy: {
      "/api": {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
  },
  resolve: {
    alias: {
      '@': '/src',
      '@constants': '/src/constants',
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@routes": "/src/routes",
      "@contexts": "/src/contexts",
      "@template": "/src/template",
      "@mocks": "/src/mocks",
      "@utils": "/src/utils",
      "@layouts": "/src/layouts",
      "@hooks": "/src/hooks"
    },
  },
})
