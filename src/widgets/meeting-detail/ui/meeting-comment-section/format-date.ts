function pad(value: number) {
  return String(value).padStart(2, '0');
}

const SEOUL_TIME_ZONE = 'Asia/Seoul';

export function formatCommentDate(isoDate: string): string {
  const parts = new Intl.DateTimeFormat('ko-KR', {
    timeZone: SEOUL_TIME_ZONE,
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date(isoDate));
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${values.month}월 ${values.day}일 ${pad(Number(values.hour))}:${pad(Number(values.minute))}`;
}

export function formatCommentRelativeTime(isoDate: string, now: Date = new Date()): string {
  const createdAt = new Date(isoDate);
  const diffMs = now.getTime() - createdAt.getTime();

  if (diffMs < 60_000) {
    return '방금 전';
  }

  const diffMinutes = Math.floor(diffMs / 60_000);
  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }

  const diffHours = Math.floor(diffMs / 3_600_000);
  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }

  const diffDays = Math.floor(diffMs / 86_400_000);
  return `${diffDays}일 전`;
}
