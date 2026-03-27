import { create } from 'zustand';

import { AuthUser } from '@/types/auth';

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

  // Actions
  login: (userData: AuthUser) => {
    set({
      isAuthenticated: true,
      user: userData,
    });
  },

  logout: () => {
    set({ isAuthenticated: false, user: null });
  },

  setInitialized: (val: boolean) => set({ isInitialized: val }),
}));
