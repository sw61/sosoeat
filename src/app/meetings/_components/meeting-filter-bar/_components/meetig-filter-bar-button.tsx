import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
    <Button
      type="button"
      variant="ghost"
      onClick={() => onClick(filterType)}
      className={cn(
        'h-10 shrink-0 rounded-[14px] border-0 px-4 py-2 text-base tracking-[-0.02em] shadow-none',
        selected
          ? 'bg-[#4A4A4A] font-semibold text-white hover:bg-[#4A4A4A] hover:text-white'
          : 'bg-[#EDEFF1] font-medium text-[#333333] hover:bg-[#E5E8EB] hover:text-[#333333]',
        className
      )}
    >
      <span>{label}</span>
    </Button>
  );
};
