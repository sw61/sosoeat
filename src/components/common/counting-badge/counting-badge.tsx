type BadgeSize = 'small' | 'large';

interface CountingBadgeProps {
  count: number;
  size?: BadgeSize;
}

export function CountingBadge({ count, size = 'large' }: CountingBadgeProps) {
  if (size === 'small') {
    return (
      <span className="bg-sosoeat-orange-600 flex h-3 w-3 items-center justify-center rounded-full text-[8px] font-bold text-white">
        {count}
      </span>
    );
  }

  return (
    <span className="bg-sosoeat-orange-600 flex h-4 items-center justify-center rounded-full px-[7px] text-xs font-bold text-white">
      {count}
    </span>
  );
}
