import type { ReactNode } from 'react';

export type MeetingDetailBannerProps = {
  imageUrl: string;
  alt: string;
  titleContent: string;
  subtitleContent: string;
  /** 376px 이상에서만 표시 (375px 이하는 숨김) */
  subtitle?: ReactNode;
  className?: string;
};
