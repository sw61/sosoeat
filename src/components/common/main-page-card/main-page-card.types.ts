import type { ProgressProps } from '@/components/ui/progress-bar';

export interface MeetingHost {
  id: number;
  name: string;
  image: string;
}

export interface Meeting {
  name: string;
  type: string;
  region: string; //건대입구 등
  dateTime: string; // 끝나는 시간
  registrationEnd: string; //신청마감
  capacity: number; //수용가능인원
  participantCount: number; //현재인원
  image: string; //게시글 사진
  canceledAt: string | null; //취소된 시간
  confirmedAt: string | null; //확인된 시간?
  hostId: number;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
  host: MeetingHost;
  variant: ProgressProps['variant'];
}
