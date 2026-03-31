import type { Notification } from '@/types/generated-client';

export interface NotificationPanelBodyProps {
  titleId: string;
  listScrollClassName: string;
  list: Notification[];
  /** 0보다 크면 제목 옆 주황 뱃지 표시 */
  unreadCount?: number;
}
