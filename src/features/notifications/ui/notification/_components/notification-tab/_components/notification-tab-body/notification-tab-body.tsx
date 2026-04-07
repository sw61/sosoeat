import { cn } from '@/shared/lib/utils';

import { metaDot } from '../icons/meta-dot/meta-dot';
import { ReadCheckIcon } from '../icons/read-check-icon';

import {
  NOTIFICATION_TAB_BODY_CLASS,
  NOTIFICATION_TAB_BODY_CONTENT_CLASS,
  NOTIFICATION_TAB_BODY_DESCRIPTION_CLASS,
  NOTIFICATION_TAB_BODY_META_ROW_CLASS,
} from './notification-tab-body.constants';
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
    <div className={cn(NOTIFICATION_TAB_BODY_CLASS, highlighted ? 'bg-[#FFF2EC]' : 'bg-white')}>
      <div className="shrink-0">{thumbnail}</div>
      <div className={NOTIFICATION_TAB_BODY_CONTENT_CLASS}>
        <div className={NOTIFICATION_TAB_BODY_META_ROW_CLASS}>
          <div className="flex min-w-0 flex-row items-center gap-0.5">
            <span className="text-xs leading-4 font-semibold text-[#333333]">{title}</span>
            {isMeetingConfirmed ? <ReadCheckIcon /> : null}
          </div>
          <div className="flex shrink-0 flex-row items-center justify-center gap-1">
            {metaDot}
            <span className="text-xs leading-4 font-normal text-[#BBBBBB]">{metaRight}</span>
          </div>
        </div>
        <p className={NOTIFICATION_TAB_BODY_DESCRIPTION_CLASS}>{description}</p>
      </div>
    </div>
  );
};
