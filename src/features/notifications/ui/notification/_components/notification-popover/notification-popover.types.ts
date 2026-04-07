import type { Notification } from '@/shared/types/generated-client';

export interface NotificationPopoverProps {
  triggerClassName?: string;
  list: Notification[];
  unreadCount?: number;
}
