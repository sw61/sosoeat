'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Bell, ChevronDown, Plus, X } from 'lucide-react';

import { CountingBadge } from '@/components/common/counting-badge';
import { useAuthStore } from '@/store/auth-store';

const NAV_ITEMS = [
  { href: '/meetings', label: '모임찾기' },
  { href: '/wishlist', label: '찜한 모임', showBadge: true },
  { href: '/sosotalk', label: '소소토크' },
] as const;

export function NavigationBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  // TODO: 알림 기능 구현 시 React Query로 교체 예정
  // ex) const { data: unreadCount = 0 } = useUnreadNotificationCount();
  const unreadCount = 0;

  // TODO: 찜 기능 구현 시 React Query로 교체 예정
  // ex) const { data: likedGroupCount = 0 } = useLikedGroupCount();
  const likedGroupCount = 0;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setIsNotificationOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
    setIsDropdownOpen(false);
    router.push('/');
  }

  return (
    <>
      <header className="bg-background min-w-[343px] md:min-w-[670px]">
        <div className="flex h-12 items-center justify-between px-4 md:h-16 md:px-[30px]">
          {/* 로고 */}
          <Link href="/" className="shrink-0">
            <Image src="/images/logo.png" alt="sosoeat" width={72} height={22.64} priority />
          </Link>

          {/* 메뉴 링크 — 태블릿 이상 */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-sosoeat-orange-600 bg-orange-50'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                  {'showBadge' in item && <CountingBadge count={likedGroupCount} />}
                </Link>
              );
            })}
          </nav>

          {/* 우측 영역 */}
          <div className="flex items-center gap-2">
            {/* 로그인 상태 */}
            {user ? (
              <>
                {/* 알림 버튼 */}
                <div ref={notificationRef} className="relative">
                  <button
                    className="relative p-1"
                    onClick={() => setIsNotificationOpen((prev) => !prev)}
                    aria-label="알림"
                  >
                    <Bell className="text-sosoeat-orange-600 h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="bg-sosoeat-orange-600 absolute top-0 right-0 h-2 w-2 rounded-full" />
                    )}
                  </button>

                  {/* 알림 패널 — 패널 연결하면서 주석 해제하시면 됩니다! */}
                  {/* {isNotificationOpen && (
                    <NotificationPanel onClose={() => setIsNotificationOpen(false)} />
                  )} */}
                </div>

                {/* 모임 만들기 — lg 이상 */}
                <button
                  className="bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 hidden items-center gap-1 rounded-[0.875rem] px-3 py-1.5 text-sm font-medium text-white transition-colors lg:flex"
                  onClick={() => router.push('/meetings/new')}
                >
                  <Plus className="h-4 w-4" />
                  모임 만들기
                </button>

                {/* 프로필 — md 이상만: md: 사진만, lg: 이름+드롭다운 */}
                <div ref={dropdownRef} className="relative hidden md:block">
                  <button
                    className="flex items-center gap-1"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    aria-label="프로필 메뉴"
                  >
                    <div className="bg-sosoeat-gray-200 h-8 w-8 shrink-0 overflow-hidden rounded-full">
                      {user.profileImage ? (
                        <Image
                          src={user.profileImage}
                          alt={user.name}
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="text-sosoeat-gray-500 flex h-full w-full items-center justify-center text-sm font-medium">
                          {user.name[0]}
                        </div>
                      )}
                    </div>
                    <span className="hidden text-sm font-medium lg:block">{user.name}</span>
                    <ChevronDown className="text-muted-foreground hidden h-4 w-4 lg:block" />
                  </button>

                  {isDropdownOpen && (
                    <div className="bg-background border-border absolute top-full right-0 z-50 mt-2 w-40 rounded-lg border py-1 shadow-md">
                      <button
                        className="hover:bg-muted w-full px-4 py-2 text-left text-sm transition-colors"
                        onClick={() => {
                          router.push('/profile');
                          setIsDropdownOpen(false);
                        }}
                      >
                        내 프로필
                      </button>
                      <button
                        className="text-destructive hover:bg-muted w-full px-4 py-2 text-left text-sm transition-colors"
                        onClick={handleLogout}
                      >
                        로그아웃
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* 비로그인 상태 */
              <Link
                href="/login"
                className="text-muted-foreground hover:text-foreground hidden text-sm font-medium transition-colors md:block"
              >
                로그인
              </Link>
            )}

            {/* 햄버거 버튼 — md 미만 */}
            <button
              className="p-1 md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="메뉴 열기"
            >
              <Image src="/icons/icon-hamburger.png" alt="메뉴" width={24} height={24} />
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 패널 */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="bg-background fixed top-0 right-0 z-50 flex h-full w-64 flex-col shadow-xl md:hidden">
            <div className="flex justify-end p-4">
              <button onClick={() => setIsMobileMenuOpen(false)} aria-label="메뉴 닫기">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-4">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-sosoeat-orange-600 bg-orange-50'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              {!user && (
                <Link
                  href="/login"
                  className="text-muted-foreground hover:text-foreground rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  로그인
                </Link>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
