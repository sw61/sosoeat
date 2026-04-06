'use client';

import * as React from 'react';

import { Bell } from 'lucide-react';

import { CountingBadge } from '@/components/common/counting-badge';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

import {
  NOTIFICATION_TRIGGER_BADGE_WRAPPER_CLASS,
  NOTIFICATION_TRIGGER_CLASS,
} from './notification-trigger.constants';
import type { NotificationTriggerProps } from './notification-trigger.types';

export const NotificationTrigger = React.forwardRef<HTMLButtonElement, NotificationTriggerProps>(
  ({ className, type = 'button', unreadCount = 0, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        type={type}
        className={cn(NOTIFICATION_TRIGGER_CLASS, className)}
        {...props}
        aria-label={props['aria-label'] ?? '알림 열기'}
      >
        <Bell
          className={`${unreadCount > 0 ? 'text-sosoeat-orange-600' : 'text-sosoeat-gray-600'} h-5 w-5`}
          aria-hidden="true"
        />
        {unreadCount > 0 ? (
          <span className={NOTIFICATION_TRIGGER_BADGE_WRAPPER_CLASS}>
            <CountingBadge count={unreadCount} size="small" />
          </span>
        ) : null}
      </Button>
    );
  }
);
NotificationTrigger.displayName = 'NotificationTrigger';
