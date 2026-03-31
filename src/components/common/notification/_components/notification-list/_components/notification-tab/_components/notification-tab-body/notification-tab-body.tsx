import { cn } from '@/lib/utils';

import { metaDot } from '../icons/meta-dot/meta-dot';
import { ReadCheckIcon } from '../icons/read-check-icon';

import { NotificationTabBodyProps } from './notification-tab-body.types';

export const NotificationTabBody = ({
  thumbnail,
  title,
  isMeetingConfirmed,
  metaRight,
  description,
  highlighted,
}: NotificationTabBodyProps) => {
  return (
    <div
      className={cn(
        'flex min-h-[90px] w-[314px] shrink-0 flex-row items-start gap-4 pt-3 pr-7 pb-4 pl-5',
        highlighted ? 'bg-[#FFF2EC]' : 'bg-white'
      )}
    >
      <div className="shrink-0">{thumbnail}</div>
      <div className="flex w-52 min-w-0 shrink-0 flex-col items-stretch gap-1 self-stretch">
        <div className="flex min-h-4.5 shrink-0 flex-row items-center justify-between gap-0.5 self-stretch">
          <div className="flex min-w-0 flex-row items-center gap-0.5">
            <span className="text-xs leading-4 font-semibold text-[#333333]">{title}</span>
            {isMeetingConfirmed ? <ReadCheckIcon /> : null}
          </div>
          <div className="flex shrink-0 flex-row items-center justify-center gap-1">
            {metaDot}
            <span className="text-xs leading-4 font-normal text-[#BBBBBB]">{metaRight}</span>
          </div>
        </div>
        <p className="min-h-0 w-full self-stretch text-sm leading-5 font-normal tracking-[-0.02em] text-[#737373]">
          {description}
        </p>
      </div>
    </div>
  );
};
