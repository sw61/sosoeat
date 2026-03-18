import { cva } from 'class-variance-authority';
import { User, Users } from 'lucide-react';

import { Field, FieldLabel } from '@/components/ui/field';

import { Progress } from './progress';
import { ProgressProps } from './progress.type';

type ProgressWithLabelProps = {
  current: number;
  max: number;
  variant: ProgressProps['variant'];
};

export function ProgressWithLabel({ current, max, variant }: ProgressWithLabelProps) {
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
        <span className="m-0 flex items-end justify-center gap-1">{<Users />}</span>
        <span className="text-bold -ml-1">{`${clampedCurrent}/${max} 참여중`}</span>
        <span className={progressStateClasses({ variant })}>
          {clampedCurrent === max ? '마감' : ``}
        </span>
      </FieldLabel>
      <Progress value={progress} variant={variant} id="progress-upload" />
    </Field>
  );
}
