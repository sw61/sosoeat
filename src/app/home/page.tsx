import type { Metadata } from 'next';

import { getMeetings } from '@/entities/meeting/index.server';
import { BestSoeatSection, CtaSection, MainPageSection, MeetingTypeSection } from '@/widgets/home';
import { MainBanner } from '@/widgets/main-banner';

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
  const { data: bestMeetings } = await getMeetings({
    size: 6,
    sortBy: 'participantCount',
    sortOrder: 'desc',
  });

  return (
    <div>
      <MainBanner />
      <div className="mx-auto max-w-[1136px]">
        <MeetingTypeSection />
        <MainPageSection />
        <BestSoeatSection meetings={bestMeetings} />
      </div>
      <CtaSection />
    </div>
  );
}
