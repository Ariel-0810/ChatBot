import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config();

// Configura la base URL obtenida del archivo .env
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/', // Fallback si no existe la variable
  headers: {
    'Content-Type': 'application/json',
  },
});
