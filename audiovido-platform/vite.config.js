import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  assetsInclude: ['**/*.fbx'],
  plugins: [react()],
  resolve: {
    alias: {
      '@petros-background': path.resolve(__dirname, '../shared/petros-background')
    }
  },
  server: {
    port: 3000,
    strictPort: false,
    fs: {
      allow: ['..']
    }
  }
})
