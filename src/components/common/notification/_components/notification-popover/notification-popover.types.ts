import type { ReactNode } from 'react';

export interface NotificationPopoverProps {
  triggerClassName?: string;
  list: ReactNode;
  unreadCount?: number;
}
