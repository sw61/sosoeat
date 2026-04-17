'use client';

import type { Meeting } from '@/entities/meeting';
import { MainPageCard } from '@/entities/meeting';
import { HeartButton } from '@/features/favorites';

interface MainPageCardWithHeartProps {
  meeting: Meeting;
  referenceNow?: string;
}

export function MainPageCardWithHeart({ meeting, referenceNow }: MainPageCardWithHeartProps) {
  return (
    <MainPageCard
      meeting={meeting}
      referenceNow={referenceNow}
      renderFavoriteButton={(id, isFavorited) => (
        <HeartButton meetingId={id} isFavorited={isFavorited} size="md" />
      )}
    />
  );
}
