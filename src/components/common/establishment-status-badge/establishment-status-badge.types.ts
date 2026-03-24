import type { ProgressProps } from '@/components/ui/progress-bar';

export interface EstablishmentStatusBadgeProps {
  confirmedAt: string | null;
  variant: ProgressProps['variant'];
  className?: string;
}
