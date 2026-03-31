'use client';

import * as React from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { NotificationPanelBody } from '../notification-panel-body';
import { scrollAreaDesktopClass } from '../notification-scroll-area';
import { NotificationTrigger } from '../notification-trigger';

import type { NotificationPopoverProps } from './notification-popover.types';

const popoverPanelClass = cn(
  'flex max-w-none flex-col gap-0 overflow-hidden rounded-[24px] border bg-white p-0 shadow-[0px_4px_16px_rgba(0,0,0,0.04)] ring-0',
  'h-[448px] w-[314px]'
);

export const NotificationPopover = ({
  triggerClassName,
  list,
  unreadCount,
}: NotificationPopoverProps) => {
  const titleId = React.useId();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <NotificationTrigger className={triggerClassName} unreadCount={unreadCount ?? 0} />
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={8}
        collisionPadding={12}
        aria-labelledby={titleId}
        className={popoverPanelClass}
      >
        <NotificationPanelBody
          titleId={titleId}
          listScrollClassName={scrollAreaDesktopClass}
          list={list}
          unreadCount={unreadCount}
        />
      </PopoverContent>
    </Popover>
  );
};
