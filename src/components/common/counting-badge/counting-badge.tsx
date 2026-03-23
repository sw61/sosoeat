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
        small: 'h-3 text-[8px]',
        large: 'h-4 text-xs',
      },
      overMax: {
        true: 'w-auto',
        false: '',
      },
    },
    compoundVariants: [
      { size: 'small', overMax: false, className: 'w-3 px-0' },
      { size: 'large', overMax: false, className: 'px-[7px]' },
      { size: 'small', overMax: true, className: 'px-1' },
      { size: 'large', overMax: true, className: 'px-[5px]' },
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
