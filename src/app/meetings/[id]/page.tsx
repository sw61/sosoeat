import { Suspense } from 'react';

import type { Metadata } from 'next';

import {
  MeetingCommentSkeleton,
  MeetingHeroSkeleton,
  MeetingRecommendedSkeleton,
} from '@/widgets/meeting-detail';
import { getMeetingById } from '@/widgets/meeting-detail/index.server';

import { MeetingCommentFetcher } from './_components/meeting-comment-fetcher';
import { MeetingHeroFetcher } from './_components/meeting-hero-fetcher';
import { MeetingRecommendedFetcher } from './_components/meeting-recommended-fetcher';

// ─── Metadata ────────────────────────────────────────────────

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const meeting = await getMeetingById(Number(id)).catch(() => null);

  if (!meeting) return {};

  return {
    title: meeting.name,
    description: meeting.description,
    openGraph: {
      title: meeting.name,
      description: meeting.description,
      images: [{ url: meeting.image }],
    },
  };
}

// ─── Page ────────────────────────────────────────────────────

export default async function MeetingDetailPage({ params }: Props) {
  const { id } = await params;
  const meetingId = Number(id);

  return (
    <main className="space-y-[30px] py-10">
      <Suspense fallback={<MeetingHeroSkeleton />}>
        <MeetingHeroFetcher meetingId={meetingId} />
      </Suspense>

      <Suspense fallback={<MeetingCommentSkeleton />}>
        <MeetingCommentFetcher meetingId={meetingId} />
      </Suspense>

      <Suspense fallback={<MeetingRecommendedSkeleton />}>
        <MeetingRecommendedFetcher meetingId={meetingId} />
      </Suspense>
    </main>
  );
}
