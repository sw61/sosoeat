import { cva } from 'class-variance-authority';

import type { MeetingCategory } from '@/entities/meeting';

import type { MeetingRole, MeetingStatus } from './meeting-detail-card.types';

// ── 카테고리 레이블 ───────────────────────────────────────────

export const CATEGORY_LABEL: Record<MeetingCategory, string> = {
  groupEat: '같이먹기',
  groupBuy: '공동구매',
};

// ── cva variants ─────────────────────────────────────────────
// 색상 관련 모든 분기는 이 파일에서만 관리합니다.
// 컴포넌트는 category prop 하나만 받고, 여기서 색을 파생합니다.

/** 기본 액션 버튼 (참여하기 / 모임 확정하기) */
export const actionButtonVariants = cva(
  'h-full w-full rounded-2xl text-sm md:text-base lg:text-xl focus-visible:ring-0 focus-visible:border-transparent',
  {
    variants: {
      category: {
        groupEat:
          'bg-sosoeat-orange-600 text-white hover:bg-sosoeat-orange-700 hover:text-sosoeat-orange-100 hover:shadow-[inset_0_0_10px_1px_rgba(0,0,0,0.15)]',
        groupBuy:
          'bg-sosoeat-blue-600 text-white hover:bg-sosoeat-blue-700 hover:text-white hover:shadow-[inset_0_0_10px_1px_rgba(0,0,0,0.15)]',
      },
    },
  }
);

/** 흰 버튼 (참여 취소하기 / 공유하기) */
export const outlineButtonVariants = cva(
  'ring-0 h-full w-full rounded-2xl border-2 bg-white text-sm md:text-base lg:text-xl focus-visible:ring-0 focus-visible:border-transparent',
  {
    variants: {
      category: {
        groupEat:
          'text-sosoeat-orange-700 hover:bg-white hover:text-sosoeat-orange-700 hover:shadow-[inset_0_0_10px_1px_rgba(0,0,0,0.15)]',
        groupBuy:
          'text-sosoeat-blue-700 hover:bg-white hover:text-sosoeat-blue-700 hover:shadow-[inset_0_0_10px_1px_rgba(0,0,0,0.15)]',
      },
    },
  }
);

export const iconBgVariants = cva('', {
  variants: {
    category: {
      groupEat: 'bg-sosoeat-orange-100',
      groupBuy: 'bg-sosoeat-blue-50',
    },
  },
});

export const iconColorVariants = cva('', {
  variants: {
    category: {
      groupEat: 'text-sosoeat-orange-600',
      groupBuy: 'text-sosoeat-blue-600',
    },
  },
});

// ── OCP: 액션 버튼 설정 테이블 ───────────────────────────────
// 새로운 role/status 조합이 추가될 때 이 테이블에만 항목을 추가합니다.
// 컴포넌트/훅 내부의 분기 로직을 수정할 필요가 없습니다.

export type ActionButtonType =
  | 'closed'
  | 'host-share'
  | 'host-confirm'
  | 'participant-cancel'
  | 'join';

export interface ActionButtonConfig {
  type: ActionButtonType;
  match: (args: { role: MeetingRole; status: MeetingStatus; isJoined: boolean }) => boolean;
  label: string;
  variant: 'primary' | 'outline' | 'disabled';
}

export const ACTION_BUTTON_CONFIGS: ActionButtonConfig[] = [
  {
    type: 'closed',
    match: ({ status, role, isJoined }) =>
      status === 'closed' || (status === 'full' && role !== 'host' && !isJoined),
    label: '모집 마감',
    variant: 'disabled',
  },
  {
    type: 'host-share',
    match: ({ role, status }) => role === 'host' && status === 'confirmed',
    label: '공유하기',
    variant: 'outline',
  },
  {
    type: 'host-confirm',
    match: ({ role }) => role === 'host',
    label: '모임 확정하기',
    variant: 'primary',
  },
  {
    type: 'participant-cancel',
    match: ({ role, isJoined }) => role === 'participant' && isJoined,
    label: '참여 취소하기',
    variant: 'outline',
  },
  {
    type: 'join',
    match: () => true,
    label: '참여하기',
    variant: 'primary',
  },
];
