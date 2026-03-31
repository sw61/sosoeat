import { MeetingWithHost } from '@/types/generated-client';

export interface HeartButtonProps extends Pick<MeetingWithHost, 'isFavorited'> {
  className?: string;
  //크기는 3가지
  size?: 'lg' | 'md' | 'sm';
  meetingId: number;
}
