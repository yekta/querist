import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@app": path.resolve(__dirname, "./src/app"),
      "@css": path.resolve(__dirname, "./src/css"),
      "@ts": path.resolve(__dirname, "./src/ts"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
