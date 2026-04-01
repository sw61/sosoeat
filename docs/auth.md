# 인증 시스템 문서

## 목차

1. [아키텍처 개요](#1-아키텍처-개요)
2. [핵심 파일 구조](#2-핵심-파일-구조)
3. [토큰 저장소 및 관리](#3-토큰-저장소-및-관리)
4. [HTTP 클라이언트](#4-http-클라이언트)
5. [인증 흐름](#5-인증-흐름)
   - [앱 초기화](#51-앱-초기화-hydration)
   - [로그인](#52-로그인)
   - [회원가입](#53-회원가입)
   - [OAuth 소셜 로그인](#54-oauth-소셜-로그인)
   - [토큰 자동 갱신](#55-토큰-자동-갱신-silent-refresh)
   - [로그아웃](#56-로그아웃)
6. [BFF API 엔드포인트](#6-bff-api-엔드포인트)
7. [라우트 보호](#7-라우트-보호)
8. [보안 설계](#8-보안-설계)
9. [설계 결정 이유](#9-설계-결정-이유)

---

## 1. 아키텍처 개요

BFF(Backend-for-Frontend) 패턴을 사용한다. 모든 API 요청이 Next.js catch-all 프록시(`/api/proxy/[...path]`)를 경유하며, 토큰은 클라이언트 JS에 노출되지 않고 httpOnly 쿠키에서만 관리된다.

```
브라우저 (React)
    ↕ fetch (/api/proxy/... 또는 /api/auth/...)
Next.js BFF (/api/proxy/[...path], /api/auth/*)
    ↕ httpOnly 쿠키 (accessToken, refreshToken, user)
외부 백엔드 API
```

**설계 원칙:**

- `accessToken`, `refreshToken` 모두 httpOnly 쿠키에만 존재 → 클라이언트 JS 접근 불가
- 모든 API 요청은 `/api/proxy/[...path]`를 경유 → 프록시가 쿠키에서 토큰을 읽어 Authorization 헤더 삽입
- Zustand는 `user`, `isAuthenticated` UI 상태만 관리 (토큰 미보관)

---

## 2. 핵심 파일 구조

```
src/
├── lib/
│   ├── auth/
│   │   └── cookie-storage.ts          # 서버 사이드 쿠키 읽기/쓰기
│   └── http/
│       ├── api-server.ts              # 서버 컴포넌트/라우트용 HTTP 클라이언트
│       └── fetch-client.ts            # 클라이언트 컴포넌트용 HTTP 클라이언트
│
├── store/
│   └── auth-store.ts                  # Zustand 전역 인증 상태 (user, isAuthenticated)
│
├── services/
│   └── auth/
│       ├── auth.api.ts                # 인증 API 호출 함수
│       ├── auth.queries.ts            # useLogin, useSignUp, useLogout, useSocialLogin
│       └── index.ts                   # 외부 export 관리 (named export)
│
├── app/
│   ├── api/
│   │   ├── proxy/[...path]/route.ts   # catch-all 프록시 (Authorization 헤더 삽입, 토큰 갱신)
│   │   └── auth/
│   │       ├── login/route.ts         # BFF: 로그인
│   │       ├── logout/route.ts        # BFF: 로그아웃
│   │       ├── refresh/route.ts       # BFF: 토큰 갱신
│   │       ├── signup/route.ts        # BFF: 회원가입
│   │       └── social-callback/route.ts # BFF: 소셜 로그인 세션 설정
│   ├── (auth)/
│   │   ├── login/                     # 로그인 페이지 + 폼
│   │   └── signup/                    # 회원가입 페이지 + 다단계 폼
│   ├── oauth/callback/page.tsx        # OAuth 콜백 처리
│   └── _components/
│       └── auth-initializer.tsx       # 앱 최초 로드 시 세션 복원
│
└── proxy.ts                           # Next.js 미들웨어 (라우트 보호)
```

---

## 3. 토큰 저장소 및 관리

### CookieStorage (`src/lib/auth/cookie-storage.ts`)

서버 사이드에서 Next.js `next/headers`의 `cookies()`를 사용해 쿠키를 관리한다.

| 쿠키 이름      | 유효 시간 | 목적                              |
| -------------- | --------- | --------------------------------- |
| `accessToken`  | 15분      | API 요청 인증 (JWT 만료와 동일)   |
| `refreshToken` | 7일       | 액세스 토큰 갱신                  |
| `user`         | 7일       | 새로고침 시 유저 정보 복원 (JSON) |

모든 쿠키 공통 설정: `httpOnly: true`, `sameSite: 'lax'`, `secure: true` (프로덕션)

**메서드:**

| 메서드              | 설명                                   |
| ------------------- | -------------------------------------- |
| `getAccessToken()`  | `accessToken` 쿠키 반환                |
| `getRefreshToken()` | `refreshToken` 쿠키 반환               |
| `getUser()`         | `user` 쿠키를 파싱해 `AuthUser` 반환   |
| `setSession(data)`  | accessToken / refreshToken / user 저장 |
| `clearSession()`    | 세 쿠키 모두 삭제                      |

### Zustand AuthStore (`src/store/auth-store.ts`)

클라이언트 메모리에 UI용 인증 상태만 보관한다. accessToken은 관리하지 않으며, 새로고침 시 초기화되면 `AuthInitializer`가 복원한다.

```ts
interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isInitialized: boolean; // AuthInitializer 완료 여부
}
```

```ts
export interface AuthUser {
  id: number;
  email: string;
  name: string;
  teamId?: string;
  companyName?: string;
  image?: string | null;
}
```

**액션:**

| 액션             | 설명                              |
| ---------------- | --------------------------------- |
| `login`          | user 저장, isAuthenticated = true |
| `logout`         | 상태 전체 초기화                  |
| `setInitialized` | AuthInitializer 완료 여부 설정    |

---

## 4. HTTP 클라이언트

### fetchClient (클라이언트 전용)

클라이언트 컴포넌트와 `services/` 훅에서 사용한다.

- `/api/`로 시작하는 경로(BFF)는 그대로 호출
- 그 외 경로는 `/api/proxy/`를 앞에 붙여 catch-all 프록시를 경유
- Authorization 헤더 삽입 및 토큰 갱신은 프록시가 처리하므로 fetchClient에서 별도 처리 없음
- 프록시에서 silentRefresh까지 실패해 401이 반환되면 세션 만료로 판단 → `onSessionExpired()` 콜백 실행(Zustand 상태 초기화) 후 `window.location.href = '/login'`
- `setSessionExpiredHandler`로 앱 초기화 시점에 외부에서 logout 콜백을 주입받음 (store 직접 참조 방지)

### apiServer (서버 전용)

서버 컴포넌트, Route Handler, Server Action에서 사용한다.

- `CookieStorage`에서 `accessToken`을 읽어 헤더에 첨부
- 401 응답 시 silentRefresh 후 1회 재시도
- silentRefresh 실패 시 세션 만료로 판단 → `redirect('/login')`

### catch-all 프록시 (`/api/proxy/[...path]`)

- httpOnly 쿠키에서 accessToken을 읽어 Authorization 헤더 삽입
- 401 응답 시 refreshToken으로 토큰 갱신 후 원래 요청 1회 재시도
- 갱신 실패 시 쿠키 전체 삭제 후 401 반환

---

## 5. 인증 흐름

### 5.1 앱 초기화 (Hydration)

새로고침 시 Zustand 상태가 초기화되므로, `AuthInitializer`가 쿠키에서 유저 정보를 복원한다.

```
앱 로드
  → providers.tsx에서 <AuthInitializer /> 마운트
  → GET /api/auth/me 호출
    → accessToken 쿠키 있음: user 쿠키 바로 반환 (백엔드 요청 없음)
    → accessToken 없음 (만료): silentRefresh 후 user 쿠키 반환
    → silentRefresh 실패 (세션 만료): 401 → router.push('/login')
  → 성공: { user } 응답 → useAuthStore.login(user)
  → setInitialized(true)
```

`isInitialized`가 `false`인 동안에는 인증이 필요한 UI 렌더링을 지연시킬 수 있다.

### 5.2 로그인

`useLoginForm`이 `useLogin` 훅을 내부적으로 호출한다. 페이지/컴포넌트에서 `onSubmit` 핸들러를 직접 주입하지 않는다.

```
LoginForm (Zod 검증)
  → useLoginForm 내부에서 useLogin() 직접 호출
  → authApi.login(payload)
  → POST /api/auth/login { email, password }
  → BFF: 백엔드 POST /{teamId}/auth/login 호출
  → BFF: CookieStorage.setSession() (accessToken, refreshToken, user 쿠키 설정)
  → BFF: { user } 반환 (accessToken, refreshToken 제외)
  → useAuthStore.login(user)
  → toast.success('로그인에 성공했습니다.')
  → router.push('/')
```

소셜 로그인 에러 코드(`?error=...`)가 쿼리 파라미터로 전달되면 `useLoginForm`이 감지해 toast 에러를 표시한다.

### 5.3 회원가입

다단계 폼(email → password → name)으로 진행한다. 각 단계의 입력값은 `useSignupForm` 훅이 누적 관리하며, `useSignUp` 훅을 내부적으로 호출한다.

```
Step 1: 이메일 입력
Step 2: 비밀번호 + 비밀번호 확인
Step 3: 이름 입력
  → SignupApiPayload (passwordConfirm 제외) 생성
  → useSignupForm 내부에서 useSignUp() 직접 호출
  → authApi.signUp(payload)
  → POST /api/auth/signup (BFF)
  → BFF: 백엔드 POST /{teamId}/auth/signup 호출
  → 성공: toast.success + router.push('/login')
```

**입력 검증 규칙 (Zod):**

| 필드            | 규칙                        |
| --------------- | --------------------------- |
| email           | 유효한 이메일 형식          |
| password        | 8자 이상, 공백 불가         |
| passwordConfirm | password와 일치             |
| name            | 한글/영문/숫자만, 최대 20자 |

### 5.4 OAuth 소셜 로그인

OAuth 인증 자체는 백엔드에서 처리한다. 완료 후 `/oauth/callback` 페이지로 토큰을 쿼리 파라미터로 전달한다.

소셜 로그인 버튼은 `<button>`이 아닌 `<Link>`로 구현되어 백엔드 OAuth 엔드포인트로 직접 이동한다.

`/oauth/callback` 페이지는 `useSocialLogin` 훅만 호출한다. 콜백 처리 로직은 훅 내부에 캡슐화되어 있다.

```
백엔드 OAuth 처리 완료
  → /oauth/callback?accessToken=...&refreshToken=... 리다이렉트
  → useSocialLogin(): URL 파라미터에서 토큰 추출 (useRef로 중복 실행 방지)
  → authApi.socialCallback({ accessToken, refreshToken })
  → POST /api/auth/social-callback { accessToken, refreshToken }
  → BFF: GET /{teamId}/users/me (accessToken으로 유저 정보 조회)
  → BFF: CookieStorage.setSession() (accessToken, refreshToken, user 쿠키 저장)
  → BFF: { user } 반환
  → useAuthStore.login(user)
  → router.replace('/')
```

에러 발생 시:

| 상황                                                | 리다이렉트 경로                    |
| --------------------------------------------------- | ---------------------------------- |
| error 파라미터 있음 / accessToken·refreshToken 없음 | `/login?error=social_login_failed` |
| BFF `/users/me` 실패 또는 세션 설정 실패            | `/login?error=session_error`       |

### 5.5 토큰 자동 갱신 (Silent Refresh)

catch-all 프록시와 apiServer가 자동으로 처리하며, 서비스 코드에서 별도 처리가 필요 없다.

**fetchClient (클라이언트) 경유 시**

```
API 요청 → /api/proxy/[...path]
  → 쿠키에서 accessToken 읽어 Authorization 헤더 삽입
  → 백엔드 401 응답
    → silentRefresh: refreshToken으로 새 accessToken 발급
      → 응답에 토큰 없음: 세션 파기 후 false 반환
      → 토큰 있음: 쿠키 업데이트
    → 원래 요청 재시도 (1회)
      → 성공: 응답 반환
      → 실패: 쿠키 전체 삭제 후 401 반환 → fetchClient가 onSessionExpired() 실행 후 /login으로 리다이렉트
```

**apiServer (서버) 경유 시**

```
API 요청 → apiServer
  → 쿠키에서 accessToken 읽어 Authorization 헤더 삽입
  → 백엔드 401 응답
    → silentRefresh: refreshToken으로 새 accessToken 발급 후 쿠키 업데이트
    → 원래 요청 재시도 (1회)
      → 성공: 응답 반환
      → 실패: redirect('/login')
```

### 5.6 로그아웃

BFF는 외부 API 호출 성공 여부와 무관하게 `finally`에서 항상 쿠키를 파기한다. 따라서 클라이언트는 응답 상태와 무관하게 항상 로그아웃된 것으로 처리한다.

```
useLogout() [React Query mutation]
  → authApi.logout()
  → POST /api/auth/logout
  → BFF: 백엔드 POST /{teamId}/auth/logout 시도
  → BFF: finally에서 CookieStorage.clearSession() 항상 실행
  → onSuccess: useAuthStore.logout() (Zustand 상태 초기화)
  → toast.success('로그아웃 되었습니다.')
  → router.push('/')
```

---

## 6. BFF API 엔드포인트

| 엔드포인트                  | 메서드 | 요청                            | 응답          | 설명                                          |
| --------------------------- | ------ | ------------------------------- | ------------- | --------------------------------------------- |
| `/api/proxy/[...path]`      | ALL    | 원본 요청 그대로                | 백엔드 응답   | catch-all 프록시 (토큰 자동 삽입)             |
| `/api/auth/login`           | POST   | `{ email, password }`           | `{ user }`    | 일반 로그인 및 세션 설정                      |
| `/api/auth/social-callback` | POST   | `{ accessToken, refreshToken }` | `{ user }`    | 소셜 로그인 세션 설정                         |
| `/api/auth/logout`          | POST   | -                               | `{ success }` | 세션 파기                                     |
| `/api/auth/me`              | GET    | - (쿠키 자동 사용)              | `{ user }`    | 세션 복원 (accessToken 만료 시 silentRefresh) |
| `/api/auth/refresh`         | POST   | - (쿠키 자동 사용)              | `{ success }` | 액세스 토큰 갱신                              |
| `/api/auth/signup`          | POST   | `{ email, password, name }`     | -             | 회원가입 BFF 프록시                           |

---

## 7. 라우트 보호

`src/proxy.ts`가 Next.js 미들웨어로 동작한다.

```ts
// refreshToken 쿠키 유무로 인증 여부 판단
const hasSession = request.cookies.has('refreshToken');

// 보호 대상: /mypage/**
if (pathname.startsWith('/mypage') && !hasSession) {
  return NextResponse.redirect(new URL('/login', request.url));
}
```

| 경로                | 보호 여부 | 미인증 시 동작          |
| ------------------- | --------- | ----------------------- |
| `/mypage/**`        | O         | `/login`으로 리다이렉트 |
| `/login`, `/signup` | X         | 접근 허용               |
| 기타                | X         | 접근 허용               |

---

## 8. 보안 설계

### 토큰 완전 은닉

- `accessToken`, `refreshToken` 모두 httpOnly 쿠키에만 존재 → 클라이언트 JS 접근 불가
- XSS 공격으로 토큰 탈취 불가

### 쿠키 보안 설정

```
httpOnly: true   → XSS 공격으로 JS에서 읽기 불가
secure: true     → HTTPS 환경에서만 전송 (프로덕션)
sameSite: 'lax'  → 대부분의 CSRF 공격 차단
```

### Refresh 중복 방지 (프록시)

프록시에서 401 발생 시 refreshToken으로 갱신 후 재시도하는 구조이므로, 동시 요청이 여러 개여도 각각 프록시를 경유해 개별 갱신을 시도한다. refreshToken이 단 한 번만 유효한 경우 백엔드에서 처리한다.

### API 응답에서 토큰 제거

BFF 로그인/소셜 로그인/refresh 응답에서 `accessToken`, `refreshToken`을 제거하고 `user`만 클라이언트에 반환한다.

### BFF를 통한 백엔드 주소 은닉

클라이언트는 외부 백엔드 API 주소를 알 필요가 없다. `/api/proxy/*`, `/api/auth/*` 경로만 노출된다.

---

## 9. 설계 결정 이유

### 모든 토큰을 httpOnly 쿠키에 보관

accessToken을 Zustand 메모리에 보관하면 XSS 공격 시 JS로 접근 가능하다. httpOnly 쿠키는 JS에서 읽을 수 없으므로 XSS로 토큰 탈취가 불가능하다. accessToken 만료 시간(15분)이 짧더라도 탈취 자체를 막는 것이 더 안전하다.

### catch-all 프록시로 API 요청 일원화

클라이언트가 직접 백엔드를 호출하려면 Authorization 헤더에 토큰이 필요한데, httpOnly 쿠키는 JS가 읽을 수 없다. 모든 요청을 `/api/proxy/[...path]`로 경유시키면 서버에서 쿠키를 읽어 헤더를 삽입할 수 있다. 엔드포인트마다 Route Handler를 작성하는 대신 catch-all 방식으로 단일 프록시가 모든 API를 커버한다.

### Zustand에서 accessToken 제거

토큰이 httpOnly 쿠키에만 존재하므로 Zustand가 토큰을 알 필요가 없다. Zustand는 네비게이션 바 유저 이름/이미지 표시, 로그인 여부 조건부 렌더링 등 UI 상태만 담당한다.

### 새로고침 시 user를 쿠키에서 복원 (백엔드 요청 없음)

백엔드 refresh 응답은 토큰만 반환한다. 새로고침마다 `/users/me`를 호출하는 대신, 로그인/소셜 로그인 시 저장해둔 user 쿠키(7일)를 꺼내 반환한다. accessToken 쿠키(15분)가 존재하면 silentRefresh 없이 바로 user 쿠키를 반환하므로 네트워크 요청이 발생하지 않는다. user 정보가 변경(프로필 수정)되는 경우에만 쿠키의 user를 함께 업데이트한다.

### BFF 패턴 (Backend-for-Frontend)

JWT 토큰을 클라이언트에 전달하지 않기 위해 도입했다. 클라이언트가 직접 백엔드를 호출하면 JWT 토큰이 JS 코드에 노출될 수밖에 없다. BFF가 중간에서 토큰 발급·갱신·파기를 모두 처리하고, 토큰은 BFF↔쿠키 사이에서만 움직인다.

### fetchClient를 Axios 없이 네이티브 fetch로 구현

Next.js는 `fetch`를 확장해 캐싱·revalidation 기능을 제공한다. Axios는 이 확장 fetch를 우회하므로 Next.js의 데이터 패칭 전략을 활용할 수 없다. 서버/클라이언트 환경 모두에서 동일하게 동작하고 번들 크기도 줄이기 위해 네이티브 fetch 기반으로 구현했다.

### AuthInitializer를 별도 컴포넌트로 분리

`providers.tsx`에 세션 복원 로직을 직접 넣으면 Providers 자체가 비대해지고 테스트가 어렵다. UI 없이 로직만 담당하는 컴포넌트를 분리해 관심사를 나눴다. `useEffect` 안에서 `/api/auth/me`를 호출하므로 SSR 중 실행되지 않고, 클라이언트 마운트 직후에만 동작한다.

### React Query mutation으로 로그인/로그아웃 처리

로그인·로그아웃은 서버 상태를 변경하는 비동기 작업이다. React Query의 `useMutation`을 쓰면 `isPending`, `onSuccess`, `onError` 등 비동기 상태를 선언적으로 관리할 수 있고, 에러 핸들링과 성공 후 라우팅을 일관된 패턴으로 작성할 수 있다.

### fetchClient에 세션 만료 핸들러 주입

fetchClient가 세션 만료 시 Zustand `logout`을 직접 호출하면 `services/` 레이어가 `store/`에 의존하게 된다. `setSessionExpiredHandler`로 앱 초기화 시점(`Providers`)에 콜백을 주입받는 방식으로 의존성을 역전시켰다.

### 소셜 로그인 시 BFF에서 `/users/me`로 user 조회

백엔드 OAuth 콜백은 URL 쿼리 파라미터로 `accessToken`과 `refreshToken`만 전달한다. URL에 user 정보를 포함하면 브라우저 히스토리와 서버 로그에 개인정보가 남으므로 토큰만 전달하는 것이 맞다. 대신 BFF `/api/auth/social-callback`에서 받은 `accessToken`으로 `/{teamId}/users/me`를 서버 사이드에서 호출해 user를 가져온 뒤 쿠키에 저장한다.

### OAuth 소셜 로그인 버튼을 `<Link>`로 구현

소셜 로그인은 백엔드 OAuth 엔드포인트로 브라우저를 직접 이동시켜야 한다. `<button>`으로 `window.location`을 조작하는 것과 결과는 같지만, `<Link>`는 Next.js 라우팅과 의미론적으로 일치하며 href를 명시적으로 노출해 목적지를 한눈에 파악할 수 있다.

### OAuth 콜백에 `<Suspense>` 적용

`useSearchParams`는 클라이언트 컴포넌트에서만 동작하며, Next.js는 빌드 시 이 훅을 사용하는 컴포넌트를 정적 생성하려 할 때 경고를 낸다. `useSearchParams`를 사용하는 내부 컴포넌트를 `<Suspense>`로 감싸면 해당 부분을 동적으로 처리하겠다고 명시적으로 선언하게 되어 빌드 경고를 제거하고 스트리밍 환경에서도 올바르게 동작한다.

### 미들웨어에서 refreshToken 쿠키 유무로 인증 판단

미들웨어는 Edge Runtime에서 실행되어 JWT 검증 라이브러리를 사용하기 어렵다. refreshToken 쿠키의 존재 여부는 "세션이 발급된 적 있는가"를 나타내는 충분한 신호이며, 실제 유효성 검증은 API 호출 시 백엔드에서 이루어지므로 미들웨어에서는 가볍게 유무만 확인한다.
