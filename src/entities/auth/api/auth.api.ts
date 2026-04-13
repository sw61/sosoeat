import { fetchClient } from '@/shared/api/fetch-client';
import { parseResponse, parseVoidResponse } from '@/shared/api/parse-response';
import { LoginRequest, SignupRequest } from '@/shared/types/generated-client/models';

import { AuthUser } from '../model/auth.types';

export type AuthResponse = { user: AuthUser };

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
    return parseResponse<AuthResponse>(response, '로그인에 실패했습니다.');
  },

  /**
   * 이메일 중복 확인 (proxy 경유 → 백엔드 직접 호출)
   * 응답: { available: boolean }
   */
  async checkEmailDuplicate(email: string): Promise<{ available: boolean }> {
    const response = await fetchClient.post('/auth/email-check', { email });
    return parseResponse<{ available: boolean }>(response, '올바른 이메일 형식이 아닙니다.');
  },

  /**
   * 회원가입 실행 (proxy 경유 → 백엔드 직접 호출)
   * 세션 관리가 없으므로 BFF가 아닌 /api/proxy/를 통해 백엔드로 전달합니다.
   */
  async signUp(payload: SignupRequest): Promise<void> {
    const response = await fetchClient.post('/auth/signup', payload);
    return parseVoidResponse(response, '회원가입에 실패했습니다.');
  },

  /**
   * 로그아웃 실행 (BFF 세션 파기)
   * BFF(/api/auth/logout)는 외부 API 호출 성공 여부와 무관하게
   * finally에서 항상 쿠키를 파기합니다.
   * 따라서 응답 상태와 무관하게 클라이언트 세션은 항상 종료된 것으로 처리합니다.
   */
  async logout(): Promise<void> {
    await fetch('/api/auth/logout', { method: 'POST' });
  },

  /**
   * 소셜 로그인 콜백 처리 (BFF 호출)
   * 백엔드에서 전달받은 토큰으로 서버 세션을 설정합니다.
   */
  async socialCallback(payload: {
    accessToken: string;
    refreshToken: string;
  }): Promise<AuthResponse> {
    const response = await fetch('/api/auth/social-callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return parseResponse<AuthResponse>(response, '소셜 로그인에 실패했습니다.');
  },
};
