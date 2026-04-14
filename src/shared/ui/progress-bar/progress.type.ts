import { Progress as ProgressPrimitive } from 'radix-ui';

export interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  variant: 'groupBuy' | 'groupEat';
}
