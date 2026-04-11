'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';

import { cn } from '../../lib/utils';

interface ResponsiveModalProps {
  open: boolean;
  onClose: () => void;
  /** 표시되는 헤더 제목. 없으면 헤더 미렌더링, ariaLabel로 접근성 보장 */
  title?: string;
  /** title 없을 때 스크린리더용 레이블 */
  ariaLabel?: string;
  children: React.ReactNode;
  /** PC 팝업 너비 (기본값: w-136) */
  className?: string;
}

/**
 * 반응형 모달
 * - 모바일(< 768px): 화면 하단에서 올라오는 바텀시트
 * - PC(≥ 768px): 화면 중앙 팝업
 */
export function ResponsiveModal({
  open,
  onClose,
  title,
  ariaLabel,
  children,
  className,
}: ResponsiveModalProps) {
  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogPrimitive.Portal>
        {/* 딤 배경 */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" />

        {/* 패널 */}
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={cn(
            'fixed z-50 flex flex-col bg-white outline-none',
            // 모바일: 바텀시트
            'right-0 bottom-0 left-0 max-h-[90dvh] w-full rounded-t-2xl',
            // PC: 중앙 팝업
            'md:top-1/2 md:right-auto md:bottom-auto md:left-1/2 md:w-136 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl',
            className
          )}
        >
          {title ? (
            <div className="flex items-center justify-between border-b px-6 py-4">
              <DialogPrimitive.Title className="text-sosoeat-gray-900 text-base font-semibold">
                {title}
              </DialogPrimitive.Title>
              <DialogPrimitive.Close
                className="text-sosoeat-gray-500 hover:text-sosoeat-gray-900 transition-colors"
                aria-label="닫기"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </DialogPrimitive.Close>
            </div>
          ) : (
            <DialogPrimitive.Title className="sr-only">{ariaLabel ?? '모달'}</DialogPrimitive.Title>
          )}
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
