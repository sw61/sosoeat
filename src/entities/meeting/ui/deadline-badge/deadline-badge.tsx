import Image from 'next/image';

import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';

import { useTimeFormatter } from '../../model/use-time-formatter';

import { DEADLINE_BADGE_CLASS } from './deadline-badge.constants';
import type { DeadlineBadgeProps } from './deadline-badge.types';

const variantBadgeClassName = {
  groupBuy: 'bg-sosoeat-blue-50 text-sosoeat-blue-700 hover:bg-sosoeat-blue-100',
  groupEat: 'bg-sosoeat-orange-100 text-sosoeat-orange-700 hover:bg-sosoeat-orange-200',
} as const;

export function DeadlineBadge({ registrationEnd, variant, className }: DeadlineBadgeProps) {
  const timeFormatterResult = useTimeFormatter(registrationEnd);
  if (!timeFormatterResult) return null;
  const {
    contentText,
    isEnded,
    showCountdown,
  }: { contentText: string; isEnded: boolean; showCountdown: boolean } = timeFormatterResult ?? {
    contentText: '',
    isEnded: false,
    showCountdown: false,
  };

  return (
    <Badge
      variant="outline"
      className={cn(DEADLINE_BADGE_CLASS, variantBadgeClassName[variant], className)}
    >
      <div className={'h-5 overflow-hidden'}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isEnded ? 'ended' : contentText}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="block flex w-full gap-1"
          >
            {showCountdown ? (
              <Image
                src={
                  variant === 'groupEat'
                    ? '/icons/alarm-clock-eat.svg'
                    : '/icons/alarm-clock-buy.svg'
                }
                alt=""
                width={20}
                height={20}
                className="size-5 shrink-0"
              />
            ) : (
              <Image
                src={
                  variant === 'groupEat'
                    ? '/icons/group-eat-calendar.svg'
                    : '/icons/group-buy-calendar.svg'
                }
                alt=""
                width={20}
                height={20}
                className="size-5 shrink-0"
              />
            )}
            <div className="w-full truncate">{isEnded ? '마감 종료' : contentText}</div>
          </motion.span>
        </AnimatePresence>
      </div>
    </Badge>
  );
}
