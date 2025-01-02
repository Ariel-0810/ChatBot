import { create } from 'zustand';
import { persist } from 'zustand/middleware'

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      // email: null,
      // sessionToken: null,
      // id: null,
      authenticated: false,
      setUser: (user) => set({ user }),
      // setImail: (email) => set({ email }),
      // setSessionToken: (sessionToken) => set({ sessionToken }),
      setAuthenticated: (isAuthenticated) => set({ authenticated: isAuthenticated }),
      // setId: (id) => set({ id }),
    }),
    {
      name: 'user-store', // Nombre clave para localStorage
      getStorage: () => localStorage, // Puedes cambiar a sessionStorage si lo prefieres
    }
  )
);

export { useUserStore };
