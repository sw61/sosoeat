'use client';

import Image from 'next/image';

import { MapPin } from 'lucide-react';

import { DateBadge, TimeBadge } from '@/app/meetings/_components/date-badge/date-badge';
import { HeartButton } from '@/components/common/heart-button';
import { Card, CardContent } from '@/components/ui/card';
import type { Meeting } from '@/types/meeting';

interface RecommendedMeetingCardProps {
  meeting: Meeting;
  onClick?: (id: number) => void;
}

export default function RecommendedMeetingCard({ meeting, onClick }: RecommendedMeetingCardProps) {
  return (
    <Card
      className="h-[286px] w-[302px] cursor-pointer border-none pt-0 shadow-none ring-0"
      onClick={() => onClick?.(meeting.id)}
    >
      <CardContent className="flex flex-col p-0">
        {/* ── 썸네일 ── */}
        <div className="pb-[14px]">
          <div className="relative h-[160px] w-full overflow-hidden rounded-3xl">
            <Image src={meeting.image} alt={meeting.name} fill className="object-cover" />
            <div className="absolute right-5 bottom-5" onClick={(e) => e.stopPropagation()}>
              <HeartButton size="sm" isFavorited={meeting.isFavorited} />
            </div>
          </div>
        </div>

        {/* ── 텍스트 정보 ── */}
        <div className="flex flex-col px-1">
          {/* ── 뱃지 ── */}
          <div className="flex flex-wrap items-center gap-1">
            <DateBadge date={meeting.dateTime} category={meeting.type} />
            <TimeBadge date={meeting.dateTime} />
          </div>

          {/* ── 제목 ── */}
          <p className="mt-4 line-clamp-2 text-xl font-semibold text-gray-900">{meeting.name}</p>

          {/* ── 위치 ── */}
          <div className="text-sosoeat-gray-600 mt-2 flex items-center gap-1 text-sm font-medium">
            <MapPin size={16} className="shrink-0" />
            <span>{meeting.region}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
