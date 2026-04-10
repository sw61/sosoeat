'use client';

import * as React from 'react';

import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import { cn } from '../../lib/utils';

function ActionMenu({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="action-menu" {...props} />;
}

function ActionMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return <DropdownMenuPrimitive.Trigger data-slot="action-menu-trigger" {...props} />;
}

function ActionMenuContent({
  className,
  align = 'end',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="action-menu-content"
        sideOffset={sideOffset}
        align={align}
        className={cn(
          'data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[160px] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-2xl bg-white p-0 shadow-xl duration-100',
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function ActionMenuItem({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  variant?: 'default' | 'destructive';
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="action-menu-item"
      data-variant={variant}
      className={cn(
        'focus:bg-sosoeat-gray-100 focus:text-sosoeat-gray-900 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive text-sosoeat-gray-800 relative flex cursor-default items-center gap-1.5 px-5 py-3.5 text-sm font-medium outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}

function ActionMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="action-menu-separator"
      className={cn('bg-sosoeat-gray-200 mx-0 my-0 h-px', className)}
      {...props}
    />
  );
}

export { ActionMenu, ActionMenuContent, ActionMenuItem, ActionMenuSeparator, ActionMenuTrigger };
