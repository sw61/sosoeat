import { DAY_MS, HOUR_MS, MINUTE_MS } from './format-notification-meta-time.constants';

/** 알림 탭 우측 메타: 경과 시간(분·시간·일) */
export const formatNotificationMetaRelativeTime = (
  createdAt: Date,
  now: Date = new Date()
): string => {
  const ms = now.getTime() - createdAt.getTime();
  if (ms < MINUTE_MS) return '방금 전';

  const minutes = Math.floor(ms / MINUTE_MS);
  if (minutes < 60) return `${minutes}분 전`;

  const hours = Math.floor(ms / HOUR_MS);
  if (hours < 24) return `${hours}시간 전`;

  const days = Math.floor(ms / DAY_MS);
  return `${days}일 전`;
};
