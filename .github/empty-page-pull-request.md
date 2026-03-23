## PR 제목: [Feat]: EmptyPage 공통 컴포넌트 추가

**기능 스펙:** [.github/empty-page-feature-spec.md](./empty-page-feature-spec.md)

### 📌 유형 (Type)

다음 중 PR의 성격에 해당하는 항목에 `[x]`를 표시해주세요.

- [x] **Feat (기능):** 새로운 기능 추가
- [ ] **Fix (버그 수정):** 버그 수정
- [ ] **Refactor (리팩토링):** 코드 구조/개선 (기능 변경 없음)
- [ ] **Docs (문서):** 문서 관련 변경 (README, Wiki 등)
- [ ] **Style (스타일):** 코드 포맷, 세미콜론 누락 등 (코드 동작에 영향 없음)
- [ ] **Chore (기타):** 빌드 시스템, 라이브러리 업데이트, 설정 등

### 📝 변경 사항 (Changes)

이 PR에서 변경된 내용을 **간결하고 명확하게** 설명해주세요.

- 어떤 문제가 있었는지? (이슈 번호 명시 권장: #ISSUE_NUMBER)
- 무엇을 어떻게 변경했는지?

> **요약 (스펙과 동일)**
>
> 목록·검색·필터 결과 등 **표시할 콘텐츠가 없을 때** 동일한 빈 상태 일러스트를 보여 주는 **`EmptyPage`** 를 추가했습니다. (이슈: #ISSUE_NUMBER)
>
> **기술 스택:** Next.js(App Router) · TypeScript · Tailwind CSS · `next/image` · Jest · React Testing Library · Storybook(`@storybook/nextjs-vite`)
>
> **목표 반영**
>
> - 빈 상태 UI **공통화** (`EmptyPage` + `public/images/empty-page.svg`)
> - **반응형 상단 여백** (`EMPTY_PAGE_MARGIN_CLASSES`: `mt-[200px]` · `min-[375px]:mt-[145px]` · `min-[744px]:mt-[180px]`, 모바일 퍼스트 `min-[…px]:`)
> - **테스트·스토리북**으로 회귀·디자인 확인 경로 확보
>
> **파일 구조**
>
> ```
> src/components/common/empty-page/
>   ├── index.ts
>   ├── empty-page.tsx          # EmptyPage + EMPTY_PAGE_MARGIN_CLASSES
>   ├── empty-page.test.tsx
>   └── empty-page.stories.tsx
> ```
>
> - Props가 없어 **`empty-page.types.ts`는 포함하지 않음** (확장 시 스펙에 따라 추가).
> - `empty-page.tsx`: `cn()`으로 margin 상수 + `flex h-full flex-col items-center justify-center`, `data-testid="empty-page-root"`.
> - `index.ts`: `EmptyPage`, `EMPTY_PAGE_MARGIN_CLASSES` barrel export.
> - `empty-page.test.tsx`: `next/image` mock, 루트에 margin 유틸 클래스·상수 문자열·이미지 `src`/`alt` 검증 (JSDOM에서는 **클래스 포함**으로 반응형 의도 검증).
> - Storybook **`components/common/empty-page`** · **Default**, `./index` import.
>
> **이 PR에 포함하지 않음 (스펙 §의도적 제외·향후)**
>
> - 문구(제목/설명)·버튼·링크
> - 실제 목록/검색 페이지에의 삽입·QA
> - E2E(Playwright) 전용 시나리오, 다크 모드 전용 에셋

### 🧪 테스트 방법 (How to Test)

변경 사항을 확인하기 위해 **테스트해야 할 단계나 시나리오**를 상세히 설명해주세요.

1. `npm run test -- src/components/common/empty-page/empty-page.test.tsx` 로 단위 테스트를 실행한다.
2. `npm run storybook` 실행 후 **`components/common/empty-page`** → **Default** 스토리에서 일러스트가 중앙에 보이는지 확인한다.
3. (선택) 브라우저/Storybook 뷰포트를 **375px 미만 / 375~743px / 744px 이상**으로 바꿔 상단 여백(`mt`)이 구간별로 달라지는지 확인한다.

> **예시:**
>
> 1. `npm run test -- src/components/common/empty-page/empty-page.test.tsx` 가 통과하는지 확인합니다.
> 2. `npm run storybook` → `components/common/empty-page` → Default에서 `empty-page.svg`가 보이면 됩니다.
> 3. 필요 시 위 뷰포트 구간으로 나눠 margin이 디자인과 맞는지 봅니다.

### 📸 스크린샷 또는 영상 (Optional)

(UI/UX 변경 사항이 있을 경우, 변경 전/후 스크린샷이나 동작 영상 첨부)

| 변경 전 (Before) | 변경 후 (After) |
| :--------------: | :-------------: |
|                  |                 |

### 🚨 기타 참고 사항 (Notes)

- [ ] **코드 리뷰 시 특별히 확인이 필요한 부분이 있다면 명시해주세요.**
  - 상세 목표·완료 조건·제외 범위는 **`empty-page-feature-spec.md`** 와 동일하게 맞춰 두었습니다.
  - 단위 테스트는 **DOM에 반응형 `mt` 유틸이 붙는지**만 검증합니다. 픽셀 단위는 브라우저·Storybook 뷰포트에서 확인하는 것이 좋습니다.
- [ ] **배포 시점에 고려해야 할 사항이 있다면 명시해주세요.**
  - 스펙상 **후속 작업**: 실제 화면에 `EmptyPage` 연동, Props 확장 시 `empty-page.types.ts` 추가 등.

### 📎 참고 (스펙과 동일)

- 디자인 시안: <!-- Figma 빈 상태(Empty) 프레임 링크 -->
- 사용 예정 화면: <!-- 예: 모임 목록, 검색 결과, 찜 목록 등 -->
- 관련 이슈/PR: <!-- #ISSUE_NUMBER -->

**사용 예시 (스펙 인용)**

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
