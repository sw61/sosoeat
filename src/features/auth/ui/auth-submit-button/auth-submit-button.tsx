import { type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Button, buttonVariants } from '@/shared/ui/button';

interface AuthSubmitButtonProps
  extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  isActive?: boolean;
  isLoading?: boolean;
  label: string;
}

export const AuthSubmitButton = ({
  isActive = true,
  isLoading = false,
  label,
  className,
  ...props
}: AuthSubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={!isActive || isLoading}
      className={cn(
        'mt-2 h-[52px] w-full rounded-[16px] text-base font-semibold transition-all duration-200 disabled:pointer-events-auto disabled:cursor-not-allowed',
        isActive
          ? 'bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 text-white'
          : 'bg-sosoeat-gray-300 text-sosoeat-gray-700',
        className
      )}
      {...props}
    >
      {isLoading ? <Loader2 className="size-5 animate-spin" /> : label}
    </Button>
  );
};
