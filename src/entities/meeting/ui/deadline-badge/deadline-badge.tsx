'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { TZDate } from '@date-fns/tz';
import { motion } from 'framer-motion';

import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';

import {
  DEADLINE_BADGE_CLASS,
  DEADLINE_BADGE_TEXT_WRAPPER_CLASS,
} from './deadline-badge.constants';
import type { DeadlineBadgeProps } from './deadline-badge.types';

const variantBadgeClassName = {
  groupBuy: 'bg-sosoeat-blue-50 text-sosoeat-blue-700 hover:bg-sosoeat-blue-100',
  groupEat: 'bg-sosoeat-orange-100 text-sosoeat-orange-700 hover:bg-sosoeat-orange-100',
} as const;

export function DeadlineBadge({ registrationEnd, variant, className }: DeadlineBadgeProps) {
  const [, setNow] = useState(() => new Date());

  const startDate = new TZDate(new Date(), 'Asia/Seoul');
  const endDate = registrationEnd === null ? null : new TZDate(registrationEnd, 'Asia/Seoul');

  const diffMs = endDate === null ? -1 : endDate.getTime() - startDate.getTime();
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
    if (registrationEnd === null || isEnded) return;
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, [registrationEnd, isEnded]);

  if (registrationEnd === null) {
    return null;
  }

  return (
    <Badge
      variant="outline"
      className={cn(DEADLINE_BADGE_CLASS, variantBadgeClassName[variant], className)}
    >
      <Image
        src={variant === 'groupEat' ? '/icons/alarm-clock-eat.svg' : '/icons/alarm-clock-buy.svg'}
        alt=""
        width={16}
        height={16}
        className="size-4 shrink-0"
      />
      <div className={DEADLINE_BADGE_TEXT_WRAPPER_CLASS}>
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
