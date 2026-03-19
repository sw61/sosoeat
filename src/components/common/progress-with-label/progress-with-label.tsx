import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import { Users } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { Field, FieldLabel } from '@/components/ui/field';
import { Progress } from '@/components/ui/progress-bar/progress';
import type { GroupTypeProps } from '@/types/group-type.type';

interface ProgressWithLabelProps {
  current: number;
  max: number;
  variant: GroupTypeProps['variant'];
  className?: string;
}

export function ProgressWithLabel({ current, max, variant, className }: ProgressWithLabelProps) {
  const clampedCurrent = Math.min(Math.max(0, current), max);
  const progress = (clampedCurrent / max) * 100;

  const progressStateClasses = cva('ml-auto font-bold', {
    variants: {
      variant: {
        groupEat: 'text-sosoeat-orange-500',
        groupBuy: 'text-sosoeat-blue-500',
      },
    },
  });

  return (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="progress-upload">
        <span className="m-0 flex items-end justify-center gap-1">
          {<Users className="size-3" />}
        </span>
        <span className="text-bold -ml-1">{`${clampedCurrent}/${max} 참여중`}</span>
        <span className={twMerge(clsx(progressStateClasses({ variant, className })))}>
          {clampedCurrent === max ? '마감' : ``}
        </span>
      </FieldLabel>
      <Progress value={progress} variant={variant} id="progress-upload" />
    </Field>
  );
}
