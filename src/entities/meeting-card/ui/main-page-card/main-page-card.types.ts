import type { MeetingCardData } from '../../model/meeting-card.types';

export interface MainPageCardProps {
  meeting: MeetingCardData;
  referenceNow?: string;
  renderFavoriteButton?: (id: number, isFavorited: boolean) => React.ReactNode;
}
