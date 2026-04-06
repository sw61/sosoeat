# 소소잇 프로젝트

## 기술 스택

- **프레임워크**: Next.js (App Router), TypeScript
- **스타일링**: Tailwind CSS v4
- **상태 관리**: Zustand (전역), TanStack Query (서버 상태)
- **테스트**: Jest 사용
- **애니메이션**: framer-motion, tailwind
- **React Compiler 1.0 사용 중** — `React.memo`, `useMemo`, `useCallback` 사용 금지

## 주요 명령어

```bash
npm run dev          # 개발 서버 (localhost:3000)
npm run build        # 프로덕션 빌드
npm run lint         # ESLint 검사
npm run type-check   # TypeScript 타입 체크
npm run format       # Prettier 포맷팅
npm run test         # 전체 단위 테스트
npm run test:coverage # 커버리지 리포트
npm run storybook    # Storybook (localhost:6006)
```

## 폴더 구조

모든 폴더/파일명은 **kebab-case** 사용.

```text
src/
├── app/
│   ├── _components/          # 루트 layout 전용 컴포넌트
│   ├── (auth)/               # /login, /signup 라우트 그룹
│   ├── my-page/
│   ├── layout.tsx
│   ├── providers.tsx         # QueryClientProvider, 전역 설정
│   └── page.tsx
├── components/
│   ├── ui/                   # shadcn 기본 컴포넌트
│   └── common/               # UI 조각 조합 공통 컴포넌트
├── services/                 # API fetch 함수 + React Query 훅
├── store/                    # Zustand 전역 상태
├── hooks/                    # 전역 커스텀 훅
├── lib/                      # QueryClient 등 설정
├── types/                    # 공용 타입/인터페이스
├── utils/                    # 순수 유틸 함수
└── tests/e2e/                # Playwright E2E 테스트
```

컴포넌트 폴더 구조 예시:

```text
button/
├── button.tsx
├── button.test.tsx
├── button.stories.tsx
└── index.ts        # 외부 export 관리
```

## HTTP 클라이언트

- **fetchClient** (`lib/http/fetch-client.ts`) — 클라이언트 컴포넌트 전용
  - `/api/`로 시작하는 BFF 경로는 그대로 호출
  - 그 외 경로는 `/api/proxy/`를 경유하여 백엔드 호출
- **apiServer** (`lib/http/api-server.ts`) — 서버 컴포넌트 / Server Action 전용
  - 직접 백엔드를 호출하며 httpOnly 쿠키에서 토큰을 자동 삽입
- BFF Route Handler 내부에서는 둘 다 사용하지 않고 `fetch()` 직접 사용

## BFF (Backend For Frontend)

- `app/api/auth/*` — 세션 생성/파기 전용 Route Handler (쿠키 관리)
- `app/api/proxy/[...path]` — 인증된 일반 API 요청 프록시
- BFF Route Handler는 세션 경계이므로 `apiServer` / `fetchClient` 사용 불가

## index.ts export 규칙

- **공용 컴포넌트** (`components/common/`, `components/ui/`): `export * from` 허용
- **페이지 내부 컴포넌트** (`app/**/`): 외부에서 실제로 사용하는 심볼만 named export로 명시
  - `.types`, `.schema`, `.constants`는 외부에서 필요한 타입만 선별하여 re-export
  - 내부 전용 훅/유틸은 index.ts에 노출하지 않음
- 자동 생성 코드 (`types/generated-client/`)는 예외

## 컨벤션

👉 **[프로젝트 컨벤션 가이드](./docs/CONVENTION.md)**

## Git

- **커밋 메시지**: Angular 스타일 (`feat:`, `fix:`, `chore:`, `docs:` 등)
- **Pre-commit**: type-check → Prettier → ESLint → 관련 Jest 테스트 자동 실행

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:

- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
- Save progress, checkpoint, resume → invoke checkpoint
- Code quality, health check → invoke health
