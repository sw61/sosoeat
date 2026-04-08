'use client';

import Link from 'next/link';
import { type ReadonlyURLSearchParams } from 'next/navigation';

import { AuthUser } from '@/entities/auth';
import { cn } from '@/shared/lib/utils';

import { getIsActive, getNavHref, NAV_ITEMS } from '../../lib/nav.constants';

interface DesktopNavProps {
  user: AuthUser | null;
  pathname: string | null;
  searchParams: ReadonlyURLSearchParams | null;
  favoritesCount: number;
  onLoginRequired: () => void;
}

export function DesktopNav({
  user,
  pathname,
  searchParams,
  favoritesCount,
  onLoginRequired,
}: DesktopNavProps) {
  return (
    <nav className="hidden items-center gap-1 md:flex">
      {NAV_ITEMS.map((item) => {
        const isActive = getIsActive(item, pathname, searchParams);
        const href = getNavHref(item, user);
        const className = cn(
          'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
          isActive
            ? 'text-sosoeat-orange-600 bg-sosoeat-orange-100'
            : 'text-sosoeat-gray-900 hover:text-sosoeat-orange-600'
        );
        return href === null ? (
          <button key={item.href} onClick={onLoginRequired} className={className}>
            {item.label}
          </button>
        ) : (
          <Link key={item.href} href={href} className={className}>
            {item.label}
            {'showBadge' in item && !!user && (
              <span className="bg-sosoeat-orange-600 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white">
                {favoritesCount}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
