'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { useAuthStore } from '@/entities/auth';
import type { GetSosoTalkPostDetailResponse } from '@/entities/post';
import {
  useCreateSosoTalkPostLike,
  useDeleteSosoTalkPost,
  useDeleteSosoTalkPostLike,
} from '@/entities/post';
import { writeClipboardText } from '@/shared/lib/write-clipboard-text';

import { getSosoTalkLikeState } from './sosotalk-post-detail-page.utils';

interface UseSosoTalkPostDetailPostActionsParams {
  data?: GetSosoTalkPostDetailResponse;
  isValidPostId: boolean;
  postId: number;
}

const MOBILE_SHARE_USER_AGENT = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

export function useSosoTalkPostDetailPostActions({
  data,
  isValidPostId,
  postId,
}: UseSosoTalkPostDetailPostActionsParams) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setLoginRequired = useAuthStore((state) => state.setLoginRequired);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
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

  const shareUrl = typeof window === 'undefined' ? '' : window.location.href;
  const shareTitle = data?.title ?? '';

  const handleLikeClick = async () => {
    if (!isValidPostId || isLikePending || !data) {
      return;
    }

    if (!isAuthenticated) {
      setLoginRequired(true);
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
      toast.error('좋아요 처리 중 문제가 생겼어요. 다시 시도해 주세요.');
    }
  };

  const handleShareClick = async () => {
    if (!data || typeof window === 'undefined') {
      return;
    }

    const shareData = {
      title: data.title,
      text: `${data.author.name}님의 소소톡 게시글`,
      url: window.location.href,
    };

    const canUseNativeShare =
      typeof navigator.share === 'function' &&
      MOBILE_SHARE_USER_AGENT.test(window.navigator.userAgent);

    if (!canUseNativeShare) {
      setIsShareModalOpen(true);
      return;
    }

    try {
      await navigator.share(shareData);
      toast.success('공유를 완료했어요.');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      toast.error('공유 중 문제가 생겼어요. 다시 시도해 주세요.');
    }
  };

  const handleCancelShare = () => {
    setIsShareModalOpen(false);
  };

  const handleCopyShareLink = async () => {
    if (!shareUrl) {
      return;
    }

    try {
      await writeClipboardText(shareUrl);
      toast.success('링크를 복사했어요.');
      setIsShareModalOpen(false);
    } catch {
      toast.error('링크 복사 중 문제가 생겼어요. 다시 시도해 주세요.');
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
      toast.error('게시글 삭제 중 문제가 생겼어요. 다시 시도해 주세요.');
    }
  };

  const handleEditClick = () => {
    if (!isValidPostId) {
      return;
    }

    router.push(`/sosotalk/write?postId=${postId}`);
  };

  return {
    canLike: isAuthenticated,
    displayedLikeCount,
    handleCancelDelete,
    handleCancelShare,
    handleConfirmDelete,
    handleCopyShareLink,
    isDeleteModalOpen,
    isLikePending,
    isLiked,
    isShareModalOpen,
    shareTitle,
    shareUrl,
    handleDeleteClick,
    handleEditClick,
    handleLikeClick,
    handleShareClick,
  };
}
