import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: 'index.html',
        exam: 'exam.html',
        exam_list: 'exam_list.html',
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
