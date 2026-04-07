'use client';

import type { Notification } from '@/shared/types/generated-client';
import { Button } from '@/shared/ui/button';

import { getNotificationViewModel, useNotificationReadActions } from '../../../../model';

import { NotificationTabBody } from './_components/notification-tab-body/notification-tab-body';
import { NOTIFICATION_ROW_BUTTON_CLASS } from './notification-tab.constants';
import { getNotificationThumbnail } from './notification-thumbnail';

export const NotificationTab = (props: Notification) => {
  const { description, highlighted, isMeetingConfirmed, metaRight, thumbnailKey, title } =
    getNotificationViewModel(props);
  const { markAsRead } = useNotificationReadActions(props.id);

  return (
    <Button
      type="button"
      variant="ghost"
      className={NOTIFICATION_ROW_BUTTON_CLASS}
      onClick={() => {
        void markAsRead();
      }}
    >
      <NotificationTabBody
        thumbnail={getNotificationThumbnail(thumbnailKey)}
        title={title}
        isMeetingConfirmed={isMeetingConfirmed}
        metaRight={metaRight}
        description={description}
        highlighted={highlighted}
      />
    </Button>
  );
};
