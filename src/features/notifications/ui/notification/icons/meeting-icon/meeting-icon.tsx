import { Calendar } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

import { NOTIFICATION_ICON_BOX_CLASS } from '../../notification-tab/notification-tab.constants';

export const MeetingIcon = () => (
  <div className={cn(NOTIFICATION_ICON_BOX_CLASS, 'bg-[#F5A623]')} aria-hidden>
    <Calendar className="size-[22px]" strokeWidth={1.1} aria-hidden />
  </div>
);
