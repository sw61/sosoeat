# PostsApi

All URIs are relative to *https://together-dallaem-api.vercel.app*

| Method                                                                                               | HTTP request                                             | Description |
| ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ----------- |
| [**teamIdPostsGet**](PostsApi.md#teamidpostsget)                                                     | **GET** /{teamId}/posts                                  | 게시글 목록 |
| [**teamIdPostsPost**](PostsApi.md#teamidpostspost)                                                   | **POST** /{teamId}/posts                                 | 게시글 작성 |
| [**teamIdPostsPostIdCommentsCommentIdDelete**](PostsApi.md#teamidpostspostidcommentscommentiddelete) | **DELETE** /{teamId}/posts/{postId}/comments/{commentId} | 댓글 삭제   |
| [**teamIdPostsPostIdCommentsCommentIdPatch**](PostsApi.md#teamidpostspostidcommentscommentidpatch)   | **PATCH** /{teamId}/posts/{postId}/comments/{commentId}  | 댓글 수정   |
| [**teamIdPostsPostIdCommentsGet**](PostsApi.md#teamidpostspostidcommentsget)                         | **GET** /{teamId}/posts/{postId}/comments                | 댓글 목록   |
| [**teamIdPostsPostIdCommentsPost**](PostsApi.md#teamidpostspostidcommentspost)                       | **POST** /{teamId}/posts/{postId}/comments               | 댓글 작성   |
| [**teamIdPostsPostIdDelete**](PostsApi.md#teamidpostspostiddelete)                                   | **DELETE** /{teamId}/posts/{postId}                      | 게시글 삭제 |
| [**teamIdPostsPostIdGet**](PostsApi.md#teamidpostspostidget)                                         | **GET** /{teamId}/posts/{postId}                         | 게시글 상세 |
| [**teamIdPostsPostIdLikeDelete**](PostsApi.md#teamidpostspostidlikedelete)                           | **DELETE** /{teamId}/posts/{postId}/like                 | 좋아요 취소 |
| [**teamIdPostsPostIdLikePost**](PostsApi.md#teamidpostspostidlikepost)                               | **POST** /{teamId}/posts/{postId}/like                   | 좋아요 추가 |
| [**teamIdPostsPostIdPatch**](PostsApi.md#teamidpostspostidpatch)                                     | **PATCH** /{teamId}/posts/{postId}                       | 게시글 수정 |

## teamIdPostsGet

> PostList teamIdPostsGet(teamId, type, keyword, sortBy, sortOrder, cursor, size)

게시글 목록

게시글 목록을 조회합니다. **조회 타입:** - type&#x3D;all: 전체 게시글 (기본값, 최신순) - type&#x3D;best: 베스트 게시글 (최근 30일 내 작성, likeCount 높은 순) **정렬 기준 (sortBy):** - createdAt: 작성일순 (기본값) - viewCount: 조회수순 - likeCount: 좋아요순 - commentCount: 댓글 많은 순 **페이지네이션:** - offset: 건너뛸 항목 수 (기본 0) - limit: 조회할 최대 항목 수 (기본 10, 최대 100)

### Example

```ts
import { Configuration, PostsApi } from '';
import type { TeamIdPostsGetRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new PostsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // 'all' | 'best' | 게시글 타입 (all: 전체, best: 베스트) (optional)
    type: type_example,
    // string | 제목/내용 검색 (optional)
    keyword: keyword_example,
    // 'createdAt' | 'viewCount' | 'likeCount' | 'commentCount' | 정렬 기준 (optional)
    sortBy: sortBy_example,
    // 'asc' | 'desc' | 정렬 순서 (optional)
    sortOrder: sortOrder_example,
    // string | 다음 페이지를 위한 커서 (optional)
    cursor: eyJpZCI6MTB9,
    // number | 페이지 크기 (1-100) (optional)
    size: 10,
  } satisfies TeamIdPostsGetRequest;

  try {
    const data = await api.teamIdPostsGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name          | Type                                                  | Description                           | Notes                                                                                                |
| ------------- | ----------------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **teamId**    | `string`                                              |                                       | [Defaults to `undefined`]                                                                            |
| **type**      | `all`, `best`                                         | 게시글 타입 (all: 전체, best: 베스트) | [Optional] [Defaults to `&#39;all&#39;`] [Enum: all, best]                                           |
| **keyword**   | `string`                                              | 제목/내용 검색                        | [Optional] [Defaults to `undefined`]                                                                 |
| **sortBy**    | `createdAt`, `viewCount`, `likeCount`, `commentCount` | 정렬 기준                             | [Optional] [Defaults to `&#39;createdAt&#39;`] [Enum: createdAt, viewCount, likeCount, commentCount] |
| **sortOrder** | `asc`, `desc`                                         | 정렬 순서                             | [Optional] [Defaults to `&#39;desc&#39;`] [Enum: asc, desc]                                          |
| **cursor**    | `string`                                              | 다음 페이지를 위한 커서               | [Optional] [Defaults to `undefined`]                                                                 |
| **size**      | `number`                                              | 페이지 크기 (1-100)                   | [Optional] [Defaults to `10`]                                                                        |

### Return type

[**PostList**](PostList.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | 조회 성공   | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdPostsPost

> PostWithAuthor teamIdPostsPost(teamId, createPost)

게시글 작성

새로운 게시글을 작성합니다. **비즈니스 규칙:** - 제목(title)은 필수이며 최소 1자 이상 - 내용(content)은 필수이며 최소 1자 이상 - 이미지(image)는 선택 사항 - 작성 시 likeCount와 viewCount는 0으로 초기화

### Example

```ts
import {
  Configuration,
  PostsApi,
} from '';
import type { TeamIdPostsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PostsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // CreatePost | 게시글 정보 (optional)
    createPost: ...,
  } satisfies TeamIdPostsPostRequest;

  try {
    const data = await api.teamIdPostsPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name           | Type                        | Description | Notes                     |
| -------------- | --------------------------- | ----------- | ------------------------- |
| **teamId**     | `string`                    |             | [Defaults to `undefined`] |
| **createPost** | [CreatePost](CreatePost.md) | 게시글 정보 | [Optional]                |

### Return type

[**PostWithAuthor**](PostWithAuthor.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                                    | Response headers |
| ----------- | ---------------------------------------------- | ---------------- |
| **201**     | 작성 성공                                      | -                |
| **401**     | 인증 필요 - Bearer 토큰이 없거나 유효하지 않음 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdPostsPostIdCommentsCommentIdDelete

> TeamIdMeetingsMeetingIdDelete200Response teamIdPostsPostIdCommentsCommentIdDelete(teamId, postId, commentId)

댓글 삭제

댓글을 삭제합니다. 작성자만 삭제할 수 있습니다.

### Example

```ts
import { Configuration, PostsApi } from '';
import type { TeamIdPostsPostIdCommentsCommentIdDeleteRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new PostsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    postId: 1,
    // number
    commentId: 1,
  } satisfies TeamIdPostsPostIdCommentsCommentIdDeleteRequest;

  try {
    const data = await api.teamIdPostsPostIdCommentsCommentIdDelete(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name          | Type     | Description | Notes                     |
| ------------- | -------- | ----------- | ------------------------- |
| **teamId**    | `string` |             | [Defaults to `undefined`] |
| **postId**    | `number` |             | [Defaults to `undefined`] |
| **commentId** | `number` |             | [Defaults to `undefined`] |

### Return type

[**TeamIdMeetingsMeetingIdDelete200Response**](TeamIdMeetingsMeetingIdDelete200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | 삭제 성공   | -                |
| **401**     | 인증 필요   | -                |
| **403**     | 권한 없음   | -                |
| **404**     | 댓글 없음   | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdPostsPostIdCommentsCommentIdPatch

> Comment teamIdPostsPostIdCommentsCommentIdPatch(teamId, postId, commentId, updateComment)

댓글 수정

댓글을 수정합니다. 작성자만 수정할 수 있습니다.

### Example

```ts
import {
  Configuration,
  PostsApi,
} from '';
import type { TeamIdPostsPostIdCommentsCommentIdPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PostsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    postId: 1,
    // number
    commentId: 1,
    // UpdateComment (optional)
    updateComment: ...,
  } satisfies TeamIdPostsPostIdCommentsCommentIdPatchRequest;

  try {
    const data = await api.teamIdPostsPostIdCommentsCommentIdPatch(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name              | Type                              | Description | Notes                     |
| ----------------- | --------------------------------- | ----------- | ------------------------- |
| **teamId**        | `string`                          |             | [Defaults to `undefined`] |
| **postId**        | `number`                          |             | [Defaults to `undefined`] |
| **commentId**     | `number`                          |             | [Defaults to `undefined`] |
| **updateComment** | [UpdateComment](UpdateComment.md) |             | [Optional]                |

### Return type

[**Comment**](Comment.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | 수정 성공   | -                |
| **401**     | 인증 필요   | -                |
| **403**     | 권한 없음   | -                |
| **404**     | 댓글 없음   | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdPostsPostIdCommentsGet

> CommentList teamIdPostsPostIdCommentsGet(teamId, postId, sortBy, sortOrder, cursor, size)

댓글 목록

게시글의 댓글 목록을 조회합니다.

### Example

```ts
import { Configuration, PostsApi } from '';
import type { TeamIdPostsPostIdCommentsGetRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new PostsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    postId: 1,
    // 'createdAt' (optional)
    sortBy: sortBy_example,
    // 'asc' | 'desc' (optional)
    sortOrder: sortOrder_example,
    // string | 다음 페이지를 위한 커서 (optional)
    cursor: eyJpZCI6MTB9,
    // number | 페이지 크기 (1-100) (optional)
    size: 10,
  } satisfies TeamIdPostsPostIdCommentsGetRequest;

  try {
    const data = await api.teamIdPostsPostIdCommentsGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name          | Type          | Description             | Notes                                                            |
| ------------- | ------------- | ----------------------- | ---------------------------------------------------------------- |
| **teamId**    | `string`      |                         | [Defaults to `undefined`]                                        |
| **postId**    | `number`      |                         | [Defaults to `undefined`]                                        |
| **sortBy**    | `createdAt`   |                         | [Optional] [Defaults to `&#39;createdAt&#39;`] [Enum: createdAt] |
| **sortOrder** | `asc`, `desc` |                         | [Optional] [Defaults to `&#39;asc&#39;`] [Enum: asc, desc]       |
| **cursor**    | `string`      | 다음 페이지를 위한 커서 | [Optional] [Defaults to `undefined`]                             |
| **size**      | `number`      | 페이지 크기 (1-100)     | [Optional] [Defaults to `10`]                                    |

### Return type

[**CommentList**](CommentList.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | 조회 성공   | -                |
| **404**     | 게시글 없음 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdPostsPostIdCommentsPost

> Comment teamIdPostsPostIdCommentsPost(teamId, postId, createComment)

댓글 작성

게시글에 댓글을 작성합니다. - 게시글 작성자에게 알림이 발생합니다 (본인 댓글 제외)

### Example

```ts
import {
  Configuration,
  PostsApi,
} from '';
import type { TeamIdPostsPostIdCommentsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PostsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    postId: 1,
    // CreateComment | 댓글 정보 (optional)
    createComment: ...,
  } satisfies TeamIdPostsPostIdCommentsPostRequest;

  try {
    const data = await api.teamIdPostsPostIdCommentsPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name              | Type                              | Description | Notes                     |
| ----------------- | --------------------------------- | ----------- | ------------------------- |
| **teamId**        | `string`                          |             | [Defaults to `undefined`] |
| **postId**        | `number`                          |             | [Defaults to `undefined`] |
| **createComment** | [CreateComment](CreateComment.md) | 댓글 정보   | [Optional]                |

### Return type

[**Comment**](Comment.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **201**     | 작성 성공   | -                |
| **401**     | 인증 필요   | -                |
| **404**     | 게시글 없음 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdPostsPostIdDelete

> TeamIdMeetingsMeetingIdDelete200Response teamIdPostsPostIdDelete(teamId, postId)

게시글 삭제

게시글을 삭제합니다. 작성자만 삭제할 수 있습니다.

### Example

```ts
import { Configuration, PostsApi } from '';
import type { TeamIdPostsPostIdDeleteRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new PostsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    postId: 1,
  } satisfies TeamIdPostsPostIdDeleteRequest;

  try {
    const data = await api.teamIdPostsPostIdDelete(body);
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
| **postId** | `number` |             | [Defaults to `undefined`] |

### Return type

[**TeamIdMeetingsMeetingIdDelete200Response**](TeamIdMeetingsMeetingIdDelete200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | 삭제 성공   | -                |
| **401**     | 인증 필요   | -                |
| **403**     | 권한 없음   | -                |
| **404**     | 게시글 없음 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdPostsPostIdGet

> PostWithComments teamIdPostsPostIdGet(teamId, postId)

게시글 상세

게시글 상세 정보를 조회합니다. 조회 시 조회수가 증가합니다.

### Example

```ts
import { Configuration, PostsApi } from '';
import type { TeamIdPostsPostIdGetRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new PostsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    postId: 1,
  } satisfies TeamIdPostsPostIdGetRequest;

  try {
    const data = await api.teamIdPostsPostIdGet(body);
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
| **postId** | `number` |             | [Defaults to `undefined`] |

### Return type

[**PostWithComments**](PostWithComments.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | 조회 성공   | -                |
| **404**     | 게시글 없음 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdPostsPostIdLikeDelete

> TeamIdMeetingsMeetingIdDelete200Response teamIdPostsPostIdLikeDelete(teamId, postId)

좋아요 취소

게시글의 좋아요를 취소합니다.

### Example

```ts
import { Configuration, PostsApi } from '';
import type { TeamIdPostsPostIdLikeDeleteRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new PostsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    postId: 1,
  } satisfies TeamIdPostsPostIdLikeDeleteRequest;

  try {
    const data = await api.teamIdPostsPostIdLikeDelete(body);
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
| **postId** | `number` |             | [Defaults to `undefined`] |

### Return type

[**TeamIdMeetingsMeetingIdDelete200Response**](TeamIdMeetingsMeetingIdDelete200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description            | Response headers |
| ----------- | ---------------------- | ---------------- |
| **200**     | 좋아요 취소 성공       | -                |
| **401**     | 인증 필요              | -                |
| **404**     | 좋아요하지 않은 게시글 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdPostsPostIdLikePost

> PostLike teamIdPostsPostIdLikePost(teamId, postId)

좋아요 추가

게시글에 좋아요를 추가합니다.

### Example

```ts
import { Configuration, PostsApi } from '';
import type { TeamIdPostsPostIdLikePostRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new PostsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    postId: 1,
  } satisfies TeamIdPostsPostIdLikePostRequest;

  try {
    const data = await api.teamIdPostsPostIdLikePost(body);
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
| **postId** | `number` |             | [Defaults to `undefined`] |

### Return type

[**PostLike**](PostLike.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description   | Response headers |
| ----------- | ------------- | ---------------- |
| **201**     | 좋아요 성공   | -                |
| **401**     | 인증 필요     | -                |
| **404**     | 게시글 없음   | -                |
| **409**     | 이미 좋아요함 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdPostsPostIdPatch

> PostWithAuthor teamIdPostsPostIdPatch(teamId, postId, updatePost)

게시글 수정

게시글을 수정합니다. **비즈니스 규칙:** - 작성자만 수정할 수 있습니다 - 제목, 내용, 이미지를 개별적으로 수정 가능 - likeCount와 viewCount는 수정되지 않습니다

### Example

```ts
import {
  Configuration,
  PostsApi,
} from '';
import type { TeamIdPostsPostIdPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PostsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    postId: 1,
    // UpdatePost | 수정할 정보 (optional)
    updatePost: ...,
  } satisfies TeamIdPostsPostIdPatchRequest;

  try {
    const data = await api.teamIdPostsPostIdPatch(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name           | Type                        | Description | Notes                     |
| -------------- | --------------------------- | ----------- | ------------------------- |
| **teamId**     | `string`                    |             | [Defaults to `undefined`] |
| **postId**     | `number`                    |             | [Defaults to `undefined`] |
| **updatePost** | [UpdatePost](UpdatePost.md) | 수정할 정보 | [Optional]                |

### Return type

[**PostWithAuthor**](PostWithAuthor.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | 수정 성공   | -                |
| **401**     | 인증 필요   | -                |
| **403**     | 권한 없음   | -                |
| **404**     | 게시글 없음 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
