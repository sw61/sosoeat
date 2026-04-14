import { Skeleton } from '@/shared/ui/skeleton/skeleton';

import { MeetingCommentSkeleton } from './meeting-comment-skeleton';
import { MeetingRecommendedSkeleton } from './meeting-recommended-skeleton';

export function MeetingDetailPageSkeleton() {
  return (
    <main className="space-y-[30px] py-10">
      {/* Hero */}
      <div className="flex flex-col gap-6 md:flex-row">
        <Skeleton className="h-[241px] w-full rounded-[24px] md:h-auto md:min-w-0 md:flex-1" />
        <div className="min-w-0 flex-1 rounded-[20px] bg-white p-4 md:p-6 lg:rounded-[32px]">
          <div className="space-y-3">
            <Skeleton className="h-5 w-28 rounded-full" />
            <Skeleton className="h-8 w-3/4" />
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <Skeleton className="size-9 shrink-0 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="size-9 shrink-0 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="size-9 shrink-0 rounded-full" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-3 w-14" />
                  <Skeleton className="h-3 w-full max-w-[500px]" />
                </div>
              </div>
            </div>
            <Skeleton className="mt-2 h-10 w-full lg:h-[62px]" />
          </div>
        </div>
      </div>

      {/* Description */}
      <section>
        <Skeleton className="mb-3 h-8 w-28" />
        <div className="border-sosoeat-gray-200 mt-5 rounded-[16px] border bg-white px-12 py-10">
          <div className="space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        </div>
      </section>

      {/* Location */}
      <section>
        <Skeleton className="mb-3 h-8 w-24" />
        <div className="border-sosoeat-gray-200 mt-5 overflow-hidden rounded-[16px] border">
          <Skeleton className="h-[240px] w-full rounded-none md:h-[320px] lg:h-[352px]" />
          <div className="px-6 py-4">
            <Skeleton className="h-5 w-48" />
          </div>
        </div>
      </section>

      {/* Comment */}
      <MeetingCommentSkeleton />

      {/* Recommended */}
      <MeetingRecommendedSkeleton />
    </main>
  );
}
