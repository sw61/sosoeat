import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import type { UseStateBadgeProps } from './use-state-badge.types';

const usageVariantClassName = {
  groupEat: 'border-0 bg-sosoeat-orange-100 text-sosoeat-orange-700',
  groupBuy: 'border-0 bg-sosoeat-blue-50 text-sosoeat-blue-700',
} as const;

export function UseStateBadge({ variant, className }: UseStateBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'h-auto shrink-0 rounded-full px-3 py-1.5 text-sm leading-5 font-medium shadow-none',
        usageVariantClassName[variant],
        className
      )}
    >
      이용 예정
    </Badge>
  );
}
