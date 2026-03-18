import { Progress as ProgressPrimitive } from 'radix-ui';

export type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  variant: 'groupBuy' | 'groupEat';
};
