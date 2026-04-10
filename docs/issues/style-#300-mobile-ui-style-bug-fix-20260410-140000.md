# [Style] MobileUIStyleFix - 모바일 UI 스타일 버그 9종 수정

## 📋 요약

모바일 환경에서 발생하는 시각적 버그들을 수정합니다. 뱃지 텍스트 잘림, 필터 간격 과다, 카드 간격 좁음, 모임 설명 영역 패딩 과다, 지역 필터 모달 여백 과다, 터치 영역 미달, 폰트 위계 불일관성, 뱃지 높이 불일치 등 9개 이슈를 한 번에 처리합니다.

**스택:** Next.js + TypeScript + Tailwind CSS v4

---

## 🎯 목표

- 모바일에서 뱃지/필터/카드가 피그마 시안과 일치하도록 레이아웃을 수정한다.
- WCAG 2.5.5 최소 터치 타깃(44px)을 준수한다.
- 뱃지 높이를 일관되게 통일하여 시각적 위계를 명확히 한다.

---

## ✅ 완료 조건

**뱃지 수정**

- [ ] `모집완료 N일 N시간 남았어요!` 텍스트가 카드 폭에서 잘리지 않고 말줄임 처리된다.
- [ ] `개설확정` 뱃지 높이가 `개설대기` 뱃지 높이와 동일하다 (~32px).
- [ ] `ESTABLISHED_LABEL_CLASS`에서 `h-6` 제거, `w-[75px]` 자연 너비로 변경.

**필터 바 / 카드 그리드**

- [ ] 모임찾기 필터 탭(`전체 / 함께먹기 / 공동구매`) 간격이 모바일에서 적절하다 (`gap-[24.5px]` → `gap-3 md:gap-[24.5px]`).
- [ ] 검색 페이지 카드 그리드 모바일 간격 `gap-1` → `gap-4` 로 수정.
- [ ] 지역 필터 pill 터치 영역 `h-8`(32px) → `h-11`(44px).

**모임 상세 페이지**

- [ ] 모임 설명 컨테이너 패딩: `px-12 py-10` → `px-4 py-6 md:px-12 md:py-10`.
- [ ] 모임 설명 h2 제목: `text-2xl` → `text-xl md:text-2xl`.
- [ ] InfoRow 레이블/값 폰트 크기 일관성 확인 및 조정.

**지역 선택 모달**

- [ ] 모달 패딩: `p-12` → `p-6 sm:p-12`.
- [ ] 모달 gap: `gap-12` → `gap-6 sm:gap-12`.
- [ ] 내부 푸터 버튼 높이: `h-[60px]` → `h-12 sm:h-[60px]`.

**품질**

- [ ] 기존 단위 테스트(`deadline-badge.test.tsx`, `establishment-status-badge.test.tsx` 등) 전부 통과.
- [ ] Storybook에서 변경된 컴포넌트 시각 확인.

---

## 🔧 변경 계획

**대상 파일**

```
src/entities/meeting/ui/deadline-badge/deadline-badge.tsx
src/entities/meeting/ui/establishment-status-badge/establishment-status-badge.constants.ts
src/widgets/search/ui/meeting-filter-bar/meeting-filter-bar.tsx
src/widgets/search/ui/search-page/search-page.tsx
src/app/meetings/[id]/page.tsx
src/widgets/search/ui/region-select-modal/region-select-modal.tsx
src/shared/lib/meeting-filter-pill.ts
src/widgets/meeting-detail/ui/meeting-detail-card/meeting-detail-card.tsx (폰트 위계 보조)
```

**변경 포인트**

| 이슈                 | 파일                                      | 변경 전                                         | 변경 후                                    |
| -------------------- | ----------------------------------------- | ----------------------------------------------- | ------------------------------------------ |
| 모집완료 뱃지 잘림   | `deadline-badge.tsx`                      | `<div className="w-full overflow-hidden">`      | `<div className="w-full truncate">`        |
| 개설확정 높이 과다   | `establishment-status-badge.constants.ts` | `ESTABLISHED_LABEL_CLASS: '...h-6 w-[75px]...'` | `h-6` 제거, `w-[75px]` → `w-fit` 또는 제거 |
| 개설대기 h-auto 통일 | `establishment-status-badge.constants.ts` | `PENDING_BADGE_CLASS: '...h-auto...'`           | 동일 (이미 h-auto)                         |
| 필터 탭 간격         | `meeting-filter-bar.tsx`                  | `gap-[24.5px]`                                  | `gap-3 md:gap-[24.5px]`                    |
| 카드 그리드 간격     | `search-page.tsx`                         | `gap-1`                                         | `gap-4`                                    |
| 터치 영역            | `meeting-filter-pill.ts`                  | `h-8`                                           | `h-11`                                     |
| 모달 패딩            | `region-select-modal.tsx`                 | `p-12 gap-12`                                   | `p-6 sm:p-12 gap-6 sm:gap-12`              |
| 설명 섹션 패딩       | `page.tsx` (meetings/[id])                | `px-12 py-10`                                   | `px-4 py-6 md:px-12 md:py-10`              |
| 설명 제목            | `page.tsx`                                | `text-2xl`                                      | `text-xl md:text-2xl`                      |

---

## 🚫 이번 작업 범위 외

- 뱃지 `py-1.5` 중복 제거 (badge shared token 도입) — 별도 리팩토링 PR
- UseStateBadge 스타일 변경 — 이번 이슈에서 미사용
- 기능 로직 변경 (useTimeFormatter, useRegionSelectModal 등)
- 접근성 색상 대비 개선

---

## 📎 참고 자료

- 관련 이슈: #300
- 브랜치: `Style/#300-mobile-ui-style-bug-fix`

---

## GSTACK REVIEW REPORT

| Review        | Trigger               | Why                             | Runs | Status | Findings                                                     |
| ------------- | --------------------- | ------------------------------- | ---- | ------ | ------------------------------------------------------------ |
| CEO Review    | `/plan-ceo-review`    | Scope & strategy                | 0    | —      | —                                                            |
| Codex Review  | `/codex review`       | Independent 2nd opinion         | 0    | —      | —                                                            |
| Eng Review    | `/plan-eng-review`    | Architecture & tests (required) | 1    | CLEAR  | 8 files, 0 new abstractions, 1 DRY smell (deferred to TODOS) |
| Design Review | `/plan-design-review` | UI/UX gaps                      | 0    | —      | —                                                            |
| DX Review     | `/plan-devex-review`  | Developer experience gaps       | 0    | —      | —                                                            |

**VERDICT:** ENG CLEARED — 8 파일 Tailwind-only 변경, 테스트 영향 없음.
