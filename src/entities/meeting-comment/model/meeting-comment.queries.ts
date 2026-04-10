import { useSuspenseQuery } from '@tanstack/react-query';

import { type SyncMeetingRequest } from '../api/meeting-comment.api';

import { meetingCommentQueryOptions } from './meeting-comment.options';

export const useComments = (meetingId: number, syncMeeting?: SyncMeetingRequest) => {
  return useSuspenseQuery(meetingCommentQueryOptions.list(meetingId, syncMeeting));
};

export const useCommentCount = (meetingId: number) => {
  return useSuspenseQuery(meetingCommentQueryOptions.count(meetingId));
};
