import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';

import Providers from '@/components/providers/query-client-provider';

import './globals.css';

const noto_sans_kr = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
  subsets: ['latin'],
});

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
    <html lang="ko" className={`${noto_sans_kr.variable}`}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
