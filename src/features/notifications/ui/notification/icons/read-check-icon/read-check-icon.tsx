import { cn } from '@/shared/lib/utils';

import type { ReadCheckIconProps } from '../../notification-tab/notification-tab.types';

export const ReadCheckIcon = ({ className }: ReadCheckIconProps) => {
  return (
    <span
      className={cn(
        'inline-flex size-[18px] shrink-0 items-center justify-center rounded-full bg-[#FF6600]',
        className
      )}
      aria-hidden
    >
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
        <path
          d="M1 4L3.5 6.5L9 1"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};
