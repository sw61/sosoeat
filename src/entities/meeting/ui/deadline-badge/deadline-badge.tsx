import Image from 'next/image';

import { AnimatePresence, LazyMotion } from 'framer-motion';
import * as m from 'framer-motion/m';

import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';

import { useTimeFormatter } from '../../model/use-time-formatter';

import { DEADLINE_BADGE_CLASS } from './deadline-badge.constants';
import type { DeadlineBadgeProps } from './deadline-badge.types';

const loadFeatures = () => import('framer-motion').then((m) => m.domAnimation);

const variantBadgeClassName = {
  groupBuy: 'bg-sosoeat-blue-50 text-sosoeat-blue-700 hover:bg-sosoeat-blue-100',
  groupEat: 'bg-sosoeat-orange-100 text-sosoeat-orange-700 hover:bg-sosoeat-orange-200',
} as const;

export function DeadlineBadge({
  registrationEnd,
  referenceNow,
  variant,
  className,
}: DeadlineBadgeProps) {
  const timeFormatterResult = useTimeFormatter(registrationEnd, referenceNow);
  if (!timeFormatterResult) return null;
  const { contentText, isEnded, showCountdown } = timeFormatterResult;
  const iconSrc = showCountdown
    ? variant === 'groupEat'
      ? '/icons/alarm-clock-eat.svg'
      : '/icons/alarm-clock-buy.svg'
    : variant === 'groupEat'
      ? '/icons/group-eat-calendar.svg'
      : '/icons/group-buy-calendar.svg';

  return (
    <Badge
      variant="outline"
      className={cn(DEADLINE_BADGE_CLASS, variantBadgeClassName[variant], className)}
    >
      <div className="flex h-5 w-full gap-1 overflow-hidden">
        <Image
          unoptimized
          src={iconSrc}
          alt=""
          width={20}
          height={20}
          className="size-5 shrink-0"
        />
        <LazyMotion features={loadFeatures}>
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={isEnded ? 'ended' : contentText}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="block w-full"
            >
              <div suppressHydrationWarning className="w-full truncate">
                {isEnded ? '마감 완료' : contentText}
              </div>
            </m.span>
          </AnimatePresence>
        </LazyMotion>
      </div>
    </Badge>
  );
}
