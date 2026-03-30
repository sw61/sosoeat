import { cva } from 'class-variance-authority';

interface CountingBadgeProps {
  count: number;
  size?: 'small' | 'large';
}

const badgeVariants = cva(
  'bg-sosoeat-orange-600 inline-flex items-center justify-center rounded-full font-semibold text-white',
  {
    variants: {
      size: {
        small: 'h-4 min-w-4 px-1 text-[10px] leading-none',
        large: 'h-6 min-w-6 px-2 text-sm leading-none',
      },
      overMax: {
        true: 'w-auto',
        false: '',
      },
    },
    compoundVariants: [
      { size: 'small', overMax: false, className: 'w-4 px-0' },
      { size: 'large', overMax: false, className: 'w-6 px-0' },
      { size: 'small', overMax: true, className: 'px-1.5' },
      { size: 'large', overMax: true, className: 'px-2.5' },
    ],
    defaultVariants: {
      size: 'large',
      overMax: false,
    },
  }
);

export function CountingBadge({ count, size = 'large' }: CountingBadgeProps) {
  const overMax = count > 99;
  const displayCount = overMax ? '99+' : count;

  return <span className={badgeVariants({ size, overMax })}>{displayCount}</span>;
}
