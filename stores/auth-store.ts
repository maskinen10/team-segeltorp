import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthState } from '@/types/auth';

interface AuthStore extends AuthState {
  login: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,

      login: async (email, password, name) => {
        // Använd angivet namn eller generera från email
        const displayName = name || email.split('@')[0];
        
        set({
          user: {
            id: email,
            email,
            name: displayName,
            role: email.includes('admin') ? 'admin' : 'sales',
          },
          isAuthenticated: true,
          token: 'demo-token',
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          token: null,
        });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
