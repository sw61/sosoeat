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
