import { MeetingWithHost } from '@/types/generated-client';

export interface HeartButtonProps extends Pick<MeetingWithHost, 'isFavorited'> {
  className?: string;
  size?: 'lg' | 'md' | 'sm';
}
