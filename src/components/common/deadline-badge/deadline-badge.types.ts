import type { ProgressProps } from '@/components/ui/progress-bar';

export interface DeadlineBadgeProps {
  registrationEnd: string;
  variant: ProgressProps['variant'];
  className?: string;
}
