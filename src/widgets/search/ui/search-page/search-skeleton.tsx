import { Skeleton } from '@/shared/ui/skeleton';

const SearchSkeleton = () => {
  return (
    <div className="grid grid-cols-1 justify-center justify-items-center gap-1 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6.75">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={`meeting-skeleton-${index}`}
          className="h-105 w-full max-w-90 overflow-hidden rounded-2xl border border-[#F3F4F6] bg-white"
        >
          <Skeleton className="h-45 w-full rounded-none" />
          <div className="flex flex-col gap-3 p-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-5 w-1/2" />
            <div className="flex gap-2">
              <Skeleton className="h-7 flex-1 rounded-full" />
              <Skeleton className="h-7 w-24 rounded-full" />
            </div>
            <Skeleton className="h-2 w-full" />
            <div className="mt-1 flex items-center gap-2 border-t border-[#F9FAFB] pt-3">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchSkeleton;
