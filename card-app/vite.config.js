import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '',
  plugins: [
    react(),
    VitePWA({
      mode: 'development',
      devOptions: {
        enabled: true,
        type:'module'
      },
      injectManifest: {
        globPatterns: ['**/*'],
      },
      strategies: 'injectManifest',
      srcDir: 'public',
      filename: 'sw.js',
      manifest: {
        name: 'Cards',
        short_name: 'Cards',
        theme_color: '#06091c',
        display: 'standalone',
        background_color: '#06091c',
        icons: [
        ],
      },
    })
  ],
});