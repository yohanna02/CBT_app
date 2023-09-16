import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    proxy: {
      // "/api": "http://cbt_server:3001"
      "/api": "http://localhost:3001"
    }
  },
  css: {
    preprocessorOptions: {
      scss: { 
         // example : additionalData: `@import "./src/design/styles/variables";`
         // dont need include file extend .scss
        additionalData: `
        @import "./src/assets/styles/abstracts";
        @import "./src/assets/styles/mixins";
        @import "./src/assets/styles/resets";
        `
     },
    },
  }
})
