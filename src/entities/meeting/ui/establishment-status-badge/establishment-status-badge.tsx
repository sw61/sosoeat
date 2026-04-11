import Image from 'next/image';

import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';

import {
  ESTABLISHED_BADGE_BASE_CLASS,
  ESTABLISHED_LABEL_CLASS,
  ESTABLISHED_VARIANT_CLASS,
  ICON_SRC,
  PENDING_BADGE_CLASS,
} from './establishment-status-badge.constants';
import type { EstablishmentStatusBadgeProps } from './establishment-status-badge.types';

export function EstablishmentStatusBadge({
  confirmedAt,
  variant = 'groupEat',
  className,
}: EstablishmentStatusBadgeProps) {
  const isEstablished = confirmedAt != null;

  if (isEstablished) {
    return (
      <Badge
        variant="outline"
        className={cn(ESTABLISHED_BADGE_BASE_CLASS, ESTABLISHED_VARIANT_CLASS[variant], className)}
      >
        <span className={ESTABLISHED_LABEL_CLASS}>
          <Image
            src={ICON_SRC[variant]}
            alt=""
            width={20}
            height={20}
            className="size-5 shrink-0"
            aria-hidden
          />
          개설확정
        </span>
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className={cn(PENDING_BADGE_CLASS, className)}>
      개설대기
    </Badge>
  );
}
