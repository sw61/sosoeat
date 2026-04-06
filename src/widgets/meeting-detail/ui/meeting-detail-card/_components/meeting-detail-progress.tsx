import { cva } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';
import { Field, FieldLabel } from '@/shared/ui/field/field';
import type { ProgressProps } from '@/shared/ui/progress-bar/index';
import { Progress } from '@/shared/ui/progress-bar/index';

export interface MeetingDetailProgressProps {
  id: string;
  current: number;
  max: number;
  variant: ProgressProps['variant'];
  className?: string;
}

const progressStateClasses = cva('mr-1 ml-auto text-xs font-bold', {
  variants: {
    variant: {
      groupEat: 'text-sosoeat-orange-600',
      groupBuy: 'text-sosoeat-blue-600',
    },
  },
});

export const MeetingDetailProgress = ({
  id,
  current,
  max,
  variant,
  className,
}: MeetingDetailProgressProps) => {
  const clampedCurrent = Math.min(Math.max(0, current), max);
  const progress = max > 0 ? (clampedCurrent / max) * 100 : 0;

  return (
    <Field className={cn('text-sosoeat-gray-700 w-full max-w-sm gap-1', className)}>
      <FieldLabel htmlFor={id} className="flex w-full items-center justify-between gap-1">
        <span className="text-sm font-bold">{`${clampedCurrent}/${max}`}</span>
        <span className={progressStateClasses({ variant })}>
          {clampedCurrent === max ? '마감' : null}
        </span>
      </FieldLabel>
      <Progress value={progress} variant={variant} id={id} />
    </Field>
  );
};
