import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

import { CommentItemProps } from './comment-item.types';

export function CommentItem({
  authorName,
  authorImageUrl,
  createdAt,
  relativeTime,
  content,
  isAuthorComment = false,
  className,
}: CommentItemProps) {
  return (
    <article
      className={cn(
        'flex items-start gap-3 rounded-[20px] px-4 py-4 sm:gap-4 sm:px-5 sm:py-5',
        isAuthorComment && 'bg-sosoeat-orange-100/70',
        className
      )}
    >
      <Avatar size="default" className="h-[54px] w-[54px] shrink-0">
        <AvatarImage src={authorImageUrl} alt={authorName} />
        <AvatarFallback className="text-sm font-semibold">{authorName.slice(0, 1)}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1 pt-1">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-base leading-5 font-bold text-sosoeat-gray-900">{authorName}</span>
          <div className="flex items-center gap-1 text-xs leading-4 font-semibold text-sosoeat-gray-500">
            <time>{createdAt}</time>
            {relativeTime ? (
              <>
                <span aria-hidden="true">·</span>
                <span>{relativeTime}</span>
              </>
            ) : null}
          </div>
        </div>

        <p className="whitespace-pre-wrap break-words text-base leading-6 font-normal text-sosoeat-gray-900">
          {content}
        </p>
      </div>
    </article>
  );
}
