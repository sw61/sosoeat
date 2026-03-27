import { create } from 'zustand';

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  teamId?: string;
  companyName?: string;
  image?: string | null;
}

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  user: AuthUser | null;
  isInitialized: boolean;
}

interface AuthActions {
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  updateToken: (newToken: string) => void;
  setInitialized: (val: boolean) => void;
}

export type AuthStore = AuthState & AuthActions;

/**
 * [Application Layer] useAuthStore
 * 클라이언트 사이드 인증 상태 관리
 * BFF로부터 직접 토큰과 유저 정보를 주입받아 관리합니다.
 */
export const useAuthStore = create<AuthStore>()((set) => ({
  // State
  accessToken: null,
  isAuthenticated: false,
  user: null,
  isInitialized: false,

  // Actions
  login: (token: string, userData: AuthUser) => {
    set({
      accessToken: token,
      isAuthenticated: true,
      user: userData,
    });
  },

  logout: () => {
    set({ accessToken: null, isAuthenticated: false, user: null });
  },

  /**
   * 토큰 갱신 시 호출 (Refresh 시 토큰 정보만 업데이트)
   */
  updateToken: (newToken: string) => {
    set({
      accessToken: newToken,
      isAuthenticated: true, // 토큰이 존재하면 인증됨으로 간주
    });
  },

  setInitialized: (val: boolean) => set({ isInitialized: val }),
}));
