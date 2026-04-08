import { TeamIdNotificationsGetRequest } from '@/shared/types/generated-client';

import {
  useNotificationInfiniteList,
  useNotificationList,
  useUnreadCount,
} from './notification.queries';

export const useNotificationService = () => {
  const { isLoading, error, data: notifications, isPending } = useNotificationList();
  const { data: unreadCountData } = useUnreadCount();

  const list = Array.isArray(notifications) ? notifications : [];

  return {
    unreadCount: unreadCountData ?? 0,
    list,
    isLoading,
    isPending,
    error,
  };
};

export const useNotificationInfiniteListRead = (
  options?: Omit<TeamIdNotificationsGetRequest, 'teamId'>
) => {
  const { data, isLoading, error, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useNotificationInfiniteList({ size: options?.size ?? 5 });
  const list = data?.pages.flatMap((page) => page.data) ?? [];

  return {
    list,
    isLoading,
    error,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export const useUnreadCountRead = () => {
  const { data, isLoading, error } = useUnreadCount();

  return {
    unreadCount: data ?? 0,
    isLoading,
    error,
  };
};
