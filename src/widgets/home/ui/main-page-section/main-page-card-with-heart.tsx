'use client';

import { MainPageCard } from '@/entities/meeting/ui/main-page-card';
import { HeartButton } from '@/features/favorites';
import type { MeetingWithHost } from '@/shared/types/generated-client';

interface MainPageCardWithHeartProps {
  meeting: MeetingWithHost;
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
