import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindConfig from "./tailwind.config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  css: {
    postcss: { plugins: [tailwindConfig] },
  },
  server: {
    port: 3000,
  },
});
