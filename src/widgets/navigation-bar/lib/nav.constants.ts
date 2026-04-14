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

export const getIsActive = (item: NavItem, pathname: string | null) => {
  if (!pathname) return false;
  const [itemPath] = item.href.split('?');
  return pathname === itemPath;
};
