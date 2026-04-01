import { MessageCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

import { NOTIFICATION_ICON_BOX_CLASS } from '../../../notification-tab.constants';

export const CommentIcon = () => (
  <div className={cn(NOTIFICATION_ICON_BOX_CLASS, 'bg-[#00B493]')} aria-hidden>
    <MessageCircle className="size-[13px]" strokeWidth={1.1} aria-hidden />
  </div>
);
