import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
    copyPublicDir: true,
    rollupOptions: {},
  },
  server: {
    host: true,
  },
  preview: {
    allowedHosts: ["nova-key.online"],
    host: true,
  },
  publicDir: "public",
});
