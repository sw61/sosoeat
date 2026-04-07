'use client';

import { useState } from 'react';

import {
  ACTION_BUTTON_CONFIGS,
  type ActionButtonConfig,
  CATEGORY_LABEL,
} from '../meeting-detail-card.constants';
import type { MeetingDetailCardProps } from '../meeting-detail-card.types';
import { formatMeetingDateTime } from '../meeting-detail-card.utils';

// ── SRP: 파생 상태 로직을 훅으로 격리 ────────────────────────
// 메인 컴포넌트는 레이아웃/렌더링만 담당하고,
// 모든 상태 파생과 액션 핸들러 결정은 이 훅에서 처리합니다.

function resolveActionHandler(
  config: ActionButtonConfig,
  props: MeetingDetailCardProps
): (() => void) | undefined {
  switch (config.type) {
    case 'host-share':
      return props.role === 'host' ? props.onShare : undefined;
    case 'host-confirm':
      return props.role === 'host' ? props.onConfirm : undefined;
    case 'participant-cancel':
      return props.role === 'participant' ? props.onCancel : undefined;
    case 'join':
      return props.role === 'guest' || props.role === 'participant' ? props.onJoin : undefined;
    default:
      return undefined;
  }
}

export function useMeetingDetailCard(props: MeetingDetailCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const category = props.meeting.type;
  const categoryLabel = CATEGORY_LABEL[category];
  const fullDateLabel = formatMeetingDateTime(props.meeting.dateTime);

  const isJoined = props.role === 'participant' ? props.isJoined : false;
  const activeConfig = ACTION_BUTTON_CONFIGS.find((c) =>
    c.match({ role: props.role, status: props.status, isJoined })
  )!;
  const actionHandler = resolveActionHandler(activeConfig, props);

  return {
    category,
    categoryLabel,
    fullDateLabel,
    isExpanded,
    toggleExpanded: () => setIsExpanded((prev) => !prev),
    activeConfig,
    actionHandler,
  };
}
