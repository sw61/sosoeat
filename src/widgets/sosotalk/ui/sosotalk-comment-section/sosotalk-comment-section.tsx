'use client';

import { MessageSquareText } from 'lucide-react';

import { CountingBadge } from '@/components/common/counting-badge';
import { CommentInput } from '@/entities/comment/ui/comment-input';
import { CommentItem } from '@/entities/comment/ui/comment-item';
import { cn } from '@/shared/lib/utils';

import type { SosoTalkCommentSectionProps } from './sosotalk-comment-section.types';

export function SosoTalkCommentSection({
  comments,
  commentCount,
  inputValue,
  inputPlaceholder,
  onChangeInput,
  onSubmitComment,
  currentUserName,
  currentUserImageUrl,
  className,
}: SosoTalkCommentSectionProps) {
  const totalCommentCount = commentCount ?? comments.length;

  return (
    <section
      className={cn(
        'border-sosoeat-gray-400 mx-auto w-full max-w-[1280px] rounded-[24px] border bg-white px-4 pt-5 sm:px-6 sm:pt-6 md:px-8 md:pt-8',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <MessageSquareText className="text-sosoeat-orange-600 size-5" />
        <h2 className="text-sosoeat-gray-900 text-lg font-semibold">댓글</h2>
        <CountingBadge count={totalCommentCount} />
      </div>

      <div className="mt-6 space-y-2">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            authorName={comment.authorName}
            authorImageUrl={comment.authorImageUrl}
            createdAt={comment.createdAt}
            relativeTime={comment.relativeTime}
            content={comment.content}
            isAuthorComment={comment.isAuthorComment}
            isEditing={comment.isEditing}
            editValue={comment.editValue}
            isEditPending={comment.isEditPending}
            onEditClick={comment.onEditClick}
            onDeleteClick={comment.onDeleteClick}
            onEditValueChange={comment.onEditValueChange}
            onEditSubmit={comment.onEditSubmit}
            onEditCancel={comment.onEditCancel}
          />
        ))}
      </div>

      <div className="bg-sosoeat-gray-100 -mx-4 mt-4 rounded-b-[24px] px-4 py-6 sm:-mx-6 sm:px-6 sm:py-7 md:-mx-8 md:px-8 md:py-8">
        <div className="mx-auto w-full">
          <CommentInput
            value={inputValue}
            placeholder={inputPlaceholder}
            onChange={onChangeInput}
            onSubmit={onSubmitComment}
            currentUserName={currentUserName}
            currentUserImageUrl={currentUserImageUrl}
          />
        </div>
      </div>
    </section>
  );
}
