import Image from 'next/image';

import type { Meeting } from '@/types/meeting';

import { MeetingDetailCard } from '../meeting-detail-card';

interface MeetingHeroSectionProps {
  meeting: Meeting;
}

export function MeetingHeroSection({ meeting }: MeetingHeroSectionProps) {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="relative h-[241px] w-full overflow-hidden rounded-[24px] md:h-auto md:min-w-0 md:flex-1">
        <Image src={meeting.image} alt={meeting.name} fill className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <MeetingDetailCard meeting={meeting} role="guest" status="open" />
      </div>
    </div>
  );
}
