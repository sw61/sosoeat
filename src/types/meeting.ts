export type MeetingCategory = 'groupEat' | 'groupBuy';

export type Meeting = {
  id: number;
  name: string;
  type: MeetingCategory;
  region: string;
  address: string;
  latitude: number;
  longitude: number;
  dateTime: string;
  registrationEnd: string;
  capacity: number;
  participantCount: number;
  image: string;
  description: string;
  canceledAt?: string | null;
  confirmedAt?: string | null;
  hostId: number;
  createdBy: number;
  updatedAt: string;
  host: {
    id: number;
    name: string;
    image?: string;
  };
  isFavorited?: boolean;
  isJoined?: boolean;
};
