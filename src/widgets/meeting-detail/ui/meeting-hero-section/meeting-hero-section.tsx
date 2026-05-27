import Image from 'next/image';

import type { Meeting } from '@/entities/meeting';

import { MeetingHeroActions } from './meeting-hero-actions';

interface MeetingHeroSectionProps {
  meeting: Meeting;
  referenceNow: string;
}

export function MeetingHeroSection({ meeting, referenceNow }: MeetingHeroSectionProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-6">
      <div className="relative w-full overflow-hidden rounded-[24px] max-md:aspect-[3/2] md:min-w-0 md:flex-1">
        <Image
          src={meeting.image}
          alt={meeting.name}
          fill
          priority
          sizes="(max-width: 767px) calc(100vw - 32px), calc(50vw - 40px)"
          draggable={false}
          className="object-cover"
        />
      </div>
      <MeetingHeroActions meetingId={meeting.id} referenceNow={referenceNow} />
    </div>
  );
}
