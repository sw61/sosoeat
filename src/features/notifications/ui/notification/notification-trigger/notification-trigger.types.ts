import type { ComponentPropsWithoutRef } from 'react';

export type NotificationTriggerProps = ComponentPropsWithoutRef<'button'> & {
  unreadCount?: number;
};
