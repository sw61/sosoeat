'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Bell, ChevronDown } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useAuthStore } from '@/store/authStore';

const NAV_ITEMS = [
  { href: '/meetings', label: '모임찾기' },
  { href: '/mypage?tab=liked', label: '찜한 모임', showBadge: true },
  { href: '/sosotalk', label: '소소토크' },
] as const;

export function NavigationBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const visibleNavItems = NAV_ITEMS.filter((item) => !('showBadge' in item) || !!user);

  // TODO: 알림 기능 구현 시 React Query로 교체 예정
  // ex) const { data: hasUnread = false } = useHasUnreadNotification();
  const hasUnread = false;

  // TODO: 찜 기능 구현 시 React Query로 교체 예정
  // ex) const { data: wishlistCount = 0 } = useWishlistCount();
  const [wishlistCount] = useState(0);

  function handleLogout() {
    logout();
    router.push('/');
  }

  return (
    <header className="bg-background min-w-[343px] md:min-w-[670px]">
      <div className="flex h-12 items-center justify-between px-4 md:h-16 md:px-[30px]">
        {/* 로고 */}
        <Link href="/" className="shrink-0">
          <Image src="/images/logo.png" alt="sosoeat" width={72} height={22.64} priority />
        </Link>

        {/* 메뉴 링크 — 태블릿 이상 */}
        <nav className="hidden items-center gap-1 md:flex">
          {visibleNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-sosoeat-orange-600 bg-orange-50'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
                {'showBadge' in item && (
                  <span className="bg-sosoeat-orange-600 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* 우측 영역 */}
        <div className="flex items-center gap-2">
          {/* 로그인 상태 */}
          {user ? (
            <>
              {/* 알림 버튼 — Mobile: Sheet / PC·Tablet: Dropdown */}

              {/* Mobile 알림 (md 미만) */}
              <Sheet>
                <SheetTrigger asChild>
                  <button className="relative p-1 md:hidden" aria-label="알림">
                    <Bell className="text-sosoeat-orange-600 h-5 w-5" />
                    {hasUnread && (
                      <span className="bg-sosoeat-orange-600 absolute top-0 right-0 h-2 w-2 rounded-full" />
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64 p-0 pt-12">
                  <SheetTitle className="sr-only">알림</SheetTitle>
                  {/* TODO: 알림 패널 구현 후 아래 방식으로 연결
                  - 알림 컴포넌트를 import한 뒤 이 자리에 렌더링하면 됩니다.
                  ex) import { 알림컴포넌트 } from '...'
                      <알림컴포넌트 /> */}
                </SheetContent>
              </Sheet>

              {/* PC·Tablet 알림 (md 이상) — 알림 구현 후 아래 방식으로 연결
                1. import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog' 추가
                2. 아래 주석 해제 후 알림 컴포넌트 자리에 렌더링
                ex) import { 알림컴포넌트 } from '...'
              <Dialog>
                <DialogTrigger asChild>
                  <button className="relative hidden p-1 md:block" aria-label="알림">
                    <Bell className="text-sosoeat-orange-600 h-5 w-5" />
                    {hasUnread && (
                      <span className="bg-sosoeat-orange-600 absolute top-0 right-0 h-2 w-2 rounded-full" />
                    )}
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <알림컴포넌트 />
                </DialogContent>
              </Dialog> */}
              <button className="relative hidden p-1 md:block" aria-label="알림">
                <Bell className="text-sosoeat-orange-600 h-5 w-5" />
                {hasUnread && (
                  <span className="bg-sosoeat-orange-600 absolute top-0 right-0 h-2 w-2 rounded-full" />
                )}
              </button>

              {/* 모임 만들기 — lg 이상 */}
              <Button
                size="lg"
                className="bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 hidden w-[124px] items-end justify-center gap-[7px] rounded-[0.875rem] pt-2 pr-[17px] pb-2 pl-4 font-medium text-white lg:flex"
                // TODO: 모임 만들기 모달 컴포넌트 완성 시 연결할 것
              >
                <Image src="/icons/icon-createGroup.png" alt="" width={16} height={16} />
                모임 만들기
              </Button>

              {/* 프로필 — md 이상만: md: 사진만, lg: 이름+드롭다운 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hidden items-center gap-1 md:flex" aria-label="프로필 메뉴">
                    <Avatar className="bg-sosoeat-gray-200 shrink-0">
                      <AvatarImage src={user.profileImage ?? undefined} alt={user.name} />
                      <AvatarFallback className="text-sosoeat-gray-500 text-sm font-medium">
                        {user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden text-sm font-medium lg:block">{user.name}</span>
                    <ChevronDown className="text-muted-foreground hidden h-4 w-4 lg:block" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push('/mypage')}>
                    마이페이지
                  </DropdownMenuItem>
                  <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            /* 비로그인 상태 */
            <Link
              href="/login"
              className="text-muted-foreground hover:text-foreground hidden text-sm font-medium transition-colors md:block"
            >
              로그인
            </Link>
          )}

          {/* 햄버거 버튼 — md 미만 */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-1 md:hidden" aria-label="메뉴 열기">
                <Image src="/icons/icon-hamburger.png" alt="메뉴" width={24} height={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 p-0 pt-12">
              <SheetTitle className="sr-only">메뉴</SheetTitle>
              <nav className="flex flex-col gap-1 px-4">
                {visibleNavItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <SheetClose key={item.href} asChild>
                      <Link
                        href={item.href}
                        className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          isActive
                            ? 'text-sosoeat-orange-600 bg-orange-50'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  );
                })}
                {!user && (
                  <SheetClose asChild>
                    <Link
                      href="/login"
                      className="text-muted-foreground hover:text-foreground rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                    >
                      로그인
                    </Link>
                  </SheetClose>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
