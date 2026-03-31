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
  canceledAt?: string;
  confirmedAt?: string;
  hostId: number;
  createdBy: string;
  updatedAt: string;
  host: {
    id: number;
    name: string;
    profileImage?: string;
  };
  isFavorited: boolean;
};
