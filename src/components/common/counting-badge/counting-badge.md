# CountingBadge

숫자 카운트를 원형/pill 배지로 시각적으로 보여주는 공통 컴포넌트입니다.

---

## 사용 위치

| 사용 위치                    | 사이즈  | 역할                  |
| :--------------------------- | :------ | :-------------------- |
| `NavigationBar` (태블릿·PC)  | `large` | 찜한 모임 카운트 표시 |
| `NavigationBar` 모바일 Sheet | `small` | 찜한 모임 카운트 표시 |
| 상세페이지 댓글              | `large` | 댓글 카운트 표시      |
| 소소토크 댓글                | `large` | 댓글 카운트 표시      |

---

## Props

| Prop    | Type                 | 기본값    | 필수 | 설명        |
| :------ | :------------------- | :-------- | :--- | :---------- |
| `count` | `number`             | —         | ✅   | 표시할 숫자 |
| `size`  | `'small' \| 'large'` | `'large'` |      | 배지 크기   |

---

## 사이즈 스펙

| 사이즈  | 형태 | 클래스         |
| :------ | :--- | :------------- |
| `large` | pill | `h-4 px-[7px]` |
| `small` | 원형 | `h-3 w-3`      |

---

## 사용 예시

```tsx
// large (기본)
<CountingBadge count={5} />

// small — 모바일 Sheet
<CountingBadge count={5} size="small" />
```

---

## 데이터 연동 방식

`CountingBadge`는 순수 UI 컴포넌트입니다. 데이터 fetching은 사용처에서 담당합니다.

```tsx
// 사용처에서 React Query로 count를 가져와 prop으로 전달
const { data: likedGroupCount = 0 } = useLikedGroupCount();

<CountingBadge count={likedGroupCount} />;
```

데이터 소스가 다른 경우(찜 카운트, 댓글 카운트 등)에도 동일 컴포넌트를 재사용할 수 있습니다.

---

## 적용 예정 파일

아래 파일들에 `CountingBadge` 컴포넌트를 적용해야 합니다.

| 파일                                                  | 상태       | 작업 내용                                                                                                                                 |
| :---------------------------------------------------- | :--------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `components/common/navigation-bar/navigation-bar.tsx` | ⏳ 대기 중 | 새 navbar PR 머지 시 인라인 `<span>` → `<CountingBadge count={likedGroupCount} />` 교체, `wishGroupCount` → `likedGroupCount` 변수명 변경 |
| 모바일 Sheet 찜한 모임 항목                           | ⏳ 미구현  | `<CountingBadge count={likedGroupCount} size="small" />` 추가                                                                             |
| 상세페이지 댓글 카운트                                | ⏳ 미구현  | `<CountingBadge count={commentCount} />` 적용                                                                                             |
| 소소토크 댓글 카운트                                  | ⏳ 미구현  | `<CountingBadge count={commentCount} />` 적용                                                                                             |
