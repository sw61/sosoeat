export type HeartSize = 'large' | 'medium' | 'small';

export interface HeartButtonProps {
  size?: HeartSize;
  isLiked?: boolean;
  onToggle?: (isLiked: boolean) => void;
  className?: string;
}
