'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/store/auth-store';
import { AuthUser } from '@/types/auth';

/**
 * [Application Layer] AuthInitializer
 * 서버에서 읽어온 initialUser로 Zustand 스토어를 초기화합니다.
 * accessToken 검증은 프록시/미들웨어가 담당하므로 여기서는 수행하지 않습니다.
 */
export function AuthInitializer({ initialUser }: { initialUser: AuthUser | null }) {
  const login = useAuthStore((state) => state.login);
  const setInitialized = useAuthStore((state) => state.setInitialized);

  useEffect(() => {
    if (initialUser) {
      login(initialUser);
    }
    setInitialized(true);
  }, [initialUser, login, setInitialized]);

  return null;
}
