'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { TZDate } from '@date-fns/tz';
import { differenceInHours, format, intervalToDuration, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Clock, MapPin, Tag, Users } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import type { Meeting } from '@/components/common/main-page-card/main-page-card.type';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress-bar';
import { cn } from '@/lib/utils';

const VARIANT_LABEL = {
  groupBuy: '공동구매',
  groupEat: '함께먹기',
} as const;

const variantTagStyles = {
  groupBuy:
    'bg-sosoeat-blue-200 pl-3 pr-3 py-1.5 rounded-[14px] font-bold text-xs text-sosoeat-blue-600 [&_svg]:stroke-sosoeat-blue-600',
  groupEat:
    'bg-sosoeat-orange-200 pl-3 pr-3 py-1.5 rounded-[14px] font-bold text-xs text-sosoeat-orange-600 [&_svg]:stroke-sosoeat-orange-600',
};

const variantImageBadgeStyles = {
  groupBuy: 'bg-sosoeat-blue-600/90 text-white',
  groupEat: 'bg-sosoeat-orange-600/90 text-white',
};

export function MainPageCard(meeting: Meeting) {
  const [showAlt, setShowAlt] = useState(false);
  const [now, setNow] = useState(() => new Date());

  const startDate = new TZDate(new Date(), 'Asia/Seoul');
  const endDate = new TZDate(meeting.registrationEnd, 'Asia/Seoul');

  const registrationEndFormatted = format(endDate, 'HH:mm', { locale: ko });
  const duration = intervalToDuration({ start: startDate, end: endDate });
  const hoursUntilEnd = differenceInHours(endDate, startDate);
  const isEnded = hoursUntilEnd <= 0;
  const isClosingSoon = !isEnded && hoursUntilEnd < 24;
  const isToday = format(endDate, 'yyyy-MM-dd') === format(startDate, 'yyyy-MM-dd');
  const dateLabel = isToday ? '오늘' : '내일';

  const countdownText = `${(duration.months ?? 0) > 0 ? `${duration.months}개월` : ''} ${Math.max(0, duration.days ?? 0)}일 ${Math.max(0, duration.hours ?? 0)}시간 ${Math.max(0, duration.minutes ?? 0)}분 남음`;

  useEffect(() => {
    if (!isClosingSoon) return;
    const id = setInterval(() => setShowAlt((prev) => !prev), 2500);
    return () => clearInterval(id);
  }, [isClosingSoon]);
  useEffect(() => {
    if (!isClosingSoon && !isEnded) return;
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, [isClosingSoon, isEnded]);

  const formatted = format(parseISO(meeting.dateTime), 'M/d(E) HH:mm', { locale: ko });
  const progress = (meeting.participantCount / meeting.capacity) * 100;

  return (
    <div className="flex w-[362px] flex-col overflow-hidden rounded-2xl bg-white font-medium">
      {/* 이미지 영역 */}
      <div className="relative h-[180px] w-full shrink-0 overflow-hidden">
        <Image
          src={meeting.image}
          fill
          sizes="362px"
          alt="main-page-card-image"
          className="object-cover"
        />
        {/* 하단 그라데이션 오버레이 */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.3) 100%)',
          }}
        />
        {/* 이미지 상단 배지: 함께먹기 / 공동구매 */}
        <span
          className={cn(
            'absolute top-3 left-3 z-20 rounded-full px-3 py-1 text-xs font-bold',
            variantImageBadgeStyles[meeting.variant]
          )}
        >
          {VARIANT_LABEL[meeting.variant]}
        </span>
        {/* 좋아요 버튼 */}
      </div>

      {/* 본문 영역 */}
      <div className="flex flex-col px-4 pt-4 pb-4">
        {/* 제목 + 좋아요 */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sosoeat-gray-900 min-w-0 flex-1 text-base leading-6 font-bold">
            {meeting.name}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            className="border-sosoeat-gray-300 h-[50px] w-[50px] cursor-pointer rounded-full border bg-white/90 hover:bg-white/90"
          >
            <motion.div
              animate={{ scale: 0.8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              whileTap={{
                scale: [0.1, 1.15, 0.8],
                transition: { duration: 1, ease: 'easeOut' },
              }}
              className="flex items-center justify-center"
            >
              <Image src="/icons/main-page-heart.svg" alt="좋아요" width={40} height={40} />
            </motion.div>
          </Button>
        </div>

        {/* 지역, 일시 */}
        <div className="mt-2 flex flex-col gap-1.5">
          <span className="text-sosoeat-gray-700 flex items-center gap-1.5 text-xs font-medium">
            <MapPin className="stroke-sosoeat-gray-700 size-3 shrink-0" />
            {meeting.region}
          </span>
          <span className="text-sosoeat-gray-700 flex items-center gap-1.5 text-xs font-medium">
            <Clock className="stroke-sosoeat-gray-700 size-3 shrink-0" />
            {formatted}
          </span>
        </div>

        {/* 마감 카운트다운 배지 */}
        <div className={cn('mt-4 flex items-center gap-1.5', variantTagStyles[meeting.variant])}>
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
                    {dateLabel} {registrationEndFormatted} 마감
                  </motion.span>
                )}
              </AnimatePresence>
            ) : (
              <span>{countdownText}</span>
            )}
          </div>
        </div>

        {/* 참여 진행률 */}
        <div className="mt-4 flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <Users className="stroke-sosoeat-gray-700 size-3 shrink-0" />
            <span className="text-sosoeat-gray-700 text-xs font-medium">
              {meeting.participantCount}/{meeting.capacity}명 참여중
            </span>
          </div>
          <Progress
            value={progress}
            variant={meeting.variant}
            className="bg-sosoeat-gray-200 h-1.5 w-full max-w-[328px]"
          />
        </div>

        {/* 호스트 */}
        <div className="border-sosoeat-gray-100 mt-4 flex items-center gap-2 border-t pt-4">
          <Image
            src={meeting.host.image}
            alt={meeting.host.name}
            width={32}
            height={32}
            className="border-sosoeat-gray-300 rounded-full border object-cover"
          />
          <span className="text-sosoeat-gray-600 text-xs font-medium">{meeting.host.name}</span>
        </div>
      </div>
    </div>
  );
}
