# 소소잇 프로젝트

## 🚀 기술 스택 (Tech Stack)

### 핵심 기술 (Core)

- **상태 및 최적화**: React Compiler 1.0 (별도의 `React.memo`, `useMemo`, `useCallback` 불필요)
- **프레임워크**: Next.js 16 (App Router)
- **언어**: TypeScript 5
- **스타일링**: Tailwind CSS v4
- **애니메이션**: framer motion

### 상태 및 데이터 관리 (State & Data)

- **상태 관리**: Zustand 5 (전역 상태 관리)
- **서버 상태 관리**: TanStack Query v5 (데이터 페칭 및 캐싱)
- **시간 관리 **: date-fns/locale

### 테스트 및 개발 도구 (Testing & Tooling)

- **단위 테스트**: Jest 30, React Testing Library 16
- **E2E 테스트**: Playwright 1.58
- **컴포넌트 문서화**: Storybook 10.2
- **코드 품질 관리**: ESLint 9 (Flat Config), Prettier 3
- **Git 작업 자동화**: Husky 9, Commitlint 20, lint-staged 16

---

## 🏁 시작하기 (Getting Started)

프로젝트를 로컬 환경에서 시작하는 방법입니다.

1. **저장소 클론**

   ```bash
   git clone https://github.com/your-repo/team9.git
   cd team9
   ```

2. **의존성 설치**

   ```bash
   npm install
   ```

3. **환경 변수 설정**
   `.env.example` 파일을 복사하여 `.env` 파일을 생성하고 필요한 값을 채워넣습니다.

   ```bash
   cp .env.example .env
   ```

4. **개발 서버 실행**
   ```bash
   npm run dev
   ```

---

## 🛠️ 개발 및 실행 방법 (Available Commands)

### 🚀 상세 명령어 목록

#### 개발 및 실행 (Development)

| 명령어          | 설명                                                   |
| :-------------- | :----------------------------------------------------- |
| `npm run dev`   | 로컬 개발 서버를 실행합니다. (`http://localhost:3000`) |
| `npm run build` | 프로덕션 배포를 위한 최적화 빌드를 수행합니다.         |
| `npm run start` | 빌드된 결과물로 프로덕션 서버를 실행합니다.            |

#### 코드 품질 및 포맷팅 (Quality & Style)

| 명령어               | 설명                                                 |
| :------------------- | :--------------------------------------------------- |
| `npm run lint`       | ESLint를 통해 코드 컨벤션 및 문법 오류를 검사합니다. |
| `npm run type-check` | TypeScript 타입 체크를 수행합니다. (`tsc --noEmit`)  |
| `npm run format`     | Prettier를 통해 전체 코드 포맷팅을 자동 수정합니다.  |

#### 테스트 (Testing)

| 명령어                  | 설명                                                         |
| :---------------------- | :----------------------------------------------------------- |
| `npm run test`          | Jest를 사용하여 모든 단위 테스트를 실행합니다.               |
| `npm run test:watch`    | 변경된 파일 위주로 테스트를 감시 모드로 실행합니다.          |
| `npm run test:watchAll` | 전체 파일을 테스트 감시 모드로 실행합니다.                   |
| `npm run test:changed`  | 마지막 커밋 이후 변경된 파일에 대해서만 테스트를 실행합니다. |
| `npm run test:coverage` | 테스트 커버리지 리포트를 생성합니다.                         |

#### 컴포넌트 개발 (UI Development)

| 명령어                    | 설명                                                        |
| :------------------------ | :---------------------------------------------------------- |
| `npm run storybook`       | Storybook 개발 서버를 실행합니다. (`http://localhost:6006`) |
| `npm run build-storybook` | Storybook을 정적 파일로 빌드합니다.                         |

#### 기타 (Infrastructure)

| 명령어            | 설명                                    |
| :---------------- | :-------------------------------------- |
| `npm run prepare` | Husky 및 Git Hooks 설정을 초기화합니다. |

---

## 💻 개발 환경 설정 (Setup)

### VS Code 추천 확장 (Recommended Extensions)

원활한 개발을 위해 다음 VS Code 확장 도구 설치를 권장합니다. (`.vscode/extensions.json`)

- **ESLint**: `dbaeumer.vscode-eslint` (코드 정적 분석 및 린트)
- **Prettier**: `esbenp.prettier-vscode` (코드 포맷팅)
- **Tailwind CSS IntelliSense**: `bradlc.vscode-tailwindcss` (Tailwind CSS 자동 완성 및 미리보기)

### VS Code 설정

프로젝트에 포함된 `.vscode/settings.json`을 통해 저장 시 자동으로 다음 작업이 수행됩니다:

- Prettier 포맷팅
- ESLint 자동 수정 (Import 순서 정렬 포함)

---

## 📂 폴더 구조 (Folder Structure)

본 프로젝트는 **계층형 구조(Layered Architecture)**와 **App Router의 Route Colocation** 패턴을 채택하여 유지보수성과 확장성을 극대화했습니다. 모든 폴더와 파일 이름은 **kebab-case**를 사용합니다.

```text
src/
├── app/
│   ├── _components/                  # 루트 layout 전용 컴포넌트
│   │   ├── header/                   # 컴포넌트별 폴더화 (kebab-case)
│   │   │   ├── header.tsx            # 파일명 (kebab-case)
│   │   │   ├── header.test.tsx       # 테스트 파일 함께 관리
│   │   │   ├── header.stories.tsx    # 스토리북 파일 함께 관리
│   │   │   └── index.ts              # 외부 노출을 위한 export 관리
│   │   └── ...
│   ├── layout.tsx                    # RootLayout — Provider, Header, Sidebar 주입
│   ├── providers.tsx                 # QueryClientProvider, 전역 설정
│   ├── globals.css                   # Tailwind base import
│   ├── page.tsx                      # → /
│   │
│   ├── (auth)/                       # 라우팅 그룹 — /login, /signup
│   │   ├── layout.tsx
│   │   ├── login/
│   │   │   ├── _components/
│   │   │   │   ├── login-form/
│   │   │   │   │   ├── login-form.tsx
│   │   │   │   │   ├── login-form.test.tsx
│   │   │   │   │   ├── login-form.stories.tsx
│   │   │   │   │   └── index.ts      # export 관리
│   │   │   │   └── ...
│   │   │   └── page.tsx              # → /login
│   │   └── signup/
│   │       ├── _components/
│   │       │   └── signup-form/
│   │       │       └── ...
│   │       └── page.tsx              # → /signup
│   │
│   ├── my-page/                      # URL: /my-page
│   │   ├── _components/
│   │   │   ├── profile-card/
│   │   │   └── order-history/
│   │   ├── page.tsx                  # → /my-page
│   │   └── settings/
│   │       ├── _components/
│   │       │   ├── password-form/    # /my-page/settings 전용
│   │       │   │   ├── password-form.tsx
│   │       │   │   ├── password-form.test.tsx
│   │       │   │   └── password-form.stories.tsx
│   │       │   └── notification-toggle/
│   │       └── page.tsx              # → /my-page/settings
│
├── components/
│   ├── ui/                           # [Level 1] shadcn 기본 컴포넌트
│   │   ├── button/
│   │   │   ├── button.tsx
│   │   │   ├── button.test.tsx
│   │   │   ├── button.stories.tsx
│   │   │   └── index.ts              # export 관리
│   │   ├── input/
│   │   │   └── ...
│   │   └── modal/
│   │       └── ...
│   └── common/                       # [Level 2] UI 조각들을 조합한 공통 컴포넌트
│       ├── labeled-input/            # Label + Input + Error 조합
│       │   ├── labeled-input.tsx
│       │   ├── labeled-input.test.tsx
│       │   ├── labeled-input.stories.tsx
│       │   └── index.ts              # export 관리
│       ├── status-badge/
│       └── custom-spinner/
│
├── services/                         # API fetch 함수 + React Query 훅
│   └── auth-service.ts              # fetch-auth + use-auth
│
├── store/                            # Zustand — 클라이언트 전역 상태
│   └── auth-store.ts
│
├── hooks/                            # 전역 커스텀 훅
│   └── use-modal.ts
│
├── lib/
│   └── query-client.ts               # QueryClient 기본 설정
│
├── types/
│   └── common-types.ts               # 공용 인터페이스, Enum
│
├── utils/                            # 순수 함수 및 유틸리티 로직
├── tests/e2e                         # Playwright E2E 테스트 시나리오
└── .github/workflows/                # CI/CD (GitHub Actions)
```

---

## 📏 컨벤션 및 가이드 (Conventions)

상세한 폴더 구조 관리 규칙, 스토리북 작성법, 코딩 컨벤션 및 테스트 작성 규칙은 별도의 문서에서 관리합니다.

👉 **[프로젝트 컨벤션 가이드 바로가기](./docs/CONVENTION.md)**

---

## ⚓ Git Hooks & 자동화 (Automation)

본 프로젝트는 **Husky**와 **lint-staged**를 사용하여 코드 품질을 자동으로 검증합니다. 모든 커밋과 푸시 전 단계에서 최소한의 코드 품질을 보장합니다.

### 1. 커밋 전 검증 (Pre-commit Hook)

커밋 시 다음 과정이 자동으로 실행되며, 실패 시 커밋이 중단됩니다.

1.  **Type Check**: `npm run type-check`를 통해 전체 프로젝트의 타입 안정성을 검사합니다.
2.  **Lint-staged**: 스테이징된(변경된) 파일에 대해서만 다음 작업을 수행합니다.
    - `ts, tsx`: Prettier 포맷팅 → ESLint 자동 수정 → Jest 관련 단위 테스트 실행
    - `js, jsx, json, md, css`: Prettier 포맷팅

### 2. 커밋 메시지 규칙 (Commit-msg Hook)

- **Commitlint**: 설정된 커밋 컨벤션(Angular 스타일) 준수 여부를 검사합니다. (예: `feat:`, `fix:`, `chore:` 등)

---

## 🧪 CI/CD 파이프라인 (CI/CD Pipeline)

GitHub Actions와 Vercel CLI를 결합하여 견고한 배포 파이프라인을 운영합니다. Vercel의 기본 자동 배포 대신 GitHub Actions에서 빌드와 테스트를 직접 제어합니다.

### 1. Preview 배포 (Pull Request)

`main` 또는 `develop` 브랜치로 PR이 생성될 때 실행됩니다.

- **검증**: `npm ci` 후 단위 테스트(`npm test`)를 수행합니다.
- **빌드**: Vercel CLI를 사용하여 Preview 환경용 빌드를 수행합니다.
- **배포**: 성공 시 고유한 **Preview URL**을 생성하고 PR에 댓글로 링크를 제공합니다.

### 2. Production 배포 (Main Push/Merge)

`main` 브랜치에 코드가 푸시되거나 PR이 병합될 때 실행됩니다.

- **검증**: 프로덕션 빌드 가능 여부를 최종 확인합니다. (`npm run build`)
- **배포**: Vercel CLI를 통해 **Production 환경**으로 즉시 배포합니다. (`vercel deploy --prod`)
