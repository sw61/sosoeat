'use client';

import { useEffect, useState } from 'react';

import { notificationRepository } from '@/components/common/notification/repository';
import { Button } from '@/components/ui/button';
import type { Notification } from '@/types/generated-client';

import {
  formatNotificationMetaRelativeTime,
  getNotificationDescription,
  notificationTitleForType,
  thumbnailForType,
} from '../../../../services';

import { NotificationTabBody } from './_components/notification-tab-body/notification-tab-body';
import { NOTIFICATION_ROW_BUTTON_CLASS } from './notification-tab.constants';

export const NotificationTab = (props: Notification) => {
  const [description, setDescription] = useState('');

  useEffect(() => {
    let cancelled = false;
    void getNotificationDescription(props).then((text) => {
      if (!cancelled) setDescription(text);
    });
    return () => {
      cancelled = true;
    };
  }, [props.id, props.type, props.message]);

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
