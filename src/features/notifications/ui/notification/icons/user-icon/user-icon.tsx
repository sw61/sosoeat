import { Users } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

import { NOTIFICATION_ICON_BOX_CLASS } from '../../notification-tab/notification-tab.constants';

export const UserIcon = () => (
  <div className={cn(NOTIFICATION_ICON_BOX_CLASS, 'bg-[#FF6F0F]')} aria-hidden>
    <Users className="size-[22px]" strokeWidth={2.5} aria-hidden />
  </div>
);
