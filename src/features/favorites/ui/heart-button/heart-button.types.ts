import { MeetingWithHost } from '@/shared/types/generated-client';

export interface HeartButtonProps extends Pick<MeetingWithHost, 'isFavorited'> {
  className?: string;
  sizeClass?: string;
  size?: 'lg' | 'md' | 'sm';
  meetingId: number;
}
