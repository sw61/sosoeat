# 🍴 소소잇 - 1인 가구를 위한 공동식사·공동구매 플랫폼


## 📱 프로젝트 소개

- **소소잇**은 이웃 간 공동식사 및 공동구매를 연결하는 1인 가구 맞춤 커뮤니티 플랫폼입니다.
- 배달비 부담, 혼밥의 외로움, 대용량 식재료 낭비 등의 일상적 불편을 함께 먹고 함께 소비하는 소소한 연결로 해소합니다.
- 실용적이고 일상적인 관계에 집중하여 누구나 부담 없이 참여할 수 있습니다.

## 👥 팀 구성
|안순현 |정윤영 |이상원 |박지민|지성준 |
|:---:|:---:|:---:|:---:|:---:|
|<img width="150" height="150" alt="image" src="https://github.com/user-attachments/assets/2804bbfc-4ec9-4c46-8375-9f204a06d2b5" />|<img width="150" height="150" alt="image" src="https://github.com/user-attachments/assets/df75d689-036d-47f9-8d51-91b8117e989d" />|<img width="150" height="150" alt="image" src="https://github.com/user-attachments/assets/7ff577ea-c716-4535-9efb-4100cf7ee872" />|<img width="150" height="150" alt="image" src="https://github.com/user-attachments/assets/32e101e0-bbdd-4d81-8cb4-61a9c18e175b" />|<img width="150" height="150" alt="image" src="https://github.com/user-attachments/assets/75227322-381d-4266-b6d9-a512b9060991" />|


## 🚀 기술 스택

### Core
<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white">

### State & Data
<img src="https://img.shields.io/badge/Zustand-FF6720?style=flat-square&logo=Zustand&logoColor=white"> <img src="https://img.shields.io/badge/TanStack-000000?style=flat-square&logo=TanStack&logoColor=white">

### Testing
<img src="https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white"> <img src="https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white"> <img src="https://img.shields.io/badge/RTL-E33332?style=flat-square&logo=testinglibrary&logoColor=white"> <img src="https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white">

### Quality 
<img src="https://img.shields.io/badge/Storybook-FF4785?style=flat-square&logo=storybook&logoColor=white"> <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black">

### Git 
<img src="https://img.shields.io/badge/Husky-2C5282?style=flat-square&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/Commitlint-000000?style=flat-square&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/lint--staged-41B883?style=flat-square&logo=git&logoColor=white">

## 📖 기술 문서

### Architecture
- [FSD 폴더 구조]

### Conventions
- [프로젝트 컨벤션]
- [Git 워크플로우 & 커밋 컨벤션]
- [TanStack Query 컨벤션]
---

## ⚡ 성능 최적화

### 리소스 최적화
CDN 전체 폰트 다운로드를 로컬 서브셋으로 전환해 실제 사용 폰트만 로드하도록 개선했습니다.

### 번들 최적화 (448KB 감소)
- **모달, 카카오맵, 날짜 피커**: Dynamic import로 필요 시점에만 로드
- **Zod 스키마**: Lazy Resolver로 폼 오픈 시 로딩
- **분석 도구**: requestIdleCallback으로 페이지 로드 후 실행

### 렌더링 최적화
- **Streaming SSR + Suspense**: 순차 패치를 병렬 처리로 변경
- **React.cache + HydrationBoundary**: 서버 데이터 재사용으로 중복 요청 제거
- **preload + priority**: LCP 이미지 즉시 다운로드 시작

---

## 🔍 회고 (Retrospective)

### ✅ Keep (계속 유지할 것)
- 빠른 PR 리뷰로 협업 흐름이 안정적으로 유지되었다.
- 화면 설계와 요구사항을 먼저 맞춘 덕분에 개발 방향성이 비교적 명확했다.
- 역할 분담이 잘 이루어져 각자의 작업 범위가 분명했다.

### ⚠️ Problem (개선이 필요한 부분)
- 요구사항 변경 사항이 즉시 공유모지 않아 비효율이 생겼다.
- PR 단위가 커질수록 리뷰 효율이 떨어졌다.
- 공통 UI 기준 부족으로 구현 방식에 차이가 발생했다.

### 🛠️ Try (시도할 개선 방안)
- 변경사항은 작업 전에 먼저 공유하는 협업 습관을 만든다.
- 리뷰하기 좋은 작은 단위의 PR 작성 기준을 정한다.
- 공통 컴포넌트 및 스타일 가이드를 초기에 정리한다.
