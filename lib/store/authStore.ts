import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/user";

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      isAuthenticated: false,
      user: null,
      setUser: (user: User) => {
        set(() => ({ user, isAuthenticated: true }));
      },
      clearIsAuthenticated: () => {
        set(() => ({ user: null, isAuthenticated: false }));
      },
    }),
    {
      name: "auth-storage",
      skipHydration: true,
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);