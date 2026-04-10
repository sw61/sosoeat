# AuthApi

All URIs are relative to *https://together-dallaem-api.vercel.app*

| Method                                                              | HTTP request                        | Description                |
| ------------------------------------------------------------------- | ----------------------------------- | -------------------------- |
| [**authGoogleCallbackGet**](AuthApi.md#authgooglecallbackget)       | **GET** /auth/google/callback       | 구글 OAuth 콜백            |
| [**authKakaoCallbackGet**](AuthApi.md#authkakaocallbackget)         | **GET** /auth/kakao/callback        | 카카오 OAuth 콜백          |
| [**teamIdAuthEmailCheckPost**](AuthApi.md#teamidauthemailcheckpost) | **POST** /{teamId}/auth/email-check | 이메일 사용 가능 여부 확인 |
| [**teamIdAuthGoogleGet**](AuthApi.md#teamidauthgoogleget)           | **GET** /{teamId}/auth/google       | 구글 OAuth 시작            |
| [**teamIdAuthKakaoGet**](AuthApi.md#teamidauthkakaoget)             | **GET** /{teamId}/auth/kakao        | 카카오 OAuth 시작          |
| [**teamIdAuthLoginPost**](AuthApi.md#teamidauthloginpost)           | **POST** /{teamId}/auth/login       | 로그인                     |
| [**teamIdAuthLogoutPost**](AuthApi.md#teamidauthlogoutpost)         | **POST** /{teamId}/auth/logout      | 로그아웃                   |
| [**teamIdAuthRefreshPost**](AuthApi.md#teamidauthrefreshpost)       | **POST** /{teamId}/auth/refresh     | 토큰 갱신                  |
| [**teamIdAuthSignupPost**](AuthApi.md#teamidauthsignuppost)         | **POST** /{teamId}/auth/signup      | 회원가입                   |

## authGoogleCallbackGet

> authGoogleCallbackGet(code, state)

구글 OAuth 콜백

구글 로그인 완료 후 호출되는 콜백 URL입니다. 프론트엔드로 토큰과 함께 리다이렉트됩니다.

### Example

```ts
import { Configuration, AuthApi } from '';
import type { AuthGoogleCallbackGetRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new AuthApi(config);

  const body = {
    // string | 구글에서 발급한 인증 코드
    code: code_example,
    // string | 요청 시 전달한 teamId
    state: state_example,
  } satisfies AuthGoogleCallbackGetRequest;

  try {
    const data = await api.authGoogleCallbackGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name      | Type     | Description               | Notes                     |
| --------- | -------- | ------------------------- | ------------------------- |
| **code**  | `string` | 구글에서 발급한 인증 코드 | [Defaults to `undefined`] |
| **state** | `string` | 요청 시 전달한 teamId     | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                                                                                | Response headers |
| ----------- | ------------------------------------------------------------------------------------------ | ---------------- |
| **302**     | 프론트엔드로 리다이렉트 - ?accessToken&#x3D;...&amp;refreshToken&#x3D;... 형태로 토큰 전달 | -                |
| **400**     | OAuth 실패 - 인증 코드가 유효하지 않음                                                     | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## authKakaoCallbackGet

> authKakaoCallbackGet(code, state)

카카오 OAuth 콜백

카카오 로그인 완료 후 호출되는 콜백 URL입니다. 프론트엔드로 토큰과 함께 리다이렉트됩니다.

### Example

```ts
import { Configuration, AuthApi } from '';
import type { AuthKakaoCallbackGetRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new AuthApi(config);

  const body = {
    // string | 카카오에서 발급한 인증 코드
    code: code_example,
    // string | 요청 시 전달한 teamId
    state: state_example,
  } satisfies AuthKakaoCallbackGetRequest;

  try {
    const data = await api.authKakaoCallbackGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name      | Type     | Description                 | Notes                     |
| --------- | -------- | --------------------------- | ------------------------- |
| **code**  | `string` | 카카오에서 발급한 인증 코드 | [Defaults to `undefined`] |
| **state** | `string` | 요청 시 전달한 teamId       | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                                                                                | Response headers |
| ----------- | ------------------------------------------------------------------------------------------ | ---------------- |
| **302**     | 프론트엔드로 리다이렉트 - ?accessToken&#x3D;...&amp;refreshToken&#x3D;... 형태로 토큰 전달 | -                |
| **400**     | OAuth 실패 - 인증 코드가 유효하지 않음                                                     | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdAuthEmailCheckPost

> EmailCheckResponse teamIdAuthEmailCheckPost(teamId, emailCheckRequest)

이메일 사용 가능 여부 확인

회원가입 전에 팀 내 이메일 중복 여부를 확인합니다.

### Example

```ts
import {
  Configuration,
  AuthApi,
} from '';
import type { TeamIdAuthEmailCheckPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AuthApi(config);

  const body = {
    // string
    teamId: dallaem,
    // EmailCheckRequest | 중복 확인할 이메일 (optional)
    emailCheckRequest: ...,
  } satisfies TeamIdAuthEmailCheckPostRequest;

  try {
    const data = await api.teamIdAuthEmailCheckPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                  | Type                                      | Description        | Notes                     |
| --------------------- | ----------------------------------------- | ------------------ | ------------------------- |
| **teamId**            | `string`                                  |                    | [Defaults to `undefined`] |
| **emailCheckRequest** | [EmailCheckRequest](EmailCheckRequest.md) | 중복 확인할 이메일 | [Optional]                |

### Return type

[**EmailCheckResponse**](EmailCheckResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | 조회 성공 - 이메일 사용 가능 여부 반환 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdAuthGoogleGet

> teamIdAuthGoogleGet(teamId)

구글 OAuth 시작

구글 소셜 로그인을 시작합니다. 구글 로그인 페이지로 리다이렉트됩니다.

### Example

```ts
import { Configuration, AuthApi } from '';
import type { TeamIdAuthGoogleGetRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new AuthApi(config);

  const body = {
    // string
    teamId: dallaem,
  } satisfies TeamIdAuthGoogleGetRequest;

  try {
    const data = await api.teamIdAuthGoogleGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name       | Type     | Description | Notes                     |
| ---------- | -------- | ----------- | ------------------------- |
| **teamId** | `string` |             | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

### HTTP response details

| Status code | Description                                                         | Response headers |
| ----------- | ------------------------------------------------------------------- | ---------------- |
| **302**     | 구글 로그인 페이지로 리다이렉트 - 브라우저에서 직접 호출해야 합니다 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdAuthKakaoGet

> teamIdAuthKakaoGet(teamId)

카카오 OAuth 시작

카카오 소셜 로그인을 시작합니다. 카카오 로그인 페이지로 리다이렉트됩니다.

### Example

```ts
import { Configuration, AuthApi } from '';
import type { TeamIdAuthKakaoGetRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new AuthApi(config);

  const body = {
    // string
    teamId: dallaem,
  } satisfies TeamIdAuthKakaoGetRequest;

  try {
    const data = await api.teamIdAuthKakaoGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name       | Type     | Description | Notes                     |
| ---------- | -------- | ----------- | ------------------------- |
| **teamId** | `string` |             | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

### HTTP response details

| Status code | Description                                                           | Response headers |
| ----------- | --------------------------------------------------------------------- | ---------------- |
| **302**     | 카카오 로그인 페이지로 리다이렉트 - 브라우저에서 직접 호출해야 합니다 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdAuthLoginPost

> LoginResponse teamIdAuthLoginPost(teamId, loginRequest)

로그인

이메일과 비밀번호로 로그인합니다. 성공 시 accessToken(15분)과 refreshToken(7일)을 발급합니다.

### Example

```ts
import {
  Configuration,
  AuthApi,
} from '';
import type { TeamIdAuthLoginPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AuthApi(config);

  const body = {
    // string
    teamId: dallaem,
    // LoginRequest | 로그인 인증 정보 (optional)
    loginRequest: ...,
  } satisfies TeamIdAuthLoginPostRequest;

  try {
    const data = await api.teamIdAuthLoginPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name             | Type                            | Description      | Notes                     |
| ---------------- | ------------------------------- | ---------------- | ------------------------- |
| **teamId**       | `string`                        |                  | [Defaults to `undefined`] |
| **loginRequest** | [LoginRequest](LoginRequest.md) | 로그인 인증 정보 | [Optional]                |

### Return type

[**LoginResponse**](LoginResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                                      | Response headers |
| ----------- | ------------------------------------------------ | ---------------- |
| **200**     | 로그인 성공 - 사용자 정보와 토큰 반환            | -                |
| **401**     | 인증 실패 - 이메일 또는 비밀번호가 올바르지 않음 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdAuthLogoutPost

> teamIdAuthLogoutPost(teamId, refreshRequest)

로그아웃

현재 로그인된 세션을 종료합니다. 특정 리프레시 토큰만 무효화됩니다.

### Example

```ts
import {
  Configuration,
  AuthApi,
} from '';
import type { TeamIdAuthLogoutPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AuthApi(config);

  const body = {
    // string
    teamId: dallaem,
    // RefreshRequest | 무효화할 리프레시 토큰 (optional)
    refreshRequest: ...,
  } satisfies TeamIdAuthLogoutPostRequest;

  try {
    const data = await api.teamIdAuthLogoutPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name               | Type                                | Description            | Notes                     |
| ------------------ | ----------------------------------- | ---------------------- | ------------------------- |
| **teamId**         | `string`                            |                        | [Defaults to `undefined`] |
| **refreshRequest** | [RefreshRequest](RefreshRequest.md) | 무효화할 리프레시 토큰 | [Optional]                |

### Return type

`void` (Empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                                 | Response headers |
| ----------- | ------------------------------------------- | ---------------- |
| **204**     | 로그아웃 성공                               | -                |
| **401**     | 인증 필요 - 유효한 accessToken이 필요합니다 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdAuthRefreshPost

> AuthTokens teamIdAuthRefreshPost(teamId, refreshRequest)

토큰 갱신

리프레시 토큰으로 새로운 accessToken과 refreshToken을 발급받습니다. 기존 리프레시 토큰은 무효화됩니다 (토큰 로테이션). ⚠️ **프론트엔드 구현 주의사항**: 응답의 &#x60;refreshToken&#x60;이 &#x60;null&#x60;이면 기존에 저장된 refreshToken을 그대로 유지해야 합니다. &#x60;null&#x60;로 덮어쓰면 다음 갱신 시 실패합니다. 이는 동시 요청(예: axios interceptor에서 여러 401 동시 발생) 시 두 번째 요청부터 발생하며, 첫 번째 요청에서 이미 새 refreshToken을 받았으므로 그것을 유지하면 됩니다.

### Example

```ts
import {
  Configuration,
  AuthApi,
} from '';
import type { TeamIdAuthRefreshPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AuthApi(config);

  const body = {
    // string
    teamId: dallaem,
    // RefreshRequest | 갱신에 사용할 리프레시 토큰 (optional)
    refreshRequest: ...,
  } satisfies TeamIdAuthRefreshPostRequest;

  try {
    const data = await api.teamIdAuthRefreshPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name               | Type                                | Description                 | Notes                     |
| ------------------ | ----------------------------------- | --------------------------- | ------------------------- |
| **teamId**         | `string`                            |                             | [Defaults to `undefined`] |
| **refreshRequest** | [RefreshRequest](RefreshRequest.md) | 갱신에 사용할 리프레시 토큰 | [Optional]                |

### Return type

[**AuthTokens**](AuthTokens.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                                                   | Response headers |
| ----------- | ------------------------------------------------------------- | ---------------- |
| **200**     | 갱신 성공 - 새로운 accessToken(15분)과 refreshToken(7일) 반환 | -                |
| **401**     | 유효하지 않은 토큰 - 만료되었거나 이미 사용된 토큰            | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdAuthSignupPost

> User teamIdAuthSignupPost(teamId, signupRequest)

회원가입

새로운 사용자를 등록합니다. 이메일은 팀 내에서 고유해야 합니다.

### Example

```ts
import {
  Configuration,
  AuthApi,
} from '';
import type { TeamIdAuthSignupPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AuthApi(config);

  const body = {
    // string
    teamId: dallaem,
    // SignupRequest | 회원가입에 필요한 정보 (optional)
    signupRequest: ...,
  } satisfies TeamIdAuthSignupPostRequest;

  try {
    const data = await api.teamIdAuthSignupPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name              | Type                              | Description            | Notes                     |
| ----------------- | --------------------------------- | ---------------------- | ------------------------- |
| **teamId**        | `string`                          |                        | [Defaults to `undefined`] |
| **signupRequest** | [SignupRequest](SignupRequest.md) | 회원가입에 필요한 정보 | [Optional]                |

### Return type

[**User**](User.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                                               | Response headers |
| ----------- | --------------------------------------------------------- | ---------------- |
| **201**     | 회원가입 성공 - 생성된 사용자 정보 반환                   | -                |
| **409**     | 이미 존재하는 이메일 - 동일한 이메일로 가입된 계정이 있음 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
