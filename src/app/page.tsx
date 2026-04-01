// app/page.tsx
import { MainBanner } from '@/components/common/main-banner/main-banner';

import { BestSoeatSection } from './_components/best-soeat-section/best-soeat-section';
import { CtaSection } from './_components/cta-section';
import { MainPageSection } from './_components/main-page-section';
import { MeetingTypeSection } from './_components/meeting-type-section';

export default function MainPage() {
  return (
    <div>
      <MainBanner />
      <div className="mx-auto max-w-[1136px]">
        <BestSoeatSection />
        <MeetingTypeSection />
        <MainPageSection />
      </div>
      <CtaSection />
    </div>
  );
}
