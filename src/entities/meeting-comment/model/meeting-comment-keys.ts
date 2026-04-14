export const meetingCommentKeys = {
  all: ['meeting-comments'] as const,
  list: (meetingId: number) => ['meeting-comments', meetingId] as const,
  count: (meetingId: number) => ['meeting-comments', meetingId, 'count'] as const,
};
