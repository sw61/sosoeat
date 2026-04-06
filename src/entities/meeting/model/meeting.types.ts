export type MeetingCategory = 'groupEat' | 'groupBuy';

export type Meeting = {
  id: number;
  name: string;
  type: MeetingCategory;
  region: string;
  address: string;
  /** 백엔드에서 좌표 미입력 시 null */
  latitude: number | null;
  longitude: number | null;
  dateTime: string;
  registrationEnd: string;
  capacity: number;
  participantCount: number;
  image: string;
  description: string;
  canceledAt?: string | null;
  confirmedAt?: string | null;
  hostId: number;
  /** 댓글 서버 모임 동기화 등에 사용 (백엔드 모임 상세 응답에 포함) */
  teamId: string;
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
