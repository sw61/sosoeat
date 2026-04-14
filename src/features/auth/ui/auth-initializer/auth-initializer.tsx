'use client';

import { useEffect } from 'react';

import { AuthUser, useAuthStore } from '@/entities/auth';

/**
 * [Application Layer] AuthInitializer
 * 서버에서 읽어온 initialUser로 Zustand 스토어를 초기화합니다.
 * accessToken 검증은 프록시/미들웨어가 담당하므로 여기서는 수행하지 않습니다.
 */
export function AuthInitializer({ initialUser }: { initialUser: AuthUser | null }) {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize(initialUser);
  }, [initialUser, initialize]);

  return null;
}
