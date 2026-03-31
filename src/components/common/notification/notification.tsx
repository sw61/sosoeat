'use client';

import { useNotificationService } from './services/notification.service';
import { NotificationDialog, NotificationPopover } from './components';

export const Notification = ({ triggerClassName = '' }: { triggerClassName?: string }) => {
  const { isNarrow, list, unreadCount } = useNotificationService();

  if (isNarrow) {
    return (
      <NotificationDialog
        triggerClassName={triggerClassName}
        list={list}
        unreadCount={unreadCount}
      />
    );
  }

  return (
    <NotificationPopover
      triggerClassName={triggerClassName}
      list={list}
      unreadCount={unreadCount}
    />
  );
};
