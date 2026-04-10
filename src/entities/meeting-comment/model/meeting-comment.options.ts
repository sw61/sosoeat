import { meetingCommentApi, type SyncMeetingRequest } from '../api/meeting-comment.api';

import { meetingCommentKeys } from './meeting-comment-keys';

export const meetingCommentQueryOptions = {
  list: (meetingId: number, syncMeeting?: SyncMeetingRequest) => ({
    queryKey: meetingCommentKeys.list(meetingId),
    queryFn: () => meetingCommentApi.getComments(meetingId, syncMeeting),
    staleTime: 30_000,
    retry: false,
  }),
  count: (meetingId: number) => ({
    queryKey: meetingCommentKeys.count(meetingId),
    queryFn: () => meetingCommentApi.getCommentCount(meetingId),
  }),
};
