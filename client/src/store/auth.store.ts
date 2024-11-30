import { SECOND } from '@/constants/index.constants';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (callback?: () => void) => Promise<void>;
  register: (callback?: () => void) => Promise<void>;
  logout: (callback?: () => void) => void;
};

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isAuthenticated: false,
      isLoading: false,

      login: async (callback?: () => void) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, SECOND));
        set({ isAuthenticated: true, isLoading: false });
        if (callback) callback();
      },

      register: async (callback?: () => void) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, SECOND));
        set({ isAuthenticated: true, isLoading: false });
        if (callback) callback();
      },

      logout: async (callback?: () => void) => {
        await new Promise((resolve) => setTimeout(resolve, SECOND));
        set({ isAuthenticated: false });
        if (callback) callback();
      }
    }),
    {
      name: 'auth-store'
    }
  )
);
