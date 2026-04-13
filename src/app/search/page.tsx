import type { Metadata } from 'next';

import { startOfDay } from 'date-fns';
import { SearchParams } from 'nuqs';

import { getMeetings } from '@/entities/meeting/index.server';
import { MeetingSearchBanner, SearchPage, searchParamsCache } from '@/widgets/search';

export const metadata: Metadata = {
  title: '모임 검색',
  description:
    '지역·날짜·키워드로 원하는 소모임을 찾아보세요. 취미가 맞는 사람들과의 만남이 기다리고 있어요.',
  openGraph: {
    title: '모임 검색 | 소소잇',
    description:
      '지역·날짜·키워드로 원하는 소모임을 찾아보세요. 취미가 맞는 사람들과의 만남이 기다리고 있어요.',
  },
};

type PageProps = {
  searchParams: Promise<SearchParams>; // Next.js 15+: async searchParams prop
};

export default async function Page({ searchParams }: PageProps) {
  const { dateStart, sortBy, sortOrder, queryKeyword } = searchParamsCache.parse(
    await searchParams
  );
  const finalDateStart = dateStart ?? startOfDay(new Date());
  const toApiKeyword = (keyword: typeof queryKeyword) => {
    return keyword === 'all' ? undefined : keyword;
  };
  const initialData = await getMeetings({
    dateStart: finalDateStart.toISOString(),
    sortBy,
    sortOrder,
    keyword: toApiKeyword(queryKeyword),
  }).catch(() => null);

  return (
    <div className="mx-auto flex max-w-[1140px] flex-col items-center justify-center gap-4 md:min-w-[780px] md:px-4 md:pt-4 lg:min-w-[1140px]">
      <MeetingSearchBanner />
      <SearchPage initialData={initialData} />
    </div>
  );
}
