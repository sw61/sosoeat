'use client';

import { CalendarIcon, ChevronDownIcon, ChevronUpIcon, MapPinIcon, UsersIcon } from 'lucide-react';

import {
  DateBadge,
  TimeBadge,
} from '@/app/meetings/[id]/_components/meeting-detail-card/date-badge';
import { DeadlineBadge } from '@/components/common/deadline-badge';
import { HeartButton } from '@/components/common/heart-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { MeetingCategory } from '@/types/meeting';

import { ActionButton } from './_components/action-button';
import { EllipsisMenu } from './_components/ellipsis-menu';
import { MeetingDetailProgress } from './_components/meeting-detail-progress';
import { useMeetingDetailCard } from './hooks/use-meeting-detail-card';
import { iconBgVariants, iconColorVariants } from './meeting-detail-card.constants';
import type { MeetingDetailCardProps } from './meeting-detail-card.types';

// 모임 정보 행 컴포넌트(날짜, 장소)
interface InfoRowProps {
  icon: React.ReactNode;
  category: MeetingCategory;
  label: string;
  children: React.ReactNode;
  className?: string;
}

function InfoRow({ icon, category, label, children, className }: InfoRowProps) {
  return (
    <div className={cn('flex items-start gap-3', className)}>
      <div
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
          iconBgVariants({ category })
        )}
      >
        <div className={cn('h-4 w-4 [&>svg]:h-4 [&>svg]:w-4', iconColorVariants({ category }))}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-sosoeat-gray-600 text-xs font-semibold">{label}</p>
        {children}
      </div>
    </div>
  );
}

// 참여 현황 행 컴포넌트
interface ParticipantsRowProps {
  meetingId: string;
  current: number;
  max: number;
  category: MeetingCategory;
  className?: string;
}

function ParticipantsRow({ meetingId, current, max, category, className }: ParticipantsRowProps) {
  return (
    <div className={cn('flex items-start gap-3', className)}>
      <div className="bg-sosoeat-gray-100 flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
        <UsersIcon className="text-sosoeat-gray-700 h-4 w-4" />
      </div>
      <div className="flex-1">
        <p className="text-sosoeat-gray-600 mb-1 text-xs font-semibold lg:text-sm">참여 현황</p>
        <MeetingDetailProgress
          id={`meeting-${meetingId}-progress`}
          current={current}
          max={max}
          variant={category}
          className="max-w-[500px]"
        />
      </div>
    </div>
  );
}

// 호스트 행 컴포넌트
interface HostRowProps {
  name: string;
  profileImage?: string;
  className?: string;
}

function HostRow({ name, profileImage, className }: HostRowProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Avatar size="default">
        <AvatarImage src={profileImage} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sosoeat-gray-600 text-xs font-semibold">호스트</p>
        <p className="text-xs font-bold">{name}</p>
      </div>
    </div>
  );
}

interface InfoSectionProps {
  meeting: MeetingDetailCardProps['meeting'];
  category: MeetingCategory;
  fullDateLabel: string;
  className?: string;
}

function InfoSection({ meeting, category, fullDateLabel, className }: InfoSectionProps) {
  return (
    <div className={cn('flex flex-col gap-[10px]', className)}>
      <InfoRow icon={<CalendarIcon />} category={category} label="날짜 및 시간">
        <p className="text-sosoeat-gray-900 text-xs font-bold lg:text-sm">{fullDateLabel}</p>
      </InfoRow>

      <InfoRow icon={<MapPinIcon />} category={category} label="장소">
        <p className="text-sosoeat-gray-900 text-xs font-bold lg:text-sm">{meeting.region}</p>
        <p className="text-sosoeat-gray-600 text-xs font-bold lg:text-sm lg:font-semibold">
          {meeting.address}
        </p>
      </InfoRow>

      <ParticipantsRow
        meetingId={String(meeting.id)}
        current={meeting.participantCount}
        max={meeting.capacity}
        category={category}
      />

      <HostRow name={meeting.host.name} profileImage={meeting.host.profileImage} />
    </div>
  );
}

// 버튼, 좋아요
interface ActionRowProps {
  actionButton: React.ReactNode;
  isLiked: boolean;
  onLikeToggle: () => void;
}

function ActionRow({ actionButton, isLiked, onLikeToggle }: ActionRowProps) {
  return (
    <div className="flex items-center gap-[10px] pt-[14px] md:pt-0 lg:gap-2">
      <div className="h-[40px] w-[245px] md:w-[272px] lg:h-[62px] lg:w-full lg:max-w-[474px]">
        {actionButton}
      </div>
      <HeartButton
        isLiked={isLiked}
        onToggle={onLikeToggle}
        className="border-sosoeat-gray-500 relative inset-auto m-0"
        // TODO: 다른 팀원 작업 완료 후 사이즈 적용
        // className={cn('border-sosoeat-gray-500 relative inset-auto m-0', 'h-[40px] w-[40px] lg:h-[60px] lg:w-[60px]')}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 메인 컴포넌트
// ─────────────────────────────────────────────────────────────

export function MeetingDetailCard(props: MeetingDetailCardProps) {
  const {
    category,
    categoryLabel,
    fullDateLabel,
    isExpanded,
    toggleExpanded,
    safeOnLikeToggle,
    activeConfig,
    actionHandler,
  } = useMeetingDetailCard(props);

  const { meeting, isLiked } = props;

  const ellipsisMenu =
    props.role === 'host' ? <EllipsisMenu onEdit={props.onEdit} onDelete={props.onDelete} /> : null;

  const actionButton = (
    <ActionButton config={activeConfig} category={category} onClick={actionHandler} />
  );

  return (
    <div
      className={cn(
        'relative transition-all duration-300',
        'rounded-[20px] bg-white lg:rounded-[32px]',
        'px-6 pt-[16px] pb-[40px] md:px-4 md:py-6 lg:px-6 lg:py-4',
        'md:h-[378px] md:w-[358px] md:overflow-hidden lg:h-[460px] lg:w-[616px] lg:overflow-hidden',
        'w-[343px]',
        isExpanded && 'max-md:rounded-b-none'
      )}
    >
      {/* ════════════════════════════════════════
          모바일 (~md)
          ════════════════════════════════════════ */}
      <div className="flex flex-col md:hidden">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DateBadge date={meeting.dateTime} category={category} />
              <TimeBadge date={meeting.dateTime} />
            </div>
            {ellipsisMenu}
          </div>

          <h2 className="mt-3 text-lg leading-snug font-semibold">{meeting.name}</h2>

          <div className="mt-2 flex items-center gap-1">
            <MapPinIcon className="text-sosoeat-gray-500 h-4 w-4 shrink-0" />
            <span className="text-sosoeat-gray-500 text-sm font-medium">
              {meeting.region} · {categoryLabel}
            </span>
          </div>
        </div>

        <ActionRow actionButton={actionButton} isLiked={isLiked} onLikeToggle={safeOnLikeToggle} />

        <div className="mt-2 flex justify-center">
          <button
            type="button"
            aria-label={isExpanded ? '접기' : '펼치기'}
            onClick={toggleExpanded}
            className="text-sosoeat-gray-400"
          >
            {isExpanded ? (
              <ChevronUpIcon className="h-5 w-5" />
            ) : (
              <ChevronDownIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <div
          className={cn(
            'absolute top-full right-0 left-0 z-10',
            'rounded-b-2xl bg-white px-6',
            'overflow-hidden transition-all duration-300 ease-in-out',
            isExpanded ? 'max-h-[200px] py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
          )}
        >
          <div className="flex flex-col gap-[29px]">
            <ParticipantsRow
              meetingId={String(meeting.id)}
              current={meeting.participantCount}
              max={meeting.capacity}
              category={category}
            />
            <HostRow name={meeting.host.name} profileImage={meeting.host.profileImage} />
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          태블릿 + PC (md ~)
          ════════════════════════════════════════ */}
      <div className="hidden md:flex md:h-full md:flex-col md:justify-between lg:h-full">
        {/* 상단: 마감 배지 + 모임 제목 */}
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center justify-between">
            <DeadlineBadge registrationEnd={meeting.registrationEnd} variant={category} />
            {ellipsisMenu}
          </div>
          <h2 className="line-clamp-2 text-xl leading-snug font-semibold lg:line-clamp-none lg:text-3xl lg:font-bold">
            {meeting.name}
          </h2>
        </div>

        {/* 중단: 날짜, 장소, 참여현황, 호스트 */}
        <InfoSection meeting={meeting} category={category} fullDateLabel={fullDateLabel} />

        {/* 하단: 액션버튼 + 좋아요 */}
        <ActionRow actionButton={actionButton} isLiked={isLiked} onLikeToggle={safeOnLikeToggle} />
      </div>
    </div>
  );
}
