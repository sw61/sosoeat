'use client';

import { cn } from '@/shared/lib/utils';
import { Skeleton } from '@/shared/ui/skeleton';

import { useIsMaxWidth767, useNotificationService } from '../../model';

import { NotificationDialog, NotificationPopover } from './components';

export const Notification = ({ triggerClassName = '' }: { triggerClassName?: string }) => {
  const { list, unreadCount, isLoading, isPending } = useNotificationService();
  const isNarrow = useIsMaxWidth767();

  return isPending ? (
    <Skeleton className={cn('size-8 rounded-full', triggerClassName)} aria-label="알림 로딩 중" />
  ) : isNarrow ? (
    <NotificationDialog triggerClassName={triggerClassName} list={list} unreadCount={unreadCount} />
  ) : (
    <NotificationPopover
      triggerClassName={triggerClassName}
      list={list}
      unreadCount={unreadCount}
    />
  );
};
