'use client';

import { useEffect, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthUser, useAuthStore } from '@/entities/auth';
import { AuthInitializer } from '@/features/auth';
import { setCommentSessionExpiredHandler } from '@/shared/api/comment-client';
import { setSessionExpiredHandler } from '@/shared/api/fetch-client';
import { initAmplitude, syncAmplitudeUser } from '@/shared/lib/amplitude';
import { LoginRequireModal, SessionExpiredModal } from '@/widgets/auth';

export function Providers({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: AuthUser | null;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    // 401 응답 시 인증 상태에 따라 적절한 모달을 띄우는 핸들러를 주입합니다.
    const handleAuthError = () => useAuthStore.getState().handleAuthError();
    setSessionExpiredHandler(handleAuthError);
    setCommentSessionExpiredHandler(handleAuthError);
  }, []);

  useEffect(() => {
    void initAmplitude();
  }, []);

  useEffect(() => {
    syncAmplitudeUser(user);
  }, [user]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer initialUser={initialUser} />
      {children}
      <LoginRequireModal />
      <SessionExpiredModal />
    </QueryClientProvider>
  );
}
