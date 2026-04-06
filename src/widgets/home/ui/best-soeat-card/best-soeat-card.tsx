import Image from 'next/image';

import { Clock, MapPin } from 'lucide-react';

import { useDetailRouter } from '@/entities/meeting/model/use-detail-router';
import { cn } from '@/shared/lib/utils';
import { Card, CardContent, CardTitle } from '@/shared/ui/card';

import type { BestSoeatCardProps } from './best-soeat-card.types';

export function BestSoeatCard({
  id,
  title,
  region,
  meetingAt,
  thumbnailUrl,
  thumbnailAlt = '모임 이미지',
}: BestSoeatCardProps) {
  const { handleCardClick, handleCardKeyDown } = useDetailRouter({ id });

  return (
    <Card
      className={cn(
        'border-sosoeat-gray-400 h-[200px] min-w-[218px] cursor-pointer gap-0 border py-0 ring-0'
      )}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
    >
      {/* 썸네일 */}
      <div className="bg-muted relative w-full flex-1">
        <Image
          src={thumbnailUrl ?? '/images/group-buy-modal.png'}
          alt={thumbnailAlt}
          fill
          className="object-cover"
          sizes="218px"
        />
      </div>

      {/* 카드 정보 */}
      <CardContent className="flex flex-col p-3">
        <CardTitle className="mb-1.5 line-clamp-1 text-sm leading-(--text-xs--line-height) font-bold">
          {title}
        </CardTitle>
        <div className="text-sosoeat-gray-700 flex items-center gap-1 text-xs">
          <MapPin className="h-2.5 w-2.5 shrink-0" />
          <span className="truncate">{region}</span>
        </div>
        <div className="text-sosoeat-gray-700 flex items-center gap-1 text-xs">
          <Clock className="h-2.5 w-2.5 shrink-0" />
          <span className="truncate">{meetingAt}</span>
        </div>
      </CardContent>
    </Card>
  );
}
