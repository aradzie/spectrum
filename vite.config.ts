import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/spectrum",
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react")) {
            return "vendor-react";
          }
          if (id.includes("node_modules/recharts")) {
            return "vendor-recharts";
          }
          if (id.includes("node_modules/plotly")) {
            return "vendor-plotly";
          }
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("src/data")) {
            return "data";
          }
        },
      },
    },
  },
});
