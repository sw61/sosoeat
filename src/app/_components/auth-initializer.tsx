'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/store/auth-store';

/**
 * [BFF] AuthInitializer
 * 앱 시작(또는 새로고침) 시 서버에 저장된 세션을 확인하여 Zustand 스토어를 초기화합니다.
 */
export function AuthInitializer() {
  const login = useAuthStore((state) => state.login);
  const setInitialized = useAuthStore((state) => state.setInitialized);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // 앱 시작 시 /api/auth/refresh를 호출하여 세션 복구 및 토큰 갱신 시도
        const response = await fetch('/api/auth/refresh', { method: 'POST' });

        if (response.ok) {
          const data = await response.json();
          if (data?.accessToken && data?.user) {
            login(data.accessToken, data.user);
          }
        }
      } catch (err) {
        console.error('[Hydration] Failed to refresh session:', err);
      } finally {
        setInitialized(true);
      }
    };

    initializeAuth();
  }, [login, setInitialized]);

  return null; // UI 없이 로직만 담당
}
