'use client';

import { CountingBadge } from '@/components/common/counting-badge';
import type { Notification } from '@/types/generated-client';

import { NotificationTab } from '../notification-list/_components/notification-tab';

import {
  NOTIFICATION_PANEL_BODY_CLASS,
  NOTIFICATION_PANEL_HEADER_CLASS,
  NOTIFICATION_PANEL_HEADER_INNER_CLASS,
  NOTIFICATION_PANEL_LIST_WRAPPER_CLASS,
  NOTIFICATION_PANEL_READ_ALL_BUTTON_CLASS,
  NOTIFICATION_PANEL_TITLE_CLASS,
  NOTIFICATION_PANEL_TITLE_ROW_CLASS,
} from './notification-panel-body.constants';
import type { NotificationPanelBodyProps } from './notification-panel-body.types';

export const NotificationPanelBody = ({
  titleId,
  listScrollClassName,
  list,
  unreadCount,
}: NotificationPanelBodyProps) => {
  const showBadge = unreadCount != null && unreadCount > 0;

  return (
    <div className={NOTIFICATION_PANEL_BODY_CLASS}>
      <div className={NOTIFICATION_PANEL_HEADER_CLASS}>
        <div className={NOTIFICATION_PANEL_HEADER_INNER_CLASS}>
          <div className={NOTIFICATION_PANEL_TITLE_ROW_CLASS}>
            <h2 id={titleId} className={NOTIFICATION_PANEL_TITLE_CLASS}>
              알림 내역
            </h2>
            {showBadge ? <CountingBadge count={unreadCount} /> : null}
          </div>
          <button type="button" className={NOTIFICATION_PANEL_READ_ALL_BUTTON_CLASS}>
            모두 읽기
          </button>
        </div>
      </div>

      <div className={NOTIFICATION_PANEL_LIST_WRAPPER_CLASS}>
        <div className={listScrollClassName}>
          {list.map((notification: Notification) => (
            <NotificationTab key={notification.id} {...notification} />
          ))}
        </div>
      </div>
    </div>
  );
};
