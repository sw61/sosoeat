'use client';

import Link from 'next/link';

import { AuthUser } from '@/entities/auth';
import { cn } from '@/shared/lib/utils';
import { CountingBadge } from '@/shared/ui/counting-badge/counting-badge';

import { getIsActive, getNavHref, NAV_ITEMS } from '../../lib/nav.constants';

interface DesktopNavProps {
  user: AuthUser | null;
  pathname: string | null;
  favoritesCount: number;
  onLoginRequired: () => void;
}

export function DesktopNav({ user, pathname, favoritesCount, onLoginRequired }: DesktopNavProps) {
  return (
    <nav className="hidden items-center gap-1 md:flex">
      {NAV_ITEMS.map((item) => {
        const isActive = getIsActive(item, pathname);
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
            {'showBadge' in item && item.showBadge && !!user && favoritesCount > 0 && (
              <CountingBadge count={favoritesCount} size="large" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
