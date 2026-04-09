# 01 🔌 API 패턴 & HTTP 클라이언트 가이드

## HTTP 클라이언트

프로젝트에서는 2가지 HTTP 클라이언트를 사용 환경에 따라 구분합니다.

### fetchClient (클라이언트 사용)

**용도**: 클라이언트 컴포넌트 전용 (`'use client'`)

```ts
import { fetchClient } from '@/shared/api/http/fetch-client';

// BFF 경로 (그대로 호출)
const response = await fetchClient.get('/api/auth/profile');

// 백엔드 경로 (프록시를 경유)
const meetings = await fetchClient.get('/meetings');
```

**동작 원리**:

- `/api/`로 시작하는 BFF 경로 → **그대로 호출**
- 그 외 경로 → **`/api/proxy/`를 경유하여 백엔드 호출**

### apiServer (서버 사용)

**용도**: 서버 컴포넌트 & Server Action 전용 (파일 최상단에 `'use server'` 지시어)

```ts
'use server';

import { apiServer } from '@/shared/api/http/api-server';

// 직접 백엔드 호출 (httpOnly 쿠키에서 토큰 자동 삽입)
const user = await apiServer.get('/users/profile');
```

**특징**:

- 직접 백엔드를 호출
- httpOnly 쿠키에서 토큰을 자동으로 삽입
- 민감한 정보를 안전하게 처리 가능

---

## BFF (Backend For Frontend)

BFF Route Handler는 세션 경계이며, 클라이언트와 백엔드 통신의 중개자 역할을 합니다.

### BFF Route Handler 내부

BFF Route Handler 내부에서는 `apiServer`, `fetchClient`를 **사용하지 않습니다**. 대신 `fetch()`를 직접 사용합니다.

```ts
// ❌ 잘못된 방식
import { fetchClient } from '@/shared/api/http/fetch-client';
export async function GET() {
  return fetchClient.get('/api/users'); // 사용 금지
}

// ✅ 올바른 방식
export async function GET() {
  const response = await fetch('http://backend-server/api/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}
```

### 주요 BFF 경로

- **`app/api/auth/*`** — 세션 생성/파기 전용 Route Handler
  - 쿠키 관리 (`httpOnly` 토큰 저장)
  - 로그인, 로그아웃, 토큰 갱신

- **`app/api/proxy/[...path]`** — 인증된 일반 API 요청 프록시
  - 클라이언트의 요청을 백엔드로 중개
  - 자동으로 인증 토큰 포함

---

## Export 규칙 (index.ts)

### Public API 규칙

자세한 내용은 👉 **[프로젝트 컨벤션 가이드](./CONVENTION.md#public-api-규칙-indexts)** 참고

**핵심**:

- 슬라이스는 **`index.ts`를 통해서만 외부 노출**
- 서버 전용 함수(`*.server.ts`)는 **`index.server.ts`**에만 export
- 내부 경로 직접 참조 금지
