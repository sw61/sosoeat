import { EllipsisIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown';

interface EllipsisMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export function EllipsisMenu({ onEdit, onDelete }: EllipsisMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label="더보기">
          <EllipsisIcon className="text-sosoeat-gray-500 size-[26px]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>수정하기</DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={onDelete}>
          삭제하기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
