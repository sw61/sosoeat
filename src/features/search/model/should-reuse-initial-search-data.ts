import type { MeetingListResult } from '@/entities/meeting';

import type { SearchOptionSnapshot } from './search-option-snapshot';

type ShouldReuseInitialSearchDataParams = {
  initialData: MeetingListResult | null;
  initialOptionSnapshot: SearchOptionSnapshot;
  currentOptionSnapshot: SearchOptionSnapshot;
  region?: string | string[];
};

export const shouldReuseInitialSearchData = ({
  initialData,
  initialOptionSnapshot,
  currentOptionSnapshot,
  region,
}: ShouldReuseInitialSearchDataParams) =>
  initialData != null &&
  region == null &&
  JSON.stringify(initialOptionSnapshot) === JSON.stringify(currentOptionSnapshot);
