'use client';

import * as React from 'react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

import { NotificationPanelBody } from '../notification-panel-body';
import { scrollAreaMobileClass } from '../notification-scroll-area';
import { NotificationTrigger } from '../notification-trigger';

import type { NotificationDialogProps } from './notification-dialog.types';

const mobileDialogContentClass = cn(
  'flex max-w-none flex-col gap-0 overflow-hidden bg-white p-0 ring-0',
  'shadow-[0px_4px_16px_rgba(0,0,0,0.04)]',
  'fixed inset-x-0 top-auto bottom-0 left-0 z-50 translate-x-0 translate-y-0',
  'h-[min(812px,100dvh)] max-h-[100dvh] w-full max-w-none rounded-t-[24px] rounded-r-none'
);

export const NotificationDialog = ({ triggerClassName, list }: NotificationDialogProps) => {
  const titleId = React.useId();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <NotificationTrigger className={triggerClassName} />
      </DialogTrigger>
      <DialogContent
        className={mobileDialogContentClass}
        showCloseButton={false}
        aria-labelledby={titleId}
        aria-describedby={undefined}
      >
        <NotificationPanelBody
          titleId={titleId}
          listScrollClassName={scrollAreaMobileClass}
          list={list}
        />
      </DialogContent>
    </Dialog>
  );
};
