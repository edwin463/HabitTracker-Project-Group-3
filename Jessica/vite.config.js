import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 5173, // ✅ Ensure WebSocket uses the correct port
    },
  },
});

