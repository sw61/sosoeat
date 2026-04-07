'use client';

import { Progress as ProgressPrimitive } from 'radix-ui';

import { cn } from '../../lib/utils';

import { variantStyles, variantStylesFull } from './progress.constants';
import type { ProgressProps } from './progress.types';

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
