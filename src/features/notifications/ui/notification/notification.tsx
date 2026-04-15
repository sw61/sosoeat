'use client';

import { useUnreadCount } from '../../model/notification.queries';

import { NotificationPanel } from './notification-panel/notification-panel';

interface NotificationProps {
  initialUnreadCount?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const Notification = ({ initialUnreadCount = 0, open, onOpenChange }: NotificationProps) => {
  const { data: unreadCount = 0 } = useUnreadCount(initialUnreadCount);

  return <NotificationPanel unreadCount={unreadCount} open={open} onOpenChange={onOpenChange} />;
};
