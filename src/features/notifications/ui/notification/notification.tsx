'use client';

import { useIsMaxWidth767 } from '@/shared/lib/use-is-max-width-767';
import { cn } from '@/shared/lib/utils';
import { Skeleton } from '@/shared/ui/skeleton';

import {
  useNotificationInfiniteListRead,
  useNotificationService,
} from '../../model/use-notification-service';

import { NotificationDialog } from './notification-dialog/notification-dialog';
import { NotificationPopover } from './notification-popover/notification-popover';

export const Notification = ({ triggerClassName = '' }: { triggerClassName?: string }) => {
  const { isLoading, isPending } = useNotificationInfiniteListRead();
  const isNarrow = useIsMaxWidth767();
  const { unreadCount } = useNotificationService();
  return isPending ? (
    <Skeleton className={cn('size-8 rounded-full', triggerClassName)} aria-label="알림 로딩 중" />
  ) : isNarrow && !isLoading ? (
    <NotificationDialog triggerClassName={triggerClassName} unreadCount={unreadCount} />
  ) : !isNarrow && !isLoading ? (
    <NotificationPopover triggerClassName={triggerClassName} unreadCount={unreadCount} />
  ) : null;
};
