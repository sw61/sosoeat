'use client';

import * as React from 'react';

import { Bell } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { CountingBadge } from '@/shared/ui/counting-badge/counting-badge';

import type { NotificationTriggerProps } from './notification-trigger.types';

export const NotificationTrigger = React.forwardRef<HTMLButtonElement, NotificationTriggerProps>(
  ({ className, type = 'button', unreadCount = 0, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        type={type}
        className={cn('relative inline-flex cursor-pointer border-0 bg-transparent p-0', className)}
        {...props}
        aria-label={props['aria-label'] ?? '알림 열기'}
      >
        <Bell
          className={`${unreadCount > 0 ? 'text-sosoeat-orange-600' : 'text-sosoeat-gray-600'} h-5 w-5`}
          aria-hidden="true"
        />
        {unreadCount > 0 ? (
          <span className="absolute -top-2 -right-2">
            <CountingBadge count={unreadCount} size="small" />
          </span>
        ) : null}
      </Button>
    );
  }
);
NotificationTrigger.displayName = 'NotificationTrigger';
