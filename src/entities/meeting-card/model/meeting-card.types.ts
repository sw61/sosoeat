export type MeetingCardCategory = 'groupEat' | 'groupBuy';

export interface MeetingCardData {
  id: number;
  name: string;
  type: MeetingCardCategory;
  region: string;
  dateTime: string;
  registrationEnd: string;
  capacity: number;
  participantCount: number;
  image: string;
  confirmedAt?: string | null;
  host: {
    name: string;
    image?: string;
  };
  isFavorited?: boolean;
}
