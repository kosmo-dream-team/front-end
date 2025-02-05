import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
//아래는 scss 옵션설정
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
         
        
        `,
      },
    },
  },
});
