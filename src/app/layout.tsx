import type { Metadata } from 'next';

// eslint-disable-next-line feature-sliced/absolute-relative
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { getFavoritesCount } from '@/entities/favorites/index.server';
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
  const initialFavoritesCount = initialUser ? await getFavoritesCount() : 0;

  return (
    <html lang="ko">
      <head>
        <link
          rel="preload"
          href="/fonts/PretendardVariable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-screen min-w-[375px] flex-col overscroll-none">
        <NuqsAdapter>
          <Providers initialUser={initialUser}>
            <NavigationBar
              initialUser={initialUser}
              initialFavoritesCount={initialFavoritesCount}
            />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
          </Providers>
        </NuqsAdapter>
        <Toaster />
      </body>
    </html>
  );
}
