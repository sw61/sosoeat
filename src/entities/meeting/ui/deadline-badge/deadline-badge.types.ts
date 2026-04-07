import type { ProgressProps } from '@/shared/ui/progress-bar';

export interface DeadlineBadgeProps {
  registrationEnd: Date | null;
  variant: ProgressProps['variant'];
  className?: string;
}
