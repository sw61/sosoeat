import type { Metadata } from 'next';

import { Providers } from '@/app/providers';
import { NavigationBarClient } from '@/components/common/navigation-bar/navigation-bar-client';
import { Toaster } from '@/components/ui/sonner/index';

import './globals.css';

export const metadata: Metadata = {
  title: '소소잇 | 일상과 만남을 잇다',
  description: '일상과 만남을 잇다', // 수정 필요
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-w-[375px]">
        <Providers>
          <NavigationBarClient />
          <main>{children}</main>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
