import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteBasicSslPlugin from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/

// Default
// export default defineConfig({
//   plugins: [react()],
// })

// Host
export default defineConfig({
  plugins: [react()],
  server:{
    host:'0.0.0.0'
  }
})
