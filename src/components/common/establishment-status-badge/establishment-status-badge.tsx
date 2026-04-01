import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import {
  ESTABLISHED_BADGE_CLASS,
  PENDING_BADGE_CLASS,
} from './establishment-status-badge.constants';
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
        className={cn(ESTABLISHED_BADGE_CLASS, establishedVariantClassName[variant], className)}
      >
        개설완료
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className={cn(PENDING_BADGE_CLASS, className)}>
      개설대기
    </Badge>
  );
}
