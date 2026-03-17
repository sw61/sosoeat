# [Feature] DropdownMenu - 중첩 드롭다운 메뉴 컴포넌트

> GitHub Issue: [#8](https://github.com/sw61/sosoeat/issues/8)

---

## 📋 Overview

드롭다운 메뉴 컴포넌트를 구현했습니다.

- **DropdownSimple**: 서브메뉴 없는 단순 드롭다운 (단일 선택, 토글)
- **LocalDropDownSub**: 카테고리별 옵션을 가진 드롭다운 (선택 토글)
- Radix UI DropdownMenu + shadcn/ui 기반

사용 기술: Next.js + TypeScript + Tailwind CSS + Radix UI + shadcn/ui

---

## 📁 구현 구조

```
src/components/ui/dropdown/
  ├── index.tsx                 # 통합 export (import 중심)
  ├── dropdown-menu.tsx         # Radix 기반 기본 컴포넌트
  ├── dropdown-sub.tsx         # LocalDropDownSub (카테고리+옵션)
  ├── dropdown-simple.tsx      # DropdownSimple (플랫 옵션)
  ├── droupdown-sub.type.ts    # LocalDroupDownProp
  ├── dropdown-simple.type.ts  # DropdownSimpleProp
  ├── dropdown-sub.stories.tsx
  └── dropdown-simple.stories.tsx

src/data/
  ├── korea-regions-districts.json   # 지역 데이터
  └── korea-regions-districts.type.ts
```

---

## 🧩 컴포넌트

### 1. DropdownSimple (서브메뉴 없음)

| Prop               | Type                              | 기본값   | 설명                        |
| ------------------ | --------------------------------- | -------- | --------------------------- |
| `options`          | `string[]`                        | —        | 선택 옵션 목록              |
| `placeholder`      | `string`                          | `'선택'` | 선택 전 트리거 텍스트       |
| `value`            | `string \| null`                  | —        | 선택된 값                   |
| `onChange`         | `(value: string \| null) => void` | —        | 선택 변경 콜백              |
| `triggerClassName` | `string`                          | —        | 트리거 버튼 Tailwind (선택) |
| `itemClassName`    | `string`                          | —        | 메뉴 아이템 Tailwind (선택) |

**사용 예시**

```tsx
<DropdownSimple
  options={['한식', '일식', '중식']}
  placeholder="음식 종류 선택"
  value={value}
  onChange={setValue}
  triggerClassName="rounded-lg border px-4 py-2"
  itemClassName="hover:bg-accent/50"
/>
```

### 2. LocalDropDownSub (카테고리별 옵션)

| Prop               | Type                                      | 설명                          |
| ------------------ | ----------------------------------------- | ----------------------------- |
| `data`             | `{ label: string; options: string[] }`    | 라벨 + 옵션 배열              |
| `value`            | `Record<string, string>`                  | 선택값 (라벨→옵션)            |
| `onChange`         | `(value: Record<string, string>) => void` | 선택 변경 콜백                |
| `triggerClassName` | `string`                                  | 트리거 버튼 Tailwind (선택)   |
| `contentClassName` | `string`                                  | 드롭다운 패널 Tailwind (선택) |
| `itemClassName`    | `string`                                  | 메뉴 아이템 Tailwind (선택)   |

**사용 예시**

```tsx
<LocalDropDownSub
  data={{
    label: '서울특별시',
    options: ['강남구', '서초구', '마포구', ...],
  }}
  value={value}
  onChange={setValue}
  triggerClassName="rounded-lg border px-4 py-2"
  contentClassName="min-w-48 shadow-xl"
  itemClassName="hover:bg-accent/50"
/>
```

### 3. regionData

한국 지역 데이터 (index에서 export)

```tsx
import { regionData } from '@/components/ui/dropdown';
// regionData.regions → [{ id, name, nameEn, districts }, ...]
```

---

## ✅ 구현 사항

- [x] Trigger 클릭 시 메뉴 패널 표시
- [x] 메뉴 아이템 호버 시 스타일 변경 (Radix 기본)
- [x] CheckboxItem 선택 시 체크 표시
- [x] 한 번 더 클릭 시 체크 해제 (토글)
- [x] `onSelect` preventDefault로 메뉴 유지
- [x] index를 중심으로 import (`@/components/ui/dropdown`)
- [x] Storybook stories (Primary)
- [x] DropdownSimple: 플랫 옵션, 단일 선택
- [x] LocalDropDownSub: `{ label, options }` 구조, Record 기반 선택
- [x] Tailwind `className` 지원 (triggerClassName, contentClassName, itemClassName)

---

## 📎 Export (index)

```ts
// 컴포넌트
(DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownSimple,
  LocalDropDownSub);

// 타입
(LocalDroupDownProp, DropdownSimpleProp);

// 데이터
regionData;
```
