# BestSoeatCard

모임 정보(이미지, 제목, 장소, 날짜·시간)를 표시하는 공통 카드 컴포넌트입니다.

---

## 📁 파일 구조

```
components/
  └── common/
        └── best-soeat-card/
              ├── index.ts
              ├── best-soeat-card.tsx
              ├── best-soeat-card.types.ts
              ├── best-soeat-card.test.tsx
              └── best-soeat-card.stories.tsx
```

---

## ⚙️ Props

```ts
// BestSoeatCard.types.ts
export interface BestSoeatCardProps {
  title: string;
  region: string;
  meetingAt: string;
  thumbnailUrl?: string;
  thumbnailAlt?: string;
  className?: string;
  onClick?: () => void;
}
```

| Prop           | Type                  | 기본값          | 필수 | 설명                                |
| -------------- | --------------------- | --------------- | ---- | ----------------------------------- |
| `title`        | `string`              | —               | ✅   | 모임 제목                           |
| `location`     | `string`              | —               | ✅   | 모임 장소 (예: 서울 강남구)         |
| `meetingAt`    | `string`              | —               | ✅   | 모임 날짜·시간 (예: 3/15(일) 18:30) |
| `thumbnailUrl` | `string \| undefined` | `undefined`     |      | 썸네일 이미지 URL                   |
| `thumbnailAlt` | `string`              | `"모임 이미지"` |      | 이미지 alt 텍스트                   |
| `className`    | `string \| undefined` | `undefined`     |      | 외부 스타일 오버라이드              |
| `onClick`      | `() => void`          | —               |      | 카드 클릭 이벤트 핸들러             |

---

## 🚀 사용 예시

```tsx
import BestSoeatCard from '@/components/common/BestSoeatCard';

// 기본 사용
<BestSoeatCard
  title="강남 고기집 같이 가실 분!"
  resion="서울 강남구"
  meetingAt="3/15(일) 18:30"
  thumbnailUrl={post.thumbnailUrl}
  onClick={() => router.push(`/posts/${post.id}`)}
/>

// 너비 오버라이드
<BestSoeatCard
  title="강남 고기집 같이 가실 분!"
  location="서울 강남구"
  meetingAt="3/15(일) 18:30"
  className="w-full"
  onClick={() => router.push(`/posts/${post.id}`)}
/>
```

---

## 🔧 확장 방법

`BestSoeatCardProps`를 `extends`해서 변형 컴포넌트를 만들 수 있습니다.

```ts
// 예시 — 이미지 없는 텍스트 전용 카드
export interface MinimalSoeatCardProps extends Omit<
  BestSoeatCardProps,
  'thumbnailUrl' | 'thumbnailAlt'
> {
  // 추가 prop
}
```

---

## ⚠️ 주의사항

- 클릭 시 라우팅은 `onClick` prop으로 위임합니다. 컴포넌트 내부에서 `router.push` 호출을 금지합니다.
- `thumbnailUrl` 미제공 시 placeholder 이미지가 표시됩니다.

---

## 🚫 의도적으로 제외한 기능

| 기능                       | 사유                                    |
| -------------------------- | --------------------------------------- |
| 참여 인원 현황 (예: 3/5명) | 추후 별도 배지 컴포넌트로 분리 예정     |
| 북마크/찜 버튼             | 별도 오버레이 액션 컴포넌트로 처리 예정 |
| 카테고리/태그 뱃지         | 추후 확장 시 추가 예정                  |
