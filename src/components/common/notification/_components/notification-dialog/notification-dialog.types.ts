import type { Notification } from '@/shared/types/generated-client';

export interface NotificationDialogProps {
  triggerClassName?: string;
  list: Notification[];
  unreadCount?: number;
}
