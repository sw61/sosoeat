'use client';

import { useState } from 'react';

import { MessageSquareText } from 'lucide-react';

import { CommentInput } from '@/components/common/comment-input';
import { CountingBadge } from '@/components/common/counting-badge/counting-badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth-store';

import { buildCommentTree } from './comment-tree';
import { MeetingCommentItem } from './meeting-comment-item';
import type { MeetingCommentSectionProps } from './meeting-comment-section.types';

const MAX_VISIBLE_COMMENTS = 5;

export function MeetingCommentSection({
  comments,
  commentCount,
  className,
}: MeetingCommentSectionProps) {
  const [commentText, setCommentText] = useState('');
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const totalCommentCount = commentCount ?? comments.length;
  const treeComments = buildCommentTree(comments);
  const shouldScroll = treeComments.length > MAX_VISIBLE_COMMENTS;

  const commentList = treeComments.map((comment) => (
    <MeetingCommentItem key={comment.id} comment={comment} />
  ));

  return (
    <section
      className={cn(
        'border-sosoeat-gray-200 w-full rounded-[24px] border bg-white px-6 py-4',
        className
      )}
    >
      {/* 헤더 */}
      <div className="flex items-center gap-2">
        <MessageSquareText className="text-sosoeat-orange-600 size-5" />
        <h2 className="text-sosoeat-gray-900 text-xl font-bold">댓글</h2>
        <span className="md:hidden">
          <CountingBadge count={totalCommentCount} size="small" />
        </span>
        <span className="hidden md:block">
          <CountingBadge count={totalCommentCount} size="large" />
        </span>
      </div>

      {/* 댓글 목록 */}
      {shouldScroll ? (
        <div className="mt-4 h-[994px]">
          <ScrollArea className="h-full">
            <div className="space-y-4 pr-4">{commentList}</div>
          </ScrollArea>
        </div>
      ) : (
        <div className="mt-4 space-y-4">{commentList}</div>
      )}

      {/* 댓글 입력창 */}
      <div className="mt-4 rounded-[24px] px-6 py-4">
        <CommentInput
          value={commentText}
          onChange={setCommentText}
          onSubmit={() => setCommentText('')}
          disabled={!isAuthenticated}
          placeholder={
            isAuthenticated ? '댓글을 입력하세요.' : '로그인 후 댓글을 작성할 수 있습니다.'
          }
          currentUserName={user?.name}
          currentUserImageUrl={user?.image ?? undefined}
        />
      </div>
    </section>
  );
}
