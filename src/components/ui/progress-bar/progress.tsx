'use client';

import * as React from 'react';

import { Progress as ProgressPrimitive } from 'radix-ui';

import { ProgressProps } from '@/components/ui/progress-bar/progress.type';
import { cn } from '@/lib/utils';

const variantStyles = {
  groupBuy: 'bg-sosoeat-blue-500',
  groupEat: 'bg-sosoeat-orange-500',
  error: 'bg-red-600',
};
const variantStylesFull = {
  groupBuy: 'bg-sosoeat-blue-700',
  groupEat: 'bg-sosoeat-orange-700',
  error: 'bg-red-600',
};

function Progress({ className, value, variant, ...props }: ProgressProps) {
  const isFull = (value ?? 0) >= 100;
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn(
        'bg-muted relative flex h-2 w-[328px] items-center overflow-x-hidden rounded-full',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          `size-full flex-1 transition-all`,
          isFull ? variantStylesFull[variant] : variantStyles[variant]
        )}
        style={{ transform: `translateX(-${100 - Math.max(0, Math.min(100, value ?? 0))}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
