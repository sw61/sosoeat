import type { NotificationList } from '@/shared/types/generated-client';

export type NotificationProps = NotificationList & {
  triggerClassName?: string;
};
