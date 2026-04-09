'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { AuthUser, useAuthStore } from '@/entities/auth';
import { useFavoritesCount } from '@/entities/favorites';
import { useLogout } from '@/features/auth';
import { MeetingCreateModal, useCreateMeeting } from '@/features/meeting-create';
import { useModal } from '@/shared/lib/use-modal';
import { cn } from '@/shared/lib/utils';

import { DesktopNav } from '../desktop-nav/desktop-nav';
import { MobileSheet } from '../mobile-sheet/mobile-sheet';
import { NavActions } from '../nav-actions/nav-actions';

export function NavigationBar({
  initialUser,
  initialFavoritesCount,
}: {
  initialUser: AuthUser | null;
  initialFavoritesCount: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const storeUser = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const { mutate: performLogout } = useLogout();
  const { isOpen, open, close } = useModal();

  const { setLoginRequired } = useAuthStore();
  const user = isInitialized ? storeUser : initialUser;
  const { data: favoritesCount } = useFavoritesCount(initialFavoritesCount, {
    enabled: !!user,
  });

  const { mutateAsync: createMeeting } = useCreateMeeting();

  const handleOpenCreateModal = () => {
    if (!user) {
      setLoginRequired(true);
      return;
    }
    open();
  };

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
          <Link href="/home" className="shrink-0">
            <Image src="/images/logo.svg" alt="sosoeat" width={71} height={24} priority />
          </Link>

          <DesktopNav
            user={user}
            pathname={pathname}
            searchParams={searchParams}
            favoritesCount={favoritesCount ?? initialFavoritesCount}
            onLoginRequired={() => setLoginRequired(true)}
          />

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Notification />
                <Button
                  size="lg"
                  className="bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 hidden items-center justify-center gap-1 rounded-xl px-4 py-2 font-medium text-white md:mr-1 md:flex"
                  onClick={handleOpenCreateModal}
                >
                  <Image src="/icons/icon-createGroup.png" alt="" width={16} height={16} />
                  모임 만들기
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="hidden cursor-pointer items-center gap-1 outline-none md:flex"
                      aria-label="프로필 메뉴"
                    >
                      <Avatar className="bg-sosoeat-gray-200 shrink-0">
                        <AvatarImage
                          src={user.image || '/images/basic-profile.svg'}
                          alt={user.name}
                        />
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
                <SheetDescription className="sr-only">모바일 네비게이션 메뉴</SheetDescription>

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
