import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,

    // 🔥 Tambahin proxy di sini
    proxy: {
      "/api": {
        target: "http://now4kswkgo4owoks884o0wc0.103.109.210.102.sslip.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api/v1/public-dashboard"),
      },
      "/balita": {
        target: "http://now4kswkgo4owoks884o0wc0.103.109.210.102.sslip.io",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/balita/, "/api/v1/public-dashboard/balita-status"),
      },
      "/pengguna": {
        target: "http://now4kswkgo4owoks884o0wc0.103.109.210.102.sslip.io",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/pengguna/, "/api/v1/public-dashboard/kader-data"),
      },
      "/data-wilayah": {
        target: "http://now4kswkgo4owoks884o0wc0.103.109.210.102.sslip.io",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/data-wilayah/, "/api/v1/public-dashboard/wilayah-data"),
      },
        "/gizi-desa": {
        target: "http://now4kswkgo4owoks884o0wc0.103.109.210.102.sslip.io",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/gizi-desa/, "/api/v1/public-dashboard/status-gizi-desa"),
      },
        "/data-skdn": {
        target: "http://now4kswkgo4owoks884o0wc0.103.109.210.102.sslip.io",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/data-skdn/, "/api/v1/public-dashboard/skdn-data"),
      },

    },
  },

  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
