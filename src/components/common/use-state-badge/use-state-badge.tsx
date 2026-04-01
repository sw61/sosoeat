import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import type { UseStateBadgeProps } from './use-state-badge.types';

const usageVariantClassName = {
  groupEat: 'border-0 bg-sosoeat-orange-100 text-sosoeat-orange-700',
  groupBuy: 'border-0 bg-sosoeat-blue-50 text-sosoeat-blue-700',
} as const;

const STATUS_LABEL: Record<UseStateBadgeProps['status'], string> = {
  upcoming: '이용예정',
  completed: '이용완료',
};

export function UseStateBadge({ variant, status, className }: UseStateBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'h-auto shrink-0 rounded-full px-3 py-1.5 text-sm leading-5 font-medium shadow-none',
        usageVariantClassName[variant],
        className
      )}
    >
      {STATUS_LABEL[status]}
    </Badge>
  );
}
