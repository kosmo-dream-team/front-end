import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {  
      scss: {
        additionalData: `
        @use "abstracts/mixin" as mixin2;
        @use "abstracts/variable" as var;
        `
      }
    }
  }
});
