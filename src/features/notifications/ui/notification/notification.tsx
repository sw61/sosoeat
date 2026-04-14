'use client';

import { useUnreadCount } from '../../model/notification.queries';

import { NotificationPanel } from './notification-panel/notification-panel';

interface NotificationProps {
  triggerClassName?: string;
  initialUnreadCount?: number;
}

export const Notification = ({
  triggerClassName = '',
  initialUnreadCount = 0,
}: NotificationProps) => {
  const { data: unreadCount = 0 } = useUnreadCount(initialUnreadCount);

  return <NotificationPanel triggerClassName={triggerClassName} unreadCount={unreadCount} />;
};
