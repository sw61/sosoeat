import { getMeetings } from '@/services/meetings/meetings.server';
import type { Meeting } from '@/types/meeting';

import { MeetingCommentSection } from './_components/meeting-comment-section';
import { MeetingHeroSection } from './_components/meeting-hero-section';
import { MeetingLocationSection } from './_components/meeting-location-section';
import { MeetingRecommendedSection } from './_components/meeting-recommended-section';
import { fetchMeetingCommentsForPage } from './services/meeting-comments.server';
import { getMeetingById } from './services/meeting-detail.server';

// ─── Page ────────────────────────────────────────────────────

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MeetingDetailPage({ params }: Props) {
  const { id } = await params;
  const meetingId = Number(id);

  const meetingData = await getMeetingById(meetingId);

  const [meetingList, initialCommentsRaw] = await Promise.all([
    getMeetings({ region: meetingData.region, size: 4 }).catch(() => ({ data: [] as Meeting[] })),
    fetchMeetingCommentsForPage(meetingId, meetingData),
  ]);

  const recommendedMeetingsRaw = meetingList.data as unknown as Meeting[];
  const recommendedMeetings = recommendedMeetingsRaw.filter((m) => m.id !== meetingId);

  const initialComments = initialCommentsRaw;

  return (
    <main className="space-y-[30px] py-10">
      <MeetingHeroSection
        key={`${meetingData.id}-${meetingData.updatedAt}`}
        meeting={meetingData}
      />

      <section>
        <h2 className="text-sosoeat-gray-900 mb-3 text-2xl font-semibold">모임 설명</h2>
        <div className="border-sosoeat-gray-200 mt-5 rounded-[16px] border bg-white px-12 py-10">
          <p className="text-sosoeat-gray-800 text-lg font-normal whitespace-pre-line">
            {meetingData.description}
          </p>
        </div>
      </section>

      <MeetingLocationSection
        address={meetingData.address}
        latitude={meetingData.latitude}
        longitude={meetingData.longitude}
      />
      <MeetingCommentSection
        meetingId={meetingId}
        initialComments={initialComments}
        commentSync={{
          id: meetingData.id,
          hostId: meetingData.hostId,
          teamId: meetingData.teamId,
        }}
      />
      <MeetingRecommendedSection meetings={recommendedMeetings} />
    </main>
  );
}
