'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { TZDate } from '@date-fns/tz';
import { differenceInHours, format, intervalToDuration, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Clock, MapPin, Tag } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { ProgressWithLabel } from '@/components/common/progress-with-label';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Meeting } from '@/components/ui/main-page-card/main-page-card.type';
import { cn } from '@/lib/utils';

const variantTagStyles = {
  groupBuy:
    'rounded-lg bg-sosoeat-blue-50 px-2 py-1 font-semibold text-sosoeat-blue-600 [&_svg]:stroke-sosoeat-blue-600',
  groupEat:
    'rounded-lg bg-sosoeat-orange-100 px-2 py-1 font-semibold text-sosoeat-orange-600 [&_svg]:stroke-sosoeat-orange-600',
};
export function MainPageCard(meeting: Meeting) {
  const [showAlt, setShowAlt] = useState(false);

  const startDate = new TZDate(new Date(), 'Asia/Seoul');
  const endDate = new TZDate(meeting.registrationEnd, 'Asia/Seoul');

  // 마감 시각 포맷 (서울 기준)
  const registrationEndFormatted = format(endDate, 'HH:mm', { locale: ko });

  // "2일 5시간 30분 남음" 마감시간
  const duration = intervalToDuration({ start: startDate, end: endDate });
  const hoursUntilEnd = differenceInHours(endDate, startDate);
  //끝났는지
  const isEnded = hoursUntilEnd <= 0;
  //곧 끝나는지
  const isClosingSoon = !isEnded && hoursUntilEnd < 24;

  const countdownText = `${(duration.months ?? 0) > 0 ? `${duration.months}개월` : ''} ${Math.max(0, duration.days ?? 0)}일 ${Math.max(0, duration.hours ?? 0)}시간 ${Math.max(0, duration.minutes ?? 0)}분 남음`;

  useEffect(() => {
    if (!isClosingSoon) return;
    const id = setInterval(() => setShowAlt((prev) => !prev), 2500);
    return () => clearInterval(id);
  }, [isClosingSoon]);

  //시작 시간
  const formatted = format(parseISO(meeting.dateTime), 'M/d(E) HH:mm', { locale: ko });

  return (
    <Card className={'test-sm h-105.5 w-90 overflow-hidden pt-0 font-medium'}>
      <div className="relative aspect-video w-full shrink-0 overflow-hidden">
        <div className="absolute inset-0 z-10 bg-black/35" />
        <Image
          src={meeting.image}
          fill
          sizes="360px"
          alt="main-page-card-image"
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-base font-bold">{meeting.name}</CardTitle>
        {/* 좋아요 버튼 */}
        <CardAction>
          <Button
            variant={'outline'}
            size={'icon'}
            className="h-12.5 w-12.5 cursor-pointer rounded-full"
          >
            <motion.div
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              whileTap={{ scale: [0.1, 1.15, 0.8], transition: { duration: 1, ease: 'easeOut' } }}
              className="flex items-center justify-center"
            >
              <Image
                src="/icons/main-page-heart.svg"
                alt="좋아요"
                width={36}
                height={33}
                className=""
              />
            </motion.div>
          </Button>
        </CardAction>
        <CardDescription>
          <span className="flex items-center gap-1">
            <MapPin className="size-3" />
            {meeting.region}
          </span>
          <span className="flex items-center justify-baseline gap-1">
            <Clock className="size-3" />
            {formatted}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="text-[#6B7280]">
        <div
          className={cn('mb-4 -ml-1 flex items-center gap-1', variantTagStyles[meeting.variant])}
        >
          <Tag className="size-3 shrink-0" />
          <div className="relative min-h-[1.25em] overflow-hidden">
            {isEnded ? (
              <span>마감 종료</span>
            ) : isClosingSoon ? (
              <AnimatePresence mode="wait">
                {showAlt ? (
                  <motion.span
                    key="countdown"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {countdownText}
                  </motion.span>
                ) : (
                  <motion.span
                    key="closing-soon"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    오늘 {registrationEndFormatted} 마감
                  </motion.span>
                )}
              </AnimatePresence>
            ) : (
              <span>{countdownText}</span>
            )}
          </div>
        </div>
        <ProgressWithLabel
          current={meeting.participantCount}
          max={meeting.capacity}
          variant={meeting.variant}
          className="text-xs font-semibold"
        />
        <div className="mt-1 flex items-center">
          <Image
            src={meeting.host.image}
            alt="frofile-img"
            width={32}
            height={32}
            className="rounded-full ring-2 ring-gray-300"
          />
          <span className="ml-2 block text-base font-semibold">{meeting.host.name}</span>
        </div>
      </CardContent>
    </Card>
  );
}
