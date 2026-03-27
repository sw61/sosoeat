'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthInitializer } from '@/app/_components/auth-initializer';
import { TokenProviderRegistry } from '@/lib/auth/token-registry';
import { useAuthStore } from '@/store/auth-store';

const queryClient = new QueryClient();

// 클라이언트 환경에서만 등록 — SSR 시 실행되지 않도록 가드
if (typeof window !== 'undefined') {
  TokenProviderRegistry.setClientProvider({
    getAccessToken: () => useAuthStore.getState().accessToken,
    setAccessToken: (token: string) => {
      useAuthStore.getState().updateToken(token);
    },
  });
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer />
      {children}
    </QueryClientProvider>
  );
}
