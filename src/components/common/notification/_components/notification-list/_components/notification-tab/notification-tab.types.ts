import type { ReactNode } from 'react';

export interface NotificationTabProps {
  /** 코랄 톤 배경 (#FFF2EC), 기본은 흰색 */
  variant?: 'highlight' | 'default';
  /** 왼쪽 썸네일 (40×40 또는 24×24 등) */
  thumbnail: ReactNode;
  /** 상단 강조 한 줄 (12px semibold #333) */
  title: string;
  /** 읽음 체크 그라데이션 아이콘 */
  showReadBadge?: boolean;
  /** 우측 시간 등 (12px normal #BBB) + 그라데이션 점 */
  metaRight: string;
  /** 본문 (14px normal #737373, 2줄까지) */
  description: string;
}

export interface ReadCheckIconProps {
  className?: string;
}
