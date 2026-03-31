export interface MeetingHost {
  id: number;
  name: string;
  image: string;
}

export interface Meeting {
  id: number | string;
  isFavorited: boolean;
  teamId: string;
  name: string;
  type: string;
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
  canceledAt: string | null;
  confirmedAt: string | null;
  hostId: number;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
  host: MeetingHost;
  variant: 'groupEat' | 'groupBuy';
}
