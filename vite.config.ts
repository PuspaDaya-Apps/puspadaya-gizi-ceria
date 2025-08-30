import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,

    //  Tambahin proxy di sini
    proxy: {
      "/api": {
        target: "http://ussk8o048swckkkc40go0skw.103.109.210.102.sslip.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api/v1/public-dashboard"),
      },

      "/balita": {
        target: "http://ussk8o048swckkkc40go0skw.103.109.210.102.sslip.io",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/balita/, "/api/v1/public-dashboard/balita-status"),
      },
      "/data-skdn": {
        target: "http://ussk8o048swckkkc40go0skw.103.109.210.102.sslip.io",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/data-skdn/, "/api/v1/public-dashboard/skdn-data"),
      },
      "/progres-status-gizi": {
        target: "http://ussk8o048swckkkc40go0skw.103.109.210.102.sslip.io",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/progres-status-gizi/,
            "/api/v1/public-dashboard/balita-status-period"
          ),
      },

      "/anak-mpasi": {
        target: "http://ussk8o048swckkkc40go0skw.103.109.210.102.sslip.io",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/anak-mpasi/, "/api/v1/public-dashboard/anak-mpasi"),
      },

      "/asi-eksklusif": {
        target: "http://ussk8o048swckkkc40go0skw.103.109.210.102.sslip.io",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/asi-eksklusif/,
            "/api/v1/public-dashboard/asi-eksklusif"
          ),
      },

      // Ibu Hamil
      "/ibu-hamil": {
        target: "http://ussk8o048swckkkc40go0skw.103.109.210.102.sslip.io",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/ibu-hamil/, "/api/v1/public-dashboard/ibu-hamil"),
      },

      "/ibu-hamil-periodik": {
        target: "http://ussk8o048swckkkc40go0skw.103.109.210.102.sslip.io",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/ibu-hamil-periodik/,
            "/api/v1/public-dashboard/ibu-hamil-periodik"
          ),
      },

      // Beban Kerja
      "/jenis-kompetensi": {
        target: "http://ussk8o048swckkkc40go0skw.103.109.210.102.sslip.io",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/jenis-kompetensi/,
            "/api/v1/public-dashboard/jenis-kompetensi"
          ),
      },

      "/waktu-kunjungan": {
        target: "http://ussk8o048swckkkc40go0skw.103.109.210.102.sslip.io",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/waktu-kunjungan/,
            "/api/v1/public-dashboard/waktu-kunjungan"
          ),
      },

        "/waktu-jadwal-posyandu": {
        target: "http://ussk8o048swckkkc40go0skw.103.109.210.102.sslip.io",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/waktu-jadwal-posyandu/,
            "/api/v1/public-dashboard/waktu-jadwal-posyandu"
          ),
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
