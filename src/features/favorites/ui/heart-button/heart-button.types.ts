import type { Meeting } from '@/entities/meeting';

export interface HeartButtonProps extends Pick<Meeting, 'isFavorited'> {
  className?: string;
  sizeClass?: string;
  iconClass?: string;
  size?: 'lg' | 'md' | 'sm';
  meetingId: number;
}
