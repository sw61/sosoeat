## 📌 프로젝트 소개

<div align="center">
  <img width="305" height="153" alt="image" src="https://github.com/user-attachments/assets/558a5dbf-702a-4a43-ae53-c0edec70eede" />
  <br>
  
**" 소소잇은 이웃 간 공동식사 및 공동구매를 연결하는 1인 가구 맞춤 커뮤니티 플랫폼입니다. "**

배달비 부담, 혼밥의 외로움, 대용량 식재료 낭비 등의 일상적 불편을 함께 먹고 함께 소비하는 소소한 연결로 해소합니다.

실용적이고 일상적인 관계에 집중하여 누구나 부담 없이 참여할 수 있습니다.

  <br>
  
  <img width="701" height="436" alt="image" src="https://github.com/user-attachments/assets/a60089d7-c185-42db-a105-d08a519a3d01" />
</div>

<br>

## 📅 개발 기간

**2026.03 ~ 2026.04**
<br>

## 🔗 배포 URL

https://sosoeat.vercel.app/home
<br>

## 🏁 시작하기

```
# 1. 저장소 클론
git clone <https://github.com/your-repo/team9.git>
cd team9

# 2. 패키지 설치
npm install

# 3. 서버 실행
npm run dev
```

---

## 👥 팀 구성

<div align="center">
  
| 안순현 | 정윤영 | 이상원 | 박지민 | 지성준 |
|:---:|:---:|:---:|:---:|:---:|
|<img width="150" height="150" alt="image" src="https://github.com/user-attachments/assets/2804bbfc-4ec9-4c46-8375-9f204a06d2b5" />|<img width="150" height="150" alt="image" src="https://github.com/user-attachments/assets/df75d689-036d-47f9-8d51-91b8117e989d" />|<img width="150" height="150" alt="image" src="https://github.com/user-attachments/assets/7ff577ea-c716-4535-9efb-4100cf7ee872" />|<img width="150" height="150" alt="image" src="https://github.com/user-attachments/assets/32e101e0-bbdd-4d81-8cb4-61a9c18e175b" />|<img width="150" height="150" alt="image" src="https://github.com/user-attachments/assets/75227322-381d-4266-b6d9-a512b9060991" /> |
|[cncn0069](https://github.com/cncn0069)|[nunnong](https://github.com/nunnong)|[sw61](https://github.com/sw61)|[nanuenyamini](https://github.com/naneunyamini)|[Onuelen](https://github.com/Onuelen)|

</div>

---

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

- [FSD 폴더 구조](https://github.com/sw61/sosoeat/blob/main/docs/02-%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98-%EA%B0%80%EC%9D%B4%EB%93%9C.md)

### Conventions

- [프로젝트 컨벤션](https://github.com/sw61/sosoeat/blob/main/docs/%EC%BB%A8%EB%B2%A4%EC%85%98.md)
- [Git 워크플로우 & 커밋 컨벤션](https://github.com/sw61/sosoeat/blob/main/docs/03-Git-%EC%9B%8C%ED%81%AC%ED%94%8C%EB%A1%9C%EC%9A%B0.md)
- [TanStack Query 컨벤션](https://github.com/sw61/sosoeat/blob/main/docs/04-TanStack-Query-%EC%BB%A8%EB%B2%A4%EC%85%98.md)

---

## 📱 기능 소개 (Features)

### 1. 로그인 / 회원가입

소셜 로그인(카카오, 구글) 및 자체 회원가입을 지원하며, 단계별 유효성 검사를 제공합니다.

<table>
  <tr>
    <td align="center"><b>로그인</b></td>
    <td align="center"><b>유효성 검사</b></td>
    <td align="center"><b>회원가입 1단계</b></td>
  </tr>
  <tr>
    <td><img src="public/readme/sosoeat_login.png" width="250" /></td>
    <td><img src="public/readme/sosoeat_login_validation.png" width="250" /></td>
    <td><img src="public/readme/sosoeat_signup_step1.png" width="250" /></td>
  </tr>
  <tr>
    <td align="center"><b>회원가입 2단계</b></td>
    <td align="center"><b>회원가입 3단계</b></td>
    <td></td>
  </tr>
  <tr>
    <td><img src="public/readme/sosoeat_signup_step2.png" width="250" /></td>
    <td><img src="public/readme/sosoeat_signup_step3.png" width="250" /></td>
    <td></td>
  </tr>
</table>

---

### 2. 홈

모임 목록을 한눈에 확인하고 원하는 모임으로 바로 이동할 수 있습니다.

<table>
  <tr>
    <td align="center"><b>홈</b></td>
  </tr>
  <tr>
    <td><img src="public/readme/sosoeat_home.png" width="250" /></td>
  </tr>
</table>

---

### 3. 검색

지역 선택 및 인기순 · 모임일 임박순 · 모집 마감 기준 정렬 필터를 통해 원하는 모임을 빠르게 탐색할 수 있습니다.

<table>
  <tr>
    <td align="center"><b>검색</b></td>
    <td align="center"><b>필터 1</b></td>
    <td align="center"><b>필터 2</b></td>
    <td align="center"><b>필터 3</b></td>
  </tr>
  <tr>
    <td><img src="public/readme/sosoeat_search.png" width="250" /></td>
    <td><img src="public/readme/sosoeat_search_filter1.png" width="250" /></td>
    <td><img src="public/readme/sosoeat_search_filter2.png" width="250" /></td>
    <td><img src="public/readme/sosoeat_search_filter3.png" width="250" /></td>
  </tr>
</table>

---

### 4. 모임 생성

카카오맵 API를 연동하여 장소를 직접 검색하고 지정할 수 있으며, 단계별로 모임 정보를 입력합니다.

<table>
  <tr>
    <td align="center"><b>1단계</b></td>
    <td align="center"><b>2단계</b></td>
    <td align="center"><b>지도 검색(장소)</b></td>
  </tr>
  <tr>
    <td><img src="public/readme/sosoeat_create_meeting_step1.png" width="250" /></td>
    <td><img src="public/readme/sosoeat_create_meeting_step2.png" width="250" /></td>
    <td><img src="public/readme/sosoeat_create_meeting_map.png" width="250" /></td>
  </tr>
  <tr>
    <td align="center"><b>3단계</b></td>
    <td align="center"><b>4단계</b></td>
    <td></td>
  </tr>
  <tr>
    <td><img src="public/readme/sosoeat_create_meeting_step3.png" width="250" /></td>
    <td><img src="public/readme/sosoeat_create_meeting_step4.png" width="250" /></td>
    <td></td>
  </tr>
</table>

---

### 5. 모임 상세 / 참여

참여 여부 및 모임 확정 상태에 따라 UI가 동적으로 변화하며, 댓글 · 대댓글 및 공유 기능을 제공합니다.

<table>
  <tr>
    <td align="center"><b>전체 화면</b></td>
    <td align="center"><b>참여 전</b></td>
    <td align="center"><b>참여 후</b></td>
  </tr>
  <tr>
    <td><img src="public/readme/sosoeat_meetings.png" width="250" /></td>
    <td><img src="public/readme/sosoeat_before_participate.png" width="250" /></td>
    <td><img src="public/readme/sosoeat_after_participate.png" width="250" /></td>
  </tr>
  <tr>
    <td align="center"><b>확정 전</b></td>
    <td align="center"><b>확정 후</b></td>
    <td align="center"><b>댓글</b></td>
  </tr>
  <tr>
    <td><img src="public/readme/sosoeat_before_confirm.png" width="250" /></td>
    <td><img src="public/readme/sosoeat_after_confirm.png" width="250" /></td>
    <td><img src="public/readme/sosoeat_meeting_detail_comment.png" width="250" /></td>
  </tr>
  <tr>
    <td align="center"><b>공유</b></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td><img src="public/readme/sosoeat_meeting_share.png" width="250" /></td>
    <td></td>
    <td></td>
  </tr>
</table>

---

### 6. 소소토크

굵게 · 기울임 · 밑줄 · 정렬 · 목록 · 번호 목록 · 이미지 첨부를 지원하는 리치 텍스트 에디터로 게시글을 작성할 수 있습니다.

<table>
  <tr>
    <td align="center"><b>목록</b></td>
    <td align="center"><b>상세</b></td>
    <td align="center"><b>에디터</b></td>
    <td align="center"><b>공유</b></td>
  </tr>
  <tr>
    <td><img src="public/readme/sosoeat_sosotalk.png" width="250" /></td>
    <td><img src="public/readme/sosoeat_sosotalk_detail.png" width="250" /></td>
    <td><img src="public/readme/sosoeat_sosotalk_editor.png" width="250" /></td>
    <td><img src="public/readme/sosoeat_sosotalk_share.png" width="250" /></td>
  </tr>
</table>

---

### 7. 마이페이지

프로필 이미지 크롭(Crop) 기능을 지원하며, 참여한 모임 · 찜한 모임 · 내가 만든 모임을 탭으로 확인할 수 있습니다.

<table>
  <tr>
    <td align="center"><b>메인</b></td>
    <td align="center"><b>프로필 수정</b></td>
    <td align="center"><b>이미지 변경</b></td>
  </tr>
  <tr>
    <td><img src="public/readme/sosoeat_mypage.png" width="250" /></td>
    <td><img src="public/readme/sosoeat_mypage_edit.png" width="250" /></td>
    <td><img src="public/readme/sosoeat_mypage_image.png" width="250" /></td>
  </tr>
  <tr>
    <td align="center"><b>나의 모임</b></td>
    <td align="center"><b>찜한 모임</b></td>
    <td align="center"><b>내가 만든 모임</b></td>
  </tr>
  <tr>
    <td><img src="public/readme/sosoeat_mypage_tab1.png" width="250" /></td>
    <td><img src="public/readme/sosoeat_mypage_tab2.png" width="250" /></td>
    <td><img src="public/readme/sosoeat_mypage_tab3.png" width="250" /></td>
  </tr>
</table>

---

### 8. 알림

모임 참여 · 확정 · 취소 등 주요 이벤트에 대한 알림을 실시간으로 받을 수 있습니다.

<table>
  <tr>
    <td align="center"><b>알림</b></td>
  </tr>
  <tr>
    <td><img src="public/readme/sosoeat_notification.png" width="250" /></td>
  </tr>
</table>

---

## 👥 R & R

### 🛠️ 안순현

**담당 페이지 및 기능**

- 모임 찾기 페이지
- 알림 내역

**UI 컴포넌트**

- dropdown
- progress bar
- date picker
- filter bar
- main-page-card
- 모임 만들기 버튼
- 모임 찾기 배너
- 지역 선택 modal
- 빈 페이지
- 알림 카드

<br>

### 🪄 정윤영

**담당 페이지 및 기능**

- 메인 페이지
- 모임 상세 페이지

**UI 컴포넌트**

- badge
- navigation-bar
- main footer
- best sosoeat card
- 유저 가이드 컴포넌트
- 상세 모임 정보 카드
- 카카오 맵 → 모임 위치
- 댓글 컴포넌트
- 모임 추천 컴포넌트

<br>

### 🌟 이상원

**담당 페이지 및 기능**

- 로그인 페이지
- 회원가입 페이지
- 인증 전반

**UI 컴포넌트**

- main banner
- footer
- 모임 만들기 modal
- login-form
- signup-form

<br>

### 📝 박지민

**담당 페이지 및 기능**

- 마이페이지
- 유저 정보 수정

**UI 컴포넌트**

- input
- mypage card
- user card
- count card
- tabs
- 빈 화면
- avatar edit

<br>

### 🎨 지성준

**담당 페이지 및 기능**

- 소소Talk 페이지

**UI 컴포넌트**

- 토크 카드 컴포넌트
- 토크 배너 컴포넌트
- 게시글 작성(마크다운)
- 토크 상세 컴포넌트
- 댓글 컴포넌트
- 수정 페이지

<br>

---

## ⚡ 성능 최적화

### 1. 리소스 최적화

CDN 전체 폰트 다운로드를 로컬 서브셋으로 전환해 실제 사용 폰트만 로드하도록 개선했습니다.

### 2. 번들 최적화 (448KB 감소)

- **모달, 카카오맵, 날짜 피커**: Dynamic import로 필요 시점에만 로드
- **Zod 스키마**: Lazy Resolver로 폼 오픈 시 로딩
- **분석 도구**: requestIdleCallback으로 페이지 로드 후 실행

### 3. 렌더링 최적화

- **Streaming SSR + Suspense**: 순차 패치를 병렬 처리로 변경
- **React.cache + HydrationBoundary**: 서버 데이터 재사용으로 중복 요청 제거
- **preload + priority**: LCP 이미지 즉시 다운로드 시작

<img width="945" height="462" alt="image" src="https://github.com/user-attachments/assets/a0974e5a-ced7-4d88-a6ce-c490cbf1b566" />

---

## 🔍 KPT 회고

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
