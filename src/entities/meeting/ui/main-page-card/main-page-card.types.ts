import type { Meeting } from '../../model/meeting.types';

export interface MainPageCardProps {
  meeting: Meeting;
  referenceNow?: string;
  renderFavoriteButton?: (id: number, isFavorited: boolean) => React.ReactNode;
}
