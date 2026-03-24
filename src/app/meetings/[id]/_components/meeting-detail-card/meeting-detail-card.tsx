'use client';

import { CalendarIcon, EllipsisIcon, MapPinIcon } from 'lucide-react';

import { ProgressWithLabel } from '@/components/common/progress-with-label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown';
import { cn } from '@/lib/utils';
import type { MeetingCategory } from '@/types/meeting';

import type { MeetingDetailCardProps } from './meeting-detail-card.types';

const categoryColorClass: Record<MeetingCategory, string> = {
  groupEat: 'bg-sosoeat-orange-600 text-white hover:bg-sosoeat-orange-700',
  groupBuy: 'bg-sosoeat-blue-600 text-white hover:bg-sosoeat-blue-700',
};

export function MeetingDetailCard(props: MeetingDetailCardProps) {
  const { meeting, status, timerBadge, likeButton } = props;

  const colorClass = categoryColorClass[meeting.type];

  const actionButton = (() => {
    if (status === 'closed') {
      return (
        <Button className="w-full" disabled>
          마감된 모임
        </Button>
      );
    }

    if (props.role === 'host') {
      if (status === 'confirmed') {
        return (
          <Button variant="outline" className="w-full" onClick={props.onShare}>
            공유하기
          </Button>
        );
      }
      return (
        <Button className={cn('w-full', colorClass)} onClick={props.onConfirm}>
          모임 확정하기
        </Button>
      );
    }

    if (props.role === 'participant' && props.isJoined) {
      return (
        <Button variant="outline" className="w-full" onClick={props.onCancel}>
          참여 취소하기
        </Button>
      );
    }

    return (
      <Button className={cn('w-full', colorClass)} onClick={props.onJoin}>
        참여하기
      </Button>
    );
  })();

  const participantsSection = (
    <ProgressWithLabel
      id={`meeting-${meeting.id}-progress`}
      current={meeting.participantCount}
      max={meeting.capacity}
      variant={meeting.type}
    />
  );

  const hostSection = (
    <div className="flex items-center gap-2">
      <Avatar size="sm">
        <AvatarImage src={meeting.host.profileImage} alt={meeting.host.name} />
        <AvatarFallback>{meeting.host.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <p className="text-sm">
        <span className="text-sosoeat-gray-500">호스트 </span>
        <span className="font-medium">{meeting.host.name}</span>
      </p>
    </div>
  );

  return (
    <div className="border-sosoeat-gray-300 rounded-2xl border bg-white p-4 shadow-sm">
      {/* 상단: 타이머 뱃지 + 더보기 버튼 */}
      <div className="mb-3 flex items-center justify-between">
        <div>{timerBadge}</div>
        {props.role === 'host' && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="더보기">
                <EllipsisIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={props.onEdit}>수정하기</DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onClick={props.onDelete}>
                삭제하기
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* 제목 */}
      <h2 className="mb-3 text-lg leading-snug font-bold">{meeting.name}</h2>

      {/* 날짜/시간 */}
      <div className="text-sosoeat-gray-700 mb-2 flex items-center gap-1.5 text-sm">
        <CalendarIcon className="h-4 w-4 shrink-0" />
        <span>{meeting.dateTime}</span>
      </div>

      {/* 장소 */}
      <div className="text-sosoeat-gray-700 mb-4 flex items-start gap-1.5 text-sm">
        <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0" />
        <div>
          <p>{meeting.region}</p>
          <p className="text-sosoeat-gray-500">{meeting.address}</p>
        </div>
      </div>

      {/* 모바일: 아코디언 / 태블릿+PC: 항상 펼침 */}
      <div className="md:hidden">
        <Accordion type="single" collapsible>
          <AccordionItem value="details" className="border-sosoeat-gray-300">
            <AccordionTrigger className="py-2 text-sm font-medium">
              참여 현황 및 호스트 정보
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {participantsSection}
                {hostSection}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="mb-4 hidden space-y-4 md:block">
        {participantsSection}
        {hostSection}
      </div>

      {/* 액션 영역 */}
      <div className="mt-4 flex items-center gap-2">
        <div className="h-[40px] w-[245px] md:w-[272px] lg:h-[62px] lg:w-[474px]">
          {actionButton}
        </div>
        <div className="shrink-0">{likeButton}</div>
      </div>
    </div>
  );
}
