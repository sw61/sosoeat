'use client';

import { useState } from 'react';

import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisIcon,
  MapPinIcon,
  UsersIcon,
} from 'lucide-react';

import { DeadlineBadge } from '@/components/common/deadline-badge';
import { HeartButton } from '@/components/common/heart-button';
import { ProgressWithLabel } from '@/components/common/progress-with-label';
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

const categoryLabel: Record<MeetingCategory, string> = {
  groupEat: '같이먹기',
  groupBuy: '공동구매',
};

export function MeetingDetailCard(props: MeetingDetailCardProps) {
  const { meeting, status, isLiked, onLikeToggle } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const colorClass = categoryColorClass[meeting.type];

  // dateTime 파싱 (예: '2024/03/15(금) 18:30')
  const [datePart, timePart] = meeting.dateTime.split(' ');
  const dateMatch = datePart?.match(/\d+\/(\d+)\/(\d+)/);
  const mobileDateLabel = dateMatch
    ? `${parseInt(dateMatch[1])}월 ${parseInt(dateMatch[2])}일`
    : (datePart ?? '');
  const mobileTimeLabel = timePart ?? '';

  const actionButton = (() => {
    if (status === 'closed') {
      return (
        <Button className="flex-1" disabled>
          마감된 모임
        </Button>
      );
    }

    if (props.role === 'host') {
      if (status === 'confirmed') {
        return (
          <Button variant="outline" className="flex-1" onClick={props.onShare}>
            공유하기
          </Button>
        );
      }
      return (
        <Button className={cn('flex-1', colorClass)} onClick={props.onConfirm}>
          모임 확정하기
        </Button>
      );
    }

    if (props.role === 'participant' && props.isJoined) {
      return (
        <Button variant="outline" className="flex-1" onClick={props.onCancel}>
          참여 취소하기
        </Button>
      );
    }

    return (
      <Button className={cn('flex-1', colorClass)} onClick={props.onJoin}>
        참여하기
      </Button>
    );
  })();

  const ellipsisMenu =
    props.role === 'host' ? (
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
    ) : null;

  return (
    <div className="border-sosoeat-gray-300 rounded-2xl border bg-white px-6 py-4 shadow-sm">
      {/* ── 태블릿+ 레이아웃 (md~) ── */}
      <div className="hidden md:block">
        {/* 상단: 마감 뱃지 + 더보기 */}
        <div className="mb-3 flex items-center justify-between">
          <DeadlineBadge registrationEnd={meeting.registrationEnd} variant={meeting.type} />
          {ellipsisMenu}
        </div>

        {/* 제목 */}
        <h2 className="mb-4 text-xl leading-snug font-bold">{meeting.name}</h2>

        {/* 날짜/시간 */}
        <div className="mb-3 flex items-center gap-3">
          <div className="bg-sosoeat-orange-50 flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
            <CalendarIcon className="text-sosoeat-orange-600 h-4 w-4" />
          </div>
          <div>
            <p className="text-sosoeat-gray-500 text-xs">날짜 및 시간</p>
            <p className="text-sm font-bold">{meeting.dateTime}</p>
          </div>
        </div>

        {/* 장소 */}
        <div className="mb-3 flex items-start gap-3">
          <div className="bg-sosoeat-orange-50 flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
            <MapPinIcon className="text-sosoeat-orange-600 h-4 w-4" />
          </div>
          <div>
            <p className="text-sosoeat-gray-500 text-xs">장소</p>
            <p className="text-sm font-bold">{meeting.region}</p>
            <p className="text-sosoeat-gray-500 text-xs">{meeting.address}</p>
          </div>
        </div>

        {/* 참여 현황 */}
        <div className="mb-3 flex items-start gap-3">
          <div className="bg-sosoeat-gray-100 flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
            <UsersIcon className="text-sosoeat-gray-700 h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="text-sosoeat-gray-500 mb-1 text-xs">참여 현황</p>
            <ProgressWithLabel
              id={`meeting-${meeting.id}-progress-desktop`}
              current={meeting.participantCount}
              max={meeting.capacity}
              variant={meeting.type}
            />
          </div>
        </div>

        {/* 호스트 */}
        <div className="mb-4 flex items-center gap-3">
          <Avatar size="sm">
            <AvatarImage src={meeting.host.profileImage} alt={meeting.host.name} />
            <AvatarFallback>{meeting.host.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sosoeat-gray-500 text-xs">호스트</p>
            <p className="text-sm font-bold">{meeting.host.name}</p>
          </div>
        </div>

        {/* 액션 */}
        <div className="flex items-center gap-2">
          {actionButton}
          <HeartButton
            isLiked={isLiked}
            onToggle={onLikeToggle ?? (() => {})}
            className="relative inset-auto m-0"
          />
        </div>
      </div>

      {/* ── 모바일 레이아웃 (~md) ── */}
      <div className="md:hidden">
        {/* 상단 행: 날짜·시간 pill + 더보기 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="border-sosoeat-orange-600 text-sosoeat-orange-600 rounded-full border px-3 py-1 text-sm font-medium">
              {mobileDateLabel}
            </span>
            <span className="border-sosoeat-gray-300 text-sosoeat-gray-700 rounded-full border px-3 py-1 text-sm">
              {mobileTimeLabel}
            </span>
          </div>
          {ellipsisMenu}
        </div>

        {/* 제목 */}
        <h2 className="mt-3 text-lg leading-snug font-bold">{meeting.name}</h2>

        {/* 장소 한 줄 */}
        <div className="mt-2 flex items-center gap-1">
          <MapPinIcon className="text-sosoeat-gray-500 h-4 w-4 shrink-0" />
          <span className="text-sosoeat-gray-500 text-sm">
            {meeting.region} · {categoryLabel[meeting.type]}
          </span>
        </div>

        {/* 펼침 영역 */}
        {isExpanded && (
          <div className="mt-4 space-y-4">
            {/* 참여 현황 */}
            <div className="flex items-start gap-3">
              <div className="bg-sosoeat-gray-100 flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                <UsersIcon className="text-sosoeat-gray-700 h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sosoeat-gray-500 mb-1 text-xs">참여 현황</p>
                <ProgressWithLabel
                  id={`meeting-${meeting.id}-progress-mobile`}
                  current={meeting.participantCount}
                  max={meeting.capacity}
                  variant={meeting.type}
                />
              </div>
            </div>

            {/* 호스트 */}
            <div className="flex items-center gap-3">
              <Avatar size="sm">
                <AvatarImage src={meeting.host.profileImage} alt={meeting.host.name} />
                <AvatarFallback>{meeting.host.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sosoeat-gray-500 text-xs">호스트</p>
                <p className="text-sm font-bold">{meeting.host.name}</p>
              </div>
            </div>
          </div>
        )}

        {/* 액션 행 */}
        <div className="mt-4 flex items-center gap-2">
          {actionButton}
          <HeartButton
            isLiked={isLiked}
            onToggle={onLikeToggle ?? (() => {})}
            className="relative inset-auto m-0"
          />
        </div>

        {/* chevron 토글 */}
        <div className="mt-2 flex justify-center">
          <button
            type="button"
            aria-label={isExpanded ? '접기' : '펼치기'}
            onClick={() => setIsExpanded((prev) => !prev)}
            className="text-sosoeat-gray-400"
          >
            {isExpanded ? (
              <ChevronUpIcon className="h-5 w-5" />
            ) : (
              <ChevronDownIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
