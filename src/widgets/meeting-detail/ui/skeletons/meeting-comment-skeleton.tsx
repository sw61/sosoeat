import { MessageCircle } from 'lucide-react';

import { Skeleton } from '@/shared/ui/skeleton/skeleton';

function CommentCardSkeleton({ isReply = false }: { isReply?: boolean }) {
  return (
    <div
      className={[
        'flex items-start gap-3 rounded-[20px] px-4 py-4 sm:gap-4 sm:px-5 sm:py-5',
        isReply ? 'bg-sosoeat-orange-100' : '',
      ].join(' ')}
    >
      <Skeleton className="h-[54px] w-[54px] shrink-0 rounded-full" />
      <div className="min-w-0 flex-1 pt-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-4 w-28" />
            </div>
            <Skeleton className="h-4 w-12 rounded-full" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>

        <div className="mt-3 space-y-2">
          <Skeleton className="h-4 w-full max-w-[420px]" />
          <Skeleton className="h-4 w-3/4 max-w-[320px]" />
        </div>

        <div className="mt-3 flex items-center gap-3">
          <Skeleton className="h-4 w-12" />
          {!isReply ? <Skeleton className="h-4 w-12" /> : null}
        </div>
      </div>
    </div>
  );
}

export function MeetingCommentSkeleton() {
  return (
    <section className="border-sosoeat-gray-400 w-full rounded-[24px] border bg-white px-4 pt-5 sm:px-6 sm:pt-6 md:px-8 md:pt-8">
      <div className="flex items-center gap-2">
        <MessageCircle className="text-sosoeat-orange-600 size-5 fill-current stroke-[1.8]" />
        <Skeleton className="h-5 w-10" />
        <Skeleton className="h-5 w-8 rounded-full" />
      </div>

      <div className="mt-6 space-y-4 pr-4">
        <CommentCardSkeleton />
        <div className="ml-16 space-y-3 md:ml-[78px]">
          <CommentCardSkeleton isReply />
        </div>
        <CommentCardSkeleton />
      </div>

      <div className="bg-sosoeat-gray-100 -mx-4 mt-4 rounded-b-[24px] px-4 py-6 sm:-mx-6 sm:px-6 sm:py-7 md:-mx-8 md:px-8 md:py-8">
        <div className="flex items-start gap-3 sm:gap-4">
          <Skeleton className="h-[54px] w-[54px] shrink-0 rounded-full" />
          <div className="bg-sosoeat-gray-300 flex min-h-[46px] min-w-0 flex-1 items-end gap-3 rounded-[24px] py-2 pr-[14px] pl-5 sm:pl-6">
            <Skeleton className="mb-1 h-5 flex-1 rounded-full" />
            <Skeleton className="h-9 w-9 shrink-0 rounded-full bg-white" />
          </div>
        </div>
      </div>
    </section>
  );
}
