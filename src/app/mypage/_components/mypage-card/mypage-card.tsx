'use client';

import Image from 'next/image';

import { Calendar, Clock, LucideIcon,MapPin, UserRound } from 'lucide-react';

import { EstablishmentStatusBadge } from '@/components/common/establishment-status-badge';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent,CardDescription, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { MyPageCardProps } from './mypage-card.types';

const VARIANT_CONFIG = {
  groupBuy: {
    label: '공동구매',
    icon: '/icons/main-page-buy.svg',
    badgeStyle: 'bg-sosoeat-blue-600/90 text-white hover:bg-sosoeat-blue-600',
  },
  groupEat: {
    label: '함께먹기',
    icon: '/icons/main-page-fork.svg',
    badgeStyle: 'bg-sosoeat-orange-600/90 text-white hover:bg-sosoeat-orange-600',
  },
} as const;

const VariantBadge = ({
  config,
}: {
  config: (typeof VARIANT_CONFIG)[keyof typeof VARIANT_CONFIG];
}) => (
  <span
    className={cn(
      'flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold',
      config.badgeStyle
    )}
  >
    <Image src={config.icon} alt="" width={11} height={11} className="shrink-0" />
    {config.label}
  </span>
);

const InfoItem = ({ Icon, text }: { Icon: LucideIcon; text?: string }) => {
  if (!text) return null;
  return (
    <span className="flex items-center gap-1">
      <Icon className="text-sosoeat-gray-600 size-3" />
      {text}
    </span>
  );
};

const StatusBadgeGroup = ({
  confirmedAt,
  variant,
}: {
  confirmedAt: null;
  variant: keyof typeof VARIANT_CONFIG;
}) => (
  <div className="flex items-center gap-2">
    <Badge
      variant="secondary"
      className="bg-sosoeat-orange-100 text-sosoeat-orange-700 h-8 shrink-0 rounded-full px-3 text-sm font-medium shadow-none"
    >
      이용 예정
    </Badge>
    <EstablishmentStatusBadge confirmedAt={confirmedAt} variant={variant} />
  </div>
);

export function MyPageCard({
  title,
  currentCount,
  maxCount,
  location,
  month,
  day,
  hour,
  minute,
  imageUrl = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=720',
  variant = 'groupEat',
  className,
}: MyPageCardProps) {
  const config = VARIANT_CONFIG[variant];
  const dateText = month && day ? `${month}월 ${day}일` : undefined;
  const timeText =
    hour !== undefined && minute !== undefined
      ? `${hour}:${String(minute).padStart(2, '0')}`
      : undefined;

  return (
    <Card
      className={cn(
        'flex overflow-hidden rounded-4xl border-none p-0 shadow-none',
        'gap-0 max-md:w-[343px] max-md:flex-col md:h-60 md:w-[530px] md:flex-row md:items-center md:gap-4 md:px-4',
        className
      )}
    >
      {/* 이미지 영역 */}
      <div className="relative shrink-0 overflow-hidden max-md:h-[156px] max-md:w-full max-md:rounded-t-4xl md:size-47 md:rounded-2xl">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
        <div className="absolute top-4 left-4 md:hidden">
          <VariantBadge config={config} />
        </div>
      </div>

      {/* 정보 영역 */}
      <div className="flex h-full flex-1 flex-col justify-between p-3 md:px-0 md:py-4">
        {/* 상단 섹션 */}
        <div className="flex flex-col gap-3">
          {/* 카테고리 뱃지 - 웹 */}
          <div className="mt-3 hidden md:block">
            <VariantBadge config={config} />
          </div>

          {/* 상태 뱃지 - 모바일 */}
          <div className="md:hidden">
            <StatusBadgeGroup confirmedAt={null} variant={variant} />
          </div>

          {/* 제목 및 인원 */}
          <div className="flex flex-col gap-1">
            <CardTitle className="text-sosoeat-gray-800 line-clamp-1 text-lg font-bold">
              {title}
            </CardTitle>
            <CardDescription className="text-sosoeat-gray-800 flex items-center gap-1 font-medium">
              <UserRound className="text-sosoeat-gray-600 size-3" />
              {currentCount}/{maxCount}
            </CardDescription>
          </div>

          {/* 위치 / 날짜 / 시간 */}
          <CardContent className="text-sosoeat-gray-600 flex flex-wrap gap-x-3 gap-y-1 p-0 text-sm font-medium">
            <InfoItem Icon={MapPin} text={location} />
            <InfoItem Icon={Calendar} text={dateText} />
            <InfoItem Icon={Clock} text={timeText} />
          </CardContent>
        </div>

        {/* 상태 뱃지 - 웹 */}
        <div className="mt-4 hidden md:block">
          <StatusBadgeGroup confirmedAt={null} variant={variant} />
        </div>
      </div>
    </Card>
  );
}
