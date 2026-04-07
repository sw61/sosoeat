import { cn } from '@/shared/lib/utils';

export const MeetingFilterBarButton = ({
  filterType,
  onClick,
  label,
  className,
  selected = false,
}: {
  className?: string;
  filterType: string;
  label: string;
  onClick: (filterType: string) => void;
  selected?: boolean;
}) => {
  return (
    <button
      type="button"
      onClick={() => onClick(filterType)}
      className={cn(
        'focus-visible:ring-sosoeat-gray-400 h-10 shrink-0 rounded-[14px] border-0 px-4 py-2 text-base leading-6 tracking-[-0.02em] shadow-none transition-none [-webkit-tap-highlight-color:transparent] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        selected
          ? 'bg-sosoeat-gray-800 hover:bg-sosoeat-gray-800 active:bg-sosoeat-gray-800 font-semibold text-white'
          : 'bg-sosoeat-gray-300 text-sosoeat-gray-800 hover:bg-sosoeat-gray-300 active:bg-sosoeat-gray-300 font-medium',
        className
      )}
    >
      {label}
    </button>
  );
};
