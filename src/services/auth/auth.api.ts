import { LoginRequest, LoginResponse, SignupRequest } from '@/types/generated-client/models';

export type AuthResponse = Omit<LoginResponse, 'refreshToken'>;

/**
 * [Service Layer] authApi
 * BFF(/api/auth/...)와 연동하여 인증 관련 비동기 작업을 처리합니다.
 */
export const authApi = {
  /**
   * 로그인 실행 (BFF 호출)
   */
  async login(payload: LoginRequest): Promise<AuthResponse> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '로그인에 실패했습니다.');
    }

    return response.json();
  },

  /**
   * 회원가입 실행 (BFF 호출)
   */
  async signUp(payload: SignupRequest): Promise<void> {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '회원가입에 실패했습니다.');
    }
  },

  /**
   * 로그아웃 실행 (BFF 세션 파기)
   */
  async logout(): Promise<void> {
    const res = await fetch('/api/auth/logout', { method: 'POST' });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || '로그아웃에 실패했습니다.');
    }
  },
};
