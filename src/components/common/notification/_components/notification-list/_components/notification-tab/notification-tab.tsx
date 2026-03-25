'use client';

import { type ReactNode, useEffect, useState } from 'react';

import { Calendar, ClipboardList, MessageCircle, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { notificationsApi } from '@/lib/api-client';
import { cn } from '@/lib/utils';
import type { Notification, NotificationTypeEnum } from '@/types/generated-client';

import { formatNotificationMetaRelativeTime } from './_components/format-notification-meta-time.utils';
import {
  NOTIFICATION_ICON_BOX_CLASS,
  NOTIFICATION_ROW_BUTTON_CLASS,
} from './notification-tab.constants';
import { getNotificationDescription, notificationTitleForType } from './notification-tab.utils';

const metaDot = (
  <span className="inline-block size-1 shrink-0 rounded-full bg-[#FF6600]" aria-hidden />
);

interface ReadCheckIconProps {
  className?: string;
}

const ReadCheckIcon = ({ className }: ReadCheckIconProps) => {
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

const UserIcon = () => (
  <div className={cn(NOTIFICATION_ICON_BOX_CLASS, 'bg-[#FF6F0F]')} aria-hidden>
    <Users className="size-[22px]" strokeWidth={2.5} aria-hidden />
  </div>
);

const MeetingIcon = () => (
  <div className={cn(NOTIFICATION_ICON_BOX_CLASS, 'bg-[#F5A623]')} aria-hidden>
    <Calendar className="size-[22px]" strokeWidth={1.1} aria-hidden />
  </div>
);

const CommentIcon = () => (
  <div className={cn(NOTIFICATION_ICON_BOX_CLASS, 'bg-[#00B493]')} aria-hidden>
    <MessageCircle className="size-[13px]" strokeWidth={1.1} aria-hidden />
  </div>
);

const ApprovedIcon = () => (
  <div className={cn(NOTIFICATION_ICON_BOX_CLASS, 'bg-[#F5A623]')} aria-hidden>
    <ClipboardList className="size-[22px]" strokeWidth={1.1} aria-hidden />
  </div>
);

interface NotificationTabBodyProps {
  thumbnail: ReactNode;
  title: string;
  isMeetingConfirmed: boolean;
  metaRight: string;
  description: string;
  highlighted: boolean;
}

const NotificationTabBody = ({
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

const thumbnailForType = (type: NotificationTypeEnum): ReactNode => {
  switch (type) {
    case 'MEETING_CONFIRMED':
      return <UserIcon />;
    case 'MEETING_CANCELED':
      return <MeetingIcon />;
    case 'COMMENT':
      return <CommentIcon />;
    default:
      return <ApprovedIcon />;
  }
};

export const NotificationTab = (props: Notification) => {
  const [description, setDescription] = useState('');

  useEffect(() => {
    let cancelled = false;
    void getNotificationDescription(props.type, props.data, props.teamId, props.message).then(
      (text) => {
        if (!cancelled) setDescription(text);
      }
    );
    return () => {
      cancelled = true;
    };
  }, [props.id, props.type, props.teamId, props.data, props.message]);

  const metaRight = formatNotificationMetaRelativeTime(props.createdAt);
  const highlighted = !props.isRead;
  const isMeetingConfirmed = props.type === 'MEETING_CONFIRMED';

  return (
    <Button
      type="button"
      variant="ghost"
      className={NOTIFICATION_ROW_BUTTON_CLASS}
      onClick={() => {
        void notificationsApi.teamIdNotificationsNotificationIdReadPut({
          teamId: props.teamId,
          notificationId: props.id,
        });
      }}
    >
      <NotificationTabBody
        thumbnail={thumbnailForType(props.type)}
        title={notificationTitleForType(props.type)}
        isMeetingConfirmed={isMeetingConfirmed}
        metaRight={metaRight}
        description={description}
        highlighted={highlighted}
      />
    </Button>
  );
};
