'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import { AuthUser } from '@/entities/auth';
import { MeetingCreateModalProps, useMeetingCreateTrigger } from '@/features/meeting-create';
import { NotificationTrigger, useUnreadCount } from '@/features/notifications';
import { toHttpsUrl } from '@/shared/lib/to-https-url';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown';

const MeetingCreateModal = dynamic<MeetingCreateModalProps>(
  () => import('@/features/meeting-create').then((mod) => mod.MeetingCreateModal),
  { ssr: false }
);

const NotificationPanel = dynamic(
  () => import('@/features/notifications').then((mod) => mod.NotificationPanel),
  { ssr: false }
);
interface NavActionsProps {
  user: AuthUser | null;
  onLogout: () => void;
  initialUnreadCount?: number;
}

export function NavActions({ user, onLogout, initialUnreadCount = 0 }: NavActionsProps) {
  const { handleOpen, isOpen, close, createMeeting } = useMeetingCreateTrigger();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { data: unreadCount = 0 } = useUnreadCount(initialUnreadCount);

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

      <div className="relative flex items-center">
        <NotificationTrigger
          unreadCount={unreadCount}
          onClick={() => setNotificationOpen((prev) => !prev)}
          data-notification-trigger
          aria-label="알림 열기"
        />
        {notificationOpen && (
          <NotificationPanel
            unreadCount={unreadCount}
            open={notificationOpen}
            onOpenChange={setNotificationOpen}
          />
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="hidden cursor-pointer items-center gap-1 outline-none md:flex"
            aria-label="프로필 메뉴"
            suppressHydrationWarning
          >
            <Image
              src={toHttpsUrl(user.image) || '/images/basic-profile.svg'}
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
