import { Skeleton } from '@/shared/ui/skeleton/skeleton';

export function MeetingRecommendedSkeleton() {
  return (
    <section>
      <Skeleton className="mb-4 h-8 w-52" />
      <div className="mt-5 flex gap-6 overflow-hidden pb-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="w-[302px] shrink-0">
            <Skeleton className="h-[160px] w-full rounded-3xl" />
            <div className="mt-[14px] space-y-3 px-1">
              <div className="flex gap-1">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-12 rounded-full" />
              </div>
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
