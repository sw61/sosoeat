import type { NotificationList } from '@/types/generated-client';

export type NotificationProps = NotificationList & {
  triggerClassName?: string;
};
