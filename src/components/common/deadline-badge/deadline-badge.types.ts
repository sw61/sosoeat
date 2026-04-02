import type { ProgressProps } from '@/components/ui/progress-bar';

export interface DeadlineBadgeProps {
  registrationEnd: Date | null;
  variant: ProgressProps['variant'];
  className?: string;
}
