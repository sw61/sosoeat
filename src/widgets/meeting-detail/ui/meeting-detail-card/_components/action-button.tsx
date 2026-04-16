import type { MeetingCategory } from '@/entities/meeting';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

import {
  type ActionButtonConfig,
  actionButtonVariants,
  outlineButtonVariants,
} from '../meeting-detail-card.constants';

interface ActionButtonProps {
  config: ActionButtonConfig;
  category: MeetingCategory;
  onClick?: () => void;
  /** API 진행 중 연타 방지 */
  pending?: boolean;
}

export function ActionButton({ config, category, onClick, pending }: ActionButtonProps) {
  if (config.variant === 'disabled') {
    return (
      <Button
        className="text-sosoeat-gray-700 border-sosoeat-gray-300 bg-sosoeat-gray-200 h-full w-full cursor-not-allowed rounded-2xl border-2 text-sm md:text-base lg:text-xl"
        disabled
      >
        {config.label}
      </Button>
    );
  }

  if (config.variant === 'outline') {
    return (
      <Button
        variant="ghost"
        style={{
          borderColor:
            category === 'groupEat'
              ? 'var(--color-sosoeat-orange-700)'
              : 'var(--color-sosoeat-blue-800)',
        }}
        className={cn(
          'cursor-pointer disabled:cursor-not-allowed',
          outlineButtonVariants({ category })
        )}
        onClick={onClick}
        disabled={!!pending}
      >
        {config.label}
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      className={cn(
        'cursor-pointer disabled:cursor-not-allowed',
        actionButtonVariants({ category })
      )}
      onClick={onClick}
      disabled={!!pending}
    >
      {config.label}
    </Button>
  );
}
