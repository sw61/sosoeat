# [Feature] RegionSelectModal - 시·도·구·군 선택 모달

## 📋 요약

트리거를 눌러 열리는 다이얼로그에서 지역을 선택한다. `regionCascade`가 있으면 시·도→구·군 2단계 UI를 쓰고, 확정값은 `RegionSelection`(시·도+구·군 한 쌍 또는 `null`)으로 부모에 전달한다.

**스택:** Next.js + TypeScript + Tailwind CSS + shadcn/ui Dialog + 공통 `DropdownSub` 패턴

---

## 🎯 목표

- 접근성(다이얼로그·포커스 트랩·제목)을 유지한다.
- 캐스케이드 모드와 레거시 `dropdownSub` 경로가 문서대로 동작한다.
- 열릴 때 확정값으로 드래프트가 초기화되는 동작을 유지한다.

---

## ✅ 완료 조건

**동작**

- [ ] 트리거 클릭 시 모달이 열린다.
- [ ] 지역 확정 시 `onChange`에 `{ province, district }` 또는 `null`이 전달된다.
- [ ] `regionCascade.regions`가 있을 때 2단계 선택 UI가 동작한다.

**품질**

- [ ] Storybook·테스트가 대표 플로우를 커버한다.

---

## 🔧 구현 계획

**컴포넌트 구조**

```
src/app/meetings/_components/region-select-modal/
  ├── region-select-modal.tsx
  ├── region-select-modal.type.ts
  ├── region-cascade-select.tsx
  ├── region-select-modal.test.tsx
  └── region-select-modal.stories.tsx
```

**주요 Props 설계**

| Prop               | Type                               | 기본값 | 필수   | 설명                      |
| ------------------ | ---------------------------------- | ------ | ------ | ------------------------- |
| `trigger`          | `ReactNode`                        | —      | ✅     | 모달 여는 요소            |
| `title`            | `string`                           | —      | ✅     | 다이얼로그 제목           |
| `description`      | `ReactNode`                        | —      |        | 설명 영역                 |
| `dropdownSub`      | `RegionModalDropdownSub`           | —      | 조건부 | 확정값·콜백·드롭다운 설정 |
| `regionCascade`    | `{ regions: KoreaRegionRegion[] }` | —      | 조건부 | 2단계 지역 UI             |
| `draftValue`       | `RegionSelection`                  | —      |        | 비제어 드래프트 대체      |
| `onDraftChange`    | `(v: RegionSelection) => void`     | —      |        | 드래프트 변경             |
| `contentClassName` | `string`                           | —      |        | 콘텐츠 영역 클래스        |

**타입 (요약)**

```ts
type RegionSelection = { province: string; district: string } | null;
```

**사용 예시**

```tsx
<RegionSelectModal
  trigger={<button type="button">지역</button>}
  title="지역"
  regionCascade={{ regions: regionData.regions }}
  dropdownSub={{
    data: { label: '_', options: [] },
    value: regionCommitted,
    onChange: setRegionCommitted,
  }}
/>
```

---

## 🚫 의도적으로 제외한 기능

- 복수 지역 선택
- 시·군·구 이외 행정 단위
- 지역 데이터 서버 동기화(정적 JSON 유지)

---

## 📎 참고 자료

- 디자인 시안: <!-- Figma 링크 -->
- 사용 예정 화면: `/meetings`(필터 바)
- 관련 이슈/PR: <!-- # -->
