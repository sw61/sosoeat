import { getMeetings } from '@/entities/meeting/index.server';
import { BestSoeatSection } from '@/widgets/home/ui/best-soeat-section/best-soeat-section';
import { CtaSection } from '@/widgets/home/ui/cta-section/cta-section';
import { MainPageSection } from '@/widgets/home/ui/main-page-section/main-page-section';
import { MeetingTypeSection } from '@/widgets/home/ui/meeting-type-section/meeting-type-section';
import { MainBanner } from '@/widgets/main-banner/ui/main-banner/main-banner';

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
