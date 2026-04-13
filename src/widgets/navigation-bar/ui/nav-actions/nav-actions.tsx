'use client';

import Image from 'next/image';
import Link from 'next/link';

import { AuthUser } from '@/entities/auth';
import { MeetingCreateModal, useMeetingCreateTrigger } from '@/features/meeting-create';
import { Notification } from '@/features/notifications';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown';

interface NavActionsProps {
  user: AuthUser | null;
  onLogout: () => void;
  initialUnreadCount?: number;
}

export function NavActions({ user, onLogout, initialUnreadCount = 0 }: NavActionsProps) {
  const { handleOpen, isOpen, close, createMeeting } = useMeetingCreateTrigger();

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
        onClick={handleOpen}
      >
        <Image src="/icons/icon-createGroup.png" alt="" width={16} height={16} />
        모임 만들기
      </Button>

      <Notification initialUnreadCount={initialUnreadCount} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="hidden cursor-pointer items-center gap-1 outline-none md:flex"
            aria-label="프로필 메뉴"
            suppressHydrationWarning
          >
            <Image
              src={user.image || '/images/basic-profile.svg'}
              alt={user.name}
              width={32}
              height={32}
              className="bg-sosoeat-gray-200 size-8 shrink-0 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/images/basic-profile.svg';
              }}
            />
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

      <MeetingCreateModal open={isOpen} onClose={close} onSubmit={createMeeting} />
    </>
  );
}
