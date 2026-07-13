import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the built site also works when opened directly
  // from disk (file://) after unzipping — not just on a web host.
  base: './',
  plugins: [react(), tailwindcss()],
})
