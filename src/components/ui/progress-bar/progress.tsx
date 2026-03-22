'use client';

import { Progress as ProgressPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

import type { ProgressProps } from './progress.types';

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

export const Progress = ({ className, value, variant, ...props }: ProgressProps) => {
  const isFull = (value ?? 0) >= 100;
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn(
        'bg-muted relative flex h-2 w-82 items-center overflow-x-hidden rounded-full',
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
};
