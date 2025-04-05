import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@supabase/supabase-js';
import * as auth from './auth';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (email, password) => {
        const { session } = await auth.signIn(email, password);
        if (session?.user) {
          set({ isAuthenticated: true, user: session.user });
        }
      },
      register: async (email, password) => {
        const { session } = await auth.signUp(email, password);
        if (session?.user) {
          set({ isAuthenticated: true, user: session.user });
        }
      },
      logout: async () => {
        await auth.signOut();
        set({ isAuthenticated: false, user: null });
      },
      resetPassword: async (email) => {
        await auth.resetPassword(email);
      },
      updatePassword: async (password) => {
        await auth.updatePassword(password);
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);