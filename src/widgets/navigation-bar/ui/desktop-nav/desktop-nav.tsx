'use client';

import Link from 'next/link';
import { type ReadonlyURLSearchParams } from 'next/navigation';

import { AuthUser } from '@/entities/auth';

const NAV_ITEMS = [
  { href: '/home', label: '홈' },
  { href: '/search', label: '모임찾기' },
  { href: '/mypage?tab=liked', label: '찜한 모임', showBadge: true },
  { href: '/sosotalk', label: '소소토크' },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];

export const getNavHref = (item: NavItem, user: AuthUser | null) =>
  'showBadge' in item && !user ? null : item.href;

export const getIsActive = (
  item: NavItem,
  pathname: string | null,
  searchParams: ReadonlyURLSearchParams | null
) => {
  if (!pathname) return false;
  const currentParams = searchParams ?? new URLSearchParams();
  const [itemPath, itemQuery] = item.href.split('?');
  if (!itemQuery) return pathname === itemPath;
  const itemParams = new URLSearchParams(itemQuery);
  return (
    pathname === itemPath &&
    [...itemParams.entries()].every(([key, value]) => currentParams.get(key) === value)
  );
};

export { NAV_ITEMS };

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
        const className = `flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
          isActive
            ? 'text-sosoeat-orange-600 bg-sosoeat-orange-100'
            : 'text-sosoeat-gray-900 hover:text-sosoeat-orange-600'
        }`;
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
