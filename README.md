# 소소잇 프로젝트

## 🚀 기술 스택 (Tech Stack)

### 핵심 기술 (Core)

- **프레임워크**: Next.js 16 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS v4

### 상태 및 데이터 관리 (State & Data)

- **상태 관리**: Zustand (전역 상태 관리)
- **서버 상태 관리**: TanStack Query v5 (데이터 페칭 및 캐싱)

### 테스트 및 개발 도구 (Testing & Tooling)

- **단위 테스트**: Jest, Vitest, React Testing Library
- **E2E 테스트**: Playwright
- **컴포넌트 문서화**: Storybook
- **코드 품질 관리**: ESLint 9 (Flat Config), Prettier
- **Git 작업 자동화**: Husky, Commitlint, lint-staged

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

3. **개발 서버 실행**
   ```bash
   npm run dev
   ```

---

## 🛠️ 개발 및 실행 방법 (Available Commands)

### 📌 핵심 명령어 요약 (Quick Start)

| 명령어               | 용도                       |
| :------------------- | :------------------------- |
| `npm run dev`        | 로컬 개발 서버 실행        |
| `npm run build`      | 프로덕션 빌드 및 최종 점검 |
| `npm run format`     | 코드 스타일 자동 정렬      |
| `npm run type-check` | TypeScript 타입 체크       |
| `npm run test`       | 단위 테스트 실행           |
| `npm run storybook`  | UI 컴포넌트 개별 개발      |

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
├── app/                # Next.js App Router (라우팅 및 페이지 레이아웃)
│   ├── (auth)/         # 라우팅 그룹 (login, signup 등)
│   ├── [route]/        # 개별 페이지 라우트
│   │   ├── _components/# 해당 페이지 전용 컴포넌트 (Colocation)
│   │   └── page.tsx    # 페이지 엔트리포인트
│   ├── layout.tsx      # 전역 레이아웃
│   ├── providers.tsx   # 전역 컨텍스트 프로바이더 (QueryClient 등)
│   └── globals.css     # 전역 스타일
├── components/         # 재사용 가능한 공통 UI 컴포넌트
│   ├── ui/             # [Level 1] 원자(Atomic) 단위 컴포넌트 (shadcn 기반)
│   │   └── [name]/     # 폴더 단위 관리 (예: button/button.tsx)
│   └── common/         # [Level 2] UI 조각들을 조합한 공통 패턴 컴포넌트
│       └── [name]/     # 폴더 단위 관리 (예: labeled-input/labeled-input.tsx)
├── services/           # API fetch 함수 + TanStack Query 커스텀 훅
├── store/              # Zustand 기반 클라이언트 전역 상태 관리
├── hooks/              # 전역 공통 커스텀 훅
├── lib/                # 외부 라이브러리 설정 (axios 인스턴스 등)
├── types/              # 전역 공통 타입 정의 및 API 응답 타입
└── utils/              # 순수 함수 및 유틸리티 로직

tests/e2e               # Playwright E2E 테스트 시나리오
.github/workflows/      # CI/CD (GitHub Actions)
```

### 💡 컴포넌트 관리 규칙

- **Colocation**: 특정 페이지에서만 쓰이는 컴포넌트는 해당 라우트의 `_components/` 폴더에 위치시킵니다.
- **Atomic & Composed**: 순수 UI 조각은 `ui/`, 이를 조합한 재사용 패턴은 `common/`에서 관리합니다.
- **Barrel Pattern**: 각 컴포넌트 폴더에는 `index.ts`를 두어 외부에서 깔끔하게 임포트할 수 있도록 re-export합니다.
- **Testing & Stories**: 컴포넌트 파일(`.tsx`), 테스트(`.test.tsx`), 스토리북(`.stories.tsx`)은 반드시 **동일한 폴더**에 함께 둡니다.

### 🎨 스토리북 구조 (Storybook Structure)

Storybook 내에서의 컴포넌트 계층 구조(`title`)는 컴포넌트의 역할과 실제 폴더 위치에 따라 다음과 같은 명명 규칙을 따릅니다:

1. **페이지 종속 컴포넌트 (`pages/`)**
   - 특정 라우트(페이지)의 `_components/` 내에서만 사용되는 컴포넌트는 실제 라우트 URL 경로와 동일하게 작성합니다.
   - 포맷: `pages/[라우트경로]/[컴포넌트명]`
   - 예: `pages/auth/signup/SignupForm`

2. **공용 컴포넌트 (`ui/`, `common/`)**
   - **ui**: 원자(Atomic) 단위의 순수 UI 조각 (예: `ui/Button`, `ui/Input`)
   - **common**: 공용으로 재사용되는 조합형 패턴 (예: `common/Funnel`, `common/ProgressWithLabel`)

`.stories.tsx` 파일 작성 시 상단 `meta`의 `title` 속성을 아래와 같이 설정해 주세요:

```typescript
// 1. 페이지 컴포넌트 예시
const meta: Meta<typeof SignupForm> = {
  title: 'pages/auth/signup/signupForm',
  component: SignupForm,
};

// 2. 공용 컴포넌트 예시
const meta: Meta<typeof Button> = {
  title: 'ui/Button', // 또는 'common/Funnel'
  component: Button,
};
```

---

## 📏 개발 규칙 및 컨벤션 (Conventions)

### 1. 브랜치 전략 (Branch Strategy)

본 프로젝트는 **Git Flow** 전략을 기반으로 협업합니다.

- **main**: 프로덕션 환경에 배포되는 최상위 브랜치입니다.
- **develop**: 다음 출시 버전을 개발하는 통합 브랜치입니다.
- **feature**: 새로운 기능을 개발하는 브랜치입니다. `develop`에서 생성하며, 완료 후 `develop`으로 PR을 보냅니다.

**브랜치 네이밍 규칙**: `type/#issuenumber-description` (예: `feat/#12-login-page`)

### 2. 네이밍 컨벤션

| 타입별 명명      | 규칙       | 예시                        |
| :--------------- | :--------- | :-------------------------- |
| 폴더명           | kebab-case | `button/`, `user-auth/`     |
| 파일명           | kebab-case | `button.tsx`, `use-auth.ts` |
| 컴포넌트         | PascalCase | `Button`, `DatePicker`      |
| 훅               | camelCase  | `useAuth`, `useToggle`      |
| 타입 선언 (필수) | PascalCase | `interface ButtonProps {}`  |

> 💡 **타입 선언 규칙**: 본 프로젝트에서는 객체의 타입을 정의할 때 `type` 키워드 대신 확장성이 좋은 **`interface` 구문만을 사용**하도록 강제합니다. (예: `type User = {}` 지양, `interface User {}` 권장)

### 3. Import 순서 정렬 (자동화)

```typescript
// 1. React 관련 -> 2. Next.js 관련 -> 3. 외부 라이브러리 -> 4. 프로젝트 내부 (@/*) -> 5. 상대 경로
import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { LocalUtils } from './utils';
```

### 4. 커밋 메시지 규칙 (Commitlint)

`type: description` 형식을 엄격히 준수해야 커밋이 가능합니다.

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅 (로직 변경 없음)
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드 추가 및 수정
- `chore`: 빌드 업무, 패키지 설정 변경
- `design`: UI 디자인 스타일만 수정 (CSS 등)
- `perf`: 성능 개선 작업

### 5. 지향 및 지양해야 할 코드 패턴 (Do's & Don'ts)

코드 가독성, 테스트 용이성, 그리고 유지보수성을 위해 **단일 책임 원칙(SRP)**을 바탕으로 다음 패턴들을 엄격히 준수합니다.

#### 🟢 지향해야 할 패턴 (Do's)

- **화살표 함수 사용**: 컴포넌트 내부 핸들러 함수나 일반 유틸리티 함수 정의 시, 특별한 이유가 없다면 **화살표 함수(`=>`)** 사용을 지향합니다.
- **직접 Import 사용**: `React.useState`와 같은 프로퍼티 접근 방식보다 `import { useState } from 'react'` 같은 직접 Import 방식을 권장합니다.
- **비즈니스 로직 훅 분리 (Custom Hooks)**: 컴포넌트 비대화를 막기 위해 단일 파일이 **200라인을 초과할 경우** 혹은 복잡한 상태 업데이트 로직이 있을 경우, 이를 `use[FeatureName]` 형태의 커스텀 훅으로 추출합니다.
- **데이터 로직 분리**: 컴포넌트 내부에서 API를 직접 호출하지 않습니다. `services/` 폴더 내에 API fetch 로직과 TanStack Query 커스텀 훅을 하나의 동일한 파일 안에서 묶어 관리합니다.
- **순수 유틸리티 함수 분리**: 특정 컴포넌트에 종속되지 않는 로직(date-fns 등을 활용한 날짜 포맷팅 등)은 과감히 `utils/` 폴더로 분리하여 재사용성을 높입니다.

#### 🔴 지양해야 할 패턴 (Don'ts)

- **`any` 타입 사용 지양**: TypeScript 기능을 무력화하는 `any` 패턴 사용을 금지하며, 컴파일 에러가 나지 않도록 항상 엄격하고 구체적인 타입을 정의합니다.
- **`type` 키워드 사용 지양 (객체 시)**: 확장이 제한적인 `type` 구문 대신 `interface` 구문만을 주력으로 사용합니다.

### 6. 테스트 작성 규칙 (Testing Conventions)

- **한글 설명 원칙**: 유즈케이스와 의도를 정확히 전달하기 위해 테스트 코드의 `description` 작성 시 **한글 사용을 원칙**으로 합니다.
- **구조화 패턴**: `describe` 블록 안에 `test` 함수를 넣는 방식으로 구조화하며, `it` 구문의 사용은 가급적 지양합니다.
- **콜백 컨벤션**: 테스트 블록 콜백이나 일반 내부 함수 작성 시 화살표 함수(`=>`)를 통일하여 사용합니다.

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
