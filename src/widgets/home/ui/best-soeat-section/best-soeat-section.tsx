'use client';

import Image from 'next/image';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import useEmblaCarousel from 'embla-carousel-react';

import { MeetingWithHost } from '@/shared/types/generated-client/models/MeetingWithHost';

import { BestSoeatCard } from '../best-soeat-card';

function formatDateTime(date: Date): string {
  return format(date, 'M/d(E) HH:mm', { locale: ko });
}

interface BestSoeatSectionProps {
  meetings: MeetingWithHost[];
}

export function BestSoeatSection({ meetings }: BestSoeatSectionProps) {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  return (
    <section className="px-4 py-8 md:py-10 lg:py-12">
      <h2 className="mb-4 flex items-center gap-3 text-lg font-bold md:text-xl lg:text-2xl">
        <Image src="icons/main-page-twinkle.svg" alt="twinkle" width={18} height={18} />
        지금 뜨는 베스트 소잇 🔥
      </h2>

      {/* Embla Viewport */}
      <div className="-mx-4 overflow-hidden" ref={emblaRef}>
        {/* Embla Container */}
        <div className="flex gap-4 px-4">
          {meetings.map((meeting) => (
            /* Embla Slide */
            <BestSoeatCard
              key={meeting.id}
              id={meeting.id}
              title={meeting.name}
              region={meeting.region}
              meetingAt={formatDateTime(meeting.dateTime)}
              thumbnailUrl={meeting.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
