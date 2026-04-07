import { MoreHorizontal } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown';

import { CommentInput } from '../comment-input';

import type { CommentItemProps } from './comment-item.types';

export function CommentItem({
  authorName,
  authorImageUrl,
  createdAt,
  relativeTime,
  content,
  isAuthorComment = false,
  isEditing = false,
  editValue = '',
  isEditPending = false,
  onEditClick,
  onDeleteClick,
  onEditValueChange,
  onEditSubmit,
  onEditCancel,
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
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-sosoeat-gray-900 text-base leading-5 font-bold">
                {authorName}
              </span>
              <div className="text-sosoeat-gray-500 flex items-center gap-1 text-xs leading-4 font-semibold">
                <time>{createdAt}</time>
                {relativeTime ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{relativeTime}</span>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          {isAuthorComment && !isEditing ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="text-sosoeat-gray-500 hover:text-sosoeat-gray-700 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors"
                  aria-label="댓글 메뉴"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[120px]">
                <DropdownMenuItem onClick={onEditClick}>수정하기</DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onClick={onDeleteClick}>
                  삭제하기
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>

        {isEditing ? (
          <div className="mt-3 space-y-3">
            <CommentInput
              value={editValue}
              onChange={onEditValueChange}
              onSubmit={onEditSubmit}
              disabled={isEditPending}
              submitLabel="댓글 수정"
              currentUserName={authorName}
              currentUserImageUrl={authorImageUrl}
              showAvatar={false}
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onEditCancel}
                disabled={isEditPending}
                className="border-input bg-background ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sosoeat-gray-900 mt-1 text-base leading-6 font-normal break-words whitespace-pre-wrap">
            {content}
          </p>
        )}
      </div>
    </article>
  );
}
