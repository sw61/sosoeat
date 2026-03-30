# MeetingDetailCard

모임 상세 정보를 표시하는 카드 컴포넌트.
모바일 / 태블릿 / PC 3가지 레이아웃을 지원하며, `groupEat(오렌지)` · `groupBuy(블루)` 카테고리에 따라 색상 테마가 달라집니다.

---

## 파일 구조

```
meeting-detail-card/
├── index.ts
├── README.md
├── meeting-detail-card.tsx
├── meeting-detail-card.constants.ts
├── meeting-detail-card.types.ts
├── meeting-detail-card.utils.ts
├── meeting-detail-card.stories.tsx
└── meeting-detail-card.test.tsx
```

---

## 사용 컴포넌트

### Common 컴포넌트 (`src/components/common/`)

| 컴포넌트            | 경로                         | 역할                                                      |
| ------------------- | ---------------------------- | --------------------------------------------------------- |
| `DeadlineBadge`     | `common/deadline-badge`      | "~몇일 몇분 남았어요" 마감 뱃지 (태블릿·PC)               |
| `DateBadge`         | `common/date-badge`          | 모바일 날짜 뱃지. `category`에 따라 오렌지·블루 색상 분기 |
| `ProgressWithLabel` | `common/progress-with-label` | 참여 현황 프로그레스 바                                   |
| `HeartButton`       | `common/heart-button`        | 찜 하트 버튼 (`public/icons` 하트 아이콘 사용)            |

### UI 컴포넌트 (`src/components/ui/`) — shadcn 기반

| 컴포넌트                                    | 역할                                      |
| ------------------------------------------- | ----------------------------------------- |
| `Avatar` / `AvatarImage` / `AvatarFallback` | 호스트 프로필 이미지                      |
| `Button`                                    | 액션 버튼 (참여하기 · 취소 · 확정 · 공유) |
| `DropdownMenu`                              | 호스트 전용 더보기(···) 메뉴              |

---

## Props

```ts
interface MeetingDetailCardProps {
  meeting: Meeting;
  role: MeetingRole; // 'guest' | 'participant' | 'host'
  status: MeetingStatus; // 'open' | 'closed' | 'confirmed' | 'full'
  isJoined: boolean;
  isLiked: boolean;
  onJoin?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
  onShare?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onLikeToggle?: () => void;
}
```

---

## 색상 전략 — cva 기반

모든 색상 분기는 `meeting-detail-card.constants.ts` 한 파일에서 관리합니다.
컴포넌트는 `category = meeting.type` 하나만 넘기면 모든 색이 자동으로 파생됩니다.

```
MeetingCategory
  groupEat → 오렌지 계열 (sosoeat-orange-*)
  groupBuy → 블루 계열  (sosoeat-blue-*)
```

| cva variant            | 적용 위치                          |
| ---------------------- | ---------------------------------- |
| `actionButtonVariants` | 참여하기 · 모임 확정하기 버튼 배경 |
| `iconBgVariants`       | InfoRow 아이콘 컨테이너 배경       |
| `iconColorVariants`    | InfoRow 아이콘 색상                |

날짜 뱃지 색상은 `DateBadge` 컴포넌트 내부에서 `category` prop으로 자체 처리합니다.

---

## 레이아웃별 동작

### 모바일 (`~ md`)

```
┌──────────────────────────────┐  ← 상단 고정 영역 (항상 표시)
│  [날짜뱃지] [시간뱃지]  [···] │
│  모임 제목                    │
│  📍 지역 · 카테고리           │
├──────────────────────────────┤  ← 하단 확장 영역 (펼치면 노출)
│  참여 현황 프로그레스 바      │  max-height 트랜지션으로
│  호스트 아바타 + 이름         │  상단 영역은 움직이지 않음
├──────────────────────────────┤  ← 항상 고정
│  [참여하기 버튼]  [♥]        │
│  [chevron ▼ / ▲]            │
└──────────────────────────────┘
```

> **핵심**: 펼치기 시 상단 카드 영역은 고정되고, 확장 영역만 `max-height` 트랜지션으로 아래로 확장됩니다.

### 태블릿 (`md ~ lg`)

- 고정 높이 `378px`, 전체 펼침 상태
- `DeadlineBadge` + 제목 + InfoRow(날짜/장소) + 참여현황 + 호스트 + 액션

### PC (`lg ~`)

- 고정 높이 `460px`, 전체 펼침 상태
- 태블릿과 동일 구조, 폰트 크기 및 버튼 높이 확대

---

## 액션 버튼 로직

| role                    | status          | isJoined | 버튼                    |
| ----------------------- | --------------- | -------- | ----------------------- |
| any                     | `closed`        | -        | 마감된 모임 (disabled)  |
| `host`                  | `confirmed`     | -        | 공유하기 (outline)      |
| `host`                  | `open` / `full` | -        | 모임 확정하기 (primary) |
| `participant`           | -               | `true`   | 참여 취소하기 (outline) |
| `participant` / `guest` | -               | `false`  | 참여하기 (primary)      |

---

## 유틸 함수

```ts
// 서버에서 받은 Meeting 객체로 status/role 파생
getMeetingStatus(meeting: Meeting): MeetingStatus
getMeetingRole(meeting: Meeting, userId?: number): MeetingRole
```
