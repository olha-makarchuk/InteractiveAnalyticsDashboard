import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Використовуємо 127.0.0.1 замість localhost, щоб уникнути помилки EACCES
    host: '127.0.0.1',
    port: 5174,
    // Якщо порт 5174 буде зайнятий, Vite автоматично спробує наступний
    strictPort: false, 
  }
})