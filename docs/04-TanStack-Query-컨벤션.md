# 04 TanStack Query 컨벤션

이 프로젝트에서 TanStack Query를 작성하는 방식을 정리한 가이드입니다.

---

## 파일 유형 4가지

| #   | 파일명                     | 역할                                             | 생성 기준                             |
| --- | -------------------------- | ------------------------------------------------ | ------------------------------------- |
| 1   | `[domain].queries.ts`      | Query Key + useQuery + useMutation               | 기본, 항상 생성                       |
| 2   | `[domain].options.ts`      | SSR prefetch용 순수 옵션 객체                    | SSR prefetch가 필요할 때만            |
| 3   | `use-[domain].ts`          | 여러 훅을 조합해 컴포넌트에 편의 인터페이스 제공 | 같은 도메인 훅 3개 이상 조합 시       |
| 4   | `use-[action]-[domain].ts` | 단일 액션 + UI 상태(useState) 결합               | mutation과 UI 상태가 강하게 결합될 때 |

**기본은 1번만 사용합니다. 2, 3, 4는 필요할 때만 추가합니다.**

---

## Query Key 컨벤션

### 기본 구조

```
[도메인, 액션, ...params]
```

| 위치   | 내용                | 예시                                   |
| ------ | ------------------- | -------------------------------------- |
| 1번째  | 도메인명 (복수형)   | `'meetings'`, `'posts'`, `'favorites'` |
| 2번째  | 액션 또는 타입      | `'list'`, `'detail'`, `'count'`        |
| 3번째~ | id 또는 params 객체 | `id`, `{ cursor, size }`               |

### 규칙

- queryKey는 **factory 함수**로만 정의합니다. raw 배열 직접 사용 금지.
- 파일 위치: 해당 slice의 `model/[domain].queries.ts` 안에 함께 정의합니다.
- 이름 규칙: `{도메인}Keys` (camelCase)
- 문자열은 **kebab-case**만 허용합니다. (`'unread-count'` O, `'unreadCount'` X)
- 모든 항목에 `as const`를 붙입니다.
- params가 없는 쿼리도 **함수 형태**로 작성합니다. (`() => [...]`)

### 도메인별 정의 예시

```ts
export const meetingKeys = {
  list: (params?: MeetingParams) => ['meetings', 'list', params] as const,
  detail: (id: number) => ['meetings', 'detail', id] as const,
  joined: () => ['meetings', 'joined'] as const,
  my: () => ['meetings', 'my'] as const,
  participants: (id: number) => ['meetings', 'participants', id] as const,
} as const;

export const postKeys = {
  list: (params?: PostParams) => ['posts', 'list', params] as const,
  detail: (id: number) => ['posts', 'detail', id] as const,
  comments: (id: number) => ['posts', 'comments', id] as const,
} as const;

export const favoriteKeys = {
  list: () => ['favorites', 'list'] as const,
  count: () => ['favorites', 'count'] as const,
} as const;

export const notificationKeys = {
  list: (params?: NotificationParams) => ['notifications', 'list', params] as const,
  unreadCount: () => ['notifications', 'unread-count'] as const,
} as const;

export const commentKeys = {
  list: (meetingId: number) => ['comments', 'list', meetingId] as const,
  count: (meetingId: number) => ['comments', 'count', meetingId] as const,
} as const;

export const mypageKeys = {
  joinedMeetings: () => ['mypage', 'joined-meetings'] as const,
  createdMeetings: () => ['mypage', 'created-meetings'] as const,
  favoriteMeetings: () => ['mypage', 'favorite-meetings'] as const,
} as const;

export const reviewKeys = {
  listByMeeting: (meetingId: number) => ['reviews', 'list', meetingId] as const,
  myList: () => ['reviews', 'my-list'] as const,
  statistics: () => ['reviews', 'statistics'] as const,
  categoryStats: () => ['reviews', 'category-statistics'] as const,
} as const;

export const userKeys = {
  me: () => ['users', 'me'] as const,
  profile: (id: number) => ['users', 'profile', id] as const,
  meetings: () => ['users', 'me', 'meetings'] as const,
  posts: () => ['users', 'me', 'posts'] as const,
  reviews: () => ['users', 'me', 'reviews'] as const,
} as const;
```

### invalidate 규칙

항상 factory를 사용합니다.

```ts
// ✅
queryClient.invalidateQueries({ queryKey: postKeys.list() });
queryClient.invalidateQueries({ queryKey: meetingKeys.detail(id) });

// ❌ 금지
queryClient.invalidateQueries({ queryKey: ['posts', 'list'] });
queryClient.invalidateQueries({ queryKey: ['meetings', 'detail', id] });
```

### 새 도메인 추가 시 체크리스트

1. 첫 번째 요소는 도메인명 복수형 (`'meetings'`, `'posts'` 등)
2. GET 엔드포인트 하나당 factory 항목 하나
3. params가 없는 쿼리도 함수 형태로 작성 (`() => [...]`)
4. `as const` 누락 없이

---

## 1. `[domain].queries.ts`

**언제:** 기본. 모든 도메인의 시작점.

Query Key factory + useQuery 훅 + useMutation 훅을 한 파일에 작성합니다.
`useQuery`와 `useMutation`은 조회/변경으로 파일을 나누지 않습니다. 분리 기준은 도메인입니다.

```ts
// notifications.queries.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { notificationApi } from '../api/notifications.api';

// Query Key Factory
export const notificationKeys = {
  list: (params?: NotificationParams) => ['notifications', 'list', params] as const,
  unreadCount: () => ['notifications', 'unread-count'] as const,
} as const;

// useQuery
export const useNotificationList = () =>
  useQuery({
    queryKey: notificationKeys.list(),
    queryFn: notificationApi.getNotificationList,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

export const useUnreadCount = () =>
  useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: notificationApi.getUnreadCount,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });

// useMutation
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) => notificationApi.markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
      queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount() });
    },
  });
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationApi.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
      queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount() });
    },
  });
};
```

```ts
// 컴포넌트에서 사용
const { data: notifications } = useNotificationList();
const { mutate: markAsRead } = useMarkAsRead();
```

---

## 2. `[domain].options.ts`

**언제:** SSR prefetch가 필요할 때만 추가.

`useQuery`를 호출하지 않고 순수 옵션 객체만 반환합니다.
서버 컴포넌트에서 `prefetchQuery()`를 쓸 때 훅을 호출할 수 없기 때문에 이 방식을 사용합니다.
클라이언트와 서버가 같은 옵션 객체를 공유하므로 queryKey 불일치로 인한 캐시 미스를 방지합니다.

```ts
// notifications.options.ts
import { queryOptions } from '@tanstack/react-query';

import { notificationApi } from '../api/notifications.api';
import { notificationKeys } from './notifications.queries';

export const notificationListOptions = queryOptions({
  queryKey: notificationKeys.list(),
  queryFn: notificationApi.getNotificationList,
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 10,
});

export const unreadCountOptions = queryOptions({
  queryKey: notificationKeys.unreadCount(),
  queryFn: notificationApi.getUnreadCount,
  staleTime: 1000 * 60,
  gcTime: 1000 * 60 * 5,
});
```

```ts
// 서버 컴포넌트에서 prefetch
await queryClient.prefetchQuery(notificationListOptions);
await queryClient.prefetchQuery(unreadCountOptions);

// 클라이언트 컴포넌트에서도 동일 옵션 재사용 가능
const { data } = useQuery(notificationListOptions);
```

| 구분        | `queries.ts`            | `options.ts`               |
| ----------- | ----------------------- | -------------------------- |
| 포함 내용   | `useQuery(...)` 훅 호출 | 순수 옵션 객체             |
| 반환값      | `UseQueryResult`        | 일반 객체                  |
| 사용 위치   | 클라이언트 컴포넌트     | 클라이언트 + 서버 컴포넌트 |
| 언제 만드나 | 기본                    | SSR prefetch가 필요할 때만 |

---

## 3. `use-[domain].ts`

**언제:** 컴포넌트 하나가 같은 도메인의 훅을 3개 이상 조합해서 써야 할 때.

여러 useQuery/useMutation 훅을 묶어서 컴포넌트에 단일 인터페이스를 제공합니다.
훅이 1~2개라면 `queries.ts`에서 직접 import하는 게 더 단순합니다.

```ts
// use-notification.ts
import {
  useNotificationList,
  useUnreadCount,
  useMarkAsRead,
  useMarkAllAsRead,
} from './notifications.queries';

export const useNotification = () => {
  const { data: notifications, isPending } = useNotificationList();
  const { data: unreadCount } = useUnreadCount();
  const { mutate: markAsRead } = useMarkAsRead();
  const { mutate: markAllAsRead } = useMarkAllAsRead();

  return {
    notifications,
    unreadCount,
    isPending,
    markAsRead,
    markAllAsRead,
  };
};
```

```ts
// 컴포넌트에서 사용 — 훅 하나로 해결
const { notifications, unreadCount, markAsRead } = useNotification();
```

---

## 4. `use-[action]-[domain].ts`

**언제:** 단일 액션에서 UI 상태(useState)와 mutation이 강하게 결합될 때.

모달 열기/닫기, 선택 상태 등 UI 상태가 mutation과 함께 관리되어야 하는 경우입니다.
이 로직을 `queries.ts`에 넣으면 관심사가 섞이므로 별도 파일로 분리합니다.

```ts
// use-delete-notification.ts
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { notificationApi } from '../api/notifications.api';
import { notificationKeys } from './notifications.queries';

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  const [targetId, setTargetId] = useState<number | null>(null);

  const { mutate: deleteNotification, isPending } = useMutation({
    mutationFn: (id: number) => notificationApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
      setTargetId(null); // 성공 시 모달 닫기
    },
  });

  return {
    isModalOpen: targetId !== null,
    isPending,
    openModal: (id: number) => setTargetId(id),
    closeModal: () => setTargetId(null),
    confirm: () => targetId !== null && deleteNotification(targetId),
  };
};
```

```ts
// 컴포넌트에서 사용
const { isModalOpen, openModal, closeModal, confirm, isPending } = useDeleteNotification();
```

---

## 금지 사항

```ts
// ❌ raw 배열로 queryKey 직접 작성
queryClient.invalidateQueries({ queryKey: ['notifications', 'list'] });

// ✅ factory 함수 사용
queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
```

```ts
// ❌ queryKey에 camelCase 사용
unreadCount: () => ['notifications', 'unreadCount'] as const,

// ✅ kebab-case 사용
unreadCount: () => ['notifications', 'unread-count'] as const,
```

```ts
// ❌ QueryClient를 외부에서 주입
matchAsRead: (queryClient: QueryClient) => ({
  mutationFn: ...,
  onSuccess: () => queryClient.invalidateQueries(...),
}),

// ✅ 훅 내부에서 useQueryClient() 호출
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({ ... });
};
```

```ts
// ❌ useMemo, useCallback 사용 (React Compiler가 처리)
const memoizedFn = useCallback(() => { ... }, []);

// ✅ 그냥 작성
const fn = () => { ... };
```
