const MINUTE_MS = 60_000;
const HOUR_MS = 3_600_000;
const DAY_MS = 86_400_000;

export const formatNotificationMetaRelativeTime = (
  createdAt: Date,
  now: Date = new Date()
): string => {
  if (!createdAt || isNaN(createdAt.getTime())) {
    throw new Error('유효한 Date 객체를 입력해야 합니다.');
  }
  if (createdAt > now) {
    return '방금 전';
  }
  const ms = now.getTime() - createdAt.getTime();
  if (ms < MINUTE_MS) return '방금 전';

  const minutes = Math.floor(ms / MINUTE_MS);
  if (minutes < 60) return `${minutes}분 전`;

  const hours = Math.floor(ms / HOUR_MS);
  if (hours < 24) return `${hours}시간 전`;

  const days = Math.floor(ms / DAY_MS);
  return `${days}일 전`;
};
