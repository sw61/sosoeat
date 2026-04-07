import { getMeetings } from '@/entities/meeting/index.server';
import { BestSoeatSection, CtaSection, MainPageSection, MeetingTypeSection } from '@/widgets/home';
import { MainBanner } from '@/widgets/main-banner';

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
