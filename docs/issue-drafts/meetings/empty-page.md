# [Feature] EmptyPage - 모임 목록 빈 상태 일러스트

## 📋 요약

검색·필터 결과가 없을 때 중앙에 빈 상태 일러스트를 보여준다. 뷰포트에 따라 다른 SVG를 사용하고, 상단 마진은 테스트에서 상수로 검증한다.

**스택:** Next.js + TypeScript + Tailwind CSS + `next/image`

---

## 🎯 목표

- 모바일·데스크톱에서 적절한 에셋이 표시된다.
- 레이아웃·여백이 목록 페이지와 조화를 이룬다.
- `data-testid`로 테스트가 루트를 찾을 수 있다.

---

## ✅ 완료 조건

**표시**

- [ ] `md` 이상에서는 `empty-page.svg`, 미만에서는 `empty-page-small.svg`가 보인다.
- [ ] 루트에 `EMPTY_PAGE_MARGIN_CLASSES`가 적용된다.

**품질**

- [ ] 스토리·테스트가 깨지지 않는다.

---

## 🔧 구현 계획

**컴포넌트 구조**

```
src/app/meetings/_components/empty-page/
  ├── empty-page.tsx
  ├── empty-page.stories.tsx
  └── empty-page.test.tsx
```

**주요 Props 설계**

| Prop | Type | 기본값 | 필수 | 설명                       |
| ---- | ---- | ------ | ---- | -------------------------- |
| —    | —    | —      | —    | 현재 props 없음(표시 전용) |

**사용 예시**

```tsx
<EmptyPage />
```

---

## 🚫 의도적으로 제외한 기능

- 빈 상태 문구·CTA 버튼
- 국제화
- 애니메이션

---

## 📎 참고 자료

- 디자인 시안: <!-- Figma 링크 -->
- 사용 예정 화면: `/meetings`(목록 없음 시)
- 관련 이슈/PR: <!-- # -->
