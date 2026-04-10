# UsersApi

All URIs are relative to *https://together-dallaem-api.vercel.app*

| Method                                                               | HTTP request                        | Description                     |
| -------------------------------------------------------------------- | ----------------------------------- | ------------------------------- |
| [**teamIdUsersMeGet**](UsersApi.md#teamidusersmeget)                 | **GET** /{teamId}/users/me          | 내 정보 조회                    |
| [**teamIdUsersMeMeetingsGet**](UsersApi.md#teamidusersmemeetingsget) | **GET** /{teamId}/users/me/meetings | 내가 참여한/만든 모임 목록 조회 |
| [**teamIdUsersMePatch**](UsersApi.md#teamidusersmepatch)             | **PATCH** /{teamId}/users/me        | 내 정보 수정                    |
| [**teamIdUsersMePostsGet**](UsersApi.md#teamidusersmepostsget)       | **GET** /{teamId}/users/me/posts    | 내가 작성한 게시글 목록 조회    |
| [**teamIdUsersMeReviewsGet**](UsersApi.md#teamidusersmereviewsget)   | **GET** /{teamId}/users/me/reviews  | 내가 작성한 리뷰 목록 조회      |
| [**teamIdUsersUserIdGet**](UsersApi.md#teamidusersuseridget)         | **GET** /{teamId}/users/{userId}    | 유저 프로필 조회                |

## teamIdUsersMeGet

> User teamIdUsersMeGet(teamId)

내 정보 조회

현재 로그인된 사용자의 정보를 조회합니다. Authorization 헤더에 Bearer 토큰이 필요합니다.

### Example

```ts
import { Configuration, UsersApi } from '';
import type { TeamIdUsersMeGetRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new UsersApi(config);

  const body = {
    // string
    teamId: dallaem,
  } satisfies TeamIdUsersMeGetRequest;

  try {
    const data = await api.teamIdUsersMeGet(body);
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

[**User**](User.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                                 | Response headers |
| ----------- | ------------------------------------------- | ---------------- |
| **200**     | 조회 성공 - 현재 로그인된 사용자 정보       | -                |
| **401**     | 인증 필요 - 유효한 accessToken이 필요합니다 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdUsersMeMeetingsGet

> UserMeetingsResponse teamIdUsersMeMeetingsGet(teamId, type, completed, reviewed, sortBy, sortOrder, size, cursor)

내가 참여한/만든 모임 목록 조회

현재 로그인된 사용자의 모임 목록을 조회합니다. 필터와 정렬 옵션을 지원합니다.

### Example

```ts
import { Configuration, UsersApi } from '';
import type { TeamIdUsersMeMeetingsGetRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new UsersApi(config);

  const body = {
    // string
    teamId: dallaem,
    // 'joined' | 'created' (optional)
    type: joined,
    // 'true' | 'false' (optional)
    completed: false,
    // 'true' | 'false' (optional)
    reviewed: false,
    // 'dateTime' | 'joinedAt' | 'createdAt' (optional)
    sortBy: dateTime,
    // 'asc' | 'desc' (optional)
    sortOrder: desc,
    // number (optional)
    size: 10,
    // string (optional)
    cursor: eyJpZCI6MTB9,
  } satisfies TeamIdUsersMeMeetingsGetRequest;

  try {
    const data = await api.teamIdUsersMeMeetingsGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name          | Type                                | Description | Notes                                                                      |
| ------------- | ----------------------------------- | ----------- | -------------------------------------------------------------------------- |
| **teamId**    | `string`                            |             | [Defaults to `undefined`]                                                  |
| **type**      | `joined`, `created`                 |             | [Optional] [Defaults to `undefined`] [Enum: joined, created]               |
| **completed** | `true`, `false`                     |             | [Optional] [Defaults to `undefined`] [Enum: true, false]                   |
| **reviewed**  | `true`, `false`                     |             | [Optional] [Defaults to `undefined`] [Enum: true, false]                   |
| **sortBy**    | `dateTime`, `joinedAt`, `createdAt` |             | [Optional] [Defaults to `undefined`] [Enum: dateTime, joinedAt, createdAt] |
| **sortOrder** | `asc`, `desc`                       |             | [Optional] [Defaults to `&#39;desc&#39;`] [Enum: asc, desc]                |
| **size**      | `number`                            |             | [Optional] [Defaults to `10`]                                              |
| **cursor**    | `string`                            |             | [Optional] [Defaults to `undefined`]                                       |

### Return type

[**UserMeetingsResponse**](UserMeetingsResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                                 | Response headers |
| ----------- | ------------------------------------------- | ---------------- |
| **200**     | 조회 성공 - 모임 목록과 페이지네이션 정보   | -                |
| **400**     | 잘못된 요청 - 잘못된 커서                   | -                |
| **401**     | 인증 필요 - 유효한 accessToken이 필요합니다 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdUsersMePatch

> User teamIdUsersMePatch(teamId, updateUserRequest)

내 정보 수정

현재 로그인된 사용자의 정보를 수정합니다. 변경할 필드만 전송하면 됩니다.

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { TeamIdUsersMePatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  const body = {
    // string
    teamId: dallaem,
    // UpdateUserRequest | 수정할 사용자 정보 (변경할 필드만 전송) (optional)
    updateUserRequest: ...,
  } satisfies TeamIdUsersMePatchRequest;

  try {
    const data = await api.teamIdUsersMePatch(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                  | Type                                      | Description                             | Notes                     |
| --------------------- | ----------------------------------------- | --------------------------------------- | ------------------------- |
| **teamId**            | `string`                                  |                                         | [Defaults to `undefined`] |
| **updateUserRequest** | [UpdateUserRequest](UpdateUserRequest.md) | 수정할 사용자 정보 (변경할 필드만 전송) | [Optional]                |

### Return type

[**User**](User.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                                 | Response headers |
| ----------- | ------------------------------------------- | ---------------- |
| **200**     | 수정 성공 - 업데이트된 사용자 정보 반환     | -                |
| **401**     | 인증 필요 - 유효한 accessToken이 필요합니다 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdUsersMePostsGet

> UserPostsResponse teamIdUsersMePostsGet(teamId, sortBy, sortOrder, offset, limit, size, cursor)

내가 작성한 게시글 목록 조회

현재 로그인된 사용자가 작성한 게시글 목록을 조회합니다. 정렬 옵션을 지원합니다. **페이지네이션:** - 커서 기반: cursor (이전 응답의 nextCursor) + size (기본 10, 최대 100) - 오프셋 기반: offset (건너뛸 항목 수) + limit (기본 10, 최대 100) - offset 사용 시 응답에 totalCount 포함, cursor/nextCursor 미포함

### Example

```ts
import { Configuration, UsersApi } from '';
import type { TeamIdUsersMePostsGetRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new UsersApi(config);

  const body = {
    // string
    teamId: dallaem,
    // 'createdAt' | 'viewCount' | 'likeCount' (optional)
    sortBy: createdAt,
    // 'asc' | 'desc' (optional)
    sortOrder: desc,
    // number (optional)
    offset: 0,
    // number (optional)
    limit: 10,
    // number (optional)
    size: 10,
    // string (optional)
    cursor: eyJpZCI6MTB9,
  } satisfies TeamIdUsersMePostsGetRequest;

  try {
    const data = await api.teamIdUsersMePostsGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name          | Type                                  | Description | Notes                                                                                  |
| ------------- | ------------------------------------- | ----------- | -------------------------------------------------------------------------------------- |
| **teamId**    | `string`                              |             | [Defaults to `undefined`]                                                              |
| **sortBy**    | `createdAt`, `viewCount`, `likeCount` |             | [Optional] [Defaults to `&#39;createdAt&#39;`] [Enum: createdAt, viewCount, likeCount] |
| **sortOrder** | `asc`, `desc`                         |             | [Optional] [Defaults to `&#39;desc&#39;`] [Enum: asc, desc]                            |
| **offset**    | `number`                              |             | [Optional] [Defaults to `undefined`]                                                   |
| **limit**     | `number`                              |             | [Optional] [Defaults to `undefined`]                                                   |
| **size**      | `number`                              |             | [Optional] [Defaults to `10`]                                                          |
| **cursor**    | `string`                              |             | [Optional] [Defaults to `undefined`]                                                   |

### Return type

[**UserPostsResponse**](UserPostsResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                                 | Response headers |
| ----------- | ------------------------------------------- | ---------------- |
| **200**     | 조회 성공 - 게시글 목록과 페이지네이션 정보 | -                |
| **400**     | 잘못된 요청 - 잘못된 커서                   | -                |
| **401**     | 인증 필요 - 유효한 accessToken이 필요합니다 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdUsersMeReviewsGet

> UserReviewsResponse teamIdUsersMeReviewsGet(teamId, sortBy, sortOrder, size, cursor)

내가 작성한 리뷰 목록 조회

현재 로그인된 사용자가 작성한 리뷰 목록을 조회합니다. 정렬 옵션을 지원합니다.

### Example

```ts
import { Configuration, UsersApi } from '';
import type { TeamIdUsersMeReviewsGetRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new UsersApi(config);

  const body = {
    // string
    teamId: dallaem,
    // 'createdAt' | 'score' (optional)
    sortBy: createdAt,
    // 'asc' | 'desc' (optional)
    sortOrder: desc,
    // number (optional)
    size: 10,
    // string (optional)
    cursor: eyJpZCI6MTB9,
  } satisfies TeamIdUsersMeReviewsGetRequest;

  try {
    const data = await api.teamIdUsersMeReviewsGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name          | Type                 | Description | Notes                                                                   |
| ------------- | -------------------- | ----------- | ----------------------------------------------------------------------- |
| **teamId**    | `string`             |             | [Defaults to `undefined`]                                               |
| **sortBy**    | `createdAt`, `score` |             | [Optional] [Defaults to `&#39;createdAt&#39;`] [Enum: createdAt, score] |
| **sortOrder** | `asc`, `desc`        |             | [Optional] [Defaults to `&#39;desc&#39;`] [Enum: asc, desc]             |
| **size**      | `number`             |             | [Optional] [Defaults to `10`]                                           |
| **cursor**    | `string`             |             | [Optional] [Defaults to `undefined`]                                    |

### Return type

[**UserReviewsResponse**](UserReviewsResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                                 | Response headers |
| ----------- | ------------------------------------------- | ---------------- |
| **200**     | 조회 성공 - 리뷰 목록과 페이지네이션 정보   | -                |
| **400**     | 잘못된 요청 - 잘못된 커서                   | -                |
| **401**     | 인증 필요 - 유효한 accessToken이 필요합니다 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdUsersUserIdGet

> PublicUser teamIdUsersUserIdGet(teamId, userId)

유저 프로필 조회

특정 사용자의 공개 프로필을 조회합니다. 인증 없이 접근 가능합니다.

### Example

```ts
import { Configuration, UsersApi } from '';
import type { TeamIdUsersUserIdGetRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new UsersApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    userId: 1,
  } satisfies TeamIdUsersUserIdGetRequest;

  try {
    const data = await api.teamIdUsersUserIdGet(body);
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
| **userId** | `number` |             | [Defaults to `undefined`] |

### Return type

[**PublicUser**](PublicUser.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                                              | Response headers |
| ----------- | -------------------------------------------------------- | ---------------- |
| **200**     | 조회 성공 - 공개 프로필 정보 (createdAt, updatedAt 제외) | -                |
| **404**     | 유저 없음 - 해당 ID의 사용자가 존재하지 않음             | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
