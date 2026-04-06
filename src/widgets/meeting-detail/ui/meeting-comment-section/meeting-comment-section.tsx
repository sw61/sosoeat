'use client';

import { useState } from 'react';

import { MessageSquareText } from 'lucide-react';

import { useAuthStore } from '@/entities/auth';
import type { Comment } from '@/entities/comment';
import { useComments, useCreateComment } from '@/entities/comment';
import { CommentInput } from '@/entities/comment/ui/comment-input';
import { cn } from '@/shared/lib/utils';
import { CountingBadge } from '@/shared/ui/counting-badge/counting-badge';
import { ScrollArea } from '@/shared/ui/scroll-area';

import { buildCommentTree } from './comment-tree';
import { MeetingCommentItem } from './meeting-comment-item';
import type { MeetingComment, MeetingCommentSectionProps } from './meeting-comment-section.types';

function toMeetingCommentTree(raw: Comment[]): MeetingComment[] {
  const list = raw as MeetingComment[];
  if (list.some((c) => c.parentId != null)) {
    return buildCommentTree(list);
  }
  return list;
}

function countNonDeleted(nodes: MeetingComment[]): number {
  let n = 0;
  const walk = (c: MeetingComment) => {
    if (!c.isDeleted) n += 1;
    c.replies?.forEach(walk);
  };
  nodes.forEach(walk);
  return n;
}

export function MeetingCommentSection({
  meetingId,
  initialComments,
  commentSync,
  className,
}: MeetingCommentSectionProps) {
  const [commentText, setCommentText] = useState('');
  const { isAuthenticated, user } = useAuthStore();
  const { data: comments } = useComments(meetingId, initialComments as Comment[], commentSync);
  const { mutate: createComment, isPending: isCreateCommentPending } = useCreateComment(meetingId, {
    nickname: user?.name ?? '',
    profileUrl: user?.image ?? null,
  });

  const tree = toMeetingCommentTree(comments ?? []);
  const totalCommentCount = countNonDeleted(tree);
  const visibleRoots = tree.filter(
    (comment) => !comment.isDeleted || comment.replies?.some((r) => !r.isDeleted)
  );

  const handleSubmit = () => {
    const trimmed = commentText.trim();
    if (!trimmed) return;
    createComment({ content: trimmed });
    setCommentText('');
  };

  return (
    <section
      className={cn(
        'border-sosoeat-gray-200 w-full rounded-[24px] border bg-white px-6 py-4',
        className
      )}
    >
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

      <ScrollArea className="mt-4 *:data-radix-scroll-area-viewport:h-auto! *:data-radix-scroll-area-viewport:max-h-[994px]">
        <div className="space-y-4 pr-4">
          {visibleRoots.map((comment) => (
            <MeetingCommentItem key={comment.id} comment={comment} meetingId={meetingId} />
          ))}
        </div>
      </ScrollArea>

      <div className="mt-4 rounded-[24px] px-6 py-4">
        <CommentInput
          value={commentText}
          onChange={setCommentText}
          onSubmit={handleSubmit}
          disabled={!isAuthenticated || isCreateCommentPending}
          placeholder={
            isAuthenticated ? '댓글을 입력하세요.' : '로그인 후 댓글을 작성할 수 있습니다.'
          }
          currentUserName={user?.name ?? '사용자'}
          currentUserImageUrl={user?.image ?? undefined}
        />
      </div>
    </section>
  );
}
