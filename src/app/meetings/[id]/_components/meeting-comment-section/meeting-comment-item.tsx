'use client';

import { useState } from 'react';

import { Heart, UserRound } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

import { EllipsisMenu } from '../meeting-detail-card/_components/ellipsis-menu';

import type { MeetingComment } from './meeting-comment-section.types';

interface MeetingCommentItemProps {
  comment: MeetingComment;
  isReply?: boolean;
}

// ─── MeetingCommentItem ───────────────────────────────────────

export function MeetingCommentItem({ comment, isReply = false }: MeetingCommentItemProps) {
  const {
    id: _id, // TODO: 좋아요/수정/삭제 mutation에서 사용 예정
    author,
    content,
    isDeleted,
    createdAt,
    likeCount,
    isLiked: initialIsLiked,
    isHostComment,
    isMine,
    replies,
  } = comment;

  // TODO: API 연동 시 useState 제거하고 useQuery 데이터의 isLiked 직접 사용
  const [isLiked, setIsLiked] = useState(initialIsLiked);

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

          {/* ── 오른쪽 영역: 이름 + 날짜 / 본문 / 하단 액션 ── */}
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
                <span className="text-sosoeat-gray-600 text-xs">{createdAt}</span>
                {isMine && !isDeleted && (
                  <EllipsisMenu
                    onEdit={() => {}} // TODO: useEditCommentMutation
                    onDelete={() => {}} // TODO: useDeleteCommentMutation
                  />
                )}
              </div>
            </div>

            {/* 본문 */}
            <p
              className={cn(
                'mt-1 text-base font-medium',
                isDeleted ? 'text-sosoeat-gray-600 italic' : 'text-sosoeat-gray-800'
              )}
            >
              {isDeleted ? '삭제된 댓글입니다.' : content}
            </p>

            {/* 좋아요 */}
            {!isDeleted && (
              <div className="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsLiked((prev) => !prev)} // TODO: useLikeCommentMutation으로 교체
                  className="text-sosoeat-orange-600 flex items-center gap-1 text-sm transition-colors"
                >
                  <Heart className={cn('size-4', isLiked && 'fill-sosoeat-orange-600')} />
                  <span>{likeCount}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── 대댓글 목록 ── */}
      {replies && replies.length > 0 && (
        <div className="mt-3 ml-[78px] space-y-3">
          {replies.map((reply) => (
            <MeetingCommentItem key={reply.id} comment={reply} isReply />
          ))}
        </div>
      )}
    </div>
  );
}
