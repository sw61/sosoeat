import { useState } from 'react';

import { toast } from 'sonner';

import { writeClipboardText } from '@/shared/lib/write-clipboard-text';

const MOBILE_SHARE_USER_AGENT = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

interface UseMeetingShareParams {
  title: string;
  imageUrl?: string;
}

export function useMeetingShare({ title, imageUrl }: UseMeetingShareParams) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const shareUrl = typeof window === 'undefined' ? '' : window.location.href;

  const handleShareClick = async () => {
    if (typeof window === 'undefined') return;

    const shareData = {
      title,
      text: `소소잇 모임 - ${title}`,
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
    if (!shareUrl) return;

    try {
      await writeClipboardText(shareUrl);
      toast.success('링크를 복사했어요.');
      setIsShareModalOpen(false);
    } catch {
      toast.error('링크 복사 중 문제가 생겼어요. 다시 시도해 주세요.');
    }
  };

  return {
    isShareModalOpen,
    shareUrl,
    shareTitle: title,
    shareImageUrl: imageUrl,
    handleShareClick,
    handleCancelShare,
    handleCopyShareLink,
  };
}
