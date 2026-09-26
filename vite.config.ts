import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { VitePWA } from "vite-plugin-pwa";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: false,

      devOptions: {
        enabled: false,
        suppressWarnings: true,
      },

      workbox: {
        maximumFileSizeToCacheInBytes: 25 * 1024 * 1024,
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        navigateFallbackDenylist: [/^\/__/],
        importScripts: ['sw-notifications.js'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/firestore\.googleapis\.com\/.*/i,
            handler: 'NetworkOnly',
          },
          {
            urlPattern: /^https:\/\/.*\.googleapis\.com\/.*/i,
            handler: 'NetworkOnly',
          },
        ],
      },
    }),
  ],

  clearScreen: false,

  // GitHub Pages
  base: "./",

  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,

    allowedHosts: true,

    proxy: {
      '/api/kilo': {
        target: 'https://api.kilo.ai',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/kilo/, '/api/openrouter'),
        secure: true,
      },
      '/api/gemini': {
        target: 'https://generativelanguage.googleapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/gemini/, ''),
        secure: true,
      },
    },

    watch: {
      ignored: ["**/src/tests/**"],
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
    },
  },

  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('firebase')) {
              return 'vendor-firebase';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-framer-motion';
            }
            if (id.includes('katex')) {
              return 'vendor-katex';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-lucide';
            }
            if (id.includes('canvas-confetti')) {
              return 'vendor-confetti';
            }
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            return 'vendor-libs';
          }
          if (id.includes('/data/bancoPreguntasCepreunsa') || id.includes('/data/simuladorData')) {
            return 'cepreunsa-questions-bank';
          }
          if (id.includes('/data/cepreunsaOfficialTheory')) {
            return 'cepreunsa-official-theory';
          }
          if (id.includes('/data/learningPathData')) {
            return 'cepreunsa-learning-path-data';
          }
          if (id.includes('/data/legacyData')) {
            return 'cepreunsa-legacy-data';
          }
        },
      },
    },
  },
});