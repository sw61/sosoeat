'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Bell } from 'lucide-react';

import { AuthUser } from '@/entities/auth';
import { Notification } from '@/features/notifications';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/shared/ui/sheet';

// TODO: 알림 기능 구현 시 React Query로 교체 예정
// ex) const { data: hasUnread = false } = useHasUnreadNotification();
const hasUnread = false;

interface DesktopActionsProps {
  user: AuthUser | null;
  onOpenCreateModal: () => void;
  onLogout: () => void;
}

export function DesktopActions({ user, onOpenCreateModal, onLogout }: DesktopActionsProps) {
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
      <Sheet>
        <SheetTrigger asChild>
          <button className="relative cursor-pointer p-1 md:hidden" aria-label="알림">
            <Bell className="text-sosoeat-orange-600 h-5 w-5" />
            {hasUnread && (
              <span className="bg-sosoeat-orange-600 absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full" />
            )}
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64 p-0 pt-12">
          <SheetTitle className="sr-only">알림</SheetTitle>
          <SheetDescription className="sr-only">알림 목록 패널</SheetDescription>
        </SheetContent>
      </Sheet>

      <Button
        size="lg"
        className="bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 hidden items-center justify-center gap-1 rounded-xl px-4 py-2 font-medium text-white md:mr-1 md:flex"
        onClick={onOpenCreateModal}
      >
        <Image src="/icons/icon-createGroup.png" alt="" width={16} height={16} />
        모임 만들기
      </Button>

      <Notification />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="hidden cursor-pointer items-center gap-1 outline-none md:flex"
            aria-label="프로필 메뉴"
          >
            <Avatar className="bg-sosoeat-gray-200 shrink-0">
              <AvatarImage src={user.image ?? undefined} alt={user.name} />
              <AvatarFallback className="text-sosoeat-gray-500 text-sm font-medium">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="h-10" asChild>
            <Link href="/mypage">마이페이지</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="h-10" variant="destructive" onClick={onLogout}>
            로그아웃
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
