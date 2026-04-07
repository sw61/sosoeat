'use client';

import { useIsMaxWidth767 } from '@/shared/lib/use-is-max-width-767';
import { cn } from '@/shared/lib/utils';
import { Skeleton } from '@/shared/ui/skeleton';

import { useNotificationService } from '../../model/use-notification-service';

import { NotificationDialog } from './notification-dialog/notification-dialog';
import { NotificationPopover } from './notification-popover/notification-popover';

export const Notification = ({ triggerClassName = '' }: { triggerClassName?: string }) => {
  const { list, unreadCount, isLoading, isPending } = useNotificationService();
  const isNarrow = useIsMaxWidth767();

  return isPending ? (
    <Skeleton className={cn('size-8 rounded-full', triggerClassName)} aria-label="알림 로딩 중" />
  ) : isNarrow && !isLoading ? (
    <NotificationDialog triggerClassName={triggerClassName} list={list} unreadCount={unreadCount} />
  ) : !isNarrow && !isLoading ? (
    <NotificationPopover
      triggerClassName={triggerClassName}
      list={list}
      unreadCount={unreadCount}
    />
  ) : null;
};
