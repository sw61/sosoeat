import type { ProgressProps } from '@/components/ui/progress-bar';

export interface EstablishmentStatusBadgeProps {
  confirmedAt: Date | null;
  variant: ProgressProps['variant'];
  className?: string;
}
