import { create } from 'zustand';

type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (callback?: () => void) => Promise<void>;
  register: (callback?: () => void) => Promise<void>;
  logout: (callback?: () => void) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: false,

  login: async (callback?: () => void) => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({ isAuthenticated: true, isLoading: false });
    if (callback) callback();
  },

  register: async (callback?: () => void) => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({ isAuthenticated: true, isLoading: false });
    if (callback) callback();
  },

  logout: (callback?: () => void) => {
    set({ isAuthenticated: false });
    if (callback) callback(); // Navigate to the login page
  }
}));
