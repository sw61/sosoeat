// app/page.tsx
import { MainBanner } from '@/components/common/main-banner/main-banner';
import { getMeetings } from '@/services/meetings/meetings.server';

import { BestSoeatSection } from './_components/best-soeat-section/best-soeat-section';
import { CtaSection } from './_components/cta-section';
import { MainPageSection } from './_components/main-page-section';
import { MeetingTypeSection } from './_components/meeting-type-section';

export default async function MainPage() {
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
