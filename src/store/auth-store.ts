import { create } from 'zustand';

import type { AuthUser } from '@/types/auth';

export type { AuthUser };

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isInitialized: boolean;
}

interface AuthActions {
  login: (user: AuthUser) => void;
  logout: () => void;
  setInitialized: (val: boolean) => void;
  /**
   * Compatibility helper for older stories/tests that still seed the store
   * directly without going through the auth service layer.
   */
  setUser: (user: AuthUser | null) => void;
}

export type AuthStore = AuthState & AuthActions;

/**
 * Client-side auth UI state.
 * Access tokens are handled elsewhere, so this store only keeps view state.
 */
export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  isInitialized: false,

  login: (user) => {
    set({
      isAuthenticated: true,
      user,
    });
  },

  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
    });
  },

  setInitialized: (val) => set({ isInitialized: val }),

  setUser: (user) =>
    set({
      user,
      isAuthenticated: Boolean(user),
    }),
}));
