import type { ReactNode } from 'react';

import type { NotificationList } from '@/types/generated-client';

export type NotificationProps = NotificationList & {
  triggerClassName?: string;
  unreadCount?: number;
  list?: ReactNode;
};
