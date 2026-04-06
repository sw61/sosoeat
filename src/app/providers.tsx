'use client';

import { useEffect, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { LoginRequireModal } from '@/components/common/login-require-modal/login-require-modal';
import { SessionExpiredModal } from '@/components/common/session-expired-modal/session-expired-modal';
import { AuthUser } from '@/entities/auth/model/auth.types';
import { useAuthStore } from '@/entities/auth/model/auth-store';
import { AuthInitializer } from '@/features/auth/ui/auth-initializer/auth-initializer';
import { setCommentSessionExpiredHandler } from '@/shared/api/comment-client';
import { setSessionExpiredHandler } from '@/shared/api/fetch-client';

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
