import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  server: {
    port: 2705,
  },
  build: {
    minify: "esbuild",
    esbuild: {
      pure: mode === "production" ? ["console.log", "console.debug"] : [],
    },
  },
}));