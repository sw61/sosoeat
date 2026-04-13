import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { meetingCommentKeys } from '@/entities/meeting-comment';
import { getQueryClient } from '@/shared/lib/get-query-client';
import { MeetingCommentSection } from '@/widgets/meeting-detail';
import {
  fetchMeetingCommentCountForPage,
  fetchMeetingCommentsForPage,
  getMeetingById,
} from '@/widgets/meeting-detail/index.server';

interface Props {
  meetingId: number;
}

export async function MeetingCommentFetcher({ meetingId }: Props) {
  const queryClient = getQueryClient();
  const meeting = await getMeetingById(meetingId);

  const [comments, commentCount] = await Promise.all([
    fetchMeetingCommentsForPage(meetingId, meeting),
    fetchMeetingCommentCountForPage(meetingId),
  ]);

  queryClient.setQueryData(meetingCommentKeys.list(meetingId), comments);
  queryClient.setQueryData(meetingCommentKeys.count(meetingId), { count: commentCount });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MeetingCommentSection
        meetingId={meetingId}
        commentSync={{
          id: meeting.id,
          hostId: meeting.hostId,
          teamId: meeting.teamId,
        }}
      />
    </HydrationBoundary>
  );
}
