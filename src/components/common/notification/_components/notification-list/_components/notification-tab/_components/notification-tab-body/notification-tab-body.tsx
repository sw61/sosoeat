import { cn } from '@/lib/utils';

import { metaDot } from '../icons/meta-dot/meta-dot';
import { ReadCheckIcon } from '../icons/read-check-icon';

import {
  NOTIFICATION_TAB_BODY_CLASS,
  NOTIFICATION_TAB_BODY_CONTENT_CLASS,
  NOTIFICATION_TAB_BODY_DESCRIPTION_CLASS,
  NOTIFICATION_TAB_BODY_META_RIGHT_CLASS,
  NOTIFICATION_TAB_BODY_META_ROW_CLASS,
  NOTIFICATION_TAB_BODY_META_TEXT_CLASS,
  NOTIFICATION_TAB_BODY_TITLE_CLASS,
  NOTIFICATION_TAB_BODY_TITLE_ROW_CLASS,
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
          <div className={NOTIFICATION_TAB_BODY_TITLE_ROW_CLASS}>
            <span className={NOTIFICATION_TAB_BODY_TITLE_CLASS}>{title}</span>
            {isMeetingConfirmed ? <ReadCheckIcon /> : null}
          </div>
          <div className={NOTIFICATION_TAB_BODY_META_RIGHT_CLASS}>
            {metaDot}
            <span className={NOTIFICATION_TAB_BODY_META_TEXT_CLASS}>{metaRight}</span>
          </div>
        </div>
        <p className={NOTIFICATION_TAB_BODY_DESCRIPTION_CLASS}>{description}</p>
      </div>
    </div>
  );
};
