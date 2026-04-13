'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { ChevronRight } from 'lucide-react';

import { AuthUser } from '@/entities/auth';
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

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="p-1 md:hidden" aria-label="메뉴 열기" suppressHydrationWarning>
          <Image src="/icons/icon-hamburger.png" alt="메뉴" width={24} height={24} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-64 flex-col p-0 pt-12">
        <SheetTitle className="sr-only">메뉴</SheetTitle>
        <SheetDescription className="sr-only">모바일 네비게이션 메뉴</SheetDescription>

        <div className="flex flex-col gap-1 px-4">
          {NAV_ITEMS.map((item) => {
            const isActive = getIsActive(item, pathname);
            const href = getNavHref(item, user);
            const className = cn(
              'flex h-[72px] items-center justify-between rounded-md px-3 text-sm font-medium transition-colors',
              isActive
                ? 'text-sosoeat-orange-600 bg-sosoeat-orange-100'
                : 'text-muted-foreground hover:text-sosoeat-orange-600'
            );
            const showBadge = 'showBadge' in item && item.showBadge && !!user && favoritesCount > 0;
            return href === null ? (
              <SheetClose key={item.href} asChild>
                <button onClick={onLoginRequired} className={className}>
                  <span className="flex items-center gap-1.5">
                    {item.label}
                    {showBadge && <CountingBadge count={favoritesCount} size="small" />}
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0" />
                </button>
              </SheetClose>
            ) : (
              <SheetClose key={item.href} asChild>
                <Link href={href} className={className}>
                  <span className="flex items-center gap-1.5">
                    {item.label}
                    {showBadge && <CountingBadge count={favoritesCount} size="small" />}
                  </span>
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
                onClick={onLogout}
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
  );
}
