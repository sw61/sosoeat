import { getMeetings } from '@/services/meetings/meetings.server';
import type { Meeting } from '@/types/meeting';

import { MeetingHeroSection } from './_components/meeting-hero-section';
import { MeetingLocationSection } from './_components/meeting-location-section';
import { MeetingRecommendedSection } from './_components/meeting-recommended-section';
import { getMeetingById } from './services/meeting-detail.server';

// ─── Page ────────────────────────────────────────────────────

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MeetingDetailPage({ params }: Props) {
  const { id } = await params;
  const meetingId = Number(id);

  const meetingData = await getMeetingById(meetingId);

  const [meetingList] = await Promise.allSettled([
    getMeetings({ region: meetingData.region, size: 4 }),
  ]);

  const recommendedMeetingsRaw: Meeting[] =
    meetingList.status === 'fulfilled' ? (meetingList.value.data as unknown as Meeting[]) : [];
  const recommendedMeetings = recommendedMeetingsRaw.filter((m) => m.id !== meetingId);

  return (
    <main className="space-y-[30px] py-10">
      <MeetingHeroSection meeting={meetingData} />

      <section>
        <h2 className="text-sosoeat-gray-900 mb-3 text-2xl font-semibold">모임 설명</h2>
        <div className="border-sosoeat-gray-200 mt-5 rounded-[16px] border bg-white px-12 py-10">
          <p className="text-sosoeat-gray-800 text-lg font-normal whitespace-pre-line">
            {meetingData.description}
          </p>
        </div>
      </section>

      <MeetingLocationSection address={meetingData.address} />
      <MeetingRecommendedSection meetings={recommendedMeetings} />
    </main>
  );
}
