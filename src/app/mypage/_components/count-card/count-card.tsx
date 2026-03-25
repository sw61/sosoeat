import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { CountCardProps } from './count-card.types';
import { cardVariants, countVariants } from './count-card.variants';

const TITLE = {
  meeting: '참여 모임',
  favorite: '찜한 모임',
  post: '게시글 작성',
} as const;

export function CountCard({ count, variant = 'meeting', className }: CountCardProps) {
  return (
    <Card className={cn(cardVariants({ variant }), className)}>
      <CardHeader>
        <CardTitle>
          <p className={cn(countVariants({ variant }))}>{count}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sosoeat-gray-600 text-[11px]">{TITLE[variant]}</p>
      </CardContent>
    </Card>
  );
}
