# NavigationBar

공통 네비게이션 바 컴포넌트입니다.

---

## 구조

```
navigation-bar/
├── navigation-bar.tsx        ← Client Component (UI 전체)
├── navigation-bar.types.ts   ← 타입 정의
└── index.ts                  ← barrel export
```

---

## 책임 범위

### 컴포넌트가 담당하는 것

| 항목             | 설명                                               |
| :--------------- | :------------------------------------------------- |
| 반응형 레이아웃  | 브레이크포인트별 요소 표시/숨김                    |
| 모바일 메뉴 패널 | 열림/닫힘 상태, 배경 클릭 시 닫기                  |
| 사용자 드롭다운  | 열림/닫힘, 외부 클릭 시 닫기                       |
| 인증 상태 구독   | `useAuthStore`에서 직접 `user`, `unreadCount` 구독 |
| 라우팅           | `useRouter`로 페이지 이동 처리                     |
| 활성 메뉴 강조   | `usePathname`으로 현재 경로 비교                   |

### 외부(store 등)가 담당하는 것

| 항목                 | 설명                                             |
| :------------------- | :----------------------------------------------- |
| 인증 상태            | `useAuthStore` — `user`, `unreadCount`, `logout` |
| 로그인 후 store 갱신 | 로그인 페이지에서 `setUser` 호출                 |
| localStorage 동기화  | `Providers.tsx`에서 앱 초기화 시 store에 올림    |

---

## Props

없음. 인증 상태는 `useAuthStore`에서 직접 구독합니다.

```tsx
// layout.tsx
<NavigationBarClient />  {/* props 없음 */}
```

---

## 의존성

| 항목                              | 설명                                            |
| :-------------------------------- | :---------------------------------------------- |
| `useAuthStore`                    | `@/store/authStore` — user, unreadCount, logout |
| `usePathname`                     | 활성 메뉴 강조                                  |
| `useRouter`                       | 페이지 이동                                     |
| `lucide-react`                    | Bell, ChevronDown, Plus, X                      |
| `public/icons/icon-hamburger.png` | 햄버거 버튼 이미지                              |

---

## 메뉴 데이터

`NAV_ITEMS`는 props로 받지 않고 컴포넌트 상단에 상수로 정의합니다.
메뉴 구조가 사용자 역할과 무관하게 동일하기 때문입니다.

```tsx
const NAV_ITEMS = [
  { href: '/meetings', label: '전체 모임' },
  { href: '/together', label: '함께 먹기' },
  { href: '/group-buy', label: '공동구매' },
] as const;
```

---

## 레이아웃 스펙

|                  | Mobile | Tablet (`md`, 768px~) | PC (`xl`, 1280px~) |
| ---------------- | ------ | --------------------- | ------------------ |
| 콘텐츠 최소 너비 | 343px  | 670px                 | 1140px             |
| 높이             | 36px   | 40px                  | 64px               |
| 좌우 패딩        | 16px   | 30px                  | 390px              |
| 상단 패딩        | 8px    | 12px                  | -                  |
| 하단 패딩        | 4px    | 12px                  | -                  |

```tsx
<header className="min-w-[343px] md:min-w-[670px] xl:min-w-[1140px]">
  <div className="h-9 px-4 pt-2 pb-1 md:h-10 md:px-[30px] md:py-3 xl:h-16 xl:px-[390px] xl:py-0">
    {/* 콘텐츠 */}
  </div>
</header>
```

- **브레이크포인트**: Tailwind 기본값 사용 (`md`, `xl`)
- **최소 너비**: 각 브레이크포인트에서 콘텐츠가 찌그러지지 않도록 `min-w`로 고정
- **sticky**: 상단 고정 (`sticky top-0 z-30`)

---

## 구성 요소

| 순서 | 요소        | 비고                                                        |
| :--- | :---------- | :---------------------------------------------------------- |
| 1    | 로고        | 72×23, `public/images/logo.png`                             |
| 2    | 메뉴 링크   | `NAV_ITEMS`, 데스크톱 pill 형태                             |
| 3    | 알림        | 로그인 시만, 배지로 `unreadCount` 표시                      |
| 4    | 모임 만들기 | 로그인 시만, `lg`에서만 노출                                |
| 5    | 프로필      | 로그인 시만, `md` 프로필 사진, `lg` 이름+ChevronDown        |
| 6    | 로그인      | 비로그인 시 `md`/`lg`에서 텍스트 버튼                       |
| 7    | 햄버거      | `sm`(md 미만)에서만 표시, `public/icons/icon-hamburger.png` |

---

## 브레이크포인트별 표시

| 상태         | lg (1024px~)                                         | md (768px~1023px)             | sm (~767px)        |
| :----------- | :--------------------------------------------------- | :---------------------------- | :----------------- |
| **로그인**   | 로고, 메뉴, 알림, 모임 만들기, 프로필(이름+드롭다운) | 로고, 메뉴, 알림, 프로필 사진 | 로고, 알림, 햄버거 |
| **비로그인** | 로고, 메뉴, 로그인                                   | 로고, 메뉴, 로그인            | 로고, 햄버거       |

---

## 아이콘

### lucide-react

| 용도                       | 컴포넌트      |
| :------------------------- | :------------ |
| 메뉴 닫기                  | `X`           |
| 알림                       | `Bell`        |
| 모임 만들기 버튼 내 플러스 | `Plus`        |
| 사용자 드롭다운            | `ChevronDown` |

### PNG 아이콘

| 용도               | 경로                              |
| :----------------- | :-------------------------------- |
| 햄버거 / 메뉴 열기 | `public/icons/icon-hamburger.png` |

---

## 스타일

- 알림 아이콘·배지: `sosoeat-orange-600`
- 모임 만들기 버튼: `sosoeat-orange-600` 배경, `rounded-[0.875rem](미확정)`
- 메뉴 링크: 활성 시 `bg-orange-50 text-sosoeat-orange-600`, 비활성 시 `text-muted-foreground`

---
