import type { ReactNode } from 'react';

export interface NotificationPanelBodyProps {
  titleId: string;
  listScrollClassName: string;
  list: ReactNode;
  /** 0보다 크면 제목 옆 주황 뱃지 표시 */
  unreadCount?: number;
}
