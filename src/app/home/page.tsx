import dynamic from 'next/dynamic';

import { getMeetings } from '@/entities/meeting/index.server';
import { MeetingWithHost } from '@/shared/types/generated-client/models/MeetingWithHost';
import { BestSoeatSection, CtaSection, MainPageSection, MeetingTypeSection } from '@/widgets/home';

const MainBanner = dynamic(() => import('@/widgets/main-banner').then((mod) => mod.MainBanner));

async function getHomeMeetings(
  params: Parameters<typeof getMeetings>[0]
): Promise<MeetingWithHost[]> {
  try {
    const { data } = await getMeetings(params);
    return data;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to load home meetings.', error);
    }

    return [];
  }
}

export default async function HomePage() {
  const [bestMeetings, latestMeetings] = await Promise.all([
    getHomeMeetings({
      size: 6,
      sortBy: 'participantCount',
      sortOrder: 'desc',
    }),
    getHomeMeetings({
      size: 6,
      sortBy: 'registrationEnd',
      sortOrder: 'desc',
    }),
  ]);

  return (
    <div>
      <MainBanner />
      <div className="mx-auto max-w-[1136px]">
        <MeetingTypeSection />
        <MainPageSection meetings={latestMeetings} />
        <BestSoeatSection meetings={bestMeetings} />
      </div>
      <CtaSection />
    </div>
  );
}
