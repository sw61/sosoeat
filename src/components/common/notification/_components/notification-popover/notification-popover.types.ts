import type { Notification } from '@/types/generated-client';

export interface NotificationPopoverProps {
  triggerClassName?: string;
  list: Notification[];
  unreadCount?: number;
}
