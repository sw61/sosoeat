'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import type { GetSosoTalkPostDetailResponse } from '@/entities/post';
import {
  useCreateSosoTalkPostLike,
  useDeleteSosoTalkPost,
  useDeleteSosoTalkPostLike,
} from '@/entities/post';

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
      toast.error('좋아요 처리에 실패했어요. 다시 시도해 주세요.');
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
        toast.success('링크를 복사했어요.');
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      toast.error('공유에 실패했어요. 다시 시도해 주세요.');
    }
  };

  const handleDeleteClick = () => {
    if (!isValidPostId || deletePostMutation.isPending) {
      return;
    }

    setIsDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!isValidPostId || deletePostMutation.isPending) {
      return;
    }

    try {
      await deletePostMutation.mutateAsync({ postId });
      setIsDeleteModalOpen(false);
      router.push('/sosotalk');
    } catch {
      toast.error('게시글 삭제에 실패했어요. 다시 시도해 주세요.');
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
    handleCancelDelete,
    handleConfirmDelete,
    isLikePending,
    isLiked,
    isDeleteModalOpen,
    handleDeleteClick,
    handleEditClick,
    handleLikeClick,
    handleShareClick,
  };
}
