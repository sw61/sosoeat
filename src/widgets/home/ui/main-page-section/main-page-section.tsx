import Image from 'next/image';

import * as Sentry from '@sentry/nextjs';

import type { Meeting } from '@/entities/meeting';
import { getMeetings } from '@/entities/meeting/index.server';

import { MainPageCardWithHeart } from './main-page-card-with-heart';

async function getLatestMeetings(): Promise<Meeting[]> {
  try {
    const { data } = await getMeetings({
      size: 6,
      sortBy: 'registrationEnd',
      sortOrder: 'desc',
    });
    return data;
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(error, {
        tags: { area: 'home', action: 'load-home-meetings' },
      });
    } else {
      console.error('Failed to load home meetings.', error);
    }
    return [];
  }
}

export async function MainPageSection() {
  const meetings = await getLatestMeetings();
  const referenceNow = new Date().toISOString();

  return (
    <section className="px-4">
      <h2 className="mb-3 flex items-center gap-3 text-lg font-bold md:text-xl lg:text-2xl">
        <Image src="icons/main-page-twinkle.svg" alt="twinkle" width={18} height={18} />
        추천 소잇
      </h2>
      <div className="grid grid-cols-1 justify-items-center gap-6 min-[776px]:grid-cols-2 min-[1160px]:grid-cols-3">
        {meetings.map((meeting) => (
          <MainPageCardWithHeart key={meeting.id} meeting={meeting} referenceNow={referenceNow} />
        ))}
      </div>
    </section>
  );
}
