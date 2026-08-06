import type { ProgressProps } from '../progress-bar';

export interface EstablishmentStatusBadgeProps {
  confirmedAt: Date | null;
  variant: ProgressProps['variant'];
  className?: string;
}
