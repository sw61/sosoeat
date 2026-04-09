'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  useCreateSosoTalkPostLike,
  useDeleteSosoTalkPost,
  useDeleteSosoTalkPostLike,
} from '@/entities/post';
import type { GetSosoTalkPostDetailResponse } from '@/entities/post';

import { getSosoTalkLikeState } from './sosotalk-post-detail-page.utils';

interface UseSosoTalkPostDetailPostActionsParams {
  data?: GetSosoTalkPostDetailResponse;
  isValidPostId: boolean;
  postId: number;
}

export function useSosoTalkPostDetailPostActions({
  data,
  isValidPostId,
  postId,
}: UseSosoTalkPostDetailPostActionsParams) {
  const router = useRouter();
  const [optimisticIsLiked, setOptimisticIsLiked] = useState<boolean | null>(null);
  const createLikeMutation = useCreateSosoTalkPostLike();
  const deletePostMutation = useDeleteSosoTalkPost();
  const deleteLikeMutation = useDeleteSosoTalkPostLike();
  const isLikePending = createLikeMutation.isPending || deleteLikeMutation.isPending;
  const { displayedLikeCount, isLiked } = getSosoTalkLikeState(
    data,
    optimisticIsLiked,
    isLikePending
  );

  const handleLikeClick = async () => {
    if (!isValidPostId || isLikePending || !data) {
      return;
    }

    const nextIsLiked = !isLiked;
    setOptimisticIsLiked(nextIsLiked);

    try {
      if (nextIsLiked) {
        await createLikeMutation.mutateAsync(postId);
      } else {
        await deleteLikeMutation.mutateAsync(postId);
      }
    } catch {
      setOptimisticIsLiked(null);
    }
  };

  const handleShareClick = async () => {
    if (!data || typeof window === 'undefined') {
      return;
    }

    try {
      const shareData = {
        title: data.title,
        text: `${data.author.name}님의 소소톡 게시글`,
        url: window.location.href,
      };

      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
    }
  };

  const handleDeleteClick = async () => {
    if (!isValidPostId || deletePostMutation.isPending || typeof window === 'undefined') {
      return;
    }

    const shouldDelete = window.confirm('게시글을 삭제할까요?');
    if (!shouldDelete) {
      return;
    }

    try {
      await deletePostMutation.mutateAsync({ postId });
      router.push('/sosotalk');
    } catch {
      // Keep the current screen so the user can retry.
    }
  };

  const handleEditClick = () => {
    if (!isValidPostId) {
      return;
    }

    router.push(`/sosotalk/write?postId=${postId}`);
  };

  return {
    displayedLikeCount,
    isLikePending,
    isLiked,
    handleDeleteClick,
    handleEditClick,
    handleLikeClick,
    handleShareClick,
  };
}
