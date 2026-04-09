import {
  MeetingDescriptionSection,
  MeetingHeroSection,
  MeetingLocationSection,
} from '@/widgets/meeting-detail';
import { getMeetingById } from '@/widgets/meeting-detail/index.server';

interface Props {
  meetingId: number;
}

export async function MeetingHeroFetcher({ meetingId }: Props) {
  const meeting = await getMeetingById(meetingId);

  return (
    <>
      <MeetingHeroSection key={`${meeting.id}-${meeting.updatedAt}`} meeting={meeting} />
      <MeetingDescriptionSection description={meeting.description} />
      <MeetingLocationSection
        address={meeting.address}
        latitude={meeting.latitude}
        longitude={meeting.longitude}
      />
    </>
  );
}
