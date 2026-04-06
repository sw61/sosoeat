import { cva } from 'class-variance-authority';
import { Users } from 'lucide-react';

import { cn } from '../../lib/utils';
import { Field, FieldLabel } from '../field/field';
import type { ProgressProps } from '../progress-bar';
import { Progress } from '../progress-bar';

import {
  PROGRESS_WITH_LABEL_FIELD_CLASS,
  PROGRESS_WITH_LABEL_FIELD_LABEL_CLASS,
  PROGRESS_WITH_LABEL_INFO_ROW_CLASS,
} from './progress-with-label.constants';

export interface ProgressWithLabelProps {
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

export const ProgressWithLabel = ({
  id,
  current,
  max,
  variant,
  className,
}: ProgressWithLabelProps) => {
  const clampedCurrent = Math.min(Math.max(0, current), max);
  const progress = max > 0 ? (clampedCurrent / max) * 100 : 0;

  return (
    <Field className={cn(PROGRESS_WITH_LABEL_FIELD_CLASS, className)}>
      <FieldLabel htmlFor={id} className={PROGRESS_WITH_LABEL_FIELD_LABEL_CLASS}>
        <div className={PROGRESS_WITH_LABEL_INFO_ROW_CLASS}>
          <Users className="h-3 w-3 shrink-0" />
          <span className="text-xs font-medium">{`${clampedCurrent}/${max} 참여중`}</span>
        </div>
        <span className={progressStateClasses({ variant })}>
          {clampedCurrent === max ? '마감' : null}
        </span>
      </FieldLabel>
      <Progress value={progress} variant={variant} id={id} />
    </Field>
  );
};
