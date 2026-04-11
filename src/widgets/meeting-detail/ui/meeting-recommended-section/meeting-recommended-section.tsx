import type { Meeting } from '@/entities/meeting';
import { ScrollArea, ScrollBar } from '@/shared/ui/scroll-area';

import RecommendedMeetingCard from '../meeting-recommended-card/meeting-recommended-card';

interface MeetingRecommendedSectionProps {
  meetings: Meeting[];
  currentMeetingId: number;
}

export function MeetingRecommendedSection({
  meetings,
  currentMeetingId,
}: MeetingRecommendedSectionProps) {
  const recommendedMeetings = meetings.filter((m) => m.id !== currentMeetingId);

  if (recommendedMeetings.length === 0) return null;

  return (
    <section>
      <h2 className="text-sosoeat-gray-900 mb-4 text-2xl font-semibold">이런 모임은 어때요?</h2>
      <ScrollArea className="mt-5 w-full">
        <div className="flex w-max gap-6 pb-3">
          {recommendedMeetings.map((meeting) => (
            <RecommendedMeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
