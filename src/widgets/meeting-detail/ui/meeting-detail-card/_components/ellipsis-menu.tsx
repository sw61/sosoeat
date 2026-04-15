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
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="cursor-pointer" onClick={onEdit}>
          수정하기
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer data-disabled:cursor-not-allowed"
          disabled={isDeletePending}
          onClick={onDelete}
        >
          삭제하기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
