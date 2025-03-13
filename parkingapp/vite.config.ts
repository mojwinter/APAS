import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  base: "./", // This ensures all assets use relative paths
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Parking App",
        short_name: "ParkingApp",
        description: "Find and book parking spots easily",
        start_url: "./index.html",
        display: "standalone",
        scope: "./",
        background_color: "#ffffff",
        theme_color: "#10b981", // Emerald-600 color
        icons: [
          {
            src: "./icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "./icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        navigateFallback: "index.html",
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "unsplash-images",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
})

