import { MessageSquareText } from 'lucide-react';

import { Skeleton } from '@/shared/ui/skeleton/skeleton';

export function MeetingCommentSkeleton() {
  return (
    <section className="border-sosoeat-gray-200 w-full rounded-[24px] border bg-white px-6 py-4">
      <div className="flex items-center gap-2">
        <MessageSquareText className="text-sosoeat-orange-600 size-5" />
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-8 rounded-full" />
      </div>

      <div className="mt-4 space-y-4 pr-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="size-9 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
