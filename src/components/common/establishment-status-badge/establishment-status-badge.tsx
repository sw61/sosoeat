import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import type { EstablishmentStatusBadgeProps } from './establishment-status-badge.types';

const establishedVariantClassName = {
  groupEat: 'border-0 bg-sosoeat-orange-100 text-sosoeat-orange-700',
  groupBuy: 'border-0 bg-sosoeat-blue-50 text-sosoeat-blue-700',
} as const;

export function EstablishmentStatusBadge({
  confirmedAt,
  variant,
  className,
}: EstablishmentStatusBadgeProps) {
  const isEstablished = confirmedAt != null;

  if (isEstablished) {
    return (
      <Badge
        variant="outline"
        className={cn(
          'h-auto shrink-0 rounded-full px-3 py-1.5 text-sm leading-5 font-medium shadow-none',
          establishedVariantClassName[variant],
          className
        )}
      >
        개설완료
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        'border-sosoeat-gray-200 h-auto shrink-0 rounded-full bg-white px-3 py-1.5 text-sm leading-5 font-medium text-[#6B7280] shadow-none hover:bg-white',
        className
      )}
    >
      개설대기
    </Badge>
  );
}
