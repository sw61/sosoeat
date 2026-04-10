'use client';

import Image from 'next/image';
import Link from 'next/link';

import { AuthUser } from '@/entities/auth';
import { Notification } from '@/features/notifications';
import {
  ActionMenu,
  ActionMenuContent,
  ActionMenuItem,
  ActionMenuSeparator,
  ActionMenuTrigger,
} from '@/shared/ui/action-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';

interface NavActionsProps {
  user: AuthUser | null;
  onOpenCreateModal: () => void;
  onLogout: () => void;
}

export function NavActions({ user, onOpenCreateModal, onLogout }: NavActionsProps) {
  if (!user) {
    return (
      <Link
        href="/login"
        className="text-muted-foreground hover:text-sosoeat-orange-600 hidden text-sm font-medium transition-colors md:block"
      >
        로그인
      </Link>
    );
  }

  return (
    <>
      <Button
        size="lg"
        className="bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 hidden items-center justify-center gap-1 rounded-xl px-4 py-2 font-medium text-white md:mr-1 md:flex"
        onClick={onOpenCreateModal}
      >
        <Image src="/icons/icon-createGroup.png" alt="" width={16} height={16} />
        모임 만들기
      </Button>

      <Notification />

      <ActionMenu>
        <ActionMenuTrigger asChild>
          <button
            className="hidden cursor-pointer items-center gap-1 outline-none md:flex"
            aria-label="프로필 메뉴"
            suppressHydrationWarning
          >
            <Avatar className="bg-sosoeat-gray-200 shrink-0">
              <AvatarImage src={user.image || '/images/basic-profile.svg'} alt={user.name} />
              <AvatarFallback className="text-sosoeat-gray-500 text-sm font-medium">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
          </button>
        </ActionMenuTrigger>
        <ActionMenuContent>
          <ActionMenuItem asChild>
            <Link href="/mypage" className="cursor-pointer">
              마이페이지
            </Link>
          </ActionMenuItem>
          <ActionMenuSeparator />
          <ActionMenuItem variant="destructive" className="cursor-pointer" onClick={onLogout}>
            로그아웃
          </ActionMenuItem>
        </ActionMenuContent>
      </ActionMenu>
    </>
  );
}
