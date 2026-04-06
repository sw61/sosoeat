// app/_components/main-page-section/main-page-section.tsx
import Image from 'next/image';

import { getMeetings } from '@/entities/meeting/index.server';

import { MainPageCardWithHeart } from './main-page-card-with-heart';

export async function MainPageSection() {
  const { data: meetings } = await getMeetings({
    size: 6,
    sortBy: 'registrationEnd',
    sortOrder: 'desc',
  });

  return (
    <section className="px-4 pt-8">
      <h2 className="mb-3 flex items-center gap-3 text-lg font-bold md:text-xl lg:text-2xl">
        <Image src="icons/main-page-twinkle.svg" alt="twinkle" width={18} height={18} />
        추천 소잇
      </h2>
      <div className="grid grid-cols-1 place-items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
        {meetings.map((meeting) => (
          <MainPageCardWithHeart key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </section>
  );
}
