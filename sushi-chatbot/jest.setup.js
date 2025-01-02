// jest.setup.js
import dotenv from 'dotenv';
dotenv.config();

Object.defineProperty(global, 'import.meta', {
  value: {
    env: {
      VITE_API_URL: process.env.VITE_API_URL,
    },
  },
});
