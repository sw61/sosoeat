'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Bell, ChevronDown, Plus } from 'lucide-react';

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
  { href: '/wishlist', label: '찜한 모임', showBadge: true },
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
                  {/* TODO: 알림 패널 연결 시 주석 해제
                  <NotificationPanel /> */}
                </SheetContent>
              </Sheet>

              {/* PC·Tablet 알림 (md 이상) — Dropdown 연결 시 주석 해제 */}
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative hidden p-1 md:block" aria-label="알림">
                    <Bell className="text-sosoeat-orange-600 h-5 w-5" />
                    {hasUnread && (
                      <span className="bg-sosoeat-orange-600 absolute top-0 right-0 h-2 w-2 rounded-full" />
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <NotificationPanel />
                </DropdownMenuContent>
              </DropdownMenu> */}
              <button className="relative hidden p-1 md:block" aria-label="알림">
                <Bell className="text-sosoeat-orange-600 h-5 w-5" />
                {hasUnread && (
                  <span className="bg-sosoeat-orange-600 absolute top-0 right-0 h-2 w-2 rounded-full" />
                )}
              </button>

              {/* 모임 만들기 — lg 이상 */}
              <button
                className="bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 hidden items-center gap-1 rounded-[0.875rem] px-3 py-1.5 text-sm font-medium text-white transition-colors lg:flex"
                onClick={() => router.push('/meetings/new')}
              >
                <Plus className="h-4 w-4" />
                모임 만들기
              </button>

              {/* 프로필 — md 이상만: md: 사진만, lg: 이름+드롭다운 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hidden items-center gap-1 md:flex" aria-label="프로필 메뉴">
                    <div className="bg-sosoeat-gray-200 h-8 w-8 shrink-0 overflow-hidden rounded-full">
                      {user.profileImage ? (
                        <Image
                          src={user.profileImage}
                          alt={user.name}
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="text-sosoeat-gray-500 flex h-full w-full items-center justify-center text-sm font-medium">
                          {user.name[0]}
                        </div>
                      )}
                    </div>
                    <span className="hidden text-sm font-medium lg:block">{user.name}</span>
                    <ChevronDown className="text-muted-foreground hidden h-4 w-4 lg:block" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push('/profile')}>
                    내 프로필
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
