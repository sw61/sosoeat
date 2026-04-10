import { SearchParams } from 'nuqs';

import { getMeetings } from '@/entities/meeting';
import { MeetingSearchBanner, SearchPage, searchParamsCache } from '@/widgets/search';

type PageProps = {
  searchParams: Promise<SearchParams>; // Next.js 15+: async searchParams prop
};

export default async function Page({ searchParams }: PageProps) {
  const { dateStart } = searchParamsCache.parse(await searchParams);
  const finalDateStart = dateStart ?? new Date();
  const initialData = await getMeetings({
    dateStart: finalDateStart.toISOString(),
  }).catch(() => null);

  return (
    <div className="bg-sosoeat-gray-100 min-h-[calc(100vh-156px)] pb-8">
      <MeetingSearchBanner />
      <SearchPage initialData={initialData} />
    </div>
  );
}
