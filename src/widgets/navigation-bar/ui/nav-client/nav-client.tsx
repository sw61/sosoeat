'use client';

import { usePathname } from 'next/navigation';

import { toast } from 'sonner';

import { AuthUser, useAuthStore } from '@/entities/auth';
import { useFavoritesCount } from '@/entities/favorites';
import { useLogoutMutation } from '@/features/auth';

import { DesktopNav } from '../desktop-nav/desktop-nav';
import { MobileSheet } from '../mobile-sheet/mobile-sheet';
import { NavActions } from '../nav-actions/nav-actions';

interface NavClientProps {
  initialUser: AuthUser | null;
  initialFavoritesCount: number;
  initialUnreadCount: number;
}

export function NavClient({
  initialUser,
  initialFavoritesCount,
  initialUnreadCount,
}: NavClientProps) {
  const pathname = usePathname();
  const storeUser = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const { setLoginRequired } = useAuthStore();
  const { mutate: performLogout } = useLogoutMutation();

  const user = isInitialized ? storeUser : initialUser;
  const { data: favoritesCount } = useFavoritesCount(initialFavoritesCount, {
    enabled: !!user,
  });

  const count = favoritesCount ?? initialFavoritesCount;
  const handleLogout = () =>
    performLogout(undefined, { onSuccess: () => toast.success('로그아웃 되었습니다.') });

  return (
    <>
      <DesktopNav
        user={user}
        pathname={pathname}
        favoritesCount={count}
        onLoginRequired={() => setLoginRequired(true)}
      />

      <div className="flex items-center gap-2">
        <NavActions user={user} onLogout={handleLogout} initialUnreadCount={initialUnreadCount} />
        <MobileSheet
          user={user}
          pathname={pathname}
          favoritesCount={count}
          onLoginRequired={() => setLoginRequired(true)}
          onLogout={handleLogout}
        />
      </div>
    </>
  );
}
