import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import { Users } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { Field, FieldLabel } from '@/components/ui/field';

import { Progress } from './progress';
import { ProgressProps } from './progress.type';

type ProgressWithLabelProps = {
  current: number;
  max: number;
  variant: ProgressProps['variant'];
};

export function ProgressWithLabel({ current, max, variant }: ProgressWithLabelProps) {
  const progress = (current / max) * 100;

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
        <span className="flex items-center justify-center gap-1">{'참여 인원'}</span>
        <span className={progressStateClasses({ variant })}>
          {current === max ? '마감' : `${current}/${max}명`}
        </span>
      </FieldLabel>
      <Progress value={progress} variant={variant} id="progress-upload" />
    </Field>
  );
}
