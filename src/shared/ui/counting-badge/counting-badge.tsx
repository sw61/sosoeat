import { cva } from 'class-variance-authority';

interface CountingBadgeProps {
  count: number;
  size?: 'small' | 'large';
}

const badgeVariants = cva(
  'bg-sosoeat-orange-600 flex items-center justify-center rounded-full text-white',
  {
    variants: {
      size: {
        small: 'h-4 w-4 px-0 text-[10px] leading-[10px] font-bold',
        large: 'h-4 text-xs font-semibold',
      },
      overMax: {
        true: 'w-auto',
        false: '',
      },
    },
    compoundVariants: [
      { size: 'small', overMax: false, className: '' },
      { size: 'large', overMax: false, className: 'w-10' },
      { size: 'small', overMax: true, className: 'min-w-4 w-auto px-[3px]' },
      { size: 'large', overMax: true, className: 'min-w-4 px-[3px]' },
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
