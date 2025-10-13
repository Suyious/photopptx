import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "PhotoPPTX",
        short_name: "pPPTX",
        description: "Turn images into powerpoint",
        theme_color: "#FD9DE8",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/photopptx-48x48.png", sizes: "48x48", type: "image/png" },
          { src: "/photopptx-72x72.png", sizes: "72x72", type: "image/png" },
          { src: "/photopptx-96x96.png", sizes: "96x96", type: "image/png" },
          { src: "/photopptx-128x128.png", sizes: "128x128", type: "image/png" },
          { src: "/photopptx-144x144.png", sizes: "144x144", type: "image/png" },
          { src: "/photopptx-152x152.png", sizes: "152x152", type: "image/png" },
          { src: "/photopptx-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/photopptx-384x384.png", sizes: "384x384", type: "image/png" },
          { src: "/photopptx-512x512.png", sizes: "512x512", type: "image/png" },
        ],
      },
      workbox: {
        // Optional: cache images, scripts, etc.
      },
    }),
  ],
})
