'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { TZDate } from '@date-fns/tz';
import { motion } from 'framer-motion';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import type { DeadlineBadgeProps } from './deadline-badge.types';

const variantBadgeClassName = {
  groupBuy: 'bg-sosoeat-blue-50 text-sosoeat-blue-700 hover:bg-sosoeat-blue-100',
  groupEat: 'bg-sosoeat-orange-100 text-sosoeat-orange-700 hover:bg-sosoeat-orange-100',
} as const;

export function DeadlineBadge({ registrationEnd, variant, className }: DeadlineBadgeProps) {
  const [, setNow] = useState(() => new Date());

  const startDate = new TZDate(new Date(), 'Asia/Seoul');
  const endDate = new TZDate(registrationEnd, 'Asia/Seoul');

  const diffMs = endDate.getTime() - startDate.getTime();
  const oneDayMs = 24 * 60 * 60 * 1000;
  const oneHourMs = 60 * 60 * 1000;
  const isEnded = diffMs <= 0;
  /** 마감까지 24시간 초과 */
  const isMoreThanOneDayLeft = diffMs > oneDayMs;

  const totalMinutesLeft = Math.max(0, Math.floor(diffMs / 60000));
  const hoursLeft = Math.floor(totalMinutesLeft / 60);
  const minutesLeft = totalMinutesLeft % 60;

  /** 24시간 이하: 시·분 / 24시간 초과: 일·시간 */
  const countdownText = (() => {
    if (isEnded) return '';
    if (isMoreThanOneDayLeft) {
      const days = Math.floor(diffMs / oneDayMs);
      const hours = Math.floor((diffMs % oneDayMs) / oneHourMs);
      return `모집완료까지 ${days}일 ${hours}시간 남았어요!`;
    }
    if (hoursLeft === 0) return `${minutesLeft}분 남았어요!`;
    return `모집완료까지 ${hoursLeft}시간 ${minutesLeft}분 남았어요!`;
  })();

  useEffect(() => {
    if (isEnded) return;
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, [isEnded]);

  return (
    <Badge
      variant="outline"
      className={cn(
        'mt-3.5 h-auto min-h-0 w-61.75 items-center gap-1 rounded-[14px] border-0 py-1.5 pr-3 pl-1.5 text-sm leading-5 font-medium shadow-none',
        variantBadgeClassName[variant],
        className
      )}
    >
      <Image
        src={variant === 'groupEat' ? '/icons/alarm-clock-eat.svg' : '/icons/alarm-clock-buy.svg'}
        alt=""
        width={16}
        height={16}
        className="size-4 shrink-0"
      />
      <div className="relative min-h-[1.25em] overflow-hidden">
        {isEnded ? (
          <span>마감 종료</span>
        ) : (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {countdownText}
          </motion.span>
        )}
      </div>
    </Badge>
  );
}
