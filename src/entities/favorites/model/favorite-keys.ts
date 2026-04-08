export const favoriteKeys = {
  list: () => ['favorites', 'list'] as const,
  count: () => ['favorites', 'count'] as const,
  status: (meetingId: number) => ['favorites', 'status', meetingId] as const,
} as const;
