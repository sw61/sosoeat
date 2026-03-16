'use client';

import * as React from 'react';

import { Progress as ProgressPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

import { ProgressProps } from './progress.type';

const variantStyles = {
  groupBuy: 'bg-sosoeat-blue-500',
  groupEat: 'bg-sosoeat-orange-500',
  error: 'bg-red-600',
};

function Progress({ className, value, variant, ...props }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn(
        'bg-muted relative flex h-2 w-full items-center overflow-x-hidden rounded-full',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(`size-full flex-1 transition-all`, variantStyles[variant])}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
