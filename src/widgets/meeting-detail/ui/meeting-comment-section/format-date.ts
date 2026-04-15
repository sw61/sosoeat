function pad(value: number) {
  return String(value).padStart(2, '0');
}

export function formatCommentDate(isoDate: string): string {
  const date = new Date(isoDate);

  return `${date.getMonth() + 1}월 ${date.getDate()}일 ${pad(date.getHours())}:${pad(date.getMinutes())}`;
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
