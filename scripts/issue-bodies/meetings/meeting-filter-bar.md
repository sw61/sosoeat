# [Feature] MeetingFilterBar - 모임 목록 필터 바 (유형·날짜·지역·정렬)

## 📋 요약

모임 목록 상단에서 모임 유형(전체/함께먹기/공동구매), 날짜, 지역, 정렬 옵션을 한 줄(또는 모바일에서 세로 스택)로 제어한다. 부모가 API·URL 상태와 동기화할 수 있도록 콜백·옵션 배열을 제공한다.

**스택:** Next.js(App Router) + TypeScript + Tailwind CSS + shadcn/ui(Radix Dropdown) + lucide-react

---

## 🎯 목표

- 유형·날짜·지역·정렬 UX를 디자인 시안과 일치하게 유지·다듬는다.
- `sortBy` / `sortOrder` 조합이 API 요청과 일관되게 전달되도록 props·문서를 정리한다.
- Storybook·단위 테스트로 주요 상호작용을 검증한다.

---

## ✅ 완료 조건

**필터 동작**

- [ ] 유형 버튼 전환 시 `onTypeFilterChange`가 올바른 리터럴을 호출한다.
- [ ] 날짜·지역·정렬 변경 시 각각 `onDateChange` / `onRegionChange` / `onSortChange`가 호출된다.
- [ ] 정렬 드롭다운 옵션(`options`)과 현재 `sort` 상태가 문서화된 규칙과 맞는다.

**UI·접근성**

- [ ] 정렬 메뉴가 키보드·스크린 리더 사용 가능한 패턴을 유지한다.
- [ ] 모바일·데스크톱 레이아웃이 깨지지 않는다.

**품질**

- [ ] Storybook 스토리가 최소 한 개 이상 유효한 `options`·`sort`를 넘긴다.
- [ ] Jest 테스트가 핵심 라벨·버튼 노출을 검증한다.

---

## 🔧 구현 계획

**컴포넌트 구조 (현재 레포 기준)**

```
src/app/meetings/_components/meeting-filter-bar/
  ├── index.ts
  ├── meeting-filter-bar.tsx
  ├── meeting-filter-bar.types.ts
  ├── meeting-filter-bar.test.tsx
  ├── meeting-filter-bar.stories.tsx
  └── _components/
        └── meeting-filter-bar-button.tsx
```

**주요 Props 설계**

| Prop                 | Type                                                    | 기본값 | 필수 | 설명                                  |
| -------------------- | ------------------------------------------------------- | ------ | ---- | ------------------------------------- |
| `options`            | `{ label, sortBy, sortOrder }[]`                        | —      | ✅   | 정렬 라벨·API 정렬 필드·오름/내림차순 |
| `sort`               | `'participantCount' \| 'dateTime' \| 'registrationEnd'` | —      | ✅   | 현재 API 기준 정렬 필드               |
| `typeFilter`         | `'all' \| 'groupEat' \| 'groupBuy'`                     | —      | ✅   | 모임 유형 탭                          |
| `date`               | `Date \| null`                                          | —      | ✅   | 선택된 날짜                           |
| `regionCommitted`    | `RegionSelection`                                       | —      | ✅   | 확정 지역(시·도+구·군)                |
| `onSortChange`       | `(sortBy, sortOrder) => void`                           | noop   |      | 정렬 변경                             |
| `onDateChange`       | `(date: Date \| null) => void`                          | noop   |      | 날짜 변경                             |
| `onRegionChange`     | `(region: RegionSelection) => void`                     | noop   |      | 지역 변경                             |
| `onTypeFilterChange` | `(typeFilter) => void`                                  | noop   |      | 유형 탭 변경                          |
| `className`          | `string`                                                | —      |      | 루트 래퍼                             |

**사용 예시**

```tsx
<MeetingFilterBar
  options={options}
  sort={sort}
  typeFilter={typeFilter}
  date={date}
  regionCommitted={regionCommitted}
  onSortChange={(sortBy, sortOrder) => {
    setSort(sortBy);
    setSortOrder(sortOrder);
  }}
  onDateChange={setDate}
  onRegionChange={setRegionCommitted}
  onTypeFilterChange={setTypeFilter}
/>
```

---

## 🚫 의도적으로 제외한 기능

- API 호출·React Query 캐시(부모 페이지 책임)
- URL 쿼리 동기화(별도 이슈로 분리 가능)
- 지역 JSON 데이터 편집 UI

---

## 📎 참고 자료

- 디자인 시안: <!-- Figma 링크 -->
- 사용 예정 화면: `/meetings`
- 관련 이슈/PR: <!-- # -->
