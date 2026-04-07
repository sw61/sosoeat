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
        className={cn(
          'relative inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center overflow-visible rounded-[14px] border-0 bg-transparent p-0',
          className
        )}
        {...props}
        aria-label={props['aria-label'] ?? '알림 열기'}
      >
        <Bell
          className={cn(
            unreadCount > 0 ? 'text-sosoeat-orange-600' : 'text-sosoeat-gray-600',
            'absolute top-[10px] left-[10px] size-5'
          )}
          strokeWidth={1.5}
          aria-hidden="true"
        />
        {unreadCount > 0 ? (
          <span className="pointer-events-none absolute top-0 right-0 z-10 translate-x-[1px] -translate-y-[1px]">
            <CountingBadge count={unreadCount} size="small" />
          </span>
        ) : null}
      </Button>
    );
  }
);
NotificationTrigger.displayName = 'NotificationTrigger';
