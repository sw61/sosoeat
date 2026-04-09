'use client';

import { useAuthStore } from '@/entities/auth';
import { useGetSosoTalkPostDetail } from '@/entities/post';

import { getSosoTalkCommentCount, getSosoTalkComments } from './sosotalk-post-detail-page.utils';
import { useSosoTalkPostDetailCommentActions } from './use-sosotalk-post-detail-comment-actions';
import { useSosoTalkPostDetailPostActions } from './use-sosotalk-post-detail-post-actions';

export function useSosoTalkPostDetailPage(postId: string) {
  const currentUser = useAuthStore((state) => state.user);
  const numericPostId = Number(postId);
  const isValidPostId = Number.isInteger(numericPostId) && numericPostId > 0;
  const { data, isLoading, isError } = useGetSosoTalkPostDetail(
    isValidPostId ? numericPostId : undefined
  );

  const comments = getSosoTalkComments(data);
  const commentCount = getSosoTalkCommentCount(data);
  const commentActions = useSosoTalkPostDetailCommentActions({
    comments,
    isValidPostId,
    postId: numericPostId,
  });
  const postActions = useSosoTalkPostDetailPostActions({
    data,
    isValidPostId,
    postId: numericPostId,
  });

  return {
    currentUser,
    data,
    comments,
    commentCount,
    isError,
    isLoading,
    isValidPostId,
    ...commentActions,
    ...postActions,
  };
}
