# RecommendedMeetingCard

상세 페이지 하단 탐색 화면에서 각 모임 정보를 시각적으로 표현하는 카드 컴포넌트입니다.
썸네일 이미지, 날짜/시간 뱃지, 제목, 찜 버튼을 포함하며 목록에서 반복 렌더링됩니다.

**기술 스택**: Next.js · TypeScript · Tailwind CSS v4 · shadcn/ui

---

## 📁 파일 구조

```
components/common/
└── RecommendedMeetingCard/
      ├── index.ts                             # barrel export
      ├── RecommendedMeetingCard.tsx           # 컴포넌트 본체
      ├── RecommendedMeetingCard.test.tsx      # 단위 테스트
      └── RecommendedMeetingCard.stories.tsx   # Storybook
```

---

## 🎯 목표

- 모임 핵심 정보(일시·장소·제목)를 한눈에 파악할 수 있는 카드 UI 제공
- 기존 공통 컴포넌트(`Badge`, `HeartButton`, `Card`)를 조합하여 일관된 디자인 시스템 유지
- 찜 상태를 props로 제어할 수 있도록 설계하여 서버 상태와 분리

---

## ✅ 완료 조건

### 레이아웃 & 스타일

- 썸네일 이미지 영역 비율 고정 (디자인 시안 기준)
- 이미지 우측 하단에 `HeartButton` 오버레이
- 날짜 `Badge` + 시간 `Badge` 가로 나열
- 제목 텍스트 최대 2줄 말줄임 처리
- 위치 아이콘(핀) + 장소명 표시

### 기능

- `isLiked` prop으로 찜 상태 제어 (서버 상태와 분리)
- `onLikeToggle` 콜백으로 부모에 찜 이벤트 전달
- 카드 클릭 시 `onClick` 콜백 호출 (라우팅은 부모 책임)
- 이미지 로드 실패 시 fallback 이미지 처리

### 접근성 & 품질

- 이미지에 `alt` 텍스트 적용
- `HeartButton`에 `aria-label` 적용 (`찜하기` / `찜 취소`)
- 단위 테스트 작성 (렌더링, 찜 토글, 클릭 이벤트)

---

## 🔧 Props

```ts
interface RecommendedMeetingCardProps {
  meeting: Meeting; // 카드에 표시할 모임 데이터 (필수)
  isLiked?: boolean; // 현재 찜 여부 (기본값: false)
  onLikeToggle?: (id: number) => void; // 찜 버튼 클릭 시 호출
  onClick?: (id: number) => void; // 카드 클릭 시 호출 (상세 이동 등)
}
```

> `Meeting` 타입은 `@/types/meeting`에서 import합니다.

---

## 💡 사용 예시

```tsx
import RecommendedMeetingCard from '@/components/common/RecommendedMeetingCard';

<RecommendedMeetingCard
  meeting={meetingData}
  isLiked={likedIds.includes(meetingData.id)}
  onLikeToggle={(id) => toggleLike(id)}
  onClick={(id) => router.push(`/meetings/${id}`)}
/>;
```

### 목록 렌더링

```tsx
{
  meetings.map((meeting) => (
    <RecommendedMeetingCard
      key={meeting.id}
      meeting={meeting}
      isLiked={likedIds.includes(meeting.id)}
      onLikeToggle={toggleLike}
      onClick={(id) => router.push(`/meetings/${id}`)}
    />
  ));
}
```

---

## 🧩 사용 컴포넌트

| 컴포넌트              | 위치                                                | 용도                    |
| --------------------- | --------------------------------------------------- | ----------------------- |
| `Card`, `CardContent` | `@/components/ui/card`                              | 카드 레이아웃 베이스    |
| `Badge`               | `@/components/ui/badge`                             | 날짜 · 시간 · 마감 표시 |
| `HeartButton`         | `@/features/favorites/ui/heart-button/heart-button` | 찜 토글 버튼            |

---

## 🗂️ 관련 파일

| 파일               | 설명                |
| ------------------ | ------------------- |
| `types/meeting.ts` | `Meeting` 타입 정의 |
