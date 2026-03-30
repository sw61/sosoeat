'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthInitializer } from '@/app/_components/auth-initializer';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer />
      {children}
    </QueryClientProvider>
  );
}
