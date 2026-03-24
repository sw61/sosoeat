import type { ComponentProps } from 'react';

import { Progress as ProgressPrimitive } from 'radix-ui';

export interface ProgressProps extends ComponentProps<typeof ProgressPrimitive.Root> {
  variant: 'groupBuy' | 'groupEat';
}
