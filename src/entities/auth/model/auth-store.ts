import { create } from 'zustand';

import { AuthUser } from '@/shared/types/auth';

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
  initialize: (user: AuthUser | null) => void;
  setInitialized: (val: boolean) => void;
  setLoginRequired: (val: boolean) => void;
  setSessionExpired: (val: boolean) => void;
  /**
   * 401 응답 시 인증 상태에 따라 세션만료(로그인) 또는 로그인필요 모달을 띄웁니다.
   */
  handleAuthError: () => void;
}

export type AuthStore = AuthState & AuthActions;

/**
 * [Entities] useAuthStore
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

  initialize: (user: AuthUser | null) => {
    set({
      isAuthenticated: !!user,
      user,
      isInitialized: true,
    });
  },

  setInitialized: (val: boolean) => set({ isInitialized: val }),
  setLoginRequired: (val: boolean) => set({ isLoginRequired: val }),
  setSessionExpired: (val: boolean) => set({ isSessionExpired: val }),

  handleAuthError: () => {
    const state = useAuthStore.getState();
    if (state.isAuthenticated) {
      set({ isSessionExpired: true });
    } else {
      set({ isLoginRequired: true });
    }
  },
}));
