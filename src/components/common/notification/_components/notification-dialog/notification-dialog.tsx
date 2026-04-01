'use client';

import * as React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

import { NotificationPanelBody } from '../notification-panel-body';
import { scrollAreaMobileClass } from '../notification-scroll-area';
import { NotificationTrigger } from '../notification-trigger';

import { MOBILE_DIALOG_CONTENT_CLASS } from './notification-dialog.constants';
import type { NotificationDialogProps } from './notification-dialog.types';

export const NotificationDialog = ({
  triggerClassName,
  list,
  unreadCount,
}: NotificationDialogProps) => {
  const panelId = React.useId();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <NotificationTrigger className={triggerClassName} unreadCount={unreadCount ?? 0} />
      </DialogTrigger>
      <DialogContent className={cn(MOBILE_DIALOG_CONTENT_CLASS)} showCloseButton={false}>
        <DialogTitle className="sr-only">알림</DialogTitle>
        <DialogDescription className="sr-only">알림 목록</DialogDescription>
        <NotificationPanelBody
          titleId={panelId}
          listScrollClassName={scrollAreaMobileClass}
          list={list}
          unreadCount={unreadCount}
        />
      </DialogContent>
    </Dialog>
  );
};
