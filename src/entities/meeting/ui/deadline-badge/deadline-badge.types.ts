import type { ProgressProps } from '@/shared/ui/progress-bar';

export interface DeadlineBadgeProps {
  registrationEnd: Date | null;
  referenceNow?: string;
  variant: ProgressProps['variant'];
  className?: string;
}
