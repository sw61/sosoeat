# FSD 마이그레이션: search/page.tsx 위젯 추출

날짜: 2026-04-06
브랜치: refactor/fsd-migration
상태: APPROVED (plan-eng-review 완료)

---

## 문제

`app/search/page.tsx`만 FSD 패턴을 따르지 않는다.

| 페이지                   | 현재 상태                                       |
| ------------------------ | ----------------------------------------------- |
| `home/page.tsx`          | ✅ 서버 컴포넌트, 위젯만 호출                   |
| `mypage/page.tsx`        | ✅ 서버 컴포넌트, 위젯만 호출                   |
| `sosotalk/page.tsx`      | ✅ 서버 컴포넌트, 위젯만 호출                   |
| `meetings/[id]/page.tsx` | ✅ 서버 컴포넌트, 위젯만 호출                   |
| `search/page.tsx`        | ❌ `'use client'` + 100줄 렌더링 로직 직접 포함 |

추가로 `widgets/search/model/`에 아무도 임포트하지 않는 데드 코드 2개가 있다.

---

## 구현 범위

### 삭제 (2개)

```
src/widgets/search/model/fetch-meeting-by-filter.ts   ← 데드 코드, FSD 레이어 위반
src/widgets/search/model/meeting-page.services.ts     ← 위 파일에서만 쓰던 유틸
```

`entities/meeting/model/meetings.options.ts`가 TanStack Query로 이미 대체하고 있다.

### 신규 생성 (4개)

```
src/widgets/search/ui/search-page/search-page.tsx        ← 클라이언트 위젯 (기존 page.tsx 로직)
src/widgets/search/ui/search-page/search-skeleton.tsx    ← 스켈레톤 컴포넌트 분리
src/widgets/search/ui/search-page/index.ts
src/widgets/search/ui/search-page/search-page.test.tsx   ← 렌더링 분기 테스트
```

### 신규 생성 (1개)

```
src/widgets/search/model/use-search-page.test.ts         ← 기존 훅 테스트 (없었음)
```

### 수정 (2개)

```
src/widgets/search/index.ts          ← SearchPage export 추가
src/app/search/page.tsx              ← 서버 컴포넌트 thin shell로 교체
```

---

## 데이터 흐름

```
app/search/page.tsx  (서버 컴포넌트)
  └── <SearchPage />  (클라이언트 위젯, 'use client')
        ├── useSearchPage()         ← 필터 상태 + useQuery
        ├── <MeetingSearchBanner />
        ├── <MeetingFilterBar />    ← 필터 props 연결
        │
        ├── [isLoading]  <SearchSkeleton />
        ├── [isError]    에러 메시지 div
        ├── [empty]      <EmptyPage />
        └── [data]       MainPageCard 그리드
              ├── <MeetingMakeButton onClick={handleOpen} />
              └── <MeetingCreateModal />
```

---

## 최종 결과물

### `app/search/page.tsx` (변경 후)

```tsx
import { SearchPage } from '@/widgets/search';

export default function SearchRoute() {
  return <SearchPage />;
}
```

### `widgets/search/ui/search-page/search-page.tsx` (신규)

```tsx
'use client';

// 기존 search/page.tsx 의 전체 로직을 그대로 이동
// useAuthStore, useCreateMeeting, useModal, useSearchPage
// 렌더링: SearchSkeleton / 에러 div / EmptyPage / 카드 그리드
```

### `widgets/search/ui/search-page/search-skeleton.tsx` (신규)

```tsx
// 기존 isLoading 분기의 20줄 스켈레톤 JSX를 분리
export function SearchSkeleton() { ... }
```

---

## 테스트 커버리지 목표

```
CODE PATH COVERAGE
═════════════════════════════════════════════

[+] search-page.tsx
    ├── [GAP → 작성] isLoading=true  → SearchSkeleton 렌더
    ├── [GAP → 작성] isError=true    → 에러 메시지 렌더
    ├── [GAP → 작성] meetingData=[]  → EmptyPage 렌더
    ├── [GAP → 작성] meetingData 있음 → 카드 수만큼 MainPageCard 렌더
    ├── [GAP → 작성] 비로그인 + 모임만들기 클릭 → setLoginRequired 호출
    └── [GAP → 작성] 로그인 + 모임만들기 클릭  → modal open

[+] use-search-page.ts (기존 훅)
    ├── [GAP → 작성] handleRegionChange
    ├── [GAP → 작성] handleDateChange (null / start만 / end만)
    ├── [GAP → 작성] handleTypeFilterChange
    └── [GAP → 작성] handleSortChange

─────────────────────────
목표: 10/10 경로 커버
─────────────────────────
```

---

## NOT in scope

| 항목                           | 이유                                           |
| ------------------------------ | ---------------------------------------------- |
| MeetingCreateModal 글로벌 통합 | 범위 초과. 동작 문제 없음. 별도 작업으로 분리. |
| 검색 페이지 무한 스크롤        | 기존 동작 유지 (size=10 고정)                  |

---

## TODO (구현 후)

- [ ] `MeetingCreateModal`을 `navigation-bar`와 `SearchPage` 양쪽에서 각각 렌더링 중.
      DOM에 모달 2개 동시 존재. `layout.tsx` + Zustand로 글로벌 모달 1개로 통합 권장.

---

## What already exists (재사용)

| 항목                   | 위치                                         | 비고                        |
| ---------------------- | -------------------------------------------- | --------------------------- |
| `useSearchPage` 훅     | `widgets/search/model/use-search-page.ts`    | 이동 불필요, 기존 위치 유지 |
| `meetingsQueryOptions` | `entities/meeting/model/meetings.options.ts` | 훅에서 이미 사용 중         |
| `MainPageCard`         | `entities/meeting/ui/main-page-card`         | page.tsx에서 그대로 이동    |
| `MeetingCreateModal`   | `features/meeting-create`                    | 이동 없이 import만 유지     |
