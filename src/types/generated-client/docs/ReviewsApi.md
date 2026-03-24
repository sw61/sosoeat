# ReviewsApi

All URIs are relative to *https://dallaem-backend.vercel.app*

| Method                                                                                         | HTTP request                                    | Description                |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------------- | -------------------------- |
| [**teamIdMeetingsMeetingIdReviewsGet**](ReviewsApi.md#teamidmeetingsmeetingidreviewsget)       | **GET** /{teamId}/meetings/{meetingId}/reviews  | 특정 모임 리뷰 목록 (중첩) |
| [**teamIdMeetingsMeetingIdReviewsPost**](ReviewsApi.md#teamidmeetingsmeetingidreviewspost)     | **POST** /{teamId}/meetings/{meetingId}/reviews | 리뷰 작성 (중첩)           |
| [**teamIdReviewsCategoriesStatisticsGet**](ReviewsApi.md#teamidreviewscategoriesstatisticsget) | **GET** /{teamId}/reviews/categories/statistics | 카테고리별 리뷰 통계       |
| [**teamIdReviewsGet**](ReviewsApi.md#teamidreviewsget)                                         | **GET** /{teamId}/reviews                       | 리뷰 목록                  |
| [**teamIdReviewsReviewIdDelete**](ReviewsApi.md#teamidreviewsreviewiddelete)                   | **DELETE** /{teamId}/reviews/{reviewId}         | 리뷰 삭제                  |
| [**teamIdReviewsReviewIdPatch**](ReviewsApi.md#teamidreviewsreviewidpatch)                     | **PATCH** /{teamId}/reviews/{reviewId}          | 리뷰 수정                  |
| [**teamIdReviewsStatisticsGet**](ReviewsApi.md#teamidreviewsstatisticsget)                     | **GET** /{teamId}/reviews/statistics            | 리뷰 전체 통계             |

## teamIdMeetingsMeetingIdReviewsGet

> PaginatedReview teamIdMeetingsMeetingIdReviewsGet(teamId, meetingId, userId, type, region, date, registrationEnd, sortBy, sortOrder, cursor, size)

특정 모임 리뷰 목록 (중첩)

특정 모임의 리뷰 목록을 조회합니다.

### Example

```ts
import {
  Configuration,
  ReviewsApi,
} from '';
import type { TeamIdMeetingsMeetingIdReviewsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReviewsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    meetingId: 1,
    // number | 특정 사용자의 리뷰만 조회 (optional)
    userId: 56,
    // string | 모임 종류로 필터링 (optional)
    type: type_example,
    // string | 지역으로 필터링 (optional)
    region: region_example,
    // Date | 모임 날짜로 필터링 (YYYY-MM-DD) (optional)
    date: 2013-10-20T19:20:30+01:00,
    // Date | 모집 마감일로 필터링 (YYYY-MM-DD) (optional)
    registrationEnd: 2013-10-20T19:20:30+01:00,
    // 'createdAt' | 'score' | 'participantCount' | 정렬 기준 (optional)
    sortBy: sortBy_example,
    // 'asc' | 'desc' | 정렬 순서 (optional)
    sortOrder: sortOrder_example,
    // string | 다음 페이지를 위한 커서 (optional)
    cursor: eyJpZCI6MTB9,
    // number | 페이지 크기 (1-100) (optional)
    size: 10,
  } satisfies TeamIdMeetingsMeetingIdReviewsGetRequest;

  try {
    const data = await api.teamIdMeetingsMeetingIdReviewsGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                | Type                                     | Description                       | Notes                                                                                     |
| ------------------- | ---------------------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------- |
| **teamId**          | `string`                                 |                                   | [Defaults to `undefined`]                                                                 |
| **meetingId**       | `number`                                 |                                   | [Defaults to `undefined`]                                                                 |
| **userId**          | `number`                                 | 특정 사용자의 리뷰만 조회         | [Optional] [Defaults to `undefined`]                                                      |
| **type**            | `string`                                 | 모임 종류로 필터링                | [Optional] [Defaults to `undefined`]                                                      |
| **region**          | `string`                                 | 지역으로 필터링                   | [Optional] [Defaults to `undefined`]                                                      |
| **date**            | `Date`                                   | 모임 날짜로 필터링 (YYYY-MM-DD)   | [Optional] [Defaults to `undefined`]                                                      |
| **registrationEnd** | `Date`                                   | 모집 마감일로 필터링 (YYYY-MM-DD) | [Optional] [Defaults to `undefined`]                                                      |
| **sortBy**          | `createdAt`, `score`, `participantCount` | 정렬 기준                         | [Optional] [Defaults to `&#39;createdAt&#39;`] [Enum: createdAt, score, participantCount] |
| **sortOrder**       | `asc`, `desc`                            | 정렬 순서                         | [Optional] [Defaults to `&#39;desc&#39;`] [Enum: asc, desc]                               |
| **cursor**          | `string`                                 | 다음 페이지를 위한 커서           | [Optional] [Defaults to `undefined`]                                                      |
| **size**            | `number`                                 | 페이지 크기 (1-100)               | [Optional] [Defaults to `10`]                                                             |

### Return type

[**PaginatedReview**](PaginatedReview.md)

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

## teamIdMeetingsMeetingIdReviewsPost

> ReviewWithDetails teamIdMeetingsMeetingIdReviewsPost(teamId, meetingId, createReviewByMeeting)

리뷰 작성 (중첩)

특정 모임에 리뷰를 작성합니다.

### Example

```ts
import {
  Configuration,
  ReviewsApi,
} from '';
import type { TeamIdMeetingsMeetingIdReviewsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReviewsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    meetingId: 1,
    // CreateReviewByMeeting (optional)
    createReviewByMeeting: ...,
  } satisfies TeamIdMeetingsMeetingIdReviewsPostRequest;

  try {
    const data = await api.teamIdMeetingsMeetingIdReviewsPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                      | Type                                              | Description | Notes                     |
| ------------------------- | ------------------------------------------------- | ----------- | ------------------------- |
| **teamId**                | `string`                                          |             | [Defaults to `undefined`] |
| **meetingId**             | `number`                                          |             | [Defaults to `undefined`] |
| **createReviewByMeeting** | [CreateReviewByMeeting](CreateReviewByMeeting.md) |             | [Optional]                |

### Return type

[**ReviewWithDetails**](ReviewWithDetails.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                                        | Response headers |
| ----------- | -------------------------------------------------- | ---------------- |
| **201**     | 작성 성공                                          | -                |
| **400**     | 유효하지 않은 요청 (미완료, 비참가자, 취소된 모임) | -                |
| **401**     | 인증 필요                                          | -                |
| **404**     | 모임 없음                                          | -                |
| **409**     | 이미 리뷰 작성함                                   | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdReviewsCategoriesStatisticsGet

> Array&lt;CategoryStatisticsItem&gt; teamIdReviewsCategoriesStatisticsGet(teamId)

카테고리별 리뷰 통계

모임 종류별 리뷰 통계를 조회합니다.

### Example

```ts
import { Configuration, ReviewsApi } from '';
import type { TeamIdReviewsCategoriesStatisticsGetRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new ReviewsApi(config);

  const body = {
    // string
    teamId: dallaem,
  } satisfies TeamIdReviewsCategoriesStatisticsGetRequest;

  try {
    const data = await api.teamIdReviewsCategoriesStatisticsGet(body);
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

[**Array&lt;CategoryStatisticsItem&gt;**](CategoryStatisticsItem.md)

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

## teamIdReviewsGet

> PaginatedReview teamIdReviewsGet(teamId, meetingId, userId, type, region, date, registrationEnd, sortBy, sortOrder, cursor, size)

리뷰 목록

리뷰 목록을 조회합니다.

### Example

```ts
import {
  Configuration,
  ReviewsApi,
} from '';
import type { TeamIdReviewsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReviewsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number | 특정 모임의 리뷰만 조회 (optional)
    meetingId: 56,
    // number | 특정 사용자의 리뷰만 조회 (optional)
    userId: 56,
    // string | 모임 종류로 필터링 (optional)
    type: type_example,
    // string | 지역으로 필터링 (optional)
    region: region_example,
    // Date | 모임 날짜로 필터링 (YYYY-MM-DD) (optional)
    date: 2013-10-20T19:20:30+01:00,
    // Date | 모집 마감일로 필터링 (YYYY-MM-DD) (optional)
    registrationEnd: 2013-10-20T19:20:30+01:00,
    // 'createdAt' | 'score' | 'participantCount' | 정렬 기준 (optional)
    sortBy: sortBy_example,
    // 'asc' | 'desc' | 정렬 순서 (optional)
    sortOrder: sortOrder_example,
    // string | 다음 페이지를 위한 커서 (optional)
    cursor: eyJpZCI6MTB9,
    // number | 페이지 크기 (1-100) (optional)
    size: 10,
  } satisfies TeamIdReviewsGetRequest;

  try {
    const data = await api.teamIdReviewsGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                | Type                                     | Description                       | Notes                                                                                     |
| ------------------- | ---------------------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------- |
| **teamId**          | `string`                                 |                                   | [Defaults to `undefined`]                                                                 |
| **meetingId**       | `number`                                 | 특정 모임의 리뷰만 조회           | [Optional] [Defaults to `undefined`]                                                      |
| **userId**          | `number`                                 | 특정 사용자의 리뷰만 조회         | [Optional] [Defaults to `undefined`]                                                      |
| **type**            | `string`                                 | 모임 종류로 필터링                | [Optional] [Defaults to `undefined`]                                                      |
| **region**          | `string`                                 | 지역으로 필터링                   | [Optional] [Defaults to `undefined`]                                                      |
| **date**            | `Date`                                   | 모임 날짜로 필터링 (YYYY-MM-DD)   | [Optional] [Defaults to `undefined`]                                                      |
| **registrationEnd** | `Date`                                   | 모집 마감일로 필터링 (YYYY-MM-DD) | [Optional] [Defaults to `undefined`]                                                      |
| **sortBy**          | `createdAt`, `score`, `participantCount` | 정렬 기준                         | [Optional] [Defaults to `&#39;createdAt&#39;`] [Enum: createdAt, score, participantCount] |
| **sortOrder**       | `asc`, `desc`                            | 정렬 순서                         | [Optional] [Defaults to `&#39;desc&#39;`] [Enum: asc, desc]                               |
| **cursor**          | `string`                                 | 다음 페이지를 위한 커서           | [Optional] [Defaults to `undefined`]                                                      |
| **size**            | `number`                                 | 페이지 크기 (1-100)               | [Optional] [Defaults to `10`]                                                             |

### Return type

[**PaginatedReview**](PaginatedReview.md)

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

## teamIdReviewsReviewIdDelete

> TeamIdMeetingsMeetingIdDelete200Response teamIdReviewsReviewIdDelete(teamId, reviewId)

리뷰 삭제

리뷰를 삭제합니다. 본인의 리뷰만 삭제할 수 있습니다.

### Example

```ts
import { Configuration, ReviewsApi } from '';
import type { TeamIdReviewsReviewIdDeleteRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new ReviewsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    reviewId: 1,
  } satisfies TeamIdReviewsReviewIdDeleteRequest;

  try {
    const data = await api.teamIdReviewsReviewIdDelete(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name         | Type     | Description | Notes                     |
| ------------ | -------- | ----------- | ------------------------- |
| **teamId**   | `string` |             | [Defaults to `undefined`] |
| **reviewId** | `number` |             | [Defaults to `undefined`] |

### Return type

[**TeamIdMeetingsMeetingIdDelete200Response**](TeamIdMeetingsMeetingIdDelete200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                       | Response headers |
| ----------- | --------------------------------- | ---------------- |
| **200**     | 삭제 성공                         | -                |
| **401**     | 인증 필요                         | -                |
| **403**     | 권한 없음 (본인 리뷰만 삭제 가능) | -                |
| **404**     | 리뷰 없음                         | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdReviewsReviewIdPatch

> ReviewWithDetails teamIdReviewsReviewIdPatch(teamId, reviewId, updateReview)

리뷰 수정

리뷰를 수정합니다. 본인의 리뷰만 수정할 수 있습니다.

### Example

```ts
import {
  Configuration,
  ReviewsApi,
} from '';
import type { TeamIdReviewsReviewIdPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReviewsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    reviewId: 1,
    // UpdateReview | 수정할 정보 (optional)
    updateReview: ...,
  } satisfies TeamIdReviewsReviewIdPatchRequest;

  try {
    const data = await api.teamIdReviewsReviewIdPatch(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name             | Type                            | Description | Notes                     |
| ---------------- | ------------------------------- | ----------- | ------------------------- |
| **teamId**       | `string`                        |             | [Defaults to `undefined`] |
| **reviewId**     | `number`                        |             | [Defaults to `undefined`] |
| **updateReview** | [UpdateReview](UpdateReview.md) | 수정할 정보 | [Optional]                |

### Return type

[**ReviewWithDetails**](ReviewWithDetails.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                       | Response headers |
| ----------- | --------------------------------- | ---------------- |
| **200**     | 수정 성공                         | -                |
| **401**     | 인증 필요                         | -                |
| **403**     | 권한 없음 (본인 리뷰만 수정 가능) | -                |
| **404**     | 리뷰 없음                         | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdReviewsStatisticsGet

> ReviewStatistics teamIdReviewsStatisticsGet(teamId)

리뷰 전체 통계

팀 전체 리뷰 통계를 조회합니다.

### Example

```ts
import { Configuration, ReviewsApi } from '';
import type { TeamIdReviewsStatisticsGetRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new ReviewsApi(config);

  const body = {
    // string
    teamId: dallaem,
  } satisfies TeamIdReviewsStatisticsGetRequest;

  try {
    const data = await api.teamIdReviewsStatisticsGet(body);
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

[**ReviewStatistics**](ReviewStatistics.md)

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
