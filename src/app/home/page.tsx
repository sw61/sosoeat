import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import type { Meeting } from '@/entities/meeting';
import { getMeetings } from '@/entities/meeting/index.server';
import {
  BestSoeatSection,
  CtaSection,
  HowToUseSection,
  MainPageSection,
  MeetingTypeSection,
} from '@/widgets/home';

const MainBanner = dynamic(() => import('@/widgets/main-banner').then((mod) => mod.MainBanner));

async function getHomeMeetings(params: Parameters<typeof getMeetings>[0]): Promise<Meeting[]> {
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

export const metadata: Metadata = {
  title: '홈',
  description:
    '취미·관심사가 맞는 사람들과 소모임을 만들고 참여하세요. 소소톡으로 일상을 나누고 새로운 만남을 시작해보세요.',
  openGraph: {
    title: '홈 | 소소잇',
    description:
      '취미·관심사가 맞는 사람들과 소모임을 만들고 참여하세요. 소소톡으로 일상을 나누고 새로운 만남을 시작해보세요.',
  },
};

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
        <div className="mt-8 flex flex-col gap-8">
          <MeetingTypeSection />
          <MainPageSection meetings={latestMeetings} />
          <BestSoeatSection meetings={bestMeetings} />
        </div>
        <HowToUseSection />
      </div>
      <CtaSection />
    </div>
  );
}
