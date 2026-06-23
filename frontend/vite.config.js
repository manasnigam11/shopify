import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // ---------------------------------------------------------------------------
  // Dev Server Proxy — Routes /api/* to the FastAPI backend
  // ---------------------------------------------------------------------------
  // This eliminates CORS issues during local development.
  // The frontend fetches "/api/price?zip=75028" and Vite transparently
  // forwards it to "http://localhost:8000/api/price?zip=75028".
  //
  // In production, you would either:
  //   1. Deploy both behind the same domain (reverse proxy)
  //   2. Update API_BASE_URL in src/api/pricingApi.js to the API domain
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
