'use client';

import { useMemo, useState } from 'react';

import { Heart, MessageCircle, UserRound } from 'lucide-react';

import { useAuthStore } from '@/entities/auth';
import { toHttpsUrl } from '@/shared/lib/to-https-url';
import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

import { useMeetingCommentItem } from '../../model/use-meeting-comment-item';
import { EllipsisMenu } from '../meeting-detail-card/_components/ellipsis-menu';

import { CommentDeleteModal } from './comment-delete-modal';
import { formatCommentDate, formatCommentRelativeTime } from './format-date';
import type { MeetingComment } from './meeting-comment-section.types';

interface MeetingCommentItemProps {
  comment: MeetingComment;
  isReply?: boolean;
  meetingId: number;
}

export function MeetingCommentItem({
  comment,
  isReply = false,
  meetingId,
}: MeetingCommentItemProps) {
  const {
    id,
    author,
    content,
    isDeleted,
    createdAt,
    likeCount,
    isLiked,
    isHostComment,
    isMine,
    replies,
  } = comment;

  const {
    isEditing,
    setIsEditing,
    editText,
    setEditText,
    isReplying,
    replyText,
    setReplyText,
    localIsLiked,
    localLikeCount,
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    handleLike,
    handleEditSubmit,
    handleDelete,
    handleToggleReplying,
    handleCancelReply,
    handleReplySubmit,
  } = useMeetingCommentItem({ commentId: id, meetingId, content, isLiked, likeCount });

  const [isRepliesExpanded, setIsRepliesExpanded] = useState(false);
  const isPending = id < 0;
  const { isAuthenticated } = useAuthStore();

  const visibleReplies = useMemo(
    () => (replies ?? []).filter((reply) => !reply.isDeleted),
    [replies]
  );

  return (
    <div>
      <article
        className={cn(
          'flex items-start gap-3 rounded-[20px] px-4 py-4 sm:gap-4 sm:px-5 sm:py-5',
          isReply && 'bg-sosoeat-orange-100'
        )}
      >
        <Avatar size="default" className="h-[54px] w-[54px] shrink-0">
          <AvatarImage src={toHttpsUrl(author.profileUrl)} alt={author.nickname} />
          <AvatarFallback className="text-sosoeat-orange-600">
            <UserRound className="size-6" />
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1 pt-1">
          <div className="flex min-w-0 items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-sosoeat-gray-900 text-base leading-5 font-bold">
                  {author.nickname}
                </span>
                <div className="text-sosoeat-gray-500 flex items-center gap-1 text-xs leading-4 font-semibold">
                  <time>{formatCommentDate(createdAt)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{formatCommentRelativeTime(createdAt)}</span>
                </div>
              </div>
              {isHostComment && (
                <span
                  className={cn(
                    'text-sosoeat-orange-700 mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold',
                    isReply ? 'border-sosoeat-orange-200 border bg-white' : 'bg-sosoeat-orange-100'
                  )}
                >
                  작성자
                </span>
              )}
            </div>

            {isMine && !isDeleted && (
              <div className="shrink-0 self-start">
                <EllipsisMenu onEdit={() => setIsEditing(true)} onDelete={openDeleteModal} />
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="mt-3 flex flex-col gap-1">
              <textarea
                className="w-full resize-none rounded-lg border px-3 py-2 text-sm outline-none"
                rows={2}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    handleEditSubmit();
                  }
                }}
                autoFocus
              />
              <div className="flex justify-end gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditText(content);
                    setIsEditing(false);
                  }}
                  className="cursor-pointer rounded-lg px-3 py-1 text-sm text-gray-500 hover:bg-gray-100"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleEditSubmit}
                  className="bg-sosoeat-orange-600 cursor-pointer rounded-lg px-3 py-1 text-sm text-white"
                >
                  완료
                </button>
              </div>
            </div>
          ) : (
            <p
              className={cn(
                'mt-1 text-base leading-6 font-normal break-words whitespace-pre-wrap',
                isDeleted ? 'text-sosoeat-gray-600 italic' : 'text-sosoeat-gray-800'
              )}
            >
              {isDeleted ? '삭제된 댓글입니다.' : content}
            </p>
          )}

          {!isDeleted && (
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                aria-label="좋아요"
                onClick={handleLike}
                disabled={isPending}
                className="text-sosoeat-orange-600 flex cursor-pointer items-center gap-1 text-sm transition-colors disabled:opacity-40"
              >
                <Heart className={cn('size-4', localIsLiked && 'fill-sosoeat-orange-600')} />
                <span>{localLikeCount}</span>
              </button>

              {!isReply && (
                <button
                  type="button"
                  aria-label="답글"
                  onClick={() => {
                    if (!isReplying) {
                      setIsRepliesExpanded(true);
                    }
                    handleToggleReplying();
                  }}
                  disabled={isPending}
                  className="text-sosoeat-gray-500 hover:text-sosoeat-orange-600 flex cursor-pointer items-center gap-1 text-sm transition-colors disabled:opacity-40"
                >
                  <MessageCircle className="size-4" />
                  <span>답글</span>
                </button>
              )}
            </div>
          )}

          {!isReply && visibleReplies.length > 0 && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setIsRepliesExpanded((prev) => !prev)}
                className="text-sosoeat-orange-600 hover:text-sosoeat-orange-700 inline-flex text-sm font-semibold transition-colors"
              >
                {isRepliesExpanded ? '답글 숨기기' : `답글 ${visibleReplies.length}개 보기`}
              </button>
            </div>
          )}

          {isReplying && (
            <div className="mt-3 flex gap-2">
              <textarea
                className="flex-1 resize-none rounded-lg border px-3 py-2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
                rows={1}
                placeholder={
                  isAuthenticated ? '답글을 입력하세요.' : '로그인 후 댓글을 작성할 수 있습니다.'
                }
                value={replyText}
                disabled={!isAuthenticated}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    handleReplySubmit();
                  }
                }}
                autoFocus
              />
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={handleCancelReply}
                  className="cursor-pointer rounded-lg px-3 py-1 text-sm text-gray-500 hover:bg-gray-100"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleReplySubmit}
                  disabled={!isAuthenticated}
                  className="bg-sosoeat-orange-600 cursor-pointer rounded-lg px-3 py-1 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  완료
                </button>
              </div>
            </div>
          )}
        </div>
      </article>

      {!isReply && isRepliesExpanded && visibleReplies.length > 0 && (
        <div className="mt-3 ml-16 space-y-3 md:ml-[78px]">
          {visibleReplies.map((reply) => (
            <MeetingCommentItem key={reply.id} comment={reply} isReply meetingId={meetingId} />
          ))}
        </div>
      )}

      <CommentDeleteModal
        open={isDeleteModalOpen}
        onCancel={closeDeleteModal}
        onConfirm={handleDelete}
      />
    </div>
  );
}
