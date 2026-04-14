import { getMeetings } from '@/entities/meeting/index.server';
import { MeetingRecommendedSection } from '@/widgets/meeting-detail';
import { getMeetingById } from '@/widgets/meeting-detail/index.server';

interface Props {
  meetingId: number;
}

export async function MeetingRecommendedFetcher({ meetingId }: Props) {
  const meeting = await getMeetingById(meetingId);
  const meetingList = await getMeetings({ region: meeting.region, size: 4 }).catch(() => ({
    data: [],
  }));

  const now = new Date();
  const futureMeetings = meetingList.data.filter((m) => new Date(m.dateTime) > now);

  return <MeetingRecommendedSection meetings={futureMeetings} currentMeetingId={meetingId} />;
}
