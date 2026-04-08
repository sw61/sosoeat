import { type ReadonlyURLSearchParams } from 'next/navigation';

import { AuthUser } from '@/entities/auth';

export const NAV_ITEMS = [
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
