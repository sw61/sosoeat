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

BFF(Backend-for-Frontend) 패턴을 사용한다. Next.js가 클라이언트와 외부 백엔드 사이의 중간 계층으로 동작하며, 민감한 토큰(refreshToken)을 클라이언트에 노출하지 않는다.

```
브라우저 (React)
    ↕ fetch (accessToken in memory)
Next.js BFF (/api/auth/*)
    ↕ httpOnly 쿠키 (access_token, refresh_token)
외부 백엔드 API
```

**설계 원칙:**

- `refreshToken`은 httpOnly 쿠키에만 존재 → 클라이언트 JS에서 접근 불가
- `accessToken`은 Zustand 메모리에 보관 → 페이지 새로고침 시 `/api/auth/refresh`로 복원
- 서버/클라이언트 환경에서 토큰을 읽는 방식의 차이를 `TokenProviderRegistry`로 추상화

---

## 2. 핵심 파일 구조

```
src/
├── lib/
│   ├── auth/
│   │   ├── token-registry.ts      # 토큰 제공자 레지스트리 (DIP 인터페이스)
│   │   └── cookie-storage.ts      # 서버 사이드 쿠키 읽기/쓰기
│   └── http/
│       ├── api-server.ts          # 서버 컴포넌트/라우트용 HTTP 클라이언트
│       └── fetch-client.ts        # 클라이언트 컴포넌트용 HTTP 클라이언트 (자동 갱신)
│
├── store/
│   └── auth-store.ts              # Zustand 전역 인증 상태
│
├── services/
│   └── auth/
│       ├── auth.api.ts            # 인증 API 호출 함수
│       ├── auth.queries.ts        # useLogin, useSignUp, useLogout
│       └── index.ts               # 외부 export 관리
│
├── app/
│   ├── api/auth/
│   │   ├── login/route.ts         # BFF: 로그인
│   │   ├── logout/route.ts        # BFF: 로그아웃
│   │   └── refresh/route.ts       # BFF: 토큰 갱신
│   ├── (auth)/
│   │   ├── login/                 # 로그인 페이지 + 폼
│   │   └── signup/                # 회원가입 페이지 + 다단계 폼
│   ├── oauth/callback/page.tsx    # OAuth 콜백 처리
│   └── _components/
│       └── auth-initializer.tsx   # 앱 최초 로드 시 세션 복원
│
└── proxy.ts                        # Next.js 미들웨어 (라우트 보호)
```

---

## 3. 토큰 저장소 및 관리

### TokenProviderRegistry (`src/lib/auth/token-registry.ts`)

서버/클라이언트 환경에서 토큰을 다루는 방식의 차이를 인터페이스로 추상화한다.

```ts
export interface IAuthTokenProvider {
  getAccessToken(): Promise<string | null> | string | null;
  setAccessToken(token: string): Promise<void> | void;
}
```

- **클라이언트 제공자** (`providers.tsx`에서 등록): Zustand 스토어에서 읽고 씀
- **서버 제공자** (`api-server.ts`에서 등록): `CookieStorage`에서 읽고 씀

클라이언트 제공자는 `providers.tsx`에서 앱 초기화 시 등록한다.

```ts
TokenProviderRegistry.setClientProvider({
  getAccessToken: () => useAuthStore.getState().accessToken,
  setAccessToken: (token: string) => {
    useAuthStore.getState().updateToken(token);
  },
});
```

### CookieStorage (`src/lib/auth/cookie-storage.ts`)

서버 사이드에서 Next.js `next/headers`의 `cookies()`를 사용해 쿠키를 관리한다.

| 쿠키 이름      | 유효 시간 | 목적                              |
| -------------- | --------- | --------------------------------- |
| `accessToken`  | 1시간     | API 요청 인증                     |
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

클라이언트 메모리에 인증 상태를 보관한다. 새로고침 시 초기화되며, `AuthInitializer`가 서버 세션으로부터 복원한다.

```ts
interface AuthState {
  accessToken: string | null;
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

| 액션             | 설명                                                |
| ---------------- | --------------------------------------------------- |
| `login`          | accessToken + user 저장, isAuthenticated = true     |
| `logout`         | 상태 전체 초기화                                    |
| `updateToken`    | silentRefresh 시 accessToken만 업데이트 (user 유지) |
| `setInitialized` | AuthInitializer 완료 여부 설정                      |

> `AuthInitializer`는 refresh 응답에 `user`가 포함된 경우 `login()`을 호출해 user까지 함께 복원한다. silentRefresh(`fetchClient` 내부)는 토큰만 갱신하므로 `updateToken()`을 사용한다.

---

## 4. HTTP 클라이언트

### fetchClient (클라이언트 전용)

클라이언트 컴포넌트와 `services/` 훅에서 사용한다.

- 모든 요청에 `Authorization: Bearer <accessToken>` 자동 첨부
- 401 응답 시 `silentRefresh()` → `/api/auth/refresh` → 원래 요청 재시도 (최대 1회)
- 동시에 여러 요청이 401을 받아도 refresh는 1번만 실행 (`refreshPromise` 싱글턴)

### apiServer (서버 전용)

서버 컴포넌트, Route Handler, Server Action에서 사용한다.

- `CookieStorage`에서 `accessToken`을 읽어 헤더에 첨부
- 토큰 갱신 로직 없음 (서버에서는 쿠키가 항상 최신 상태)

---

## 5. 인증 흐름

### 5.1 앱 초기화 (Hydration)

새로고침 시 메모리의 인증 상태가 사라지므로, `AuthInitializer`가 서버 쿠키의 `refresh_token`으로 상태를 복원한다.

```
앱 로드
  → providers.tsx에서 <AuthInitializer /> 마운트
  → POST /api/auth/refresh 호출 (쿠키의 refreshToken 사용)
  → 성공: { accessToken, user } 응답
  → useAuthStore.login(accessToken, user)
  → setInitialized(true)
```

`isInitialized`가 `false`인 동안에는 인증이 필요한 UI 렌더링을 지연시킬 수 있다.

### 5.2 로그인

```
LoginForm (Zod 검증)
  → useLogin() [React Query mutation]
  → authApi.login(payload)
  → POST /api/auth/login { email, password }
  → BFF: 백엔드 POST /{teamId}/auth/login 호출
  → BFF: CookieStorage.setSession() (accessToken, refreshToken, user 쿠키 설정)
  → BFF: { accessToken, user } 반환 (refreshToken 제외)
  → useAuthStore.login(accessToken, user)
  → toast.success('로그인에 성공했습니다.')
  → router.push('/')
```

로그인 페이지(`login/page.tsx`)는 `'use client'`로 선언되며, `useLogin()` 훅을 직접 사용한다.

### 5.3 회원가입

다단계 폼(email → password → name)으로 진행한다. 각 단계의 입력값은 `useSignupForm` 훅이 누적 관리한다.

```
Step 1: 이메일 입력
Step 2: 비밀번호 + 비밀번호 확인
Step 3: 이름 입력
  → SignupApiPayload (passwordConfirm 제외) 생성
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

> 기존 `nickname` 필드는 `name`으로 변경되었다. `NicknameStep` → `NameStep`, `nicknameSchema` → `nameSchema`.

### 5.4 OAuth 소셜 로그인

OAuth 인증 자체는 백엔드에서 처리한다. 완료 후 `/oauth/callback` 페이지로 토큰을 쿼리 파라미터로 전달한다.

소셜 로그인 버튼은 `<button>`이 아닌 `<Link>`로 구현되어 백엔드 OAuth 엔드포인트로 직접 이동한다.

```
<Link href={`${NEXT_PUBLIC_API_BASE_URL}/${NEXT_PUBLIC_TEAM_ID}/auth/google`}>
<Link href={`${NEXT_PUBLIC_API_BASE_URL}/${NEXT_PUBLIC_TEAM_ID}/auth/kakao`}>
```

```
백엔드 OAuth 처리 완료
  → /oauth/callback?accessToken=...&refreshToken=... 리다이렉트
  → OAuthCallbackPage: URL 파라미터에서 토큰 추출
  → POST /api/auth/social-callback { accessToken, refreshToken }
  → BFF: GET /{teamId}/users/me (accessToken으로 유저 정보 조회)
  → BFF: CookieStorage.setSession() (accessToken, refreshToken, user 쿠키 저장)
  → BFF: { accessToken, user } 반환
  → useAuthStore.login(accessToken, user)
  → router.replace('/')
```

에러 발생 시:

| 상황                                   | 리다이렉트 경로                    |
| -------------------------------------- | ---------------------------------- |
| error 파라미터 있음 / accessToken 없음 | `/login?error=social_login_failed` |
| BFF `/users/me` 실패                   | `/login?error=social_login_failed` |
| BFF 세션 설정 실패                     | `/login?error=session_error`       |
| 예상치 못한 예외                       | `/login?error=unknown_error`       |

### 5.5 토큰 자동 갱신 (Silent Refresh)

`fetchClient`가 자동으로 처리하며, 서비스 코드에서 별도 처리가 필요 없다.

```
API 요청 → 401 응답
  → silentRefresh() 실행
    → POST /api/auth/refresh
    → BFF: 쿠키의 refreshToken으로 백엔드에 갱신 요청
    → 새 accessToken 발급
    → CookieStorage 업데이트 (accessToken, refreshToken만 — user 쿠키 유지)
    → Zustand updateToken() 업데이트 (user는 변경하지 않음)
  → 원래 요청 재시도 (1회)
    → 성공: 응답 반환
    → 실패: 에러 반환 (로그아웃 처리는 호출부가 담당)
```

refresh_token도 만료된 경우: 쿠키 전체 삭제 후 401 반환.

### 5.6 로그아웃

```
useLogout() [React Query mutation]
  → authApi.logout()
  → POST /api/auth/logout
  → BFF: 백엔드 POST /{teamId}/auth/logout
  → BFF: CookieStorage.clearSession() (accessToken, refreshToken, user 쿠키 모두 삭제)
  → onSuccess: useAuthStore.logout() (Zustand 상태 초기화)
  → toast.success('로그아웃 되었습니다.')
  → router.push('/')
```

> `NavigationBar`에서는 `useAuthStore`의 `logout`을 직접 호출하지 않고 `useLogout()` 훅을 사용한다.

---

## 6. BFF API 엔드포인트

| 엔드포인트                  | 메서드 | 요청                            | 응답                    | 설명                     |
| --------------------------- | ------ | ------------------------------- | ----------------------- | ------------------------ |
| `/api/auth/login`           | POST   | `{ email, password }`           | `{ accessToken, user }` | 일반 로그인 및 세션 설정 |
| `/api/auth/social-callback` | POST   | `{ accessToken, refreshToken }` | `{ accessToken, user }` | 소셜 로그인 세션 설정    |
| `/api/auth/logout`          | POST   | -                               | `{ success: true }`     | 세션 파기                |
| `/api/auth/refresh`         | POST   | - (쿠키 자동 사용)              | `{ accessToken, user }` | 액세스 토큰 갱신         |
| `/api/auth/signup`          | POST   | `{ email, password, name }`     | -                       | 회원가입 BFF 프록시      |

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

### 토큰 이중 보호

- `refreshToken`: httpOnly 쿠키 전용 → 클라이언트 JS 접근 불가
- `accessToken`: 메모리(Zustand) 보관 → XSS로 쿠키를 탈취해도 refresh는 불가

### 쿠키 보안 설정

```
httpOnly: true   → XSS 공격으로 JS에서 읽기 불가
secure: true     → HTTPS 환경에서만 전송 (프로덕션)
sameSite: 'lax'  → 대부분의 CSRF 공격 차단
```

### Refresh 중복 방지

`refreshPromise` 싱글턴 패턴으로, 동시에 401이 발생한 여러 요청이 각각 refresh를 시도하지 않도록 막는다.

### API 응답에서 refreshToken 제거

BFF 로그인 응답에서 `refreshToken`을 제거하고 클라이언트에 반환한다. 클라이언트는 refresh 토큰의 실제 값을 알 수 없다.

### BFF를 통한 백엔드 주소 은닉

클라이언트는 외부 백엔드 API 주소를 알 필요가 없다. `/api/auth/*` 경로만 노출된다.

---

## 9. 설계 결정 이유

### BFF 패턴 (Backend-for-Frontend)

refreshToken을 클라이언트에 전달하지 않기 위해 도입했다. 클라이언트가 직접 백엔드를 호출하면 refreshToken이 JS 코드에 노출될 수밖에 없다. BFF가 중간에서 토큰 발급·갱신·파기를 모두 처리하고, refreshToken은 BFF↔쿠키 사이에서만 움직인다.

### refreshToken을 httpOnly 쿠키에 보관

`localStorage`나 일반 쿠키에 저장하면 XSS 공격으로 탈취 가능하다. httpOnly 쿠키는 JS에서 읽을 수 없으므로, 스크립트 삽입이 발생해도 refreshToken은 접근 불가다.

### accessToken을 Zustand 메모리에 보관

쿠키에 저장하면 CSRF 공격에 취약하고, localStorage는 XSS에 취약하다. 메모리(Zustand)는 탭을 닫으면 사라지고 JS가 아닌 경로로는 접근할 수 없어 두 공격 벡터를 모두 차단한다. 페이지 새로고침 시 소멸되는 단점은 `AuthInitializer`의 자동 복원으로 보완한다.

### TokenProviderRegistry (DIP 적용)

`fetchClient`(클라이언트)와 `apiServer`(서버)는 토큰을 읽는 방법이 다르다. 클라이언트는 Zustand에서, 서버는 `next/headers`의 쿠키에서 읽어야 한다. 이 차이를 각 HTTP 클라이언트 내부에 직접 박아두면 환경 분기 로직이 퍼지고, 저장소를 교체할 때 HTTP 클라이언트를 고쳐야 한다. `IAuthTokenProvider` 인터페이스를 중간에 두고 제공자를 주입하는 방식으로 HTTP 클라이언트가 저장소 구현에 의존하지 않도록 분리했다(의존성 역전 원칙).

### fetchClient를 Axios 없이 네이티브 fetch로 구현

Next.js는 `fetch`를 확장해 캐싱·revalidation 기능을 제공한다. Axios는 이 확장 fetch를 우회하므로 Next.js의 데이터 패칭 전략을 활용할 수 없다. 서버/클라이언트 환경 모두에서 동일하게 동작하고 번들 크기도 줄이기 위해 네이티브 fetch 기반으로 구현했다.

### silentRefresh의 싱글턴 Promise (`refreshPromise`)

SPA에서는 여러 API 요청이 동시에 401을 받을 수 있다. 각 요청이 독립적으로 refresh를 시도하면 refreshToken이 중복 소모되어 첫 번째 갱신 외 나머지는 실패한다. `refreshPromise`를 모듈 스코프에서 공유해 첫 번째 호출만 실제 fetch를 수행하고 나머지는 같은 Promise를 재사용하도록 했다.

### AuthInitializer를 별도 컴포넌트로 분리

`providers.tsx`에 세션 복원 로직을 직접 넣으면 Providers 자체가 비대해지고 테스트가 어렵다. UI 없이 로직만 담당하는 컴포넌트를 분리해 관심사를 나눴다. `useEffect` 안에서 `/api/auth/refresh`를 호출하므로 SSR 중 실행되지 않고, 클라이언트 마운트 직후에만 동작한다.

### React Query mutation으로 로그인/로그아웃 처리

로그인·로그아웃은 서버 상태를 변경하는 비동기 작업이다. React Query의 `useMutation`을 쓰면 `isPending`, `onSuccess`, `onError` 등 비동기 상태를 선언적으로 관리할 수 있고, 에러 핸들링과 성공 후 라우팅을 일관된 패턴으로 작성할 수 있다.

### 회원가입 다단계 폼에서 `useWatch` 제거

초기 구현은 `useWatch`로 필드 값을 구독해 에러 노출 조건을 직접 계산했다. 이 방식은 타이핑할 때마다 컴포넌트를 리렌더링시킨다. react-hook-form의 `formState.errors`는 `onTouched` 모드에서 blur 또는 제출 시에만 갱신되고 에러 상태가 바뀔 때만 리렌더링을 유발하므로 불필요한 렌더링 없이 동일한 UX를 낼 수 있다. React Compiler를 사용하는 프로젝트 특성상 `useMemo`/`useCallback`을 쓸 수 없어 렌더링 최소화가 더욱 중요하다.

### 소셜 로그인 시 BFF에서 `/users/me`로 user 조회

백엔드 OAuth 콜백은 URL 쿼리 파라미터로 `accessToken`과 `refreshToken`만 전달한다. URL에 user 정보를 포함하면 브라우저 히스토리와 서버 로그에 개인정보가 남으므로 토큰만 전달하는 것이 맞다. 대신 BFF `/api/auth/social-callback`에서 받은 `accessToken`으로 `/{teamId}/users/me`를 서버 사이드에서 호출해 user를 가져온 뒤 쿠키에 저장한다. 이 시점부터는 일반 로그인과 동일한 경로로 합류한다.

### OAuth 소셜 로그인 버튼을 `<Link>`로 구현

소셜 로그인은 백엔드 OAuth 엔드포인트로 브라우저를 직접 이동시켜야 한다. `<button>`으로 `window.location`을 조작하는 것과 결과는 같지만, `<Link>`는 Next.js 라우팅과 의미론적으로 일치하며 href를 명시적으로 노출해 목적지를 한눈에 파악할 수 있다.

### OAuth 콜백에 `<Suspense>` 적용

`useSearchParams`는 클라이언트 컴포넌트에서만 동작하며, Next.js는 빌드 시 이 훅을 사용하는 컴포넌트를 정적 생성하려 할 때 경고를 낸다. `useSearchParams`를 사용하는 내부 컴포넌트를 `<Suspense>`로 감싸면 해당 부분을 동적으로 처리하겠다고 명시적으로 선언하게 되어 빌드 경고를 제거하고 스트리밍 환경에서도 올바르게 동작한다.

### 미들웨어에서 refreshToken 쿠키 유무로 인증 판단

미들웨어는 Edge Runtime에서 실행되어 JWT 검증 라이브러리를 사용하기 어렵다. accessToken은 메모리에 보관하므로 미들웨어에서 읽을 수 없다. refreshToken 쿠키의 존재 여부는 "세션이 발급된 적 있는가"를 나타내는 충분한 신호이며, 실제 유효성 검증은 API 호출 시 백엔드에서 이루어지므로 미들웨어에서는 가볍게 유무만 확인한다.
