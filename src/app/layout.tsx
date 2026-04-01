import type { Metadata } from 'next';

import { Providers } from '@/app/providers';
import { Footer } from '@/components/common/footer';
import { NavigationBar } from '@/components/common/navigation-bar';
import { Toaster } from '@/components/ui/sonner/index';
import { CookieStorage } from '@/lib/auth/cookie-storage';

import './globals.css';

export const metadata: Metadata = {
  title: '소소잇 | 일상과 만남을 잇다',
  description: '일상과 만남을 잇다', // 수정 필요
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialUser = await CookieStorage.getUser();

  return (
    <html lang="ko">
      <body className="min-w-[375px]">
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
