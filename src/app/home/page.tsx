import { Suspense } from 'react';

import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import {
  BestSosotalkSection,
  CtaSection,
  HowToUseSection,
  MainPageSection,
  MeetingTypeSection,
} from '@/widgets/home';

const MainBanner = dynamic(() => import('@/widgets/main-banner').then((mod) => mod.MainBanner));

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

export default function HomePage() {
  return (
    <div>
      <MainBanner />
      <div className="mx-auto max-w-[1136px]">
        <div className="mt-8 flex flex-col gap-8">
          <MeetingTypeSection />
          <Suspense>
            <MainPageSection />
          </Suspense>
          <Suspense>
            <BestSosotalkSection />
          </Suspense>
        </div>
        <HowToUseSection />
      </div>
      <CtaSection />
    </div>
  );
}
