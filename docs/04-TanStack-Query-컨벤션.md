# 04 TanStack Query 컨벤션

이 프로젝트에서 TanStack Query를 작성하는 방식을 정리한 가이드입니다.

---

## 위치별 역할 분담

| 계층    | 파일명                     | 역할                                        |
| ------- | -------------------------- | ------------------------------------------- |
| Entity  | `[domain].queries.ts`      | **useQuery만** - 조회 쿼리 정의             |
| Entity  | `[domain].options.ts`      | SSR prefetch용 순수 옵션 객체 (필요시)      |
| Feature | `[domain].mutations.ts`    | **useMutation만** - 변경 작업 뮤테이션 정의 |
| Feature | `use-[domain].ts`          | 여러 훅 조합 (3개 이상 조합시)              |
| Feature | `use-[action]-[domain].ts` | 단일 액션 + UI 상태 결합                    |

**기본 원칙:**

- **entities**: 순수 API 호출만 담당 (useQuery, API client)
- **features**: 비즈니스 로직 + UI 상태 포함 (useMutation, 훅 조합)

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
- 이름 규칙: `{도메인}Keys` (camelCase)
- 문자열은 **kebab-case**만 허용합니다. (`'unread-count'` O, `'unreadCount'` X)
- 모든 항목에 `as const`를 붙입니다.
- params가 없는 쿼리도 **함수 형태**로 작성합니다. (`() => [...]`)

### 파일 분리 방식

**Case 1: 클라이언트만 사용하는 경우 (일반적)**

```
entities/[domain]/model/[domain].queries.ts
  ├─ [domainKeys] (내부 정의)
  ├─ useQuery 훅들
  └─ (필요시) useQuery와 함께 정의
```

**Case 2: 서버 컴포넌트에서도 필요한 경우**

```
entities/[domain]/model/
  ├─ [domain]-keys.ts (key factory만 분리)
  ├─ [domain].queries.ts (useQuery 훅)
  ├─ [domain].options.ts (SSR prefetch options)
  └─ (key factory를 queries/options에서 import)
```

### 도메인별 정의 예시

**클라이언트만 사용 (keys를 분리하지 않은 경우)**

```ts
// entities/posts/model/posts.queries.ts
export const postKeys = {
  list: (params?: PostParams) => ['posts', 'list', params] as const,
  detail: (id: number) => ['posts', 'detail', id] as const,
  comments: (id: number) => ['posts', 'comments', id] as const,
} as const;

export const usePostList = () =>
  useQuery({
    queryKey: postKeys.list(),
    queryFn: postsApi.getList,
  });
```

**서버 컴포넌트에서도 필요 (keys를 분리한 경우)**

```ts
// entities/notifications/model/notifications-keys.ts
export const notificationKeys = {
  list: (params?: NotificationParams) => ['notifications', 'list', params] as const,
  unreadCount: () => ['notifications', 'unread-count'] as const,
} as const;

// entities/notifications/model/notifications.queries.ts
import { notificationKeys } from './notifications-keys';

export const useNotificationList = () =>
  useQuery({
    queryKey: notificationKeys.list(),
    queryFn: notificationApi.getList,
  });

// entities/notifications/model/notifications.options.ts
import { notificationKeys } from './notifications-keys';

export const notificationListOptions = queryOptions({
  queryKey: notificationKeys.list(),
  queryFn: notificationApi.getList,
});
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
5. 서버 컴포넌트에서 key가 필요하면 `[domain]-keys.ts`로 분리

---

## 1. `[domain].queries.ts` (Entity)

**위치:** `entities/[domain]/model/[domain].queries.ts`

**역할:** useQuery 훅만 작성합니다. useMutation은 포함하지 않습니다.

### 예시 1) Key를 분리하지 않은 경우 (일반적)

```ts
// entities/posts/model/posts.queries.ts
import { useQuery } from '@tanstack/react-query';

import { postsApi } from '../api/posts.api';

// Query Key Factory는 이 파일에 정의
export const postKeys = {
  list: (params?: PostParams) => ['posts', 'list', params] as const,
  detail: (id: number) => ['posts', 'detail', id] as const,
} as const;

export const usePostList = () =>
  useQuery({
    queryKey: postKeys.list(),
    queryFn: postsApi.getList,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

export const usePostDetail = (id: number) =>
  useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => postsApi.getDetail(id),
  });
```

### 예시 2) Key를 분리한 경우 (서버 컴포넌트에서 필요시)

```ts
// entities/notifications/model/notifications-keys.ts
// → Key factory만 분리
export const notificationKeys = {
  list: (params?: NotificationParams) => ['notifications', 'list', params] as const,
  unreadCount: () => ['notifications', 'unread-count'] as const,
} as const;

// entities/notifications/model/notifications.queries.ts
// → useQuery만 포함
import { useQuery } from '@tanstack/react-query';
import { notificationApi } from '../api/notifications.api';
import { notificationKeys } from './notifications-keys';

export const useNotificationList = () =>
  useQuery({
    queryKey: notificationKeys.list(),
    queryFn: notificationApi.getList,
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
```

```ts
// 클라이언트 컴포넌트에서 사용
const { data: notifications } = useNotificationList();

// 서버 컴포넌트에서 사용
import { notificationKeys } from '@/entities/notifications';
await queryClient.prefetchQuery({
  queryKey: notificationKeys.list(),
  queryFn: notificationApi.getList,
});
```

---

## 2. `[domain].mutations.ts` (Feature)

**위치:** `features/[domain]/model/[domain].mutations.ts`

**역할:** useMutation 훅만 작성합니다. useQuery는 포함하지 않습니다.

```ts
// features/notifications/model/notifications.mutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { notificationApi } from '@/entities/notifications';
import { notificationKeys } from '@/entities/notifications';

// useMutation만 포함
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
const { mutate: markAsRead } = useMarkAsRead();
```

---

## 3. `[domain]-keys.ts` (Entity)

**위치:** `entities/[domain]/model/[domain]-keys.ts`

**생성 기준:** 서버 컴포넌트에서 queryKey가 필요할 때만 생성합니다.

```ts
// entities/notifications/model/notifications-keys.ts
// → Key factory만 분리 (서버 컴포넌트에서도 import 가능)

export const notificationKeys = {
  list: (params?: NotificationParams) => ['notifications', 'list', params] as const,
  unreadCount: () => ['notifications', 'unread-count'] as const,
} as const;
```

---

## 4. `[domain].options.ts` (Entity)

**위치:** `entities/[domain]/model/[domain].options.ts`

**생성 기준:** SSR prefetch가 필요할 때만 추가합니다.

`useQuery`를 호출하지 않고 순수 옵션 객체만 반환합니다.
서버 컴포넌트에서 `prefetchQuery()`를 쓸 때 훅을 호출할 수 없기 때문에 이 방식을 사용합니다.
클라이언트와 서버가 같은 옵션 객체를 공유하므로 queryKey 불일치로 인한 캐시 미스를 방지합니다.

```ts
// entities/notifications/model/notifications.options.ts
import { queryOptions } from '@tanstack/react-query';

import { notificationApi } from '../api/notifications.api';
import { notificationKeys } from './notifications-keys'; // key factory import

export const notificationListOptions = queryOptions({
  queryKey: notificationKeys.list(),
  queryFn: notificationApi.getList,
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

## 5. `use-[domain].ts` (Feature)

**위치:** `features/[domain]/model/use-[domain].ts`

**언제:** 컴포넌트 하나가 같은 도메인의 훅을 3개 이상 조합해서 써야 할 때.

여러 useQuery/useMutation 훅을 묶어서 컴포넌트에 단일 인터페이스를 제공합니다.
훅이 1~2개라면 각 파일에서 직접 import하는 게 더 단순합니다.

```ts
// features/notifications/model/use-notification.ts
import { useNotificationList, useUnreadCount } from '@/entities/notifications';
import { useMarkAsRead, useMarkAllAsRead } from './notifications.mutations';

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

## 6. `use-[action]-[domain].ts` (Feature)

**위치:** `features/[domain]/model/use-[action]-[domain].ts`

**언제:** 단일 액션에서 UI 상태(useState)와 mutation이 강하게 결합될 때.

모달 열기/닫기, 선택 상태 등 UI 상태가 mutation과 함께 관리되어야 하는 경우입니다.
이 로직을 `mutations.ts`에 넣으면 관심사가 섞이므로 별도 파일로 분리합니다.

```ts
// features/notifications/model/use-delete-notification.ts
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { notificationKeys } from '@/entities/notifications';
import { notificationApi } from '@/entities/notifications';

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  const [targetId, setTargetId] = useState<number | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async (id: number) => {
    setIsPending(true);
    try {
      await notificationApi.delete(id);
      queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
      setTargetId(null); // 성공 시 모달 닫기
    } finally {
      setIsPending(false);
    }
  };

  return {
    isModalOpen: targetId !== null,
    isPending,
    openModal: (id: number) => setTargetId(id),
    closeModal: () => setTargetId(null),
    confirm: () => targetId !== null && handleDelete(targetId),
  };
};
```

```ts
// 컴포넌트에서 사용
const { isModalOpen, openModal, closeModal, confirm, isPending } = useDeleteNotification();
```

---

## 파일 위치 정리

| 파일 타입                  | 위치                       | 역할                     | 생성 기준                           |
| -------------------------- | -------------------------- | ------------------------ | ----------------------------------- |
| `[domain]-keys.ts`         | `entities/[domain]/model/` | Query Key factory만      | 서버 컴포넌트에서 key가 필요할 때만 |
| `[domain].queries.ts`      | `entities/[domain]/model/` | useQuery만 포함          | 기본, 항상 생성                     |
| `[domain].mutations.ts`    | `features/[domain]/model/` | useMutation만 포함       | 기본, 항상 생성                     |
| `[domain].options.ts`      | `entities/[domain]/model/` | SSR prefetch용 순수 옵션 | SSR prefetch가 필요할 때만          |
| `use-[domain].ts`          | `features/[domain]/model/` | 3개 이상 훅 조합         | 같은 도메인 훅 3개 이상 조합시      |
| `use-[action]-[domain].ts` | `features/[domain]/model/` | UI 상태 + 액션 결합      | mutation과 UI 상태 강하게 결합될 때 |

**기본 원칙:**

- **keys 분리 필요**: 서버 컴포넌트에서 queryKey에 접근해야 할 때만 `[domain]-keys.ts` 생성
- **keys 미분리**: 클라이언트에서만 사용하면 `queries.ts` 내에 정의

---

## 금지 사항

```ts
// ❌ mutations을 entities에 작성
// entities/auth/model/auth.queries.ts
export const useLoginMutation = () => { ... };

// ✅ mutations을 features에 작성
// features/auth/model/auth.mutations.ts
export const useLoginMutation = () => { ... };
```

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
markAsRead: (queryClient: QueryClient) => ({
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
