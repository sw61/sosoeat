import type { ProgressProps } from '@/shared/ui/progress-bar';

export interface EstablishmentStatusBadgeProps {
  confirmedAt: Date | null;
  variant: ProgressProps['variant'];
  className?: string;
}
