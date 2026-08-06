import type { ProgressProps } from '../progress-bar';

export interface DeadlineBadgeProps {
  registrationEnd: Date | null;
  referenceNow?: string;
  variant: ProgressProps['variant'];
  className?: string;
}
