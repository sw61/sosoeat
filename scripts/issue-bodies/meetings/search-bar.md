# [Feature] SearchBar - 모임 검색 입력 필드

## 📋 요약

모임 목록에서 제목·태그·지역 등 검색어를 입력받는다. 디자인 스펙에 맞춘 테두리·포커스 링·플레이스홀더를 적용하고, 부모가 제어하는 값(`value` / `onChange`) 패턴을 따른다.

**스택:** Next.js + TypeScript + Tailwind CSS + shadcn/ui `Input` + lucide-react

---

## 🎯 목표

- 피그마 스펙(높이·패딩·보더·포커스)과 시각적 일관성을 유지한다.
- 제어 컴포넌트로서 검색 상태를 부모와 동기화한다.
- Storybook·테스트로 기본 표시·className 합성을 검증한다.

---

## ✅ 완료 조건

**동작**

- [ ] 입력 시 `onChange`에 문자열이 전달된다.
- [ ] `value`가 비어 있을 때 플레이스홀더가 보인다.

**UI**

- [ ] 검색 아이콘·인풋 레이아웃이 깨지지 않는다.
- [ ] `className`이 루트에 병합된다(`cn`).

**품질**

- [ ] 스토리·테스트가 최신 props와 맞다.

---

## 🔧 구현 계획

**컴포넌트 구조**

```
src/app/meetings/_components/search-bar/
  ├── search-bar.tsx
  ├── search-bar.types.ts
  ├── search-bar.test.tsx
  └── search-bar.stories.tsx
```

**주요 Props 설계**

| Prop          | Type                      | 기본값                            | 필수 | 설명         |
| ------------- | ------------------------- | --------------------------------- | ---- | ------------ |
| `value`       | `string`                  | —                                 | ✅   | 입력값       |
| `onChange`    | `(value: string) => void` | —                                 | ✅   | 변경 콜백    |
| `placeholder` | `string`                  | `모임 검색 (제목, 태그, 지역 등)` |      | 플레이스홀더 |
| `className`   | `string`                  | —                                 |      | 루트 래퍼    |

**사용 예시**

```tsx
<SearchBar value={search} onChange={setSearch} placeholder="모임 검색" />
```

---

## 🚫 의도적으로 제외한 기능

- 디바운스·서버 검색 API 호출(부모·페이지 책임)
- 최근 검색어·자동완성
- URL 쿼리 동기화

---

## 📎 참고 자료

- 디자인 시안: <!-- Figma 링크 -->
- 사용 예정 화면: `/meetings`
- 관련 이슈/PR: <!-- # -->
