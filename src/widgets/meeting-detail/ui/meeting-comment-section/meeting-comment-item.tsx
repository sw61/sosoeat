'use client';

import { Heart, MessageCircle, UserRound } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

import { useMeetingCommentItem } from '../../model/use-meeting-comment-item';
import { EllipsisMenu } from '../meeting-detail-card/_components/ellipsis-menu';

import { CommentDeleteModal } from './comment-delete-modal';
import { formatCommentDate } from './format-date';
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
    setIsReplying,
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
    handleReplySubmit,
  } = useMeetingCommentItem({ commentId: id, meetingId, content, isLiked, likeCount });

  const isPending = id < 0;

  return (
    <div>
      <div className={cn('px-4 py-3', isReply && 'bg-sosoeat-orange-100 rounded-[24px]')}>
        <div className="flex gap-2">
          {/* ── 아바타 ── */}
          <Avatar className="size-[54px] shrink-0">
            <AvatarImage src={author.profileUrl ?? undefined} alt={author.nickname} />
            <AvatarFallback className="text-sosoeat-orange-600">
              <UserRound className="size-6" />
            </AvatarFallback>
          </Avatar>

          {/* ── 오른쪽 영역 ── */}
          <div className="flex flex-1 flex-col">
            {/* 이름 + 날짜 + 더보기 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-sosoeat-gray-900 text-base font-bold">{author.nickname}</span>
                {isHostComment && (
                  <span className="text-sosoeat-gray-600 px-2 py-0.5 text-xs">작성자</span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sosoeat-gray-600 text-xs">
                  {formatCommentDate(createdAt)}
                </span>
                {isMine && !isDeleted && (
                  <EllipsisMenu onEdit={() => setIsEditing(true)} onDelete={openDeleteModal} />
                )}
              </div>
            </div>

            {/* 본문 */}
            {isEditing ? (
              <div className="mt-1 flex flex-col gap-1">
                <textarea
                  className="w-full resize-none rounded-lg border px-3 py-2 text-sm outline-none"
                  rows={2}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
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
                    저장
                  </button>
                </div>
              </div>
            ) : (
              <p
                className={cn(
                  'mt-1 text-base font-medium',
                  isDeleted ? 'text-sosoeat-gray-600 italic' : 'text-sosoeat-gray-800'
                )}
              >
                {isDeleted ? '삭제된 댓글입니다.' : content}
              </p>
            )}

            {/* 좋아요 + 답글 버튼 */}
            {!isDeleted && (
              <div className="mt-2 flex items-center gap-3">
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
                    onClick={() => setIsReplying((prev) => !prev)}
                    disabled={isPending}
                    className="text-sosoeat-gray-500 hover:text-sosoeat-orange-600 flex cursor-pointer items-center gap-1 text-sm transition-colors disabled:opacity-40"
                  >
                    <MessageCircle className="size-4" />
                    <span>답글</span>
                  </button>
                )}
              </div>
            )}

            {/* 대댓글 입력창 */}
            {isReplying && (
              <div className="mt-2 flex gap-2">
                <textarea
                  className="flex-1 resize-none rounded-lg border px-3 py-2 text-sm outline-none"
                  rows={1}
                  placeholder="답글을 입력하세요."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setIsReplying(false)}
                    className="cursor-pointer rounded-lg px-3 py-1 text-sm text-gray-500 hover:bg-gray-100"
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    onClick={handleReplySubmit}
                    className="bg-sosoeat-orange-600 cursor-pointer rounded-lg px-3 py-1 text-sm text-white"
                  >
                    저장
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── 대댓글 목록 ── */}
      {replies && replies.filter((r) => !r.isDeleted).length > 0 && (
        <div className="mt-3 ml-[78px] space-y-3">
          {replies
            .filter((r) => !r.isDeleted)
            .map((reply) => (
              <MeetingCommentItem key={reply.id} comment={reply} isReply meetingId={meetingId} />
            ))}
        </div>
      )}

      {/* ── 삭제 확인 모달 ── */}
      <CommentDeleteModal
        open={isDeleteModalOpen}
        onCancel={closeDeleteModal}
        onConfirm={handleDelete}
      />
    </div>
  );
}
