'use client';

import { useEffect, useState } from 'react';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { MeetingMakeButtonProps } from './meeting-make-button.types';

/** 피그마 Create button — #FF6600 = sosoeat-orange-600 */
const focusRingClass =
  'shadow-none focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-0';

const fixedMobile = 'fixed right-[28px] bottom-[23px] z-50';
const fixedDesktop = 'fixed right-[22px] bottom-[22px] z-50 lg:right-[86px] lg:bottom-[56px]';

export const MeetingMakeButton = ({
  className,
  onClick,
  label = '모임 만들기',
  mobileAriaLabel = '모임 만들기',
}: MeetingMakeButtonProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isMobile) {
    return (
      <Button
        type="button"
        variant="default"
        className={cn(
          'bg-sosoeat-orange-600 size-16 shrink-0 rounded-[24px] border-0 p-0',
          'hover:bg-sosoeat-orange-600/90 active:bg-sosoeat-orange-700',
          'flex items-center justify-center [&_svg]:text-white',
          focusRingClass,
          fixedMobile,
          className
        )}
        aria-label={mobileAriaLabel}
        onClick={onClick}
      >
        <Plus className="size-4 text-white" strokeWidth={2} aria-hidden />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="default"
      className={cn(
        'box-border h-16 w-[188px] shrink-0 rounded-[24px] border-0',
        'bg-sosoeat-orange-600 hover:bg-sosoeat-orange-600/90 active:bg-sosoeat-orange-700 px-7 py-4',
        'flex flex-row items-center justify-center gap-0',
        'text-white [&_svg]:text-white',
        focusRingClass,
        fixedDesktop,
        className
      )}
      onClick={onClick}
    >
      <span className="flex h-8 w-[132px] flex-row items-center gap-1.5 pr-1">
        <span className="flex size-8 shrink-0 items-center justify-center" aria-hidden>
          <Plus className="size-4 text-white" strokeWidth={2} />
        </span>
        <span className="w-[90px] shrink-0 text-center text-xl leading-[30px] font-bold tracking-[-0.02em] text-white">
          {label}
          {/* 차후 모임 만들기 모달 뜨도록 */}
        </span>
      </span>
    </Button>
  );
};
