import type { Metadata } from 'next';
import Script from 'next/script';

// eslint-disable-next-line feature-sliced/absolute-relative
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { getFavoritesCount } from '@/entities/favorites/index.server';
import { getUnreadCountServer } from '@/features/notifications/index.server';
import { CookieStorage } from '@/shared/lib/cookie-storage';
import { Toaster } from '@/shared/ui/sonner';
import { Footer } from '@/widgets/footer';
import { NavigationBar } from '@/widgets/navigation-bar';

import { FontLoader } from './font-loader';
import { Providers } from './providers';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '소소잇 | 소소한 일상과 만남을 잇다',
    template: '%s | 소소잇',
  },
  description:
    '취미·관심사가 맞는 사람들과 소모임을 만들고 참여하세요. 소소톡으로 일상을 나누고 새로운 만남을 시작해보세요.',
  keywords: ['소소잇', '소소한 일상', '모임', '소모임', '취미', '소소톡', '만남'],
  openGraph: {
    type: 'website',
    siteName: '소소잇',
    locale: 'ko_KR',
    title: '소소잇 | 소소한 일상과 만남을 잇다',
    description:
      '취미·관심사가 맞는 사람들과 소모임을 만들고 참여하세요. 소소톡으로 일상을 나누고 새로운 만남을 시작해보세요.',
  },
  twitter: {
    card: 'summary_large_image',
    title: '소소잇 | 소소한 일상과 만남을 잇다',
    description:
      '취미·관심사가 맞는 사람들과 소모임을 만들고 참여하세요. 소소톡으로 일상을 나누고 새로운 만남을 시작해보세요.',
  },
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
  const [initialFavoritesCount, initialUnreadCount] = await Promise.all([
    initialUser ? getFavoritesCount() : Promise.resolve(0),
    initialUser ? getUnreadCountServer() : Promise.resolve(0),
  ]);

  return (
    <html lang="ko">
      <head>
        <FontLoader />
      </head>
      <body className="flex min-h-screen min-w-[375px] flex-col overscroll-none">
        <Script src="https://accounts.google.com/gsi/client" strategy="lazyOnload" />
        <NuqsAdapter>
          <Providers initialUser={initialUser}>
            <NavigationBar
              initialUser={initialUser}
              initialFavoritesCount={initialFavoritesCount}
              initialUnreadCount={initialUnreadCount}
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
