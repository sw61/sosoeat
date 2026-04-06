'use client';

import Image from 'next/image';

import { Calendar, Clock, LucideIcon, MapPin, UserRound } from 'lucide-react';

import { EstablishmentStatusBadge } from '@/entities/meeting/ui/establishment-status-badge';
import { HeartButton } from '@/features/favorites/ui/heart-button';
import { cn } from '@/shared/lib/utils';
import { Card, CardContent, CardDescription, CardTitle } from '@/shared/ui/card';
import { UseStateBadge } from '@/shared/ui/use-state-badge/use-state-badge';

import type { MyPageCardProps } from './mypage-card.types';

type Variant = MyPageCardProps['variant'];

const VARIANT_CONFIG: Record<Variant, { label: string; icon: string; badgeStyle: string }> = {
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
};

const DEFAULT_IMAGE_URL =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=720';

const formatDate = (month: number, day: number) => `${month}월 ${day}일`;
const formatTime = (hour: number, minute: number) => `${hour}:${String(minute).padStart(2, '0')}`;

function VariantBadge({ variant }: { variant: Variant }) {
  const { label, icon, badgeStyle } = VARIANT_CONFIG[variant];
  return (
    <span
      className={cn(
        'flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold',
        badgeStyle
      )}
    >
      <Image src={icon} alt="" width={11} height={11} className="shrink-0" />
      {label}
    </span>
  );
}

function InfoItem({ Icon, text }: { Icon: LucideIcon; text: string }) {
  return (
    <span className="flex items-center gap-1">
      <Icon className="text-sosoeat-gray-600 size-3" aria-hidden="true" />
      {text}
    </span>
  );
}

// 상태 뱃지
function StatusBadgeGroup({
  confirmedAt,
  isCompleted,
  isFavorited,
  variant,
  meetingId,
}: {
  confirmedAt: Date | null;
  isCompleted: boolean;
  isFavorited: boolean;
  variant: Variant;
  meetingId: number;
}) {
  return (
    <div className="flex items-center gap-2">
      {isCompleted ? (
        <UseStateBadge variant={variant} status="completed" />
      ) : confirmedAt ? (
        <>
          <UseStateBadge variant={variant} status="upcoming" />
          <EstablishmentStatusBadge confirmedAt={confirmedAt} variant={variant} />
        </>
      ) : (
        <EstablishmentStatusBadge confirmedAt={null} variant={variant} />
      )}
      <HeartButton
        className="relative -top-3 left-0 ml-auto max-md:hidden"
        meetingId={meetingId}
        isFavorited={isFavorited}
      />
    </div>
  );
}

export function MyPageCard({
  meetingId,
  title,
  currentCount,
  maxCount,
  location,
  month,
  day,
  hour,
  minute,
  confirmedAt = null,
  isCompleted = false,
  isFavorited = false,
  imageUrl = DEFAULT_IMAGE_URL,
  imageAlt,
  variant,
  className,
}: MyPageCardProps) {
  return (
    <Card
      className={cn(
        'flex overflow-hidden rounded-4xl border-none p-0 shadow-none',
        'gap-0 max-md:w-85.75 max-md:flex-col md:h-60 md:w-132.5 md:flex-row md:items-center md:gap-4 md:px-4',
        className
      )}
    >
      {/* 이미지 */}
      <div className="relative shrink-0 overflow-hidden max-md:h-39 max-md:w-full max-md:rounded-t-4xl md:size-47 md:rounded-2xl">
        <Image src={imageUrl} alt={imageAlt ?? title} fill className="object-cover" />

        {/* 이미지 위 오버레이 (모바일 전용) */}
        <div className="absolute top-1 right-4 left-4 flex items-center justify-between md:hidden">
          <VariantBadge variant={variant} />
          <HeartButton
            className="relative top-3 left-1"
            meetingId={meetingId}
            isFavorited={isFavorited}
          />
        </div>
      </div>

      {/* 정보 영역 */}
      <div className="flex h-full flex-1 flex-col justify-between p-3 md:px-0 md:py-4">
        {/* 카테고리 뱃지 (웹) */}
        <div className="mt-3 hidden md:block">
          <VariantBadge variant={variant} />
        </div>

        {/* 상태 뱃지 (모바일) */}
        <div className="py-2 md:hidden">
          <StatusBadgeGroup
            confirmedAt={confirmedAt}
            isCompleted={isCompleted}
            isFavorited={isFavorited}
            variant={variant}
            meetingId={meetingId}
          />
        </div>

        {/* 제목 / 인원 */}
        <div className="flex flex-col gap-1">
          <CardTitle className="text-sosoeat-gray-800 line-clamp-1 text-lg font-bold">
            {title}
          </CardTitle>
          <CardDescription className="text-sosoeat-gray-800 flex items-center gap-1 font-medium">
            <UserRound className="text-sosoeat-gray-600 size-3" aria-hidden focusable={false} />
            {currentCount}/{maxCount}
          </CardDescription>
        </div>

        {/* 위치 / 날짜 / 시간 */}
        <CardContent className="text-sosoeat-gray-600 flex flex-wrap gap-x-3 gap-y-1 p-0 text-sm font-medium">
          <InfoItem Icon={MapPin} text={location} />
          <InfoItem Icon={Calendar} text={formatDate(month, day)} />
          <InfoItem Icon={Clock} text={formatTime(hour, minute)} />
        </CardContent>

        {/* 상태 뱃지 (웹) */}
        <div className="mt-4 hidden md:block">
          <StatusBadgeGroup
            confirmedAt={confirmedAt}
            isCompleted={isCompleted}
            isFavorited={isFavorited}
            variant={variant}
            meetingId={meetingId}
          />
        </div>
      </div>
    </Card>
  );
}
