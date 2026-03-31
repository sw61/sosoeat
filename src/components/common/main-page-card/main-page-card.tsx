'use client';

import Image from 'next/image';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { MapPin, Users } from 'lucide-react';

import { DeadlineBadge } from '@/components/common/deadline-badge';
import { EstablishmentStatusBadge } from '@/components/common/establishment-status-badge';
import { HeartButton } from '@/components/common/heart-button';
import { Card, CardAction, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress, type ProgressProps } from '@/components/ui/progress-bar';
import { cn } from '@/lib/utils';

import type { MainPageCardProps } from './main-page-card.types';

const VARIANT_LABEL = {
  groupBuy: '공동구매',
  groupEat: '함께먹기',
} as const;

const variantImageBadgeStyles = {
  groupBuy: 'bg-sosoeat-blue-600/90 text-white',
  groupEat: 'bg-sosoeat-orange-600/90 text-white',
};

const variantImageBadgeIcon = {
  groupEat: '/icons/main-page-fork.svg',
  groupBuy: '/icons/main-page-buy.svg',
} as const;

const getProgressVariant = (meetingType: string): ProgressProps['variant'] =>
  meetingType === 'groupEat' ? 'groupEat' : 'groupBuy';

export const MainPageCard = ({ meeting }: MainPageCardProps) => {
  const variant = getProgressVariant(meeting.type);
  const formatted = format(meeting.dateTime, 'M/d(E) HH:mm', { locale: ko });
  const progress =
    (meeting.participantCount / (meeting.capacity <= 0 ? 1 : meeting.capacity)) * 100;

  const hostImage = meeting.host?.image || '/icons/human-basic.svg';

  return (
    <Card
      className={cn(
        'h-105 w-full max-w-90 gap-0 overflow-hidden rounded-2xl border border-[#F3F4F6] bg-white py-0 font-medium shadow-none ring-0'
      )}
    >
      <div className="relative h-[180px] w-full shrink-0 overflow-hidden rounded-2xl">
        <Image
          src={meeting.image}
          fill
          sizes="360px"
          alt="main-page-card-image"
          className="object-cover"
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.3) 100%)',
          }}
        />
        <span
          className={cn(
            'absolute top-3 left-3 z-20 flex items-center gap-1.5 rounded-full px-3 py-1 text-sm leading-5 font-bold',
            variantImageBadgeStyles[variant]
          )}
        >
          <Image
            src={variantImageBadgeIcon[variant]}
            alt=""
            width={11}
            height={11}
            className="shrink-0"
          />

          {VARIANT_LABEL[variant]}
        </span>
      </div>

      <CardHeader className="relative gap-0 space-y-0 rounded-none px-4 pt-0 pb-0">
        <h3
          data-slot="card-title"
          className="min-w-0 pt-4 pr-14.5 text-base leading-6 font-bold text-[#101828]"
        >
          {meeting.name}
        </h3>
        <CardAction className="absolute top-4 right-4 z-10">
          {' '}
          <HeartButton meetingId={meeting.id} />
        </CardAction>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col gap-0 px-4 pt-0 pb-0">
        {/* Figma: Heading ~16px top, 지역 블록 top 44px → 제목 아래 ~4.2px */}
        <div className="mt-[4.19px] flex flex-col gap-[5.98px]">
          <span className="text-sosoeat-gray-600 flex items-center gap-[5.98px] text-sm leading-5 font-medium">
            <MapPin className="size-4 shrink-0 stroke-[#8E8E8E]" strokeWidth={1} />
            {meeting.region}
          </span>
          <span className="text-sosoeat-gray-600 flex items-center gap-[5.98px] text-sm leading-5 font-medium">
            <Image
              src="/icons/deadline-calendar.svg"
              alt=""
              width={16}
              height={16}
              className="size-4 shrink-0"
            />
            {formatted}
          </span>
        </div>
        <div className="mt-3.5 flex items-center justify-between gap-2">
          <DeadlineBadge
            registrationEnd={meeting.registrationEnd}
            variant={variant}
            className="mt-0 min-w-0 flex-1"
          />
          <EstablishmentStatusBadge confirmedAt={meeting.confirmedAt} variant={variant} />
        </div>

        <div className="mt-3 flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Users className="size-3 shrink-0 stroke-[#6B7280]" strokeWidth={1} />
            <span className="text-xs leading-4 font-medium text-[#6B7280]">
              {meeting.participantCount}/{meeting.capacity}명 참여중
            </span>
          </div>
          <Progress
            value={progress}
            variant={variant}
            className="h-2 w-full max-w-82 bg-[#F3F4F6]"
          />
        </div>
      </CardContent>

      <CardFooter className="gap-1.5 rounded-none border-t border-[#F9FAFB] bg-transparent px-4 pt-1.5 pb-4 shadow-none ring-0">
        <Image
          src={hostImage}
          alt={meeting.host.name}
          width={32}
          height={32}
          className="border-sosoeat-gray-300 overflow-hidden rounded-full border object-cover"
        />
        <span className="text-base leading-6 font-semibold text-[#6B7280]">
          {meeting.host.name}
        </span>
      </CardFooter>
    </Card>
  );
};
