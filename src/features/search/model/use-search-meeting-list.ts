'use client';

import type { MeetingListResult, MeetingSearchOptions } from '@/entities/meeting';
import { useSearchInfiniteOption } from '@/entities/meeting';

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
    shouldUseInitialData ? (initialData ?? undefined) : undefined
  );
  const multiResult = useSearchInfiniteOptions(options);
  const result = isMulti ? multiResult : singleResult;

  return {
    ...result,
    meetingData: result.data?.pages.flatMap((page) => page.data) ?? [],
  };
};
