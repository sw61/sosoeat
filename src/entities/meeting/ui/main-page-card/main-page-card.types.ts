import type { MeetingWithHost } from '@/shared/types/generated-client';

export interface MainPageCardProps {
  meeting: MeetingWithHost;
  renderFavoriteButton?: (id: number, isFavorited: boolean) => React.ReactNode;
}
