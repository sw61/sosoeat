import type { Notification } from '@/types/generated-client';

export interface NotificationDialogProps {
  triggerClassName?: string;
  list: Notification[];
  unreadCount?: number;
}
