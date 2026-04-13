import { Calendar, ClipboardList, MessageCircle, Users } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

import { NOTIFICATION_ICON_BOX_CLASS } from './notification-item.constants';

interface ReadCheckIconProps {
  className?: string;
}

export const ApprovedIcon = () => (
  <div className={cn(NOTIFICATION_ICON_BOX_CLASS, 'bg-[#F5A623]')} aria-hidden>
    <ClipboardList className="size-5.5" strokeWidth={1.1} aria-hidden />
  </div>
);

export const CommentIcon = () => (
  <div className={cn(NOTIFICATION_ICON_BOX_CLASS, 'bg-[#00B493]')} aria-hidden>
    <MessageCircle className="size-3.25" strokeWidth={1.1} aria-hidden />
  </div>
);

export const MeetingIcon = () => (
  <div className={cn(NOTIFICATION_ICON_BOX_CLASS, 'bg-[#F5A623]')} aria-hidden>
    <Calendar className="size-5.5" strokeWidth={1.1} aria-hidden />
  </div>
);

export const UserIcon = () => (
  <div className={cn(NOTIFICATION_ICON_BOX_CLASS, 'bg-[#FF6F0F]')} aria-hidden>
    <Users className="size-5.5" strokeWidth={2.5} aria-hidden />
  </div>
);

export const ReadCheckIcon = ({ className }: ReadCheckIconProps) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('shrink-0', className)}
    aria-hidden
  >
    <circle cx="12" cy="12" r="9" className="fill-sosoeat-orange-600" />
    <path
      d="M8.5 11.8245L11.0087 14.3333L15.342 10"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const metaDot = (
  <span className="inline-block size-1 shrink-0 rounded-full bg-[#FF6600]" aria-hidden />
);
