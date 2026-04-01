# FavoritesApi

All URIs are relative to *https://together-dallaem-api.vercel.app*

| Method                                                                                               | HTTP request                                        | Description    |
| ---------------------------------------------------------------------------------------------------- | --------------------------------------------------- | -------------- |
| [**teamIdFavoritesCountGet**](FavoritesApi.md#teamidfavoritescountget)                               | **GET** /{teamId}/favorites/count                   | 찜 개수        |
| [**teamIdFavoritesGet**](FavoritesApi.md#teamidfavoritesget)                                         | **GET** /{teamId}/favorites                         | 찜 목록        |
| [**teamIdMeetingsMeetingIdFavoritesDelete**](FavoritesApi.md#teamidmeetingsmeetingidfavoritesdelete) | **DELETE** /{teamId}/meetings/{meetingId}/favorites | 찜 해제 (중첩) |
| [**teamIdMeetingsMeetingIdFavoritesPost**](FavoritesApi.md#teamidmeetingsmeetingidfavoritespost)     | **POST** /{teamId}/meetings/{meetingId}/favorites   | 찜 추가 (중첩) |

## teamIdFavoritesCountGet

> FavoriteCount teamIdFavoritesCountGet(teamId)

찜 개수

현재 사용자의 찜 개수를 조회합니다.

### Example

```ts
import { Configuration, FavoritesApi } from '';
import type { TeamIdFavoritesCountGetRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new FavoritesApi(config);

  const body = {
    // string
    teamId: dallaem,
  } satisfies TeamIdFavoritesCountGetRequest;

  try {
    const data = await api.teamIdFavoritesCountGet(body);
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

[**FavoriteCount**](FavoriteCount.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | 조회 성공   | -                |
| **401**     | 인증 필요   | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdFavoritesGet

> FavoriteList teamIdFavoritesGet(teamId, type, region, dateStart, dateEnd, sortBy, sortOrder, cursor, size)

찜 목록

찜한 모임 목록을 조회합니다.

### Example

```ts
import {
  Configuration,
  FavoritesApi,
} from '';
import type { TeamIdFavoritesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FavoritesApi(config);

  const body = {
    // string
    teamId: dallaem,
    // string | 모임 종류로 필터링 (optional)
    type: type_example,
    // string | 지역으로 필터링 (optional)
    region: region_example,
    // Date | 모임 시작 범위 (이상, ISO 8601) (optional)
    dateStart: 2026-02-09T15:00:00Z,
    // Date | 모임 끝 범위 (이하, ISO 8601) (optional)
    dateEnd: 2026-02-10T14:59:59.999Z,
    // 'createdAt' | 'dateTime' | 'registrationEnd' | 'participantCount' | 정렬 기준 (optional)
    sortBy: sortBy_example,
    // 'asc' | 'desc' | 정렬 순서 (optional)
    sortOrder: sortOrder_example,
    // string | 다음 페이지를 위한 커서 (optional)
    cursor: eyJpZCI6MTB9,
    // number | 페이지 크기 (1-100) (optional)
    size: 10,
  } satisfies TeamIdFavoritesGetRequest;

  try {
    const data = await api.teamIdFavoritesGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name          | Type                                                           | Description                     | Notes                                                                                                         |
| ------------- | -------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **teamId**    | `string`                                                       |                                 | [Defaults to `undefined`]                                                                                     |
| **type**      | `string`                                                       | 모임 종류로 필터링              | [Optional] [Defaults to `undefined`]                                                                          |
| **region**    | `string`                                                       | 지역으로 필터링                 | [Optional] [Defaults to `undefined`]                                                                          |
| **dateStart** | `Date`                                                         | 모임 시작 범위 (이상, ISO 8601) | [Optional] [Defaults to `undefined`]                                                                          |
| **dateEnd**   | `Date`                                                         | 모임 끝 범위 (이하, ISO 8601)   | [Optional] [Defaults to `undefined`]                                                                          |
| **sortBy**    | `createdAt`, `dateTime`, `registrationEnd`, `participantCount` | 정렬 기준                       | [Optional] [Defaults to `&#39;createdAt&#39;`] [Enum: createdAt, dateTime, registrationEnd, participantCount] |
| **sortOrder** | `asc`, `desc`                                                  | 정렬 순서                       | [Optional] [Defaults to `&#39;desc&#39;`] [Enum: asc, desc]                                                   |
| **cursor**    | `string`                                                       | 다음 페이지를 위한 커서         | [Optional] [Defaults to `undefined`]                                                                          |
| **size**      | `number`                                                       | 페이지 크기 (1-100)             | [Optional] [Defaults to `10`]                                                                                 |

### Return type

[**FavoriteList**](FavoriteList.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | 조회 성공   | -                |
| **401**     | 인증 필요   | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdMeetingsMeetingIdFavoritesDelete

> TeamIdMeetingsMeetingIdDelete200Response teamIdMeetingsMeetingIdFavoritesDelete(teamId, meetingId)

찜 해제 (중첩)

특정 모임의 찜을 해제합니다.

### Example

```ts
import { Configuration, FavoritesApi } from '';
import type { TeamIdMeetingsMeetingIdFavoritesDeleteRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new FavoritesApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    meetingId: 1,
  } satisfies TeamIdMeetingsMeetingIdFavoritesDeleteRequest;

  try {
    const data = await api.teamIdMeetingsMeetingIdFavoritesDelete(body);
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
| **meetingId** | `number` |             | [Defaults to `undefined`] |

### Return type

[**TeamIdMeetingsMeetingIdDelete200Response**](TeamIdMeetingsMeetingIdDelete200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description      | Response headers |
| ----------- | ---------------- | ---------------- |
| **200**     | 찜 해제 성공     | -                |
| **401**     | 인증 필요        | -                |
| **404**     | 찜하지 않은 모임 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdMeetingsMeetingIdFavoritesPost

> FavoriteWithMeeting teamIdMeetingsMeetingIdFavoritesPost(teamId, meetingId)

찜 추가 (중첩)

특정 모임을 찜합니다.

### Example

```ts
import { Configuration, FavoritesApi } from '';
import type { TeamIdMeetingsMeetingIdFavoritesPostRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new FavoritesApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    meetingId: 1,
  } satisfies TeamIdMeetingsMeetingIdFavoritesPostRequest;

  try {
    const data = await api.teamIdMeetingsMeetingIdFavoritesPost(body);
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
| **meetingId** | `number` |             | [Defaults to `undefined`] |

### Return type

[**FavoriteWithMeeting**](FavoriteWithMeeting.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **201**     | 찜 성공     | -                |
| **401**     | 인증 필요   | -                |
| **404**     | 모임 없음   | -                |
| **409**     | 이미 찜함   | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
