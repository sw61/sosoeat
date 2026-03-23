import { cva } from 'class-variance-authority';

interface CountingBadgeProps {
  count: number;
  size?: 'small' | 'large';
}

const badgeVariants = cva(
  'bg-sosoeat-orange-600 flex items-center justify-center rounded-full font-bold text-white',
  {
    variants: {
      size: {
        small: 'h-3 w-3 text-[8px] px-0',
        large: 'h-4 px-[7px] text-xs',
      },
    },
    defaultVariants: {
      size: 'large',
    },
  }
);

export function CountingBadge({ count, size = 'large' }: CountingBadgeProps) {
  const displayCount = count > 99 ? '99+' : count;

  return <span className={badgeVariants({ size })}>{displayCount}</span>;
}
