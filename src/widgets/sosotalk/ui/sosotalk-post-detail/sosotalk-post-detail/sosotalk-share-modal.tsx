'use client';

import Image from 'next/image';
import Script from 'next/script';

import { Copy, Share2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';

interface KakaoSharePayload {
  objectType: 'feed';
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  };
  buttons: Array<{
    title: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  }>;
}

interface KakaoSdk {
  init: (appKey: string) => void;
  isInitialized: () => boolean;
  Share: {
    sendDefault: (payload: KakaoSharePayload) => void;
  };
}

declare global {
  interface Window {
    Kakao?: KakaoSdk;
  }
}

interface SosoTalkShareModalProps {
  open: boolean;
  title: string;
  url: string;
  imageUrl?: string;
  onClose: () => void;
  onCopy: () => void | Promise<void>;
}

const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

const toAbsoluteImageUrl = (imageUrl?: string) => {
  if (typeof window === 'undefined') {
    return imageUrl ?? '';
  }

  if (imageUrl?.startsWith('http://') || imageUrl?.startsWith('https://')) {
    return imageUrl;
  }

  return `${window.location.origin}${imageUrl ?? '/images/logo.svg'}`;
};

export function SosoTalkShareModal({
  open,
  title,
  url,
  imageUrl,
  onClose,
  onCopy,
}: SosoTalkShareModalProps) {
  const initializeKakao = () => {
    if (!KAKAO_JS_KEY || typeof window === 'undefined' || !window.Kakao) {
      return;
    }

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JS_KEY);
    }
  };

  const handleKakaoShare = () => {
    if (!window.Kakao) {
      toast.error('카카오톡 공유를 준비하지 못했어요. 다시 시도해 주세요.');
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description: '소소톡 게시글을 확인해 보세요.',
        imageUrl: toAbsoluteImageUrl(imageUrl),
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '게시글 보기',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

  return (
    <>
      {KAKAO_JS_KEY ? (
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.min.js"
          strategy="afterInteractive"
          onLoad={initializeKakao}
        />
      ) : null}

      <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
        <DialogContent className="[&_[data-slot='dialog-close']]:top-4 [&_[data-slot='dialog-close']]:right-4 max-w-[calc(100%-2rem)] rounded-[24px] px-6 py-6 sm:max-w-md sm:px-7">
          <DialogHeader className="gap-3">
            <div className="bg-sosoeat-orange-100 text-sosoeat-orange-700 inline-flex h-11 w-11 items-center justify-center rounded-full">
              <Share2 className="h-5 w-5" />
            </div>
            <DialogTitle className="text-sosoeat-gray-900 text-xl font-semibold">
              게시글 공유하기
            </DialogTitle>
            <DialogDescription className="sr-only">
              카카오톡 또는 링크 복사로 게시글을 공유할 수 있는 모달입니다.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div className="bg-sosoeat-gray-100 rounded-2xl px-4 py-3">
              <p className="text-sosoeat-gray-900 line-clamp-2 text-sm font-semibold">{title}</p>
              <p className="text-sosoeat-gray-500 mt-1 truncate text-sm">{url}</p>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap justify-end gap-2">
            {KAKAO_JS_KEY ? (
              <Button
                type="button"
                variant="outline"
                className="rounded-full border-[#FEE500] bg-[#FEE500] text-[#191919] hover:bg-[#f6dd00]"
                onClick={handleKakaoShare}
              >
                <Image src="/icons/kakao-icon.svg" alt="" width={18} height={18} aria-hidden />
                카카오톡 공유
              </Button>
            ) : null}
            <Button className="rounded-full" onClick={() => void onCopy()}>
              <Copy className="h-4 w-4" />
              링크 복사
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
