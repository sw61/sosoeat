'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { LogOut, Menu, User } from 'lucide-react';

import { AuthUser } from '@/entities/auth';
import { MeetingCreateModal, useMeetingCreateTrigger } from '@/features/meeting-create';
import { cn } from '@/shared/lib/utils';
import { CountingBadge } from '@/shared/ui/counting-badge/counting-badge';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';

import { getIsActive, getNavHref, NAV_ITEMS } from '../../lib/nav.constants';

interface MobileSheetProps {
  user: AuthUser | null;
  pathname: string | null;
  favoritesCount: number;
  onLoginRequired: () => void;
  onLogout: () => void;
}

export function MobileSheet({
  user,
  pathname,
  favoritesCount,
  onLoginRequired,
  onLogout,
}: MobileSheetProps) {
  const [open, setOpen] = useState(false);
  const { handleOpen, isOpen, close, createMeeting } = useMeetingCreateTrigger();

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="p-1 md:hidden" aria-label="메뉴 열기">
            <Menu className="text-sosoeat-gray-600 size-6" strokeWidth={1.5} />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="flex w-64 flex-col gap-0 rounded-l-[24px] p-0">
          <SheetTitle className="sr-only">메뉴</SheetTitle>
          <SheetDescription className="sr-only">모바일 네비게이션 메뉴</SheetDescription>

          {/* 유저 프로필 */}
          {user ? (
            <div className="bg-sosoeat-orange-50 flex items-center gap-3 px-6 py-5">
              <Image
                src={user.image || '/images/basic-profile.svg'}
                alt={user.name}
                width={44}
                height={44}
                className="bg-sosoeat-gray-200 size-11 shrink-0 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/images/basic-profile.svg';
                }}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#111827]">{user.name}</p>
                <p className="truncate text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          ) : (
            <div className="bg-sosoeat-orange-50 flex flex-col items-center gap-3 px-6 py-5">
              <Image
                src="/images/basic-profile.svg"
                alt="기본 프로필"
                width={44}
                height={44}
                className="bg-sosoeat-gray-200 size-11 shrink-0 rounded-full"
              />
              <p className="text-sm font-medium text-gray-600">소소잇에 오신 걸 환영해요</p>
              <div className="flex w-full gap-2">
                <SheetClose asChild>
                  <Link
                    href="/login"
                    className="border-sosoeat-orange-600 text-sosoeat-orange-600 flex flex-1 items-center justify-center rounded-lg border py-1.5 text-xs font-medium"
                  >
                    로그인
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/signup"
                    className="bg-sosoeat-orange-600 flex flex-1 items-center justify-center rounded-lg py-1.5 text-xs font-medium text-white"
                  >
                    회원가입
                  </Link>
                </SheetClose>
              </div>
            </div>
          )}

          {/* 메뉴 섹션 */}
          <div className="flex flex-col px-4 py-5">
            <p className="mb-1 px-3 text-xs font-semibold text-gray-400">메뉴</p>
            {NAV_ITEMS.map((item) => {
              const isActive = getIsActive(item, pathname);
              const href = getNavHref(item, user);
              const showBadge =
                'showBadge' in item && item.showBadge && !!user && favoritesCount > 0;
              const itemClass = cn(
                'flex h-11 items-center rounded-md px-3 text-sm font-medium transition-colors',
                isActive
                  ? 'text-sosoeat-orange-600 bg-sosoeat-orange-100'
                  : 'hover:text-sosoeat-orange-600 text-gray-600'
              );
              return href === null ? (
                <SheetClose key={item.href} asChild>
                  <button onClick={onLoginRequired} className={itemClass}>
                    <span className="flex items-center gap-1.5">
                      {item.label}
                      {showBadge && <CountingBadge count={favoritesCount} size="small" />}
                    </span>
                  </button>
                </SheetClose>
              ) : (
                <SheetClose key={item.href} asChild>
                  <Link href={href} className={itemClass}>
                    <span className="flex items-center gap-1.5">
                      {item.label}
                      {showBadge && <CountingBadge count={favoritesCount} size="small" />}
                    </span>
                  </Link>
                </SheetClose>
              );
            })}
          </div>

          {/* 내 계정 섹션 */}
          {user && (
            <div className="flex flex-col border-t border-gray-100 px-4 pt-5">
              <p className="mb-1 px-3 text-xs font-semibold text-gray-400">내 계정</p>
              <SheetClose asChild>
                <Link
                  href="/mypage"
                  className="hover:text-sosoeat-orange-600 flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium text-gray-600 transition-colors"
                >
                  <User className="size-4 shrink-0" />
                  마이페이지
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <button
                  onClick={onLogout}
                  className="text-destructive flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors hover:opacity-70"
                >
                  <LogOut className="size-4 shrink-0" />
                  로그아웃
                </button>
              </SheetClose>
            </div>
          )}

          {/* 모임 만들기 */}
          <div className="mt-auto border-t border-gray-100 px-4 py-4">
            <SheetClose asChild>
              <button
                className="bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-colors"
                onClick={() => {
                  setOpen(false);
                  handleOpen();
                }}
              >
                <Image src="/icons/icon-createGroup.png" alt="" width={16} height={16} />
                모임 만들기
              </button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
      <MeetingCreateModal open={isOpen} onClose={close} onSubmit={createMeeting} />
    </>
  );
}
