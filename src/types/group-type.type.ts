import { Progress as ProgressPrimitive } from 'radix-ui';

export interface GroupTypeProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  variant: 'groupBuy' | 'groupEat';
}

export const variantStyles = {
  groupBuy: 'bg-sosoeat-blue-500',
  groupEat: 'bg-gradient-to-r from-sosoeat-orange-600 to-sosoeat-orange-500',
  error: 'bg-red-600',
};
export const variantStylesFull = {
  groupBuy: 'bg-sosoeat-blue-700',
  groupEat: 'bg-sosoeat-orange-700',
  error: 'bg-red-600',
};
