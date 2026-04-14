'use client';

import type { Meeting } from '@/entities/meeting';
import { MainPageCard } from '@/entities/meeting';
import { HeartButton } from '@/features/favorites';

interface MainPageCardWithHeartProps {
  meeting: Meeting;
}

export function MainPageCardWithHeart({ meeting }: MainPageCardWithHeartProps) {
  return (
    <MainPageCard
      meeting={meeting}
      renderFavoriteButton={(id, isFavorited) => (
        <HeartButton meetingId={id} isFavorited={isFavorited} size="md" />
      )}
    />
  );
}
