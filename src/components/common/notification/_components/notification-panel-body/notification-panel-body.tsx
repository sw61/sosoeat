'use client';

import type { NotificationPanelBodyProps } from './notification-panel-body.types';

export const NotificationPanelBody = ({
  titleId,
  listScrollClassName,
  list,
}: NotificationPanelBodyProps) => {
  return (
    <div className="flex h-full min-h-0 flex-col pt-6 pb-4">
      <div className="m-0 flex flex-row items-center space-y-0 p-0">
        <div className="flex h-6 w-full items-center justify-between px-6">
          <h2
            id={titleId}
            className="m-0 p-0 text-base leading-6 font-semibold tracking-tight text-[#111827]"
          >
            알림 내역
          </h2>
          <button
            type="button"
            className="text-xs leading-4 font-semibold text-[#BBBBBB] transition-opacity hover:opacity-80"
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
