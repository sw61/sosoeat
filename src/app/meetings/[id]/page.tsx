import type { Meeting } from '@/entities/meeting';
import { getMeetings } from '@/entities/meeting/index.server';
import {
  MeetingCommentSection,
  MeetingHeroSection,
  MeetingLocationSection,
  MeetingRecommendedSection,
} from '@/widgets/meeting-detail';
import {
  fetchMeetingCommentCountForPage,
  fetchMeetingCommentsForPage,
  getMeetingById,
} from '@/widgets/meeting-detail/index.server';

// ─── Page ────────────────────────────────────────────────────

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MeetingDetailPage({ params }: Props) {
  const { id } = await params;
  const meetingId = Number(id);

  const meetingData = await getMeetingById(meetingId);

  const [meetingList, initialComments, initialCommentCount] = await Promise.all([
    getMeetings({ region: meetingData.region, size: 4 }).catch(() => ({ data: [] })),
    fetchMeetingCommentsForPage(meetingId, meetingData),
    fetchMeetingCommentCountForPage(meetingId),
  ]);

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
        initialCommentCount={initialCommentCount}
        commentSync={{
          id: meetingData.id,
          hostId: meetingData.hostId,
          teamId: meetingData.teamId,
        }}
      />
      <MeetingRecommendedSection
        meetings={meetingList.data as unknown as Meeting[]}
        currentMeetingId={meetingId}
      />
    </main>
  );
}
