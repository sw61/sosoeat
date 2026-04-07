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
npm run validate    # 타입 체크 + Prettier + ESLint + 관련 Jest 테스트 자동 실행
```

---

## 📂 폴더 구조 (Folder Structure)

본 프로젝트는 **FSD (Feature-Sliced Design)** 방법론을 채택하여 유지보수성과 확장성을 극대화했습니다. 모든 폴더와 파일 이름은 **kebab-case**를 사용합니다.

```text
src/
├── app/                  # [App Layer] Next.js App Router 전용 (라우팅, 레이아웃)
│   ├── (auth)/           # 인증 관련 라우트 그룹
│   ├── meetings/         # 모임 상세 및 목록 페이지
│   ├── mypage/           # 마이페이지
│   ├── sosotalk/         # 게시판 페이지
│   ├── layout.tsx        # 전역 레이아웃
│   └── providers.tsx     # 전역 Provider 설정
│
├── widgets/              # [Widgets Layer] 독립적인 복합 블록 (페이지에서 조합)
│   ├── navigation-bar/   # 상단 네비게이션 바
│   ├── footer/           # 하단 푸터
│   ├── meeting-list/     # 모임 목록 섹션
│   └── ...
│
├── features/             # [Features Layer] 사용자 액션 단위 (Mutation, 폼 제출)
│   ├── auth/             # 로그인, 회원가입 폼 및 로직
│   ├── meeting-create/   # 모임 생성 모달 및 로직
│   ├── favorites/        # 좋아요 토글 버튼 및 로직
│   └── ...
│
├── entities/             # [Entities Layer] 비즈니스 엔티티 (데이터 모델, 조회 로직)
│   ├── meeting/          # 모임 데이터, API, 카드 UI
│   ├── user/             # 유저 데이터, 프로필 UI
│   ├── comment/          # 댓글 데이터, 목록 UI
│   └── ...
│
├── shared/               # [Shared Layer] 도메인 무관 재사용 요소
│   ├── ui/               # 공통 UI 컴포넌트 (Button, Input, Modal 등)
│   ├── api/              # 공통 API 클라이언트 (fetchClient, apiServer)
│   ├── lib/              # 유틸리티 함수 (cn, date-utils 등)
│   ├── hooks/            # 공통 커스텀 훅 (useModal 등)
│   └── types/            # 전역 타입 정의 (OpenAPI 생성 타입 등)
│
├── tests/e2e             # Playwright E2E 테스트 시나리오
└── .github/workflows/    # CI/CD (GitHub Actions)
```

### 📏 레이어별 계층 규칙 (Layer Hierarchy)

FSD의 핵심은 **하위 레이어는 상위 레이어를 참조할 수 없다**는 단방향 의존성 원칙입니다.

`app` > `widgets` > `features` > `entities` > `shared`

- `shared`는 그 무엇도 참조하지 않습니다.
- `entities`는 다른 `entities`나 `features`를 참조할 수 없습니다.
- `features`는 `entities`를 참조할 수 있지만, 다른 `features`나 `widgets`는 참조할 수 없습니다.
- `widgets`는 `features`와 `entities`를 조합할 수 있습니다.
- `app`은 모든 레이어를 조립하는 최종 단계입니다.

### 🧩 슬라이스 내부 구조 (Slice Internal Structure)

각 레이어(`widgets`, `features`, `entities`) 내의 개별 도메인(슬라이스)은 기능별로 구분된 세그먼트(Segment) 폴더를 가집니다.

- `ui/`: 화면에 그려지는 UI 컴포넌트 (예: `*_component.tsx`)
- `model/`: 비즈니스 로직, 전역/지역 상태 관리, 커스텀 훅 및 스키마 (예: `use-*.ts`, `*.schema.ts`, `*.store.ts`)
- `api/`: 해당 특성이나 엔티티의 API 호출 함수 (서버 통신 로직)
- `lib/` (선택): 도메인 내에서 쓰이는 독립적인 유틸 함수

---

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
