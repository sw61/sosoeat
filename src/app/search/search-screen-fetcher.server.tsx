import { SearchParams } from 'nuqs';

import { getMeetingSearchParams } from '@/features/search';
import { getInitialSearchData } from '@/features/search/index.server';
import { SearchScreen } from '@/widgets/search';

export const SearchScreenFetcher = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const requestParams = await getMeetingSearchParams(searchParams);
  const initialData = await getInitialSearchData(requestParams);

  return (
    <SearchScreen initialData={initialData} initialDefaultDateStartIso={requestParams.dateStart} />
  );
};
