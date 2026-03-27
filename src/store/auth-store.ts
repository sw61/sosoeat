import { create } from 'zustand';

/**
 * 로그인한 사용자 정보
 * TODO: 실제 인증 구현 시 백엔드 응답 스펙에 맞게 필드 수정 필요
 */
interface User {
  id: string;
  name: string;
  profileImage?: string;
}

/**
 * 인증 스토어 상태 및 액션 타입
 *
 * [교체 가이드 - auth 담당자에게]
 * 이 store는 NavigationBar 개발을 위한 임시 mock입니다.
 * 실제 인증 구현 시 아래 인터페이스를 유지한 채로 내부 로직만 교체해 주세요.
 * - user: 로그인 사용자 정보 (비로그인 시 null)
 * - logout: 로그아웃 처리 함수
 */
interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // 초기값: 비로그인 상태
  user: null,

  setUser: (user) => set({ user }),

  // TODO: 실제 구현 시 localStorage/cookie 초기화, 서버 세션 만료 처리 등 추가 필요
  logout: () => set({ user: null }),
}));
