import { cva } from 'class-variance-authority';
import { Users } from 'lucide-react';

import { Field, FieldLabel } from '@/components/ui/field/field';
import { Progress, type ProgressProps } from '@/components/ui/progress-bar';

const progressStateClasses = cva('ml-auto font-bold', {
  variants: {
    variant: {
      groupEat: 'text-sosoeat-orange-500',
      groupBuy: 'text-sosoeat-blue-500',
    },
  },
});

interface ProgressWithLabelProps {
  current: number;
  max: number;
  variant: ProgressProps['variant'];
}

export const ProgressWithLabel = ({ current, max, variant }: ProgressWithLabelProps) => {
  const clampedCurrent = Math.min(Math.max(0, current), max);
  const progress = (clampedCurrent / max) * 100;

  return (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="progress-upload">
        <span className="m-0 flex items-end justify-center gap-1">
          <Users />
        </span>
        <span className="-ml-1 font-bold">{`${clampedCurrent}/${max} 참여중`}</span>
        <span className={progressStateClasses({ variant })}>
          {clampedCurrent === max ? '마감' : ``}
        </span>
      </FieldLabel>
      <Progress value={progress} variant={variant} id="progress-upload" />
    </Field>
  );
};
