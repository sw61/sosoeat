import { ReactNode } from 'react';

export interface NotificationTabBodyProps {
  thumbnail: ReactNode;
  title: string;
  isMeetingConfirmed: boolean;
  metaRight: string;
  description: string;
  highlighted: boolean;
}
