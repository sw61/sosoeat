'use client';

import { MoreHorizontal } from 'lucide-react';

import type { SosoTalkCommentItemProps } from '@/entities/sosotalk-comment';
import { cn } from '@/shared/lib/utils';
import {
  ActionMenu,
  ActionMenuContent,
  ActionMenuItem,
  ActionMenuSeparator,
  ActionMenuTrigger,
} from '@/shared/ui/action-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { CommentInput } from '@/shared/ui/comment-input';

export function SosoTalkCommentItem({
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
}: SosoTalkCommentItemProps) {
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
            <ActionMenu>
              <ActionMenuTrigger asChild>
                <button
                  type="button"
                  className="text-sosoeat-gray-500 hover:text-sosoeat-gray-700 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors"
                  aria-label="댓글 메뉴"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </ActionMenuTrigger>
              <ActionMenuContent>
                <ActionMenuItem onClick={onEditClick}>수정하기</ActionMenuItem>
                <ActionMenuSeparator />
                <ActionMenuItem variant="destructive" onClick={onDeleteClick}>
                  삭제하기
                </ActionMenuItem>
              </ActionMenuContent>
            </ActionMenu>
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
              <Button
                type="button"
                variant="outline"
                onClick={onEditCancel}
                disabled={isEditPending}
              >
                취소
              </Button>
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
