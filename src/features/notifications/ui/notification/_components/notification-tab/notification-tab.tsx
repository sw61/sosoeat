'use client';

import type { Notification } from '@/shared/types/generated-client';
import { Button } from '@/shared/ui/button';

import { notificationRepository } from '../../../../api';
import {
  formatNotificationMetaRelativeTime,
  getNotificationDescription,
  notificationTitleForType,
  thumbnailForType,
} from '../../../../model';

import { NotificationTabBody } from './_components/notification-tab-body/notification-tab-body';
import { NOTIFICATION_ROW_BUTTON_CLASS } from './notification-tab.constants';

export const NotificationTab = (props: Notification) => {
  const description = getNotificationDescription(props);
  const metaRight = formatNotificationMetaRelativeTime(props.createdAt);
  const highlighted = !props.isRead;
  const isMeetingConfirmed = props.type === 'MEETING_CONFIRMED';
  return (
    <Button
      type="button"
      variant="ghost"
      className={NOTIFICATION_ROW_BUTTON_CLASS}
      onClick={() => {
        void notificationRepository.readNotification({
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
