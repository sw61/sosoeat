import { VariantProps } from 'class-variance-authority';

import { cardVariants } from './count-card.variants';

export type CountCardVariant = 'meeting' | 'favorite' | 'post';

export interface CountCardProps extends VariantProps<typeof cardVariants> {
  count: number;
  className?: string;
  variant?: CountCardVariant;
  href?: string;
}
