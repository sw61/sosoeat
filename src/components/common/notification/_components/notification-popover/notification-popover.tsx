'use client';

import * as React from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { NotificationPanelBody } from '../notification-panel-body';
import { scrollAreaDesktopClass } from '../notification-scroll-area';
import { NotificationTrigger } from '../notification-trigger';

import { POPOVER_PANEL_CLASS } from './notification-popover.constants';
import type { NotificationPopoverProps } from './notification-popover.types';

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
        className={cn(POPOVER_PANEL_CLASS)}
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
