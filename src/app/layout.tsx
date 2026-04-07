import type { Metadata } from 'next';

import { CookieStorage } from '@/shared/lib/cookie-storage';
import { Toaster } from '@/shared/ui/sonner';
import { Footer } from '@/widgets/footer';
import { NavigationBar } from '@/widgets/navigation-bar';

import { Providers } from './providers';

import './globals.css';

export const metadata: Metadata = {
  title: '소소잇 | 일상과 만남을 잇다',
  description: '일상과 만남을 잇다', // 수정 필요
  other: {
    viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialUser = await CookieStorage.getUser();

  return (
    <html lang="ko">
      <body className="min-w-[375px] overscroll-none">
        <Providers initialUser={initialUser}>
          <NavigationBar initialUser={initialUser} />
          <main>{children}</main>
          <Footer />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
