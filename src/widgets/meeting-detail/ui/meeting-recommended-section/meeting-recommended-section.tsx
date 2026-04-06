import type { Meeting } from '@/shared/types/meeting';
import { ScrollArea, ScrollBar } from '@/shared/ui/scroll-area';

import RecommendedMeetingCard from '../meeting-recommended-card/meeting-recommended-card';

interface MeetingRecommendedSectionProps {
  meetings: Meeting[];
}

export function MeetingRecommendedSection({ meetings }: MeetingRecommendedSectionProps) {
  return (
    <section>
      <h2 className="text-sosoeat-gray-900 mb-4 text-2xl font-semibold">이런 모임은 어때요?</h2>
      <ScrollArea className="mt-5 w-full">
        <div className="flex w-max gap-6 pb-3">
          {meetings.map((meeting) => (
            <RecommendedMeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
