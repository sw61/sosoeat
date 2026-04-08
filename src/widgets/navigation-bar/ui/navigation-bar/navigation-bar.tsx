'use client';

import { useEffect, useRef } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import { AuthUser, useAuthStore } from '@/entities/auth';
import { useLogout } from '@/features/auth';
import { favoriteKeys, useFavoritesCount } from '@/features/favorites';
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
  const { data: favoritesCount } = useFavoritesCount(initialFavoritesCount, { enabled: !!user });
  const queryClient = useQueryClient();
  const prevUserIdRef = useRef<number | null | undefined>(initialUser?.id);

  const { mutateAsync: createMeeting } = useCreateMeeting();

  useEffect(() => {
    const prevId = prevUserIdRef.current;
    const currId = storeUser?.id;
    if (prevId == null && currId != null) {
      queryClient.invalidateQueries({ queryKey: favoriteKeys.count() });
    } else if (prevId != null && currId == null) {
      queryClient.setQueryData(favoriteKeys.count(), 0);
    }
    prevUserIdRef.current = currId;
  }, [storeUser?.id, queryClient]);

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
            <NavActions
              user={user}
              onOpenCreateModal={handleOpenCreateModal}
              onLogout={performLogout}
            />
            <MobileSheet
              user={user}
              pathname={pathname}
              searchParams={searchParams}
              onLoginRequired={() => setLoginRequired(true)}
              onLogout={performLogout}
            />
          </div>
        </div>
      </header>
      <MeetingCreateModal open={isOpen} onClose={close} onSubmit={createMeeting} />
    </>
  );
}
