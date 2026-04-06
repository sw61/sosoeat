'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { Bell, ChevronRight } from 'lucide-react';

import { MeetingCreateModal } from '@/components/common/meeting-create-modal';
import { useLogout } from '@/services/auth';
import { useCreateMeeting } from '@/services/meetings';
import { useModal } from '@/shared/hooks/use-modal';
import { cn } from '@/shared/lib/utils';
import { useAuthStore } from '@/shared/store/auth-store';
import { AuthUser } from '@/shared/types/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/shared/ui/sheet';

const NAV_ITEMS = [
  { href: '/', label: '홈' },
  { href: '/meetings', label: '모임찾기' },
  { href: '/mypage?tab=liked', label: '찜한 모임', showBadge: true },
  { href: '/sosotalk', label: '소소토크' },
] as const;

// TODO: 알림 기능 구현 시 React Query로 교체 예정
// ex) const { data: hasUnread = false } = useHasUnreadNotification();
const hasUnread = false;

// TODO: 찜 컴포넌트 분리 시 아래 상수 제거 후 컴포넌트로 교체
// ex) import { WishGroupBadge } from '@/components/common/wish-group-badge'
const wishGroupCount = 0;

const getNavHref = (item: (typeof NAV_ITEMS)[number], user: AuthUser | null) =>
  'showBadge' in item && !user ? '/login' : item.href;

const getIsActive = (
  item: (typeof NAV_ITEMS)[number],
  pathname: string,
  searchParams: URLSearchParams
) => {
  const [itemPath, itemQuery] = item.href.split('?');
  if (!itemQuery) return pathname === itemPath;
  const itemParams = new URLSearchParams(itemQuery);
  return (
    pathname === itemPath &&
    [...itemParams.entries()].every(([key, value]) => searchParams.get(key) === value)
  );
};

export function NavigationBar({ initialUser }: { initialUser: AuthUser | null }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const storeUser = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const { mutate: performLogout } = useLogout();
  const { isOpen, open, close } = useModal();
  const { mutateAsync: createMeeting } = useCreateMeeting();
  const { setLoginRequired } = useAuthStore();

  const handleOpenCreateModal = () => {
    if (!user) {
      setLoginRequired(true);
      return;
    }
    open();
  };

  // isInitialized 전: 서버에서 받은 initialUser 사용 (FOUC 방지)
  // isInitialized 후: Zustand storeUser가 권위 (로그아웃 등 클라이언트 상태 변화 반영)
  const user = isInitialized ? storeUser : initialUser;

  return (
    <>
      <header className="bg-background sticky top-0 z-50 w-full pt-[env(safe-area-inset-top)] md:static md:z-auto md:pt-0">
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
            {NAV_ITEMS.map((item) => {
              const isActive = getIsActive(item, pathname, searchParams);
              return (
                <Link
                  key={item.href}
                  href={getNavHref(item, user)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-sosoeat-orange-600 bg-sosoeat-orange-100'
                      : 'text-sosoeat-gray-900 hover:text-sosoeat-orange-600'
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

                <Button
                  size="lg"
                  className="bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 hidden items-center justify-center gap-1 rounded-xl px-4 py-2 font-medium text-white md:mr-1 md:flex"
                  onClick={handleOpenCreateModal}
                >
                  <Image src="/icons/icon-createGroup.png" alt="" width={16} height={16} />
                  모임 만들기
                </Button>

                <button className="relative hidden cursor-pointer p-1 md:block" aria-label="알림">
                  <Bell className="text-sosoeat-orange-600 h-5 w-5" />
                  {hasUnread && (
                    <span className="bg-sosoeat-orange-600 absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full" />
                  )}
                </button>

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
                    <DropdownMenuItem
                      className="h-10"
                      variant="destructive"
                      onClick={() => performLogout()}
                    >
                      로그아웃
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link
                href="/login"
                className="text-muted-foreground hover:text-sosoeat-orange-600 hidden text-sm font-medium transition-colors md:block"
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
              <SheetContent side="right" className="flex w-64 flex-col p-0 pt-12">
                <SheetTitle className="sr-only">메뉴</SheetTitle>

                <div className="flex flex-col gap-1 px-4">
                  {NAV_ITEMS.map((item) => {
                    const isActive = getIsActive(item, pathname, searchParams);
                    return (
                      <SheetClose key={item.href} asChild>
                        <Link
                          href={getNavHref(item, user)}
                          className={`flex h-[72px] items-center justify-between rounded-md px-3 text-sm font-medium transition-colors ${
                            isActive
                              ? 'text-sosoeat-orange-600 bg-sosoeat-orange-100'
                              : 'text-muted-foreground hover:text-sosoeat-orange-600'
                          }`}
                        >
                          {item.label}
                          <ChevronRight className="h-4 w-4 shrink-0" />
                        </Link>
                      </SheetClose>
                    );
                  })}

                  {user && (
                    <SheetClose asChild>
                      <Link
                        href="/mypage"
                        className="text-muted-foreground hover:text-sosoeat-orange-600 flex h-[72px] items-center justify-between rounded-md px-3 text-sm font-medium transition-colors"
                      >
                        마이페이지
                        <ChevronRight className="h-4 w-4 shrink-0" />
                      </Link>
                    </SheetClose>
                  )}
                </div>

                <div className="mt-auto flex justify-end px-7 pb-10">
                  {user ? (
                    <SheetClose asChild>
                      <button
                        onClick={() => performLogout()}
                        className="text-muted-foreground hover:text-destructive cursor-pointer text-sm transition-colors"
                      >
                        로그아웃
                      </button>
                    </SheetClose>
                  ) : (
                    <SheetClose asChild>
                      <Link
                        href="/login"
                        className="text-muted-foreground hover:text-sosoeat-orange-600 text-sm transition-colors"
                      >
                        로그인
                      </Link>
                    </SheetClose>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <MeetingCreateModal open={isOpen} onClose={close} onSubmit={createMeeting} />
    </>
  );
}
