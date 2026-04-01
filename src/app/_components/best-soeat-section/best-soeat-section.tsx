import Image from 'next/image';

import { BestSoeatCard } from '@/app/_components/best-soeat-card/best-soeat-card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const MOCK_DATA = [
  {
    id: '1',
    title: '강남역 근처 혼밥 모임',
    region: '강남구',
    meetingAt: '2026.03.28 12:00',
    thumbnailUrl: '/images/group-buy-modal.png',
  },
  {
    id: '2',
    title: '홍대 파스타 같이 먹어요',
    region: '마포구',
    meetingAt: '2026.03.29 18:00',
    thumbnailUrl: '/images/group-buy-modal.png',
  },
  {
    id: '3',
    title: '마포구 주민 함께 저녁 먹어요',
    region: '마포구',
    meetingAt: '2026.03.30 18:00',
    thumbnailUrl: '/images/group-buy-modal.png',
  },
  {
    id: '4',
    title: '마포구 주민 함께 저녁 먹어요',
    region: '마포구',
    meetingAt: '2026.03.30 18:00',
    thumbnailUrl: '/images/group-buy-modal.png',
  },
  {
    id: '5',
    title: '마포구 주민 함께 저녁 먹어요',
    region: '마포구',
    meetingAt: '2026.03.30 18:00',
    thumbnailUrl: '/images/group-buy-modal.png',
  },
];

export function BestSoeatSection() {
  return (
    <section className="px-4 py-6 md:px-4 md:py-7.5 lg:px-4 lg:py-7.5">
      <h2 className="mb-3 flex items-center gap-3 text-lg font-bold md:text-xl lg:text-2xl">
        <Image src="icons/main-page-twinkle.svg" alt="twinkle" width={18} height={18} />
        지금 뜨는 베스트 소잇 🔥
      </h2>
      <ScrollArea className="w-full">
        <div className="flex w-max gap-3 pb-3">
          {MOCK_DATA.map((meeting) => (
            <BestSoeatCard
              key={meeting.id}
              title={meeting.title}
              region={meeting.region}
              meetingAt={meeting.meetingAt}
              thumbnailUrl={meeting.thumbnailUrl}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
