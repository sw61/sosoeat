'use client';

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
import { cn } from '@/lib/utils';
import { useLogout } from '@/services/auth';
import { useAuthStore } from '@/store/auth-store';

const NAV_ITEMS = [
  { href: '/meetings', label: '모임찾기' },
  { href: '/mypage?tab=liked', label: '찜한 모임', showBadge: true },
  { href: '/sosotalk', label: '소소토크' },
] as const;

export function NavigationBar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { mutate: performLogout } = useLogout();

  const visibleNavItems = NAV_ITEMS;

  // TODO: 알림 기능 구현 시 React Query로 교체 예정
  // ex) const { data: hasUnread = false } = useHasUnreadNotification();
  const hasUnread = false;

  // TODO: 찜 컴포넌트 분리 시 아래 상수 제거 후 컴포넌트로 교체
  // ex) import { WishGroupBadge } from '@/components/common/wish-group-badge'
  const wishGroupCount = 0;

  return (
    <header className="bg-background w-full">
      <div
        className={cn(
          'mx-auto flex w-full items-center justify-between',
          'h-16 max-w-[1140px] px-4',
          'md:px-[37px]'
        )}
      >
        <Link href="/" className="shrink-0">
          <Image src="/images/logo.svg" alt="sosoeat" width={72} height={22.64} priority />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {visibleNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={'showBadge' in item && !user ? '/login' : item.href}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-sosoeat-orange-600 bg-sosoeat-orange-100'
                    : 'text-sosoeat-gray-900 hover:text-foreground'
                }`}
              >
                {item.label}
                {'showBadge' in item && !!user && (
                  <span className="bg-sosoeat-orange-600 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white">
                    {wishGroupCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
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
                </SheetContent>
              </Sheet>

              <button className="relative hidden cursor-pointer p-1 md:block" aria-label="알림">
                <Bell className="text-sosoeat-orange-600 h-5 w-5" />
                {hasUnread && (
                  <span className="bg-sosoeat-orange-600 absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full" />
                )}
              </button>

              <Button
                size="lg"
                className="bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 hidden items-center justify-center gap-1 rounded-xl px-4 py-2 font-medium text-white lg:mr-1 lg:flex"
              >
                <Image src="/icons/icon-createGroup.png" alt="" width={16} height={16} />
                모임 만들기
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="hidden cursor-pointer items-center gap-1 md:flex"
                    aria-label="프로필 메뉴"
                  >
                    <Avatar className="bg-sosoeat-gray-200 shrink-0">
                      <AvatarImage src={user.image ?? undefined} alt={user.name} />
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
                  <DropdownMenuItem variant="destructive" onClick={() => performLogout()}>
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link
              href="/login"
              className="text-muted-foreground hover:text-foreground hidden text-sm font-medium transition-colors md:block"
            >
              로그인
            </Link>
          )}

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
                        className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                          isActive
                            ? 'text-sosoeat-orange-600 bg-sosoeat-orange-100'
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
