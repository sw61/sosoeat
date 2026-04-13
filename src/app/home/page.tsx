import { getMeetings } from '@/entities/meeting/index.server';
import {
  BestSoeatSection,
  CtaSection,
  HowToUseSection,
  MainPageSection,
  MeetingTypeSection,
} from '@/widgets/home';
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
        <div className="mt-8 flex flex-col gap-8">
          <MeetingTypeSection />
          <MainPageSection />
          <BestSoeatSection meetings={bestMeetings} />
        </div>
        <HowToUseSection />
      </div>
      <CtaSection />
    </div>
  );
}
