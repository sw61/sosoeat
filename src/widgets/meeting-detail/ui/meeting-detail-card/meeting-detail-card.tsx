'use client';

import { CalendarIcon, MapPinIcon, UserIcon, UsersIcon } from 'lucide-react';

import type { MeetingCategory } from '@/entities/meeting';
import { DeadlineBadge, EstablishmentStatusBadge } from '@/entities/meeting';
import { HeartButton } from '@/features/favorites';
// import { UseStateBadge } from '@/shared/ui/use-state-badge/use-state-badge'; // TODO: isScheduled 기준 논의 후 활성화
import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

import { ActionButton } from './_components/action-button';
import { EllipsisMenu } from './_components/ellipsis-menu';
import { MeetingDetailProgress } from './_components/meeting-detail-progress';
import { useMeetingDetailCard } from './hooks/use-meeting-detail-card';
import { iconBgVariants, iconColorVariants } from './meeting-detail-card.constants';
import type { MeetingDetailCardProps } from './meeting-detail-card.types';

// ─────────────────────────────────────────────────────────────
// InfoRow
// ─────────────────────────────────────────────────────────────

interface InfoRowProps {
  icon: React.ReactNode;
  category: MeetingCategory;
  label: string;
  children: React.ReactNode;
  className?: string;
}

function InfoRow({ icon, category, label, children, className }: InfoRowProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
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
        <p className="text-sosoeat-gray-600 text-xs font-medium">{label}</p>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ParticipantsRow
// ─────────────────────────────────────────────────────────────

interface ParticipantsRowProps {
  meetingId: string;
  current: number;
  max: number;
  category: MeetingCategory;
  className?: string;
}

function ParticipantsRow({ meetingId, current, max, category, className }: ParticipantsRowProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
          iconBgVariants({ category })
        )}
      >
        <UsersIcon className={cn('h-4 w-4', iconColorVariants({ category }))} />
      </div>
      <div className="flex-1">
        <p className="text-sosoeat-gray-600 mb-1 text-xs font-medium">참여 현황</p>
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

// ─────────────────────────────────────────────────────────────
// HostRow
// ─────────────────────────────────────────────────────────────

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
        <AvatarFallback>
          <UserIcon className="text-sosoeat-gray-400 h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sosoeat-gray-600 text-xs font-medium">호스트</p>
        <p className="text-sosoeat-gray-900 text-xs font-bold md:text-sm">{name}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// InfoSection
// ─────────────────────────────────────────────────────────────

interface InfoSectionProps {
  meeting: MeetingDetailCardProps['meeting'];
  category: MeetingCategory;
  fullDateLabel: string;
  className?: string;
}

function InfoSection({ meeting, category, fullDateLabel, className }: InfoSectionProps) {
  return (
    <div className={cn('flex flex-col gap-1 md:gap-2', className)}>
      <InfoRow icon={<CalendarIcon />} category={category} label="날짜 및 시간">
        <p className="text-sosoeat-gray-900 text-xs font-bold md:text-sm">{fullDateLabel}</p>
      </InfoRow>

      <InfoRow icon={<MapPinIcon />} category={category} label="장소">
        <p className="text-sosoeat-gray-900 text-xs font-bold md:text-sm">{meeting.region}</p>
        <p className="text-sosoeat-gray-600 text-xs font-semibold md:text-sm">{meeting.address}</p>
      </InfoRow>

      <ParticipantsRow
        meetingId={String(meeting.id)}
        current={meeting.participantCount}
        max={meeting.capacity}
        category={category}
      />

      <HostRow name={meeting.host.name} profileImage={meeting.host.image} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ActionRow
// ─────────────────────────────────────────────────────────────

interface ActionRowProps {
  actionButton: React.ReactNode;
  meetingId: number;
  isFavorited: boolean;
}

function ActionRow({ actionButton, meetingId, isFavorited }: ActionRowProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-10 w-full md:h-[62px]">{actionButton}</div>
      {/* sm·md: 40×40 */}
      <HeartButton
        meetingId={meetingId}
        isFavorited={isFavorited}
        size="sm"
        className="border-sosoeat-gray-500 relative inset-auto m-0 lg:hidden"
      />
      {/* lg: 60×60 */}
      <HeartButton
        meetingId={meetingId}
        isFavorited={isFavorited}
        size="lg"
        className="border-sosoeat-gray-500 relative inset-auto m-0 hidden lg:block"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 메인 컴포넌트
// ─────────────────────────────────────────────────────────────

export function MeetingDetailCard(props: MeetingDetailCardProps) {
  const { category, fullDateLabel, activeConfig, actionHandler } = useMeetingDetailCard(props);
  // NOTE: useMeetingDetailCard에서 isExpanded, toggleExpanded 반환 시 미사용 — 훅 정리 가능

  const { meeting } = props;

  const isConfirmed = meeting.confirmedAt != null;
  // TODO: isScheduled(이용예정) 뱃지 표시 기준 논의 필요 — 현재 비활성화
  // const isScheduled = ...;
  const hasSafetyBadge = isConfirmed; /* || isScheduled */

  const ellipsisMenu =
    props.role === 'host' ? (
      <EllipsisMenu
        onEdit={props.onEdit}
        onDelete={props.onDelete}
        isDeletePending={props.isDeletePending}
      />
    ) : null;

  const actionButton = (
    <ActionButton
      config={activeConfig}
      category={category}
      onClick={actionHandler}
      pending={props.isActionPending}
    />
  );

  return (
    <div className={cn('flex flex-col rounded-[32px] bg-white', 'p-4 md:p-6', 'gap-3 md:gap-4')}>
      {/* ════════════════════════════════════════
          sm 뱃지 섹션
          - hasSafetyBadge O: 상태 뱃지(첫 줄) + deadline(둘째 줄)
          - hasSafetyBadge X: deadline만 (첫 줄)
          ════════════════════════════════════════ */}
      <div className="flex flex-col gap-1 md:hidden">
        {hasSafetyBadge && (
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {isConfirmed && (
                <EstablishmentStatusBadge
                  confirmedAt={new Date(meeting.confirmedAt!)}
                  variant={category}
                />
              )}
              {/* {isScheduled && <UseStateBadge />} */}
            </div>
            {ellipsisMenu}
          </div>
        )}
        <div className={cn('flex items-center', !hasSafetyBadge && 'justify-between')}>
          <DeadlineBadge
            registrationEnd={new Date(meeting.registrationEnd)}
            variant={category}
            className="min-w-0 flex-1"
          />
          {!hasSafetyBadge && ellipsisMenu}
        </div>
      </div>

      {/* ════════════════════════════════════════
          md·lg 뱃지 섹션
          - deadline + 상태 뱃지 한 줄
          ════════════════════════════════════════ */}
      <div className="hidden md:flex md:items-center md:justify-between">
        <div className="flex min-w-0 items-center gap-1 overflow-hidden">
          <DeadlineBadge
            registrationEnd={new Date(meeting.registrationEnd)}
            variant={category}
            className="min-w-0 flex-1"
          />
          {isConfirmed && (
            <EstablishmentStatusBadge
              confirmedAt={new Date(meeting.confirmedAt!)}
              variant={category}
            />
          )}
          {/* {isScheduled && <UseStateBadge />} */}
        </div>
        {ellipsisMenu}
      </div>

      {/* ════════════════════════════════════════
          제목
          sm: text-xl/semibold
          md: text-2xl/bold
          lg: text-3xl/bold
          ════════════════════════════════════════ */}
      <h2 className="line-clamp-2 text-xl leading-snug font-semibold md:line-clamp-none md:text-2xl md:font-bold">
        {meeting.name}
      </h2>

      {/* ════════════════════════════════════════
          정보 (날짜, 장소, 참여현황, 호스트)
          ════════════════════════════════════════ */}
      <InfoSection meeting={meeting} category={category} fullDateLabel={fullDateLabel} />

      {/* ════════════════════════════════════════
          액션 버튼 + 좋아요
          ════════════════════════════════════════ */}
      <ActionRow
        actionButton={actionButton}
        meetingId={meeting.id}
        isFavorited={meeting.isFavorited ?? false}
      />
    </div>
  );
}
