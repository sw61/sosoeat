'use client';

import type { MeetingListResult } from '@/entities/meeting';
import type { MeetingSearchOptions } from '@/entities/meeting-search';
import { useSearchInfiniteOption } from '@/entities/meeting-search';

import { useSearchInfiniteOptions } from './use-search-infinite-options';

type UseSearchMeetingListParams = {
  options: MeetingSearchOptions;
  initialData: MeetingListResult | null;
  shouldUseInitialData: boolean;
};

export const useSearchMeetingList = ({
  options,
  initialData,
  shouldUseInitialData,
}: UseSearchMeetingListParams) => {
  const isMulti = Array.isArray(options.region) && options.region.length > 1;

  const singleResult = useSearchInfiniteOption(
    options,
    shouldUseInitialData ? (initialData ?? undefined) : undefined,
    { enabled: !isMulti }
  );
  const multiResult = useSearchInfiniteOptions(options, isMulti);
  const result = isMulti ? multiResult : singleResult;

  return {
    ...result,
    meetingData: result.data?.pages.flatMap((page) => page.data) ?? [],
  };
};
