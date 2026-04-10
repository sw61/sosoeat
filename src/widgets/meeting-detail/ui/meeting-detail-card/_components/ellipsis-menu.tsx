'use client';

import { useSyncExternalStore } from 'react';

import { EllipsisVerticalIcon } from 'lucide-react';

import {
  ActionMenu,
  ActionMenuContent,
  ActionMenuItem,
  ActionMenuSeparator,
  ActionMenuTrigger,
} from '@/shared/ui/action-menu';
import { Button } from '@/shared/ui/button';

interface EllipsisMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
  isDeletePending?: boolean;
}

const subscribe = () => () => {};

export function EllipsisMenu({ onEdit, onDelete, isDeletePending }: EllipsisMenuProps) {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true, // 클라이언트: true
    () => false // 서버: false
  );

  if (!mounted) return null;

  return (
    <ActionMenu>
      <ActionMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="cursor-pointer" aria-label="더보기">
          <EllipsisVerticalIcon className="text-sosoeat-gray-500 size-5" />
        </Button>
      </ActionMenuTrigger>
      <ActionMenuContent>
        <ActionMenuItem className="cursor-pointer" onClick={onEdit}>
          수정하기
        </ActionMenuItem>
        <ActionMenuSeparator />
        <ActionMenuItem
          variant="destructive"
          className="cursor-pointer data-disabled:cursor-not-allowed"
          disabled={isDeletePending}
          onClick={onDelete}
        >
          삭제하기
        </ActionMenuItem>
      </ActionMenuContent>
    </ActionMenu>
  );
}
