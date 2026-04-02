# OpenAPI → API 클라이언트 사용까지 전체 흐름

전체 구조를 처음부터 단계별로 이해하기 위한 문서입니다.

---

## 1단계: 백엔드에 API 스펙(문서)이 있다

```
[같이 달램 백엔드 서버]
https://together-dallaem-api.vercel.app
         │
         │  "내 API는 이렇게 생겼어" 라고 정리한 문서
         │  (어떤 URL에, 어떤 데이터 보내고 받는지)
         ▼
  /docs 경로에서 OpenAPI 문서 제공
```

- `/docs`에 접속하면 **OpenAPI 문서**를 확인할 수 있습니다.
- 여기에 **모든 API 경로, DTO, 요청/응답 형식**이 정의되어 있습니다.

---

## 2단계: 스펙을 "코드"로 바꿔주는 도구 사용

```
[OpenAPI JSON]  ──►  [OpenAPI Generator]  ──►  [TypeScript 파일들]
     │                        │                        │
  스펙 문서              Docker로 실행              models/, apis/
  (데이터 형식)           코드 생성 도구               등 생성됨
```

- **OpenAPI Generator**: 스펙을 읽고 → TypeScript 코드를 만들어 주는 도구
- 프로젝트에서는 `npm run generate:api`로 이 도구를 실행합니다.

`package.json` 예시:

```json
"generate:api": "docker run ... openapitools/openapi-generator-cli generate -i https://together-dallaem-api.vercel.app/docs -g typescript-fetch -o /local/src/types/generated-client"
```

- `-i`: 스펙 위치(URL)
- `-g typescript-fetch`: TypeScript + fetch 사용
- `-o`: 코드를 생성할 폴더

---

## 3단계: 생성된 파일 구조

`npm run generate:api` 실행 후 생기는 구조:

```
src/types/generated-client/
├── models/           ← DTO 타입 정의
│   ├── User.ts
│   ├── Meeting.ts
│   ├── CreateMeeting.ts
│   └── ...
├── apis/             ← 실제 API 호출 메서드
│   ├── AuthApi.ts
│   ├── MeetingsApi.ts
│   ├── UsersApi.ts
│   └── ...
├── runtime.ts        ← fetch, Configuration 등 공통 코드
└── index.ts          ← 전체 export
```

- **models**: 스펙에 정의된 DTO → TypeScript 인터페이스/타입
- **apis**: URL, HTTP 메서드, 파라미터를 조합해서 실제 요청을 보내는 클래스
- **runtime**: HTTP 클라이언트와 설정 공통 로직

---

## 4단계: "설정한" API 인스턴스 만들기

생성된 `AuthApi`, `MeetingsApi` 등은 "어디로 요청할지"를 모릅니다.  
그래서 **base URL**을 넣어서 인스턴스를 만듭니다.

```
[generated-client/apis/AuthApi.ts]
         │
         │  basePath 없이 바로 쓰면 안 됨
         │
         ▼
[api-client.ts] 에서
  - basePath: https://dallaem-backend.vercel.app
  - Configuration으로 설정 후
  - authApi, meetingsApi 등 export
```

`api-client.ts` 예시:

```typescript
// 1. basePath 결정
const API_BASE_PATH = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://dallaem-backend.vercel.app';

// 2. Configuration 객체 생성
const apiConfig = new Configuration({ basePath: API_BASE_PATH });

// 3. 각 Api 클래스에 설정 전달
export const authApi = new AuthApi(apiConfig);
export const meetingsApi = new MeetingsApi(apiConfig);
```

이렇게 해야 `authApi`, `meetingsApi`가 **어떤 서버로** 요청을 보낼지 알게 됩니다.

---

## 5단계: 실제 사용하는 흐름

```
[내 컴포넌트/페이지]
       │
       │  import { authApi } from '@/lib/api-client';
       │
       ▼
 authApi.teamIdAuthLoginPost({ teamId: 'dallaem', loginRequest: {...} })
       │
       │  1. api-client.ts에서 만든 authApi
       │  2. AuthApi 인스턴스라서 teamIdAuthLoginPost 호출 가능
       │  3. 내부에서 runtime.request() 로 fetch 호출
       │
       ▼
 basePath + 경로 → https://dallaem-backend.vercel.app/{teamId}/auth/login
       │
       ▼
 [백엔드 서버] 에서 처리
       │
       ▼
 JSON 응답 → LoginResponse 타입으로 변환해서 반환
```

- `authApi` → `api-client.ts`에서 만든 인스턴스
- `authApi.teamIdAuthLoginPost(...)` → 내부적으로 `fetch(...)` 호출
- 응답은 스펙에 맞게 `LoginResponse` 같은 타입으로 변환됩니다.

---

## 6단계: 전체 그림

```
┌─────────────────────────────────────────────────────────────────────┐
│ 1. 백엔드                                                           │
│    Swagger/OpenAPI 스펙 제공 (/doc)                                  │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 2. 코드 생성 (npm run generate:api)                                 │
│    스펙 → OpenAPI Generator → models, apis, runtime 생성              │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 3. api-client.ts                                                    │
│    basePath 설정 후 authApi, meetingsApi 등 인스턴스 생성·export    │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 4. 페이지/컴포넌트                                                  │
│    import { authApi } from '@/lib/api-client'                        │
│    authApi.teamIdAuthLoginPost(...)                                 │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 5. 실제 HTTP 요청                                                   │
│    fetch(https://dallaem-backend.vercel.app/dallaem/auth/login, ...) │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 7단계: 왜 이렇게 쓰는지

| 구분          | 설명                                                                         |
| ------------- | ---------------------------------------------------------------------------- |
| **타입 안전** | DTO가 타입으로 정의돼 있어서, 잘못된 필드나 타입을 쓰면 컴파일 단계에서 에러 |
| **자동 생성** | 스펙이 바뀌면 `npm run generate:api` 한 번이면 최신 코드로 갱신              |
| **일관성**    | URL, 파라미터, 응답 형식을 모두 스펙에서 가져와서 오타·형식 오류 감소        |
| **유지보수**  | URL/응답 구조 변경 시, generated 코드를 다시 생성해서 최신 상태로 유지       |

---

## 8단계: 스펙이 바뀌었을 때

1. 백엔드 개발자가 Swagger/OpenAPI를 수정한다.
2. 프로젝트 루트에서 `npm run generate:api` 실행한다.
3. `src/types/generated-client/` 안의 코드가 새 스펙에 맞게 덮어써진다.
4. 기존에 `authApi`, `meetingsApi`를 쓰던 코드는 그대로 두고, 새 API/새 DTO만 추가해서 사용한다.

---

## 정리

```
스펙 문서 (/doc)
    → OpenAPI Generator (npm run generate:api)
        → generated-client (models, apis)
            → api-client.ts (basePath 설정 + export)
                → 페이지에서 authApi, meetingsApi 등 import해서 사용
```
