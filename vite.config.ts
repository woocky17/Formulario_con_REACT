import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite acceso desde cualquier IP externa
    port: 5173, // Cambia el puerto si es necesario
    cors: true, // Habilita CORS
    strictPort: false, // Permite cambiar de puerto si el 5173 está ocupado
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '8267-2a0c-5a87-3608-700-5471-d8ac-4961-78b5.ngrok-free.app' // Tu dominio de ngrok
    ]
  }
})
