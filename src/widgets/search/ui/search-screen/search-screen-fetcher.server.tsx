import { MeetingListResult } from '@/entities/meeting';

import { SearchScreen } from './search-screen';

export const SearchScreenFetcher = async ({
  initialData,
}: {
  initialData: Promise<MeetingListResult | null>;
}) => {
  const resolvedInitialData = await initialData;

  return <SearchScreen initialData={resolvedInitialData} />;
};
