'use client';

import { useEffect, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthUser, useAuthStore } from '@/entities/auth';
import { AuthInitializer } from '@/features/auth';
import { setCommentSessionExpiredHandler } from '@/shared/api/comment-client';
import { setSessionExpiredHandler } from '@/shared/api/fetch-client';
import { LoginRequireModal, SessionExpiredModal } from '@/widgets/auth';

export function Providers({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: AuthUser | null;
}) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    // 세션 만료 시 Zustand 상태를 초기화하고 모달을 띄우는 콜백을 주입합니다.
    // - 로그인 상태에서 401: 세션 만료 모달
    // - 비로그인 상태에서 401: 로그인 요구 모달
    // getState()로 직접 참조하여 stale closure 방지
    setSessionExpiredHandler(() => {
      const { isAuthenticated, setSessionExpired, setLoginRequired } = useAuthStore.getState();
      if (isAuthenticated) {
        setSessionExpired(true);
      } else {
        setLoginRequired(true);
      }
    });
    setCommentSessionExpiredHandler(() => {
      const { isAuthenticated, setSessionExpired, setLoginRequired } = useAuthStore.getState();
      if (isAuthenticated) {
        setSessionExpired(true);
      } else {
        setLoginRequired(true);
      }
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer initialUser={initialUser} />
      {children}
      <LoginRequireModal />
      <SessionExpiredModal />
    </QueryClientProvider>
  );
}
