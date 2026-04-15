import { getMeetings } from '@/entities/meeting/index.server';
import { MeetingRecommendedSection } from '@/widgets/meeting-detail';
import { getMeetingById } from '@/widgets/meeting-detail/index.server';

interface Props {
  meetingId: number;
}

function getCurrentMinuteISOString() {
  const now = new Date();
  now.setSeconds(0, 0);
  return now.toISOString();
}

export async function MeetingRecommendedFetcher({ meetingId }: Props) {
  const meeting = await getMeetingById(meetingId);
  const meetingList = await getMeetings({
    region: meeting.region,
    dateStart: getCurrentMinuteISOString(),
    size: 5,
  }).catch(() => ({ data: [] }));

  return <MeetingRecommendedSection meetings={meetingList.data} currentMeetingId={meetingId} />;
}
