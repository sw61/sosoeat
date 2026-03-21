import { type VariantProps } from 'class-variance-authority';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AuthSubmitButtonProps
  extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  isActive: boolean;
  isLoading: boolean;
  loadingText?: string;
  label: string;
}

export const AuthSubmitButton = ({
  isActive,
  isLoading,
  loadingText,
  label,
  className,
  ...props
}: AuthSubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={!isActive || isLoading}
      className={cn(
        'mt-2 h-14 w-full rounded-[16px] text-base font-semibold transition-all duration-200 hover:opacity-90 disabled:pointer-events-auto disabled:cursor-not-allowed',
        isActive ? 'bg-sosoeat-orange-600 text-white' : 'bg-sosoeat-gray-300 text-sosoeat-gray-700',
        className
      )}
      {...props}
    >
      {isLoading ? (loadingText ? loadingText : `${label} 중...`) : label}
    </Button>
  );
};
