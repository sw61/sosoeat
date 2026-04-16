import { Suspense } from 'react';

import type { Metadata } from 'next';

import { SearchParams } from 'nuqs';

import { MeetingSearchBanner, SearchScreenFetcher, SearchScreenSkeleton } from '@/widgets/search';

export const metadata: Metadata = {
  title: '모임 검색',
  description:
    '지역·날짜·키워드로 원하는 소모임을 찾아보세요. 취미가 맞는 사람들과의 만남이 기다리고 있어요.',
  openGraph: {
    title: '모임 검색 | 소소잇',
    description:
      '지역·날짜·키워드로 원하는 소모임을 찾아보세요. 취미가 맞는 사람들과의 만남이 기다리고 있어요.',
    type: 'website',
    images: [
      {
        url: '/images/search-og-image.png',
      },
    ],
  },
  alternates: {
    canonical: '/search',
  },
  twitter: {
    card: 'summary_large_image',
    title: '모임 검색 | 소소잇',
    description:
      '지역·날짜·키워드로 원하는 소모임을 찾아보세요. 취미가 맞는 사람들과의 만남이 기다리고 있어요.',
    images: [
      {
        url: '/images/search-og-image.png',
      },
    ],
  },
  keywords: ['소모임 검색', '지역별 모임', '날짜별 모임', '키워드 검색', '소소잇', '모임 검색'],
};

type PageProps = {
  searchParams: Promise<SearchParams>; // Next.js 15+: async searchParams prop
};

export default async function Page({ searchParams }: PageProps) {
  return (
    <div className="bg-sosoeat-gray-100 flex w-full flex-col items-center justify-center">
      <section aria-label="search-banner" className="w-full">
        <MeetingSearchBanner />
      </section>
      <section
        aria-label="search-results"
        className="flex w-full flex-col items-center justify-center gap-4 px-4 pt-4"
      >
        <Suspense fallback={<SearchScreenSkeleton />}>
          <SearchScreenFetcher searchParams={searchParams} />
        </Suspense>
      </section>
    </div>
  );
}
