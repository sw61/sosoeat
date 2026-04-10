'use client';

import { Plus } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

interface MeetingMakeButtonProps {
  onClick: () => void;
}

const focusRingClass =
  'shadow-none focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-0';

export const MeetingMakeButton = ({ onClick }: MeetingMakeButtonProps) => (
  <Button
    type="button"
    variant="default"
    className={cn(
      'fixed right-[28px] bottom-[calc(23px+env(safe-area-inset-bottom))] z-50',
      'md:right-[22px] md:bottom-[22px] lg:right-[86px] lg:bottom-[56px]',
      'bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 active:bg-sosoeat-orange-700',
      'size-12 shrink-0 rounded-full border-0 p-0',
      'md:h-16 md:w-47 md:rounded-[24px] md:px-7 md:py-4',
      'flex items-center justify-center md:justify-start md:gap-1.5',
      '[&_svg]:text-white',
      focusRingClass
    )}
    aria-label="모임 만들기"
    onClick={onClick}
  >
    <Plus className="size-4 md:size-7" strokeWidth={2} aria-hidden />
    <span className="hidden text-xl leading-7.5 font-bold tracking-[-0.02em] text-white md:inline">
      모임 만들기
    </span>
  </Button>
);
