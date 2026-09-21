import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Extra hosts allowed to reach dev/preview servers, on top of localhost and IP literals.
const allowedHosts = (process.env.ALLOWED_HOSTS ?? "terminal.local")
  .split(",")
  .map(host => host.trim())
  .filter(Boolean);

export default defineConfig({
  build: {
    outDir: "dist/client",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: true,
    allowedHosts,
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: true,
    // Accept any Host header so LAN addresses and temporary tunnels can reach the
    // built site. Safe here: the preview only serves this static portfolio locally.
    allowedHosts: true,
  },
  plugins: [react()],
});
