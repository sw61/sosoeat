import { Suspense } from 'react';

import type { Metadata } from 'next';

import * as Sentry from '@sentry/nextjs';

import { getDefaultSocialImages } from '@/shared/lib/social-metadata';
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
  const meeting = await getMeetingById(Number(id)).catch((error) => {
    Sentry.captureException(error, {
      tags: {
        area: 'meeting-detail',
        location: 'generateMetadata',
      },
      extra: {
        meetingId: id,
      },
    });

    return null;
  });

  if (!meeting) return {};

  return {
    title: meeting.name,
    description: meeting.description,
    openGraph: {
      type: 'article',
      title: meeting.name,
      description: meeting.description,
      images: meeting.image ? [{ url: meeting.image }] : getDefaultSocialImages(),
    },
    twitter: {
      card: 'summary_large_image',
      title: meeting.name,
      description: meeting.description,
      images: meeting.image ? [{ url: meeting.image }] : getDefaultSocialImages(),
    },
  };
}

// ─── Page ────────────────────────────────────────────────────

export default async function MeetingDetailPage({ params }: Props) {
  const { id } = await params;
  const meetingId = Number(id);

  return (
    <main className="space-y-[30px] py-6 md:py-8 lg:py-10">
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
