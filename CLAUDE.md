# 소소잇 프로젝트

## 기술 스택

- **프레임워크**: Next.js (App Router), TypeScript
- **스타일링**: Tailwind CSS v4
- **상태 관리**: Zustand (전역), TanStack Query (서버 상태)
- **테스트**: Jest
- **애니메이션**: framer-motion, tailwind
- **React Compiler 1.0 사용 중** — 기본적으로 `useMemo`, `useCallback` 불필요 (필요 시 사유를 명시하여 사용 가능)

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
npm run validate     # 타입 + 포맷 + Lint + 테스트 자동 실행
```

---

## 📚 개발 가이드

모든 개발 규칙과 컨벤션은 아래 문서를 참고하세요:

- 📋 **[프로젝트 컨벤션](./docs/CONVENTION.md)** — 명명, FSD 규칙, TanStack Query, 테스트 가이드
- 🏗️ **[프로젝트 구조 & FSD](./docs/architecture.md)** — 폴더 구조, 레이어 규칙, 슬라이스 구조
- 🔌 **[API 패턴 & BFF](./docs/api-patterns.md)** — HTTP 클라이언트, 인증, 프록시
- 📝 **[Git 워크플로우](./docs/git-workflow.md)** — 커밋 메시지, Pre-commit 훅, 브랜치 전략
