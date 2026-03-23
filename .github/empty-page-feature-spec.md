# [Feature] EmptyPage - 데이터 없음(빈 상태) 공통 일러스트 영역

## 📋 요약

목록·검색·필터 결과 등 **표시할 콘텐츠가 없을 때** 사용자에게 동일한 시각적 빈 상태를 제공하기 위한 공통 컴포넌트입니다. `next/image`로 SVG 일러스트를 표시하고, 뷰포트 너비에 따라 **상단 여백(`margin-top`)** 을 달리해 레이아웃을 맞춥니다.

**기술 스택:** Next.js(App Router) · TypeScript · Tailwind CSS · `next/image` · Jest · React Testing Library · Storybook(`@storybook/nextjs-vite`)

---

## 🎯 목표

- 빈 상태 UI를 **한 곳에서 재사용**할 수 있도록 공통화한다.
- **반응형 상단 여백**으로 모바일/태블릿/데스크톱에서 일관된 배치를 유지한다.
- **단위 테스트·스토리북**으로 회귀를 줄이고 디자인 검증을 쉽게 한다.

---

## ✅ 완료 조건

**컴포넌트·에셋**

- [x] `EmptyPage` 루트 레이아웃(`flex`, 전체 높이, 가운데 정렬) 및 `public/images/empty-page.svg` 표시(100×100)
- [x] `EMPTY_PAGE_MARGIN_CLASSES`로 `mt-[200px]` · `min-[375px]:mt-[145px]` · `min-[744px]:mt-[180px]` 적용
- [x] `index.ts`에서 `EmptyPage`, `EMPTY_PAGE_MARGIN_CLASSES` export

**품질**

- [x] `empty-page.test.tsx`: `next/image` mock, 뷰포트별 `mt` 유틸 클래스·상수 문자열·이미지 `src`/`alt` 검증
- [x] `empty-page.stories.tsx`: `components/common/empty-page` · Default 스토리

**문서·운영**

- [x] PR 설명용 `empty-page-pull-request.md` 정리(선택)

**향후(미구현 시 체크 해제 유지)**

- [ ] 실제 목록/검색 페이지에 `EmptyPage` 삽입 및 QA
- [ ] 카피·CTA·아이콘 교체 등 **Props 확장** 시 `empty-page.types.ts` 추가

---

## 🔧 구현 계획

**컴포넌트 구조 (현재)**

```
src/components/common/empty-page/
  ├── index.ts
  ├── empty-page.tsx          # EmptyPage + EMPTY_PAGE_MARGIN_CLASSES
  ├── empty-page.test.tsx
  └── empty-page.stories.tsx
```

> Props가 없어 **`empty-page.types.ts`는 생략**했습니다. 확장 시 추가합니다.

**주요 Props 설계 (현재)**

| Prop | Type | 기본값 | 필수 | 설명                                                                     |
| ---- | ---- | ------ | ---- | ------------------------------------------------------------------------ |
| —    | —    | —      | —    | **현재 props 없음.** 향후 `title`, `description`, `action` 등 검토 가능. |

**상수·테스트 훅**

```ts
export const EMPTY_PAGE_MARGIN_CLASSES = 'mt-[200px] min-[375px]:mt-[145px] min-[744px]:mt-[180px]';
```

**사용 예시**

```tsx
import { EmptyPage } from '@/components/common/empty-page';

export default function MeetingsEmpty() {
  return (
    <div className="h-full min-h-[400px]">
      <EmptyPage />
    </div>
  );
}
```

---

## 🚫 의도적으로 제외한 기능

- **문구(제목/설명)·버튼·링크** — 화면마다 카피가 다를 수 있어 이번 범위에서는 일러스트만 제공
- **`empty-page.types.ts`** — Props가 없어 불필요
- **E2E(Playwright) 전용 시나리오** — 단위 테스트·스토리북으로 1차 검증, 필요 시 별도 이슈
- **다크 모드 전용 에셋/토큰** — SVG·배경은 단일 스펙 기준

---

## 📎 참고 자료

- 디자인 시안: <!-- Figma 빈 상태(Empty) 프레임 링크 -->
- 사용 예정 화면: <!-- 예: 모임 목록, 검색 결과, 찜 목록 등 -->
- 관련 이슈/PR: <!-- #ISSUE_NUMBER -->
- PR 본문 초안: `.github/empty-page-pull-request.md`
