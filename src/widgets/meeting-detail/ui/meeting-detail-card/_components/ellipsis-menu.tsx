'use client';

import { useSyncExternalStore } from 'react';

import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown';

interface EllipsisMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
  isDeletePending?: boolean;
}

const subscribe = () => () => {};

export function EllipsisMenu({ onEdit, onDelete, isDeletePending }: EllipsisMenuProps) {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  if (!mounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="cursor-pointer rounded-full"
          aria-label="더보기"
        >
          <MoreHorizontal className="text-sosoeat-gray-500 size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px] md:min-w-[144px]">
        <DropdownMenuItem
          className="cursor-pointer md:px-2.5 md:py-2 md:text-base"
          onClick={onEdit}
        >
          수정하기
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer data-disabled:cursor-not-allowed md:px-2.5 md:py-2 md:text-base"
          disabled={isDeletePending}
          onClick={onDelete}
        >
          삭제하기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
