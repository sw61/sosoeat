'use client';

import { useEffect } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthInitializer } from '@/app/_components/auth-initializer';
import { setSessionExpiredHandler } from '@/lib/http/fetch-client';
import { useAuthStore } from '@/store/auth-store';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    // 세션 만료 시 Zustand 상태를 초기화하는 콜백을 fetchClient에 주입합니다.
    // fetchClient가 store를 직접 참조하지 않도록 클라이언트 초기화 시점에 한 번만 등록합니다.
    setSessionExpiredHandler(logout);
  }, [logout]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer />
      {children}
    </QueryClientProvider>
  );
}
