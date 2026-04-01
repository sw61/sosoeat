'use client';

import { useState } from 'react';

import { Send, UserRound } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { Comment } from '@/services/comments';
import { useComments, useCreateComment } from '@/services/comments';
import { useAuthStore } from '@/store/auth-store';

import { buildCommentTree } from './comment-tree';
import { MeetingCommentItem } from './meeting-comment-item';
import type { MeetingCommentSectionProps } from './meeting-comment-section.types';

export function MeetingCommentSection({
  meetingId,
  initialComments,
  className,
}: MeetingCommentSectionProps) {
  const [text, setText] = useState('');
  const { isAuthenticated, user } = useAuthStore();
  const { data: flatComments } = useComments(meetingId, initialComments as Comment[]);
  const { mutate: createComment } = useCreateComment(meetingId);

  const comments = buildCommentTree(flatComments ?? []);

  const handleSubmit = () => {
    if (!text.trim()) return;
    createComment({ content: text.trim() });
    setText('');
  };

  return (
    <section className={cn('flex flex-col gap-4', className)}>
      {/* 댓글 목록 */}
      <div className="space-y-2">
        {comments.map((comment) => (
          <MeetingCommentItem key={comment.id} comment={comment} meetingId={meetingId} />
        ))}
      </div>

      {/* 댓글 입력 */}
      <div className="flex items-center gap-2 border-t pt-4">
        <Avatar className="size-[40px] shrink-0">
          <AvatarImage
            src={(user as { image?: string } | null)?.image ?? undefined}
            alt={user?.name ?? ''}
          />
          <AvatarFallback className="text-sosoeat-orange-600">
            <UserRound className="size-5" />
          </AvatarFallback>
        </Avatar>
        <textarea
          className="flex-1 resize-none rounded-lg border px-3 py-2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
          rows={1}
          disabled={!isAuthenticated}
          placeholder={
            isAuthenticated ? '댓글을 작성해 주세요.' : '로그인 후 댓글을 작성할 수 있습니다.'
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="button"
          aria-label="댓글 전송"
          disabled={!isAuthenticated || !text.trim()}
          onClick={handleSubmit}
          className="text-sosoeat-orange-600 disabled:opacity-40"
        >
          <Send className="size-5" />
        </button>
      </div>
    </section>
  );
}
