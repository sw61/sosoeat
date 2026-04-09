# next/image 수정 계획

> 브랜치: Feat/#230-nuqs-url-state  
> 작성일: 2026-04-08  
> 리뷰: /plan-eng-review

---

## Step 0: Scope Challenge

### 문제 요약

1. **Quality 불일치** — `main-banner.tsx`만 명시적 quality props(`85/75`) 사용. 나머지 30+개 `<Image>`는 기본값(75)에 의존. 문서화된 quality 전략 없음.

2. **비율 경고** — 두 가지 별개 문제:
   - `fill` 사용 시 `sizes` 누락 (8개 파일): Next.js 콘솔 경고 `"Image has 'fill' but is missing 'sizes' prop"`
   - 로고 height 불일치: SVG viewBox는 `72×23`인데 `navigation-bar.tsx`는 `height={22.64}` (올바른 값: 23), `error.tsx`/`not-found.tsx`는 `width=96`일 때 `height={30}` (올바른 비율: ~30.67)
   - `width={0} height={0} sizes="100vw"` 패턴 (`step2-basic-info.tsx`)

### 영향 파일

12개 파일 + `next.config.ts` 가능성. 모두 아키텍처 변경 없음 — 1~3줄 prop 추가/수정.

### 최소 변경 세트

- 로고 height 수정: 3개 파일, 각 1글자 변경
- `fill` 이미지에 `sizes` 추가: 8개 파일, 각 prop 1개 추가
- Quality 전략: 문서화

### 이미 올바르게 된 파일

`best-soeat-card.tsx`, `main-page-card.tsx`, `meeting-search-banner.tsx`, `main-banner.tsx`, `sosotalk-banner.tsx` — 이미 `fill` + `sizes` 올바르게 사용 중. 이번 수정으로 나머지 8개 파일을 동일 기준으로 맞춤.

---

## Section 1: Architecture Review

### 데이터 흐름

```
Browser request
     │
     ▼
Next.js Image Optimizer
     │
     ├── quality (default 75, override per-image)
     ├── sizes (hint for which srcset entry to use)
     └── fill vs width+height (layout mode)
            │
            ▼
        CDN / browser cache
```

### [P2] `fill` without `sizes` — 8개 파일 (confidence: 9/10)

`sizes` 없이 `fill`을 쓰면 브라우저가 100vw 기준으로 srcset 항목 선택.  
302px 고정 카드인데 모바일에서 750px~1080px 이미지를 받아올 수 있음.

| 파일                                                                                 | 부모 컨테이너                                     |
| ------------------------------------------------------------------------------------ | ------------------------------------------------- |
| `widgets/sosotalk/ui/sosotalk-card/sosotalk-card.tsx:46`                             | `h-[170px] w-full` inside `w-[302px]` 카드        |
| `features/meeting-create/ui/_components/step1-category.tsx:71`                       | `h-20 w-20` (80×80)                               |
| `widgets/auth/signup-form/ui/_components/signup-header.tsx:7`                        | `h-10 w-20 md:h-12 md:w-24`                       |
| `widgets/footer/ui/footer/footer.tsx:18`                                             | `h-5.5 w-17` (22×68, 로고 전용)                   |
| `widgets/mypage/ui/meeting-tabs/meeting-tabs-empty.tsx:7`                            | `h-[120px] w-[217px]`                             |
| `widgets/mypage/ui/mypage-card/mypage-card.tsx:123`                                  | `max-md:h-39 max-md:w-full md:size-47` (188px md) |
| `widgets/meeting-detail/ui/meeting-hero-section/meeting-hero-section.tsx:82`         | `h-[241px] w-full md:flex-1`                      |
| `widgets/meeting-detail/ui/meeting-recommended-card/meeting-recommended-card.tsx:39` | `h-[160px] w-full` in 302px 카드                  |

**결정: 8개 파일 모두 정확한 sizes 추가.**

---

## Section 2: Code Quality Review

### [P2] `imageUrl` null check — `sosotalk-card.tsx` (confidence: 8/10)

`src={imageUrl}`이 빈 문자열이면 Next.js throws. 타입상 `string`으로 보장되지만 수정 시 확인 필요.

### [P3] `sizes` 값에 근거 주석 없음 (confidence: 8/10)

기존 `best-soeat-card.tsx`→`"218px"`, `main-page-card.tsx`→`"360px"` 등 주석 없이 숫자만 있음. 반응형 변경 시 스테일해짐. 추가 시 한 줄 주석 권장.

### [P3] `mypage-card.tsx` sizes 계산 확인 필요 (confidence: 7/10)

부모: `max-md:w-full md:size-47`. Tailwind v4에서 `size-47` = 47×4 = 188px. 모바일은 전체 너비.  
→ `sizes="(min-width: 768px) 188px, 100vw"` 맞음. 커밋 전 1rem=16px 스케일 확인.

---

## Section 3: Test Review

**프레임워크:** Jest

```
CODE PATH COVERAGE
===========================

[+] navigation-bar.tsx — height={22.64} → height={23}
    │
    └── [GAP] Image 치수를 검증하는 테스트 없음

[+] error.tsx / not-found.tsx — height={30} → height={31}
    │
    └── [GAP] 스냅샷/비주얼 테스트 없음

[+] sosotalk-card.tsx — sizes="302px" 추가
    │
    └── [GAP] sosotalk-card 테스트 없음

[+] step2-basic-info.tsx — width=0,h=0 → fill + aspect-ratio 컨테이너
    │
    ├── [★★ impact] DOM 구조 변경 (wrapper div 추가)
    └── [GAP] 스냅샷 테스트 있으면 깨질 수 있음 (확인 결과: 없음 → 안전)

[+] 8× fill + sizes 추가
    │
    └── [GAP] sizes prop 값을 검증하는 테스트 없음

USER FLOW COVERAGE
===========================

[+] 이미지 로딩 플로우 (전 페이지)
    │
    ├── [GAP] srcset 선택을 검증하는 E2E 테스트 없음
    └── [GAP] 이미지 바이트 크기 성능 예산 테스트 없음

──────────────────────────────────────
COVERAGE: 0/10 새 경로 테스트됨
  prop-only 변경이라 비즈니스 로직 경로 없음
  step2-basic-info DOM 구조 변경만 테스트 관련
GAPS: step2 wrapper div 변경 — 기존 스냅샷 테스트 없음 (안전)
──────────────────────────────────────
```

**새 단위 테스트 불필요.** step2 wrapper div 변경은 구조적이지만 스냅샷 테스트 없으므로 안전.

**회귀 확인 필요 (수동):**

- 이미지 업로드 → 4:3 비율로 미리보기
- 이미지 없을 때 → 147×147 placeholder 정상
- 이미지 로드 후 레이아웃 시프트 없음

---

## Section 4: Performance Review

### `sizes` 수정 시 이미지 다운로드 크기 영향

```
sosotalk-card (fill, w-[302px] 카드)
  BEFORE: 모바일에서 ~750px srcset 항목 요청 (sizes 힌트 없음)
  AFTER:  sizes="302px" → ~320px srcset 항목 요청
  절약: 카드당 ~2-3배 작은 이미지
  카드 6개 페이지 기준: 체감 가능한 대역폭 절감

mypage-card (fill, md:size-47 = 188px)
  BEFORE: 모바일에서 ~750px 요청
  AFTER:  sizes="(min-width: 768px) 188px, 100vw"
  모바일은 여전히 100vw — 카드가 전체 너비이므로 올바름
```

로고 이미지(footer, signup-header, nav-bar)는 SVG. Next.js Image optimizer가 SVG는 기본 최적화 생략 → `sizes` 추가는 경고 제거 효과는 있지만 바이트 절감은 미미.

`step2` `fill` 변경: wrapper `div` 추가. 성능 회귀 없음. `sizes` 값이 생기므로 현재 `100vw` 기본값보다 srcset 선택 개선.

---

## Failure Modes

| 코드패스                | 실패 방식                                         | 테스트? | 핸들러?                                | 사용자가 보는 것     |
| ----------------------- | ------------------------------------------------- | ------- | -------------------------------------- | -------------------- |
| `fill` + 잘못된 `sizes` | 큰 이미지 fetch → 느린 로드                       | 없음    | 없음                                   | 느린 로드, 오류 없음 |
| 로고 `height={23}`      | 0.36px 더 높아짐 → height 제약 시 레이아웃 시프트 | 없음    | 없음                                   | 시각적 변화 (미미)   |
| step2 wrapper div       | `overflow-hidden` 없으면 이미지 블리드            | 없음    | 없음                                   | 이미지 잘림          |
| step2 fill, 이미지 없음 | `src=""` → Next.js throws                         | 없음    | `{field.value && !isPending}`로 가드됨 | —                    |

> **Critical:** step2 wrapper div에 반드시 `overflow-hidden` 추가. 없으면 `rounded-2xl` 적용 안 됨.

---

## NOT in scope

- main-banner 외 콘텐츠 이미지에 quality prop 추가 (결정: 유지)
- 이미지 다운로드 크기 검증 E2E 테스트 추가
- `sosotalk-card`의 `imageUrl` null 처리 변경 (이번 수정 범위 아님)
- `image-upload-field.tsx`의 `unoptimized` 플래그 최적화 (의도적 사용)

---

## Implementation Plan

### Lane A — 로고 height 수정 (3개 파일)

SVG viewBox 기준: `72 × 23`

| 파일                                                             | 현재                     | 수정 후       |
| ---------------------------------------------------------------- | ------------------------ | ------------- |
| `widgets/navigation-bar/ui/navigation-bar/navigation-bar.tsx:95` | `height={22.64}`         | `height={23}` |
| `app/error.tsx:22`                                               | `height={30}` (width=96) | `height={31}` |
| `app/not-found.tsx:8`                                            | `height={30}` (width=96) | `height={31}` |

### Lane B — `fill` + `sizes` 추가 (7개 파일)

| 파일                                                                                 | 추가할 sizes 값                     |
| ------------------------------------------------------------------------------------ | ----------------------------------- |
| `widgets/sosotalk/ui/sosotalk-card/sosotalk-card.tsx:46`                             | `"302px"`                           |
| `widgets/footer/ui/footer/footer.tsx:18`                                             | `"68px"`                            |
| `widgets/auth/signup-form/ui/_components/signup-header.tsx:7`                        | `"(max-width: 768px) 80px, 96px"`   |
| `widgets/mypage/ui/meeting-tabs/meeting-tabs-empty.tsx:7`                            | `"217px"`                           |
| `widgets/mypage/ui/mypage-card/mypage-card.tsx:123`                                  | `"(min-width: 768px) 188px, 100vw"` |
| `widgets/meeting-detail/ui/meeting-hero-section/meeting-hero-section.tsx:82`         | `"(max-width: 768px) 100vw, 50vw"`  |
| `widgets/meeting-detail/ui/meeting-recommended-card/meeting-recommended-card.tsx:39` | `"302px"`                           |

### Lane C — fill + aspect-ratio 컨테이너 (2개 파일)

**`step1-category.tsx:71`**  
부모 div가 이미 `relative h-20 w-20` → `sizes="80px"` 만 추가, wrapper 변경 불필요.

**`step2-basic-info.tsx:92-99`**

```tsx
// 변경 전
<Image
  src={field.value as string}
  alt="모임 이미지"
  width={0}
  height={0}
  sizes="100vw"
  className="h-auto w-full rounded-2xl"
/>

// 변경 후
<div
  className="relative w-full overflow-hidden rounded-2xl"
  style={{ aspectRatio: '4/3' }}
>
  <Image
    src={field.value as string}
    alt="모임 이미지"
    fill
    sizes="100vw"
    className="object-contain"
  />
</div>
```

기존 바깥 `relative w-full` div와 통합 (중복 제거).

### Lane 실행 순서

A + B + C 병렬 실행 가능. 모두 다른 디렉토리 → 머지 충돌 없음.

---

## Quality 전략

- `main-banner`: 첫 번째 이미지 `quality={85}` (above-fold), 나머지 `quality={75}` — **유지**
- 나머지 이미지: Next.js 기본값(75) 그대로 사용
- `next.config.ts`에 global quality 설정 없음 (Next.js 미지원)

---

## 검증 체크리스트

- [ ] 모임 만들기 step2: 이미지 업로드 → 4:3 비율로 미리보기 표시, 잘림 없음
- [ ] 모임 만들기 step2: 이미지 없을 때 147×147 placeholder 정상 표시
- [ ] 모임 만들기 step1: 카테고리 아이콘 80×80 컨테이너 내 정상 렌더링
- [ ] 네비게이션 바: 로고 비율 정상 (height 23px)
- [ ] 소소톡 카드: 이미지 정상 로드, 콘솔 경고 없음
- [ ] 마이페이지 카드: 이미지 정상 로드, 콘솔 경고 없음
- [ ] 모임 상세: hero 이미지, 추천 카드 이미지 콘솔 경고 없음
- [ ] footer 로고: 정상 렌더링
- [ ] 회원가입 헤더 로고: 정상 렌더링
