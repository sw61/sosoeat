'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/store/auth-store';

/**
 * [BFF] AuthInitializer
 * 앱 시작(또는 새로고침) 시 서버에 저장된 세션을 확인하여 Zustand 스토어를 초기화합니다.
 *
 * 흐름:
 * 1. /api/auth/me 호출 → accessToken 유효 시 user 반환 (refresh 없음)
 * 2. accessToken 없으면 서버에서 silentRefresh 후 user 반환
 * 3. 실패(401)하면 비로그인 상태로 초기화 — 라우트 보호는 미들웨어(proxy.ts)가 담당
 */
export function AuthInitializer() {
  const login = useAuthStore((state) => state.login);
  const setInitialized = useAuthStore((state) => state.setInitialized);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');

        if (response.ok) {
          const data = await response.json();
          if (data?.user) {
            login(data.user);
          }
        }
      } catch (err) {
        console.error('[Hydration] Failed to initialize auth:', err);
      } finally {
        // 성공/실패 무관하게 항상 초기화 완료로 표시
        setInitialized(true);
      }
    };

    initializeAuth();
  }, [login, setInitialized]);

  return null;
}
