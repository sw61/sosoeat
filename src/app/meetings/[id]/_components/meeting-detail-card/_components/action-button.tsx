import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { MeetingCategory } from '@/types/meeting';

import {
  type ActionButtonConfig,
  actionButtonVariants,
  outlineButtonVariants,
} from '../meeting-detail-card.constants';

interface ActionButtonProps {
  config: ActionButtonConfig;
  category: MeetingCategory;
  onClick?: () => void;
}

export function ActionButton({ config, category, onClick }: ActionButtonProps) {
  if (config.variant === 'disabled') {
    return (
      <Button
        className="text-sosoeat-gray-700 border-sosoeat-gray-300 bg-sosoeat-gray-200 h-full w-full rounded-2xl border-2 text-sm md:text-base lg:text-xl"
        disabled
      >
        {config.label}
      </Button>
    );
  }

  const className =
    config.variant === 'primary'
      ? actionButtonVariants({ category })
      : outlineButtonVariants({ category });

  return (
    <Button variant="ghost" className={cn(className)} onClick={onClick}>
      {config.label}
    </Button>
  );
}
