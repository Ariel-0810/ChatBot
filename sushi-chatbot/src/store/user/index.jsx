import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      authenticated: false,
      setUser: (user) => set({ user }),
      setAuthenticated: (isAuthenticated) =>
        set({ authenticated: isAuthenticated })
    }),
    {
      name: "user-store",
      getStorage: () => localStorage
    }
  )
);

export { useUserStore };
