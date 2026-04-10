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
  const meeting = await getMeetingById(meetingId);

  const [initialComments, initialCommentCount] = await Promise.all([
    fetchMeetingCommentsForPage(meetingId, meeting),
    fetchMeetingCommentCountForPage(meetingId),
  ]);

  return (
    <MeetingCommentSection
      meetingId={meetingId}
      initialComments={initialComments}
      initialCommentCount={initialCommentCount}
      commentSync={{
        id: meeting.id,
        hostId: meeting.hostId,
        teamId: meeting.teamId,
      }}
    />
  );
}
