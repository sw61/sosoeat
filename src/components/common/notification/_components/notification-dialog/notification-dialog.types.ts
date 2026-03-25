import type { ReactNode } from 'react';

export interface NotificationDialogProps {
  triggerClassName?: string;
  list: ReactNode;
  unreadCount?: number;
}
