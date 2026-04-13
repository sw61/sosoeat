import { startOfDay } from 'date-fns';
import { SearchParams } from 'nuqs';

import { getMeetings } from '@/entities/meeting/index.server';
import { MeetingSearchBanner, SearchPage, searchParamsCache } from '@/widgets/search';

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
    <div className="mx-auto flex max-w-[1140px] flex-col items-center justify-center gap-4 md:px-4 md:pt-4">
      <MeetingSearchBanner />
      <SearchPage initialData={initialData} />
    </div>
  );
}
