'use client';

import { X } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import type { Notification } from '@/shared/types/generated-client';

import { getNotificationViewModel } from '../../../lib/notification-view.utils';
import { useNotificationReadActions } from '../../../model/use-notification-read-actions';

import { metaDot, ReadCheckIcon } from './notification-item.icons';
import { NotificationItemThumbnail } from './notification-item.thumbnail';

export const NotificationItem = (props: Notification) => {
  const { description, title, highlighted, isMeetingConfirmed, metaRight, thumbnailKey, image } =
    getNotificationViewModel(props);
  const { markAsRead, deleteNotification } = useNotificationReadActions(props.id);

  return (
    <div className="relative h-auto w-full shrink-0">
      <button
        type="button"
        aria-label={`${title} 알림 읽음 처리`}
        className="absolute inset-0 cursor-pointer"
        onClick={markAsRead}
      />
      <div
        className={cn(
          'flex min-h-[90px] w-[314px] shrink-0 flex-row items-start gap-4 pt-3 pr-3 pb-4 pl-5',
          highlighted ? 'bg-sosoeat-orange-100' : 'bg-white'
        )}
      >
        <div className="shrink-0">
          <NotificationItemThumbnail thumbnailKey={thumbnailKey} image={image} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-stretch gap-1 self-stretch">
          <div className="flex min-h-4.5 shrink-0 flex-row items-center justify-between gap-0.5 self-stretch">
            <div className="flex min-w-0 flex-row items-center gap-0.5">
              <span className="text-sosoeat-gray-900 text-xs font-semibold">{title}</span>
              {isMeetingConfirmed ? <ReadCheckIcon /> : null}
            </div>
            <div className="relative z-10 flex shrink-0 flex-row items-center justify-center gap-1">
              {highlighted ? metaDot : null}
              <span className="text-sosoeat-gray-700 text-xs font-normal" suppressHydrationWarning>
                {metaRight}
              </span>
              <button
                type="button"
                aria-label="알림 삭제"
                className="text-sosoeat-gray-400 hover:text-sosoeat-gray-900 relative z-10 flex size-4 cursor-pointer items-center justify-center transition-colors"
                onClick={deleteNotification}
              >
                <X className="size-3.5" strokeWidth={2} />
              </button>
            </div>
          </div>
          <p className="min-h-0 w-full self-stretch text-sm font-normal tracking-[-0.02em] text-[#737373]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
