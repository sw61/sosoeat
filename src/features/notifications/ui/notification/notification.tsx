'use client';

import { useIsMaxWidth767, useNotificationService } from '@/features/notifications/model';

import { NotificationDialog, NotificationPopover } from './components';

export const Notification = ({ triggerClassName = '' }: { triggerClassName?: string }) => {
  const { list, unreadCount, isLoading } = useNotificationService();
  const isNarrow = useIsMaxWidth767();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log('Notification list:', list);

  return isNarrow ? (
    <NotificationDialog triggerClassName={triggerClassName} list={list} unreadCount={unreadCount} />
  ) : (
    <NotificationPopover
      triggerClassName={triggerClassName}
      list={list}
      unreadCount={unreadCount}
    />
  );
};
