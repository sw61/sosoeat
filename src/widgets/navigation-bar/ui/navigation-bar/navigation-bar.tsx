import Image from 'next/image';
import Link from 'next/link';

import { AuthUser } from '@/entities/auth';
import { cn } from '@/shared/lib/utils';

import { NavClient } from '../nav-client/nav-client';

export function NavigationBar({
  initialUser,
  initialFavoritesCount,
  initialUnreadCount = 0,
}: {
  initialUser: AuthUser | null;
  initialFavoritesCount: number;
  initialUnreadCount?: number;
}) {
  return (
    <header className="bg-background sticky top-0 z-50 w-full pt-[env(safe-area-inset-top)]">
      <div
        className={cn(
          'mx-auto flex w-full items-center justify-between',
          'h-12 max-w-[1140px] px-4',
          'md:h-16',
          'md:px-[37px]'
        )}
      >
        <Link href="/home" className="shrink-0">
          <Image src="/images/logo.svg" alt="sosoeat" width={71} height={24} priority />
        </Link>

        <NavClient
          initialUser={initialUser}
          initialFavoritesCount={initialFavoritesCount}
          initialUnreadCount={initialUnreadCount}
        />
      </div>
    </header>
  );
}
