'use client';

import { CountingBadge } from '@/components/common/counting-badge';

import type { NotificationPanelBodyProps } from './notification-panel-body.types';

export const NotificationPanelBody = ({
  titleId,
  listScrollClassName,
  list,
  unreadCount,
}: NotificationPanelBodyProps) => {
  const showBadge = unreadCount != null && unreadCount > 0;
  const badgeLabel = unreadCount != null && unreadCount > 99 ? '99+' : String(unreadCount ?? '');

  return (
    <div className="flex h-full min-h-0 flex-col pt-6 pb-4">
      <div className="m-0 flex flex-row items-center space-y-0 p-0">
        <div className="flex h-6 w-full items-center justify-between px-6">
          <div className="flex min-w-0 items-center gap-2">
            <h2
              id={titleId}
              className="m-0 p-0 text-base leading-6 font-semibold tracking-[-0.02em] text-[#111827]"
            >
              알림 내역
            </h2>
            {showBadge ? <CountingBadge count={unreadCount} /> : null}
          </div>
          <button
            type="button"
            className="shrink-0 text-xs leading-4 font-semibold text-[#FF6600] transition-opacity hover:opacity-80"
          >
            모두 읽기
          </button>
        </div>
      </div>

      <div className="mt-6 flex min-h-0 flex-1 flex-col">
        <div className={listScrollClassName}>{list}</div>
      </div>
    </div>
  );
};
