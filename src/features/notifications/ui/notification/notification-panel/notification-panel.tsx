'use client';

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { Dialog as DialogPrimitive } from 'radix-ui';

import { cn } from '@/shared/lib/utils';
import type { Notification } from '@/shared/types/generated-client';
import { CountingBadge } from '@/shared/ui/counting-badge/counting-badge';

import { getNotificationListServer } from '../../../api/notifications.server';
import {
  filterNotificationsByTab,
  NOTIFICATION_TABS,
  type NotificationTab,
} from '../../../lib/notification-view.utils';
import { notificationKeys, useNotificationInfiniteList } from '../../../model/notification.queries';
import { useNotificationReadActions } from '../../../model/use-notification-read-actions';
import { NotificationItem } from '../notification-item/notification-item';
import { NotificationTrigger } from '../notification-trigger/notification-trigger';

const PAGE_SIZE = 5;

const PANEL_CONTENT_CLASS = [
  // 공통
  'fixed z-50 flex flex-col gap-0 overflow-hidden bg-white p-0 shadow-[0px_4px_16px_rgba(0,0,0,0.04)]',
  // 모바일: 오른쪽 full-height sheet
  'top-0 right-0 h-dvh w-[314px] rounded-l-[24px] rounded-r-none',
  // 데스크탑: 우상단 고정 드롭다운 패널 (탭 40px 추가로 488px)
  'md:top-16 md:h-[488px] md:rounded-[24px] md:border',
].join(' ');

const SCROLL_CLASS = [
  'overflow-x-hidden overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#cccccc_transparent]',
  // 모바일: flex-1로 남은 공간 채움
  'min-h-0 flex-1',
  // 데스크탑: 고정 높이
  'md:h-[360px] md:flex-none',
].join(' ');

interface NotificationPanelContentProps {
  titleId: string;
  unreadCount?: number;
  onClose: () => void;
}

const NotificationPanelContent = ({
  titleId,
  unreadCount,
  onClose,
}: NotificationPanelContentProps) => {
  const { isPending, fetchNextPage, hasNextPage, isFetchingNextPage, error, data } =
    useNotificationInfiniteList({ size: PAGE_SIZE });
  const allList = data?.pages.flatMap((page) => page.data) ?? [];

  const [activeTab, setActiveTab] = useState<NotificationTab>('all');
  const list = filterNotificationsByTab(allList, activeTab);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeIndex = NOTIFICATION_TABS.findIndex((t) => t.key === activeTab);
    const el = tabRefs.current[activeIndex];
    if (!el) return;
    const span = el.querySelector('span');
    if (!span) return;
    const btnRect = el.getBoundingClientRect();
    const spanRect = span.getBoundingClientRect();
    setIndicatorStyle({
      left: el.offsetLeft + (spanRect.left - btnRect.left),
      width: spanRect.width,
    });
  }, [activeTab]);

  const showBadge = unreadCount != null && unreadCount > 0;
  const { markAllAsRead, deleteAllNotifications } = useNotificationReadActions();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [root, setRoot] = useState<HTMLDivElement | null>(null);

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
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className={cn(
                'text-xs leading-4 font-semibold transition-colors',
                showBadge
                  ? 'text-[#FF6600] hover:opacity-80'
                  : 'text-sosoeat-gray-500 cursor-default'
              )}
              onClick={() => {
                if (showBadge) void markAllAsRead();
              }}
            >
              모두 읽기
            </button>
            <button
              type="button"
              aria-label="알림 닫기"
              className="text-sosoeat-gray-500 hover:text-sosoeat-gray-900 flex size-5 cursor-pointer items-center justify-center transition-colors"
              onClick={onClose}
            >
              <X className="size-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex shrink-0 flex-row items-end justify-between border-b border-gray-100 px-4">
        <div className="relative flex flex-row gap-1">
          {NOTIFICATION_TABS.map(({ key, label }, index) => (
            <button
              key={key}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              className={cn(
                'cursor-pointer px-2 pb-3 text-sm font-semibold transition-colors',
                activeTab === key
                  ? 'text-sosoeat-orange-600'
                  : 'text-sosoeat-gray-500 hover:text-sosoeat-gray-900'
              )}
              onClick={() => {
                setActiveTab(key);
                setConfirmDelete(false);
              }}
            >
              <span>{label}</span>
            </button>
          ))}
          <span
            className="bg-sosoeat-orange-600 absolute bottom-0 h-0.5 transition-all duration-200 ease-out"
            style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
          />
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {confirmDelete ? (
            <>
              <button
                type="button"
                className="text-sosoeat-gray-500 hover:text-sosoeat-gray-900 cursor-pointer px-2 pb-3 text-sm font-semibold transition-colors"
                onClick={() => setConfirmDelete(false)}
              >
                취소
              </button>
              <span className="text-sosoeat-gray-300 pb-3 text-xs">|</span>
              <button
                type="button"
                className="text-destructive cursor-pointer px-2 pb-3 text-sm font-semibold transition-colors hover:opacity-80"
                onClick={() => {
                  deleteAllNotifications();
                  setConfirmDelete(false);
                }}
              >
                삭제
              </button>
            </>
          ) : (
            <button
              type="button"
              className="text-sosoeat-gray-500 hover:text-destructive cursor-pointer px-2 pb-3 text-sm font-semibold transition-colors"
              onClick={() => setConfirmDelete(true)}
            >
              전체 삭제
            </button>
          )}
        </div>
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col">
        <div className={SCROLL_CLASS} ref={setRoot}>
          {list.map((notification: Notification) => (
            <NotificationItem key={notification.id} {...notification} />
          ))}
          <div ref={ref} className="flex h-1 items-center justify-center" />
          {list.length === 0 && !isPending && !error ? (
            <div className="flex h-24 items-center justify-center text-sm text-gray-400">
              알림이 없어요
            </div>
          ) : !hasNextPage && list.length > 0 ? (
            <div className="flex h-12 items-center justify-center text-sm text-gray-500">
              모든 알림을 불러왔어요
            </div>
          ) : isPending ? (
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

interface NotificationPanelProps {
  triggerClassName?: string;
  unreadCount?: number;
}

export const NotificationPanel = ({ triggerClassName, unreadCount }: NotificationPanelProps) => {
  const titleId = React.useId();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleOpen = async (nextOpen: boolean) => {
    if (nextOpen) {
      const queryKey = notificationKeys.list({ size: PAGE_SIZE });
      const existing = queryClient.getQueryData(queryKey);
      if (!existing) {
        const firstPage = await getNotificationListServer({ size: PAGE_SIZE });
        queryClient.setQueryData(queryKey, {
          pages: [firstPage],
          pageParams: [undefined],
        });
      }
    }
    setOpen(nextOpen);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpen} modal={false}>
      <DialogPrimitive.Trigger asChild>
        <NotificationTrigger className={triggerClassName} unreadCount={unreadCount ?? 0} />
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={cn(PANEL_CONTENT_CLASS)}
          onInteractOutside={() => setOpen(false)}
        >
          <DialogPrimitive.Title className="sr-only">알림</DialogPrimitive.Title>
          <NotificationPanelContent
            titleId={titleId}
            unreadCount={unreadCount}
            onClose={() => setOpen(false)}
          />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
