'use client';

import * as React from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { NotificationTriggerProps } from './notification-trigger.types';

export const NotificationTrigger = React.forwardRef<HTMLButtonElement, NotificationTriggerProps>(
  ({ className, type = 'button', ...props }, ref) => {
    return (
      <Button
        ref={ref}
        type={type}
        className={cn('inline-flex cursor-pointer border-0 bg-transparent p-0', className)}
        {...props}
        aria-label={props['aria-label'] ?? '알림 열기'}
      >
        <Image src="/icons/notification-icon.svg" alt="" width={20} height={20} />
      </Button>
    );
  }
);
NotificationTrigger.displayName = 'NotificationTrigger';
