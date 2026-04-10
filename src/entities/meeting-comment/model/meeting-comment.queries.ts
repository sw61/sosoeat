import { useQuery } from '@tanstack/react-query';

import { MeetingComment, meetingCommentApi, SyncMeetingRequest } from '../api/meeting-comment.api';

import { meetingCommentKeys } from './meeting-comment-keys';

const COMMENT_LIST_STALE_MS = 30_000;

export const useComments = (
  meetingId: number,
  initialData?: MeetingComment[],
  syncMeeting?: SyncMeetingRequest
) => {
  return useQuery({
    queryKey: meetingCommentKeys.list(meetingId),
    queryFn: () => meetingCommentApi.getComments(meetingId, syncMeeting),
    initialData,
    staleTime: COMMENT_LIST_STALE_MS,
    retry: false,
  });
};

export const useCommentCount = (meetingId: number, initialCount?: number) => {
  return useQuery({
    queryKey: meetingCommentKeys.count(meetingId),
    queryFn: () => meetingCommentApi.getCommentCount(meetingId),
    initialData: initialCount !== undefined ? { count: initialCount } : undefined,
  });
};
