import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";

// Konstanta untuk base URL API
const API_BASE_URL = "http://ssc80wssow48gsgwwg8888s4.103.109.210.102.sslip.io";
const API_PREFIX = "/api/v1/public-dashboard";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,

    // Proxy configuration
    proxy: {
      // Base API endpoint
      "/api": {
        target: API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, API_PREFIX),
      },

      // Balita endpoints
      "/balita": {
        target: API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/balita/, `${API_PREFIX}/balita-status`),
      },

      "/progres-status-gizi": {
        target: API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/progres-status-gizi/, `${API_PREFIX}/balita-status-period`),
      },

      "/anak-mpasi": {
        target: API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/anak-mpasi/, `${API_PREFIX}/anak-mpasi`),
      },

      "/asi-eksklusif": {
        target: API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/asi-eksklusif/, `${API_PREFIX}/asi-eksklusif`),
      },

      // Data SKDN
      "/data-skdn": {
        target: API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/data-skdn/, `${API_PREFIX}/skdn-data`),
      },

      // Ibu Hamil endpoints
      "/ibu-hamil": {
        target: API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ibu-hamil/, `${API_PREFIX}/ibu-hamil`),
      },

      "/ibu-hamil-periodik": {
        target: API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ibu-hamil-periodik/, `${API_PREFIX}/ibu-hamil-periodik`),
      },

      // Beban Kerja endpoints
      "/jenis-kompetensi": {
        target: API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/jenis-kompetensi/, `${API_PREFIX}/jenis-kompetensi`),
      },

      "/waktu-kunjungan": {
        target: API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/waktu-kunjungan/, `${API_PREFIX}/waktu-kunjungan-total`),
      },

      "/waktu-jadwal-posyandu": {
        target: API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/waktu-jadwal-posyandu/, `${API_PREFIX}/waktu-jadwal-posyandu`),
      },

      "/waktu-kunjungan-anak": {
        target: API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/waktu-kunjungan-anak/, `${API_PREFIX}/waktu-kunjungan-anak`),
      },

      "/waktu-kunjungan-ibu-hamil": {
        target: API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/waktu-kunjungan-ibu-hamil/, `${API_PREFIX}/waktu-kunjungan-ibu-hamil`),
      },
    },
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "report" && visualizer({
      filename: "dist/stats.html",
      template: "treemap", // sunburst, treemap, circlepacking, network
      open: true,
    })
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-*', '@headlessui/react'],
          'chart-vendor': ['recharts', 'react-plotly.js'],
          'utils': ['date-fns', 'clsx', 'tailwind-merge'],
        },
      },
    },
    // Enable compression in production
    cssCodeSplit: true,
    sourcemap: mode !== 'production', // Only generate source maps in development
  },

  // Performance optimizations
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'recharts',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-accordion',
    ],
  },
}));