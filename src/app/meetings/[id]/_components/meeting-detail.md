# MeetingDetailCard

모임 상세 페이지의 정보 카드 컴포넌트입니다.
역할(role)·상태(status)에 따라 액션 버튼이 달라지며, 모바일에서는 참여 현황과 호스트 정보를 아코디언으로 감춥니다.

---

## 파일 구조

```
meetings/[id]/_components/
└── meeting-detail-card/
    ├── meeting-detail-card.tsx        ← Client Component (UI 전체)
    ├── meeting-detail-card.types.ts   ← Props 타입 정의
    ├── meeting-detail-card.utils.ts   ← status / role 파생 유틸
    ├── meeting-detail-card.test.tsx   ← 단위 테스트
    ├── meeting-detail-card.stories.tsx
    └── index.ts                       ← barrel export
```

---

## Props

```ts
export type MeetingRole = 'guest' | 'participant' | 'host';
export type MeetingStatus = 'open' | 'closed' | 'confirmed' | 'full';

export interface MeetingDetailCardProps {
  meeting: Meeting;
  role: MeetingRole;
  status: MeetingStatus;
  isJoined: boolean;
  isLiked: boolean;
  timerBadge?: ReactNode;
  likeButton?: ReactNode;
  onJoin?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
  onShare?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}
```

| Prop         | Type            | 필수 | 설명                                                   |
| :----------- | :-------------- | :--: | :----------------------------------------------------- |
| `meeting`    | `Meeting`       |  ✅  | 모임 데이터                                            |
| `role`       | `MeetingRole`   |  ✅  | 현재 사용자의 역할 => API에서 제공X , util 함수로 판단 |
| `status`     | `MeetingStatus` |  ✅  | 모임 상태 => API에서 제공X, util 함수로 판단           |
| `isJoined`   | `boolean`       |  ✅  | participant가 이미 참여 중인지 여부                    |
| `isLiked`    | `boolean`       |  ✅  | 찜 상태 초기값 (likeButton 토글 제어에 사용)           |
| `timerBadge` | `ReactNode`     |      | 상단 좌측 슬롯 (D-day 뱃지 등)                         |
| `likeButton` | `ReactNode`     |      | 액션 우측 슬롯 (찜하기 버튼)                           |
| `onJoin`     | `() => void`    |      | "참여하기" 클릭 핸들러                                 |
| `onCancel`   | `() => void`    |      | "참여 취소하기" 클릭 핸들러                            |
| `onConfirm`  | `() => void`    |      | "모임 확정하기" 클릭 핸들러                            |
| `onShare`    | `() => void`    |      | "공유하기" 클릭 핸들러                                 |
| `onEdit`     | `() => void`    |      | 드롭다운 "수정하기" 클릭 핸들러 (host 전용)            |
| `onDelete`   | `() => void`    |      | 드롭다운 "삭제하기" 클릭 핸들러 (host 전용)            |

---

## 액션 버튼 매트릭스

| role                    | status      | isJoined | 렌더링 버튼                      |
| :---------------------- | :---------- | :------: | :------------------------------- |
| 모든 role               | `closed`    |    -     | "마감된 모임" (disabled)         |
| `host`                  | `confirmed` |    -     | "공유하기" (outline)             |
| `host`                  | 그 외       |    -     | "모임 확정하기" (category color) |
| `participant`           | -           |  `true`  | "참여 취소하기" (outline)        |
| `guest` / `participant` | -           | `false`  | "참여하기" (category color)      |

---

## 유틸 함수

### `getMeetingStatus(meeting: Meeting): MeetingStatus`

```ts
// 우선순위: closed > confirmed > full > open
if (meeting.canceledAt) return 'closed';
if (meeting.confirmedAt) return 'confirmed';
if (meeting.participantCount >= meeting.capacity) return 'full';
return 'open';
```

### `getMeetingRole(meeting: Meeting, userId?: number): MeetingRole`

```ts
if (!userId) return 'guest';
if (meeting.host.id === userId) return 'host';
return 'participant';
```

> `participant`는 로그인한 비호스트 전체를 의미합니다.
> 실제 참여 여부는 `isJoined` prop으로 별도 관리합니다.

---

## 반응형 동작

| 브레이크포인트    | 참여 현황 / 호스트 정보 표시 방식 |
| :---------------- | :-------------------------------- |
| `~md` (모바일)    | 아코디언 — 기본 닫힘              |
| `md~` (태블릿·PC) | 항상 펼침                         |

---

## 의존성

| 항목                         | 경로                                      | 용도                            |
| :--------------------------- | :---------------------------------------- | :------------------------------ |
| `ProgressWithLabel`          | `@/components/common/progress-with-label` | 참여 현황 프로그레스바 + 레이블 |
| `Accordion` 계열             | `@/components/ui/accordion`               | 모바일 접기/펼치기              |
| `Avatar` 계열                | `@/components/ui/avatar`                  | 호스트 프로필 이미지            |
| `Button`                     | `@/components/ui/button`                  | 액션 버튼                       |
| `DropdownMenu` 계열          | `@/components/ui/dropdown`                | host 더보기 메뉴                |
| `Meeting`, `MeetingCategory` | `@/types/meeting`                         | 모임 데이터 타입                |

---

## 사용 예시

```tsx
import {
  MeetingDetailCard,
  getMeetingRole,
  getMeetingStatus,
} from '@/app/meetings/[id]/_components/meeting-detail-card';

const status = getMeetingStatus(meeting);
const role = getMeetingRole(meeting, currentUserId);

<MeetingDetailCard
  meeting={meeting}
  role={role}
  status={status}
  isJoined={isJoined}
  isLiked={isLiked}
  timerBadge={<TimerBadge deadline={meeting.registrationEnd} />}
  likeButton={<LikeButton isLiked={isLiked} onToggle={handleLike} />}
  onJoin={handleJoin}
  onCancel={handleCancel}
  onConfirm={handleConfirm}
  onShare={handleShare}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>;
```

---

## 슬롯 설계

`timerBadge`와 `likeButton`은 ReactNode 슬롯으로 외부에서 주입합니다. // 컴포넌트 가져와서 사용용
카드는 **배치만 담당**하며 찜 상태·타이머 로직은 부모가 책임집니다.
`isLiked`는 `likeButton` 슬롯 컴포넌트에 초기값으로 전달하기 위해 props에 포함됩니다.
