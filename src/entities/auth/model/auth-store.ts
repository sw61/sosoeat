import { create } from 'zustand';

import { AuthUser } from './auth.types';

export type { AuthUser };

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isInitialized: boolean;
  isLoginRequired: boolean;
  isSessionExpired: boolean;
}

interface AuthActions {
  login: (user: AuthUser) => void;
  logout: () => void;
  setInitialized: (val: boolean) => void;
  setLoginRequired: (val: boolean) => void;
  setSessionExpired: (val: boolean) => void;
}

export type AuthStore = AuthState & AuthActions;

/**
 * [Application Layer] useAuthStore
 * 클라이언트 사이드 인증 상태 관리 (UI용)
 * accessToken은 httpOnly 쿠키에서 프록시가 처리하므로 여기서는 관리하지 않습니다.
 */
export const useAuthStore = create<AuthStore>()((set) => ({
  // State
  isAuthenticated: false,
  user: null,
  isInitialized: false,
  isLoginRequired: false,
  isSessionExpired: false,

  // Actions
  login: (userData: AuthUser) => {
    set({
      isAuthenticated: true,
      user: userData,
    });
  },

  logout: () => {
    set({ isAuthenticated: false, user: null, isLoginRequired: false, isSessionExpired: false });
  },

  setInitialized: (val: boolean) => set({ isInitialized: val }),
  setLoginRequired: (val: boolean) => set({ isLoginRequired: val }),
  setSessionExpired: (val: boolean) => set({ isSessionExpired: val }),
}));
