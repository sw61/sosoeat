import { Skeleton } from '@/shared/ui/skeleton';

import SearchSkeleton from './search-skeleton';

export function SearchScreenSkeleton() {
  return (
    <div className="w-full max-w-[1140px]">
      <div className="flex w-full flex-col gap-4 px-4 md:px-0">
        {/* SearchBar */}
        <Skeleton className="h-12 w-full rounded-xl" />

        {/* MeetingFilterBar */}
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20 rounded-full" />
          <Skeleton className="h-9 w-24 rounded-full" />
          <Skeleton className="h-9 w-20 rounded-full" />
          <Skeleton className="h-9 w-20 rounded-full" />
        </div>

        {/* 카드 목록 */}
        <SearchSkeleton />
      </div>
    </div>
  );
}
