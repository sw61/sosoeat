# RegionFilter - 지역 필터 초기화·복수 선택·선택 표시 3가지 버그 수정

## 📋 요약

검색 페이지 지역 필터에서 발생하는 3가지 버그를 수정한다.

1. **초기화 버튼 없음** — `RegionSelectModal` 푸터에 초기화 버튼 자체가 없다.
2. **복수 선택 불가** — `RegionSelection` 타입이 단일 `{ province, district } | null`이라 여러 지역을 담을 수 없다.
3. **선택 표시 안 됨** — `RegionCascadeSelect` 트리거가 시·도명만 표시하고 선택된 구·군을 보여주지 않는다.

API(`region?: string`)는 단일 지역만 지원하므로, 복수 선택 시에는 클라이언트 사이드 필터링으로 처리한다.

## 🎯 목표

- 지역 필터 모달에 초기화 버튼 추가 (선택값 null 리셋)
- `RegionSelection` 타입을 배열로 교체, UI에서 여러 구·군 선택 가능
- 선택된 구·군이 시·도 트리거와 필터바 pill에 표시되도록 수정

## ✅ 완료 조건

- [ ] `RegionSelectModal` 푸터에 초기화 버튼이 있고, 클릭 시 draft가 null로 리셋된다
- [ ] 같은 시·도에서 여러 구·군을 선택/해제할 수 있다
- [ ] 다른 시·도를 동시에 선택할 수 있다 (예: 서울 강남구 + 부산 해운대구)
- [ ] 선택된 구·군이 `RegionCascadeSelect` 트리거 텍스트에 표시된다
- [ ] 필터바 pill에 선택된 지역이 표시된다 (1개: `강남구 서울특별시`, 2개+: `강남구 서울특별시 외 N`)
- [ ] 1개 선택 → API에 region 파라미터 전달, 2개+ → client-side 필터링
- [ ] 기존 통과하던 테스트가 모두 통과한다

## 🔧 구현 계획

### 타입 변경 (파급 범위 가장 넓음, 먼저 처리)

**`region-select-modal.types.ts`**

```ts
// Before
export type RegionSelection = { province: string; district: string } | null;

// After
export type RegionSelection = { province: string; district: string }[] | null;
```

`RegionModalDropdownSub.value` / `onChange` 시그니처도 자동 갱신됨.

---

### Bug 1: 초기화 버튼

**`use-region-select-modal.ts`** — `handleReset` 추가

```ts
const handleReset = () => {
  setDraft(null);
};
```

**`region-select-modal.tsx:136-154`** — 푸터에 초기화 버튼 삽입

```tsx
{dropdownSub != null ? (
  <>
    <DialogClose asChild>
      <Button type="button" variant="outline" className={cancelButtonClass}>취소</Button>
    </DialogClose>
    <Button type="button" variant="outline" className={cancelButtonClass} onClick={handleReset}>
      초기화
    </Button>
    <Button type="button" className={confirmButtonClass} onClick={handleConfirm}>확인</Button>
  </>
) : ...}
```

---

### Bug 2: 복수 선택

**`region-cascade-select.tsx`** — 배열 기반 체크 로직

```ts
// hasSelection: 이 province에 선택된 district가 하나라도 있으면 true
const selectedDistricts = (value ?? [])
  .filter(s => s.province === r.name)
  .map(s => s.district);
const hasSelection = selectedDistricts.length > 0;

// checked: 이 district가 배열에 있으면 true
checked={selectedDistricts.includes(district)}

// onCheckedChange: toggle
onCheckedChange={(checked) => {
  const next = (value ?? []).filter(
    s => !(s.province === r.name && s.district === district)
  );
  if (checked) {
    onChange([...next, { province: r.name, district }]);
  } else {
    onChange(next.length > 0 ? next : null);
  }
}}
```

**Trigger 텍스트** — 선택된 구·군 표시

```tsx
<span className="min-w-0 flex-1 truncate">
  {hasSelection ? `${r.name} · ${selectedDistricts.join(', ')}` : r.name}
</span>
```

**`use-region-select-modal.ts`** — seed 로직 (배열 그대로)

```ts
// Before
const seed = v == null ? null : { province: v.province, district: v.district };
// After
const seed = v == null ? null : [...v];
```

**`region-select-modal.service.ts`** — DropdownSub 경로용 (실 사용은 cascade이지만 타입 일관성)

```ts
export function selectionToRecord(s: RegionSelection): Record<string, string> {
  if (s == null || s.length === 0) return {};
  return Object.fromEntries(s.map(({ province, district }) => [province, district]));
}

export function recordToSelection(r: Record<string, string>): RegionSelection {
  const entries = Object.entries(r);
  if (entries.length === 0) return null;
  return entries.map(([province, district]) => ({ province, district }));
}
```

---

### Bug 3: 선택 표시

**`meeting-filter-bar.tsx:111-113`** — 배열 기반 pill 텍스트

```tsx
{
  regionCommitted == null
    ? '지역 전체'
    : regionCommitted.length === 1
      ? `${regionCommitted[0].district} ${regionCommitted[0].province}`
      : `${regionCommitted[0].district} ${regionCommitted[0].province} 외 ${regionCommitted.length - 1}`;
}
```

---

### API 어댑터

**`use-search-page.ts:67`** — 1개 → API, 2개+ → undefined + 클라이언트 필터

```ts
const region =
  regionCommitted == null || regionCommitted.length === 0
    ? undefined
    : regionCommitted.length === 1
      ? `${regionCommitted[0].district} ${regionCommitted[0].province}`
      : undefined;

// 쿼리 결과에서 클라이언트 필터링
const filteredMeetingData =
  regionCommitted != null && regionCommitted.length >= 2
    ? meetingData.filter((m) => regionCommitted.some((sel) => m.region?.includes(sel.district)))
    : meetingData;
```

`return`에서 `meetingData` → `filteredMeetingData`로 교체.

---

### 테스트 업데이트

**`region-select-modal.test.tsx`** — 4개 fixture 교체 + 새 테스트 추가

수정 대상 (RegionSelection 타입 변경):

- `dropdownFixture.value: null` → 그대로 (null은 유효)
- `value: { province: '서울', district: '강남구' }` → `[{ province: '서울', district: '강남구' }]`
- `toHaveBeenCalledWith({ province: '서울', district: '강남구' })` → 배열로

`dropdownSub가 있으면 취소·확인과 헤더 닫기(X)가 있다` — 초기화 버튼 추가로 확인/취소 외 초기화도 어설션 추가.

새 테스트:

```ts
it('초기화 클릭 시 draft가 null로 리셋된다');
it('두 구를 선택하면 배열에 둘 다 포함된다');
it('선택된 구를 재선택하면 배열에서 제거된다');
```

## 🚫 제외한 기능

- **API multi-region 지원** — 백엔드 변경 필요, 이번 범위 밖
- **Pagination 개선** — 2개+ 지역 선택 시 `size: 10`으로 client filter하면 결과가 적을 수 있음. 무한 스크롤 또는 page size 증가는 별도 이슈
- **선택 지역 개수 제한 (최대 N개)** — 현재 기획에 없음
- **다른 시·도 지역 여러 개 동시 선택** — 기술적으로 가능하나 UX 가이드 없음. 현재 구현은 허용
