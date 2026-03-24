import { cn } from '@/lib/utils';

import type { NotificationTabProps } from './notification-tab.types';

const gradientDot = (
  <span
    className="inline-block size-1 shrink-0 rounded-full bg-gradient-to-r from-[#17DA71] to-[#08DDF0]"
    aria-hidden
  />
);

interface ReadCheckIconProps {
  className?: string;
}

const ReadCheckIcon = ({ className }: ReadCheckIconProps) => {
  return (
    <span
      className={cn(
        'inline-flex size-[18px] shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#17DA71] to-[#08DDF0]',
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

export const NotificationTab = ({
  variant = 'default',
  thumbnail,
  title,
  showReadBadge = false,
  metaRight,
  description,
}: NotificationTabProps) => {
  return (
    <div
      className={cn(
        'flex w-[314px] shrink-0 flex-row items-start gap-4 py-3 pr-7 pb-4 pl-5',
        variant === 'muted' ? 'bg-[#F6F7F9]' : 'bg-white'
      )}
    >
      <div className="shrink-0">{thumbnail}</div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex flex-row items-center justify-between gap-0.5">
          <div className="flex min-w-0 flex-row items-center gap-0.5">
            <span className="text-xs leading-4 font-semibold tracking-tight text-[#333333]">
              {title}
            </span>
            {showReadBadge ? <ReadCheckIcon /> : null}
          </div>
          <div className="flex shrink-0 flex-row items-center justify-center gap-1">
            {gradientDot}
            <span className="text-xs leading-4 font-normal text-[#BBBBBB]">{metaRight}</span>
          </div>
        </div>
        <p className="text-sm leading-5 font-normal tracking-tight text-[#737373]">{description}</p>
      </div>
    </div>
  );
};
