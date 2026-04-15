import { getMeetings } from '@/entities/meeting/index.server';
import { MeetingRecommendedSection } from '@/widgets/meeting-detail';
import { getMeetingById } from '@/widgets/meeting-detail/index.server';

interface Props {
  meetingId: number;
}

export async function MeetingRecommendedFetcher({ meetingId }: Props) {
  const meeting = await getMeetingById(meetingId);
  const meetingList = await getMeetings({
    region: meeting.region,
    dateStart: new Date().toISOString(),
    size: 5,
  }).catch(() => ({ data: [] }));

  return <MeetingRecommendedSection meetings={meetingList.data} currentMeetingId={meetingId} />;
}
