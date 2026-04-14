import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { meetingsQueryOptions } from '@/entities/meeting';
import { getQueryClient } from '@/shared/lib/get-query-client';
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
  const queryClient = getQueryClient();
  const meeting = await getMeetingById(meetingId);

  queryClient.setQueryData(meetingsQueryOptions.meetingDetail(meetingId).queryKey, meeting);

  return (
    <>
      <link rel="preload" as="image" href={meeting.image} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MeetingHeroSection key={`${meeting.id}-${meeting.updatedAt}`} meetingId={meetingId} />
        <MeetingDescriptionSection description={meeting.description} />
        <MeetingLocationSection
          address={meeting.address}
          latitude={meeting.latitude}
          longitude={meeting.longitude}
        />
      </HydrationBoundary>
    </>
  );
}
