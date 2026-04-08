'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import type { Notification } from '@/shared/types/generated-client';
import { CountingBadge } from '@/shared/ui/counting-badge/counting-badge';

import { useNotificationReadActions } from '../../../model/use-notification-read-actions';
import { useNotificationInfiniteListRead } from '../../../model/use-notification-service';
import { NotificationTab } from '../notification-tab/notification-tab';

import type { NotificationPanelBodyProps } from './notification-panel-body.types';

export const NotificationPanelBody = ({
  titleId,
  listScrollClassName,
  unreadCount,
}: NotificationPanelBodyProps) => {
  const { isLoading, isPending, fetchNextPage, hasNextPage, isFetchingNextPage, error, list } =
    useNotificationInfiniteListRead({ size: 5 });

  const showBadge = unreadCount != null && unreadCount > 0;
  const { markAllAsRead } = useNotificationReadActions();
  const [root, setsRoot] = useState<HTMLDivElement | null>(null);

  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: '100px',
    root,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex h-full min-h-0 flex-col pt-6 pb-4">
      <div className="m-0 flex flex-row items-center space-y-0 p-0">
        <div className="flex h-6 w-full items-center justify-between px-6">
          <div className="relative flex min-w-0 items-center">
            <h2
              id={titleId}
              className="m-0 p-0 pr-7 text-base leading-6 font-semibold tracking-[-0.02em] text-[#111827]"
            >
              알림 내역
            </h2>
            {showBadge ? (
              <span className="pointer-events-none absolute top-1/2 right-0 z-10 -translate-y-1/2">
                <CountingBadge count={unreadCount} />
              </span>
            ) : null}
          </div>
          <button
            type="button"
            className="shrink-0 text-xs leading-4 font-semibold text-[#FF6600] transition-opacity hover:opacity-80"
            onClick={() => {
              void markAllAsRead();
            }}
          >
            모두 읽기
          </button>
        </div>
      </div>

      <div className="mt-6 flex min-h-0 flex-1 flex-col">
        <div className={listScrollClassName} ref={setsRoot}>
          {list.map((notification: Notification) => (
            <NotificationTab key={notification.id} {...notification} />
          ))}
          <div ref={ref} className="flex h-1 items-center justify-center" />
          {!hasNextPage && list.length > 0 ? (
            <div className="flex h-12 items-center justify-center text-sm text-gray-500">
              모든 알림을 불러왔어요
            </div>
          ) : isLoading || isPending ? (
            <div className="flex h-12 items-center justify-center">
              <span className="loader" />
            </div>
          ) : error ? (
            <div className="flex h-12 items-center justify-center text-sm text-red-500">
              알림을 불러오는 중 오류가 발생했습니다.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
