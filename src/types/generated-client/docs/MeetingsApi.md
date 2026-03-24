# MeetingsApi

All URIs are relative to *https://dallaem-backend.vercel.app*

| Method                                                                                              | HTTP request                                        | Description         |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------------- |
| [**teamIdMeetingsGet**](MeetingsApi.md#teamidmeetingsget)                                           | **GET** /{teamId}/meetings                          | 모임 목록           |
| [**teamIdMeetingsJoinedGet**](MeetingsApi.md#teamidmeetingsjoinedget)                               | **GET** /{teamId}/meetings/joined                   | 참여한 모임 목록    |
| [**teamIdMeetingsMeetingIdDelete**](MeetingsApi.md#teamidmeetingsmeetingiddelete)                   | **DELETE** /{teamId}/meetings/{meetingId}           | 모임 삭제           |
| [**teamIdMeetingsMeetingIdGet**](MeetingsApi.md#teamidmeetingsmeetingidget)                         | **GET** /{teamId}/meetings/{meetingId}              | 모임 상세           |
| [**teamIdMeetingsMeetingIdJoinDelete**](MeetingsApi.md#teamidmeetingsmeetingidjoindelete)           | **DELETE** /{teamId}/meetings/{meetingId}/join      | 참여 취소           |
| [**teamIdMeetingsMeetingIdJoinPost**](MeetingsApi.md#teamidmeetingsmeetingidjoinpost)               | **POST** /{teamId}/meetings/{meetingId}/join        | 모임 참여           |
| [**teamIdMeetingsMeetingIdParticipantsGet**](MeetingsApi.md#teamidmeetingsmeetingidparticipantsget) | **GET** /{teamId}/meetings/{meetingId}/participants | 참가자 목록         |
| [**teamIdMeetingsMeetingIdPatch**](MeetingsApi.md#teamidmeetingsmeetingidpatch)                     | **PATCH** /{teamId}/meetings/{meetingId}            | 모임 수정           |
| [**teamIdMeetingsMeetingIdStatusPatch**](MeetingsApi.md#teamidmeetingsmeetingidstatuspatch)         | **PATCH** /{teamId}/meetings/{meetingId}/status     | 모임 상태 변경      |
| [**teamIdMeetingsMyGet**](MeetingsApi.md#teamidmeetingsmyget)                                       | **GET** /{teamId}/meetings/my                       | 내가 만든 모임 목록 |
| [**teamIdMeetingsPost**](MeetingsApi.md#teamidmeetingspost)                                         | **POST** /{teamId}/meetings                         | 모임 생성           |

## teamIdMeetingsGet

> MeetingList teamIdMeetingsGet(teamId, id, type, region, date, createdBy, sortBy, sortOrder, cursor, size)

모임 목록

모임 목록을 조회합니다. 취소되지 않은 모임만 반환됩니다.

### Example

```ts
import {
  Configuration,
  MeetingsApi,
} from '';
import type { TeamIdMeetingsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MeetingsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number | 특정 모임 ID로 필터링 (optional)
    id: 1,
    // string | 모임 종류로 필터링 (예: 달램핏, 오피스 스트레칭) (optional)
    type: 달램핏,
    // string | 지역으로 필터링 (예: 강남, 건대입구, 홍대입구) (optional)
    region: 건대입구,
    // Date | 특정 날짜의 모임만 조회 (YYYY-MM-DD 형식) (optional)
    date: 2026-02-10,
    // number | 호스트 사용자 ID로 필터링 (optional)
    createdBy: 1,
    // 'dateTime' | 'registrationEnd' | 'participantCount' | 정렬 기준: dateTime(모임 일시), registrationEnd(모집 마감일), participantCount(참가자 수) (optional)
    sortBy: dateTime,
    // 'asc' | 'desc' | 정렬 순서: asc(오름차순), desc(내림차순) (optional)
    sortOrder: asc,
    // string | 다음 페이지를 위한 커서 (optional)
    cursor: eyJpZCI6MTB9,
    // number | 페이지 크기 (1-100) (optional)
    size: 10,
  } satisfies TeamIdMeetingsGetRequest;

  try {
    const data = await api.teamIdMeetingsGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name          | Type                                              | Description                                                                               | Notes                                                                                             |
| ------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **teamId**    | `string`                                          |                                                                                           | [Defaults to `undefined`]                                                                         |
| **id**        | `number`                                          | 특정 모임 ID로 필터링                                                                     | [Optional] [Defaults to `undefined`]                                                              |
| **type**      | `string`                                          | 모임 종류로 필터링 (예: 달램핏, 오피스 스트레칭)                                          | [Optional] [Defaults to `undefined`]                                                              |
| **region**    | `string`                                          | 지역으로 필터링 (예: 강남, 건대입구, 홍대입구)                                            | [Optional] [Defaults to `undefined`]                                                              |
| **date**      | `Date`                                            | 특정 날짜의 모임만 조회 (YYYY-MM-DD 형식)                                                 | [Optional] [Defaults to `undefined`]                                                              |
| **createdBy** | `number`                                          | 호스트 사용자 ID로 필터링                                                                 | [Optional] [Defaults to `undefined`]                                                              |
| **sortBy**    | `dateTime`, `registrationEnd`, `participantCount` | 정렬 기준: dateTime(모임 일시), registrationEnd(모집 마감일), participantCount(참가자 수) | [Optional] [Defaults to `&#39;dateTime&#39;`] [Enum: dateTime, registrationEnd, participantCount] |
| **sortOrder** | `asc`, `desc`                                     | 정렬 순서: asc(오름차순), desc(내림차순)                                                  | [Optional] [Defaults to `&#39;asc&#39;`] [Enum: asc, desc]                                        |
| **cursor**    | `string`                                          | 다음 페이지를 위한 커서                                                                   | [Optional] [Defaults to `undefined`]                                                              |
| **size**      | `number`                                          | 페이지 크기 (1-100)                                                                       | [Optional] [Defaults to `10`]                                                                     |

### Return type

[**MeetingList**](MeetingList.md)

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

## teamIdMeetingsJoinedGet

> JoinedMeetingList teamIdMeetingsJoinedGet(teamId, completed, reviewed, sortBy, sortOrder, cursor, size)

참여한 모임 목록

현재 사용자가 참여한 모임 목록을 조회합니다.

### Example

```ts
import { Configuration, MeetingsApi } from '';
import type { TeamIdMeetingsJoinedGetRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new MeetingsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // 'true' | 'false' | 완료된 모임만 조회 (true: 지난 모임, false: 예정된 모임) (optional)
    completed: false,
    // 'true' | 'false' | 리뷰 작성 여부로 필터링 (true: 작성함, false: 미작성) (optional)
    reviewed: false,
    // 'dateTime' | 'registrationEnd' | 'joinedAt' | 정렬 기준: dateTime(모임 일시), registrationEnd(모집 마감일), joinedAt(참가 신청일) (optional)
    sortBy: dateTime,
    // 'asc' | 'desc' | 정렬 순서: asc(오름차순), desc(내림차순) (optional)
    sortOrder: asc,
    // string | 다음 페이지를 위한 커서 (optional)
    cursor: eyJpZCI6MTB9,
    // number | 페이지 크기 (1-100) (optional)
    size: 10,
  } satisfies TeamIdMeetingsJoinedGetRequest;

  try {
    const data = await api.teamIdMeetingsJoinedGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name          | Type                                      | Description                                                                         | Notes                                                                                     |
| ------------- | ----------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **teamId**    | `string`                                  |                                                                                     | [Defaults to `undefined`]                                                                 |
| **completed** | `true`, `false`                           | 완료된 모임만 조회 (true: 지난 모임, false: 예정된 모임)                            | [Optional] [Defaults to `undefined`] [Enum: true, false]                                  |
| **reviewed**  | `true`, `false`                           | 리뷰 작성 여부로 필터링 (true: 작성함, false: 미작성)                               | [Optional] [Defaults to `undefined`] [Enum: true, false]                                  |
| **sortBy**    | `dateTime`, `registrationEnd`, `joinedAt` | 정렬 기준: dateTime(모임 일시), registrationEnd(모집 마감일), joinedAt(참가 신청일) | [Optional] [Defaults to `&#39;dateTime&#39;`] [Enum: dateTime, registrationEnd, joinedAt] |
| **sortOrder** | `asc`, `desc`                             | 정렬 순서: asc(오름차순), desc(내림차순)                                            | [Optional] [Defaults to `&#39;asc&#39;`] [Enum: asc, desc]                                |
| **cursor**    | `string`                                  | 다음 페이지를 위한 커서                                                             | [Optional] [Defaults to `undefined`]                                                      |
| **size**      | `number`                                  | 페이지 크기 (1-100)                                                                 | [Optional] [Defaults to `10`]                                                             |

### Return type

[**JoinedMeetingList**](JoinedMeetingList.md)

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

## teamIdMeetingsMeetingIdDelete

> TeamIdMeetingsMeetingIdDelete200Response teamIdMeetingsMeetingIdDelete(teamId, meetingId)

모임 삭제

모임을 완전히 삭제합니다. 주최자만 가능합니다. 참가자, 리뷰, 찜이 모두 함께 삭제됩니다.

### Example

```ts
import { Configuration, MeetingsApi } from '';
import type { TeamIdMeetingsMeetingIdDeleteRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new MeetingsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    meetingId: 1,
  } satisfies TeamIdMeetingsMeetingIdDeleteRequest;

  try {
    const data = await api.teamIdMeetingsMeetingIdDelete(body);
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

| Status code | Description                    | Response headers |
| ----------- | ------------------------------ | ---------------- |
| **200**     | 삭제 성공                      | -                |
| **403**     | 권한 없음 (주최자만 삭제 가능) | -                |
| **404**     | 모임 없음                      | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdMeetingsMeetingIdGet

> MeetingWithHost teamIdMeetingsMeetingIdGet(teamId, meetingId)

모임 상세

특정 모임의 상세 정보를 조회합니다.

### Example

```ts
import { Configuration, MeetingsApi } from '';
import type { TeamIdMeetingsMeetingIdGetRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new MeetingsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    meetingId: 1,
  } satisfies TeamIdMeetingsMeetingIdGetRequest;

  try {
    const data = await api.teamIdMeetingsMeetingIdGet(body);
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

[**MeetingWithHost**](MeetingWithHost.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | 조회 성공   | -                |
| **404**     | 모임 없음   | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdMeetingsMeetingIdJoinDelete

> TeamIdMeetingsMeetingIdDelete200Response teamIdMeetingsMeetingIdJoinDelete(teamId, meetingId)

참여 취소

모임 참여를 취소합니다. - 호스트는 참여를 취소할 수 없습니다 (모임 취소를 이용해주세요) - 취소된 모임은 참여 취소 불가 - 이미 시작된 모임은 참여 취소 불가

### Example

```ts
import { Configuration, MeetingsApi } from '';
import type { TeamIdMeetingsMeetingIdJoinDeleteRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new MeetingsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    meetingId: 1,
  } satisfies TeamIdMeetingsMeetingIdJoinDeleteRequest;

  try {
    const data = await api.teamIdMeetingsMeetingIdJoinDelete(body);
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

| Status code | Description                                                 | Response headers |
| ----------- | ----------------------------------------------------------- | ---------------- |
| **200**     | 취소 성공                                                   | -                |
| **400**     | 취소 불가 (참여하지 않음, 호스트, 취소된 모임, 시작된 모임) | -                |
| **401**     | 인증 필요                                                   | -                |
| **404**     | 모임 없음                                                   | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdMeetingsMeetingIdJoinPost

> TeamIdMeetingsMeetingIdDelete200Response teamIdMeetingsMeetingIdJoinPost(teamId, meetingId)

모임 참여

모임에 참여 신청합니다. **비즈니스 규칙:** - 취소된 모임은 참여 불가 (400 CANCELED) - 모집 마감일이 지나면 참여 불가 (400 REGISTRATION_CLOSED) - 정원 초과 시 참여 불가 (400 CAPACITY_FULL) - 동일 모임 중복 참여 불가 (409 ALREADY_JOINED) - 호스트는 자동 참여되므로 별도 신청 불필요 **알림:** - 참여 인원이 5명에 도달하면 호스트에게 개설 확정 알림 발생

### Example

```ts
import { Configuration, MeetingsApi } from '';
import type { TeamIdMeetingsMeetingIdJoinPostRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new MeetingsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    meetingId: 1,
  } satisfies TeamIdMeetingsMeetingIdJoinPostRequest;

  try {
    const data = await api.teamIdMeetingsMeetingIdJoinPost(body);
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

| Status code | Description                                                                                                                                   | Response headers |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **200**     | 참여 성공                                                                                                                                     | -                |
| **400**     | 참여 불가: - CANCELED: 취소된 모임에는 참여할 수 없습니다 - REGISTRATION_CLOSED: 모집이 마감되었습니다 - CAPACITY_FULL: 정원이 초과되었습니다 | -                |
| **401**     | 인증 필요 - Bearer 토큰이 없거나 유효하지 않음                                                                                                | -                |
| **404**     | 모임 없음 - 존재하지 않는 모임 ID (NOT_FOUND)                                                                                                 | -                |
| **409**     | 이미 참여 중 - 동일 모임에 중복 참여 불가 (ALREADY_JOINED)                                                                                    | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdMeetingsMeetingIdParticipantsGet

> ParticipantList teamIdMeetingsMeetingIdParticipantsGet(teamId, meetingId, cursor, size)

참가자 목록

모임의 참가자 목록을 조회합니다.

### Example

```ts
import { Configuration, MeetingsApi } from '';
import type { TeamIdMeetingsMeetingIdParticipantsGetRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new MeetingsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    meetingId: 1,
    // string | 다음 페이지를 위한 커서 (optional)
    cursor: eyJpZCI6MTB9,
    // number | 페이지 크기 (1-100) (optional)
    size: 10,
  } satisfies TeamIdMeetingsMeetingIdParticipantsGetRequest;

  try {
    const data = await api.teamIdMeetingsMeetingIdParticipantsGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name          | Type     | Description             | Notes                                |
| ------------- | -------- | ----------------------- | ------------------------------------ |
| **teamId**    | `string` |                         | [Defaults to `undefined`]            |
| **meetingId** | `number` |                         | [Defaults to `undefined`]            |
| **cursor**    | `string` | 다음 페이지를 위한 커서 | [Optional] [Defaults to `undefined`] |
| **size**      | `number` | 페이지 크기 (1-100)     | [Optional] [Defaults to `10`]        |

### Return type

[**ParticipantList**](ParticipantList.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | 조회 성공   | -                |
| **404**     | 모임 없음   | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdMeetingsMeetingIdPatch

> MeetingWithHost teamIdMeetingsMeetingIdPatch(teamId, meetingId, updateMeeting)

모임 수정

모임 정보를 수정합니다. **비즈니스 규칙:** - 호스트만 수정할 수 있습니다 - 취소된 모임은 수정 불가 - 정원(capacity)을 현재 참가자 수보다 줄일 수 없습니다 - 모임 일시는 현재 시각 이후여야 합니다 - 모집 마감일은 모임 일시 이전이어야 합니다

### Example

```ts
import {
  Configuration,
  MeetingsApi,
} from '';
import type { TeamIdMeetingsMeetingIdPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MeetingsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    meetingId: 1,
    // UpdateMeeting | 수정할 정보 (optional)
    updateMeeting: ...,
  } satisfies TeamIdMeetingsMeetingIdPatchRequest;

  try {
    const data = await api.teamIdMeetingsMeetingIdPatch(body);
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
| **meetingId**     | `number`                          |             | [Defaults to `undefined`] |
| **updateMeeting** | [UpdateMeeting](UpdateMeeting.md) | 수정할 정보 | [Optional]                |

### Return type

[**MeetingWithHost**](MeetingWithHost.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                                                                                                                                                                                                                                                            | Response headers |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **200**     | 수정 성공                                                                                                                                                                                                                                                              | -                |
| **400**     | 유효하지 않은 요청: - CANCELED: 취소된 모임은 수정할 수 없습니다 - CAPACITY_TOO_SMALL: 정원을 현재 참가자 수보다 줄일 수 없습니다 - DATETIME_MUST_BE_FUTURE: 모임 일시는 미래여야 합니다 - REGISTRATION_END_BEFORE_DATETIME: 모집 마감일은 모임 일시 이전이어야 합니다 | -                |
| **401**     | 인증 필요 - Bearer 토큰이 없거나 유효하지 않음                                                                                                                                                                                                                         | -                |
| **403**     | 권한 없음 - 호스트만 모임을 수정할 수 있습니다 (FORBIDDEN)                                                                                                                                                                                                             | -                |
| **404**     | 모임 없음 - 존재하지 않는 모임 ID (NOT_FOUND)                                                                                                                                                                                                                          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdMeetingsMeetingIdStatusPatch

> MeetingWithHost teamIdMeetingsMeetingIdStatusPatch(teamId, meetingId, updateMeetingStatus)

모임 상태 변경

모임을 확정하거나 취소합니다. 주최자만 가능합니다.

### Example

```ts
import {
  Configuration,
  MeetingsApi,
} from '';
import type { TeamIdMeetingsMeetingIdStatusPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MeetingsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    meetingId: 1,
    // UpdateMeetingStatus (optional)
    updateMeetingStatus: ...,
  } satisfies TeamIdMeetingsMeetingIdStatusPatchRequest;

  try {
    const data = await api.teamIdMeetingsMeetingIdStatusPatch(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                    | Type                                          | Description | Notes                     |
| ----------------------- | --------------------------------------------- | ----------- | ------------------------- |
| **teamId**              | `string`                                      |             | [Defaults to `undefined`] |
| **meetingId**           | `number`                                      |             | [Defaults to `undefined`] |
| **updateMeetingStatus** | [UpdateMeetingStatus](UpdateMeetingStatus.md) |             | [Optional]                |

### Return type

[**MeetingWithHost**](MeetingWithHost.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description      | Response headers |
| ----------- | ---------------- | ---------------- |
| **200**     | 상태 변경 성공   | -                |
| **400**     | 이미 취소된 모임 | -                |
| **403**     | 권한 없음        | -                |
| **404**     | 모임 없음        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdMeetingsMyGet

> MeetingList teamIdMeetingsMyGet(teamId, sortBy, sortOrder, cursor, size)

내가 만든 모임 목록

현재 사용자가 호스트인 모임 목록을 조회합니다.

### Example

```ts
import { Configuration, MeetingsApi } from '';
import type { TeamIdMeetingsMyGetRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new MeetingsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // 'dateTime' | 'registrationEnd' | 'participantCount' | 정렬 기준: dateTime(모임 일시), registrationEnd(모집 마감일), participantCount(참가자 수) (optional)
    sortBy: dateTime,
    // 'asc' | 'desc' | 정렬 순서: asc(오름차순), desc(내림차순) (optional)
    sortOrder: asc,
    // string | 다음 페이지를 위한 커서 (optional)
    cursor: eyJpZCI6MTB9,
    // number | 페이지 크기 (1-100) (optional)
    size: 10,
  } satisfies TeamIdMeetingsMyGetRequest;

  try {
    const data = await api.teamIdMeetingsMyGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name          | Type                                              | Description                                                                               | Notes                                                                                             |
| ------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **teamId**    | `string`                                          |                                                                                           | [Defaults to `undefined`]                                                                         |
| **sortBy**    | `dateTime`, `registrationEnd`, `participantCount` | 정렬 기준: dateTime(모임 일시), registrationEnd(모집 마감일), participantCount(참가자 수) | [Optional] [Defaults to `&#39;dateTime&#39;`] [Enum: dateTime, registrationEnd, participantCount] |
| **sortOrder** | `asc`, `desc`                                     | 정렬 순서: asc(오름차순), desc(내림차순)                                                  | [Optional] [Defaults to `&#39;asc&#39;`] [Enum: asc, desc]                                        |
| **cursor**    | `string`                                          | 다음 페이지를 위한 커서                                                                   | [Optional] [Defaults to `undefined`]                                                              |
| **size**      | `number`                                          | 페이지 크기 (1-100)                                                                       | [Optional] [Defaults to `10`]                                                                     |

### Return type

[**MeetingList**](MeetingList.md)

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

## teamIdMeetingsPost

> MeetingWithHost teamIdMeetingsPost(teamId, createMeeting)

모임 생성

새로운 모임을 생성합니다. **비즈니스 규칙:** - 모임 일시(dateTime)는 현재 시각 이후여야 합니다 - 모집 마감일(registrationEnd)은 모임 일시 이전이어야 합니다 - 호스트는 자동으로 첫 번째 참가자로 등록됩니다 - capacity는 최소 1명 이상이어야 합니다

### Example

```ts
import {
  Configuration,
  MeetingsApi,
} from '';
import type { TeamIdMeetingsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MeetingsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // CreateMeeting | 모임 생성 정보 (optional)
    createMeeting: ...,
  } satisfies TeamIdMeetingsPostRequest;

  try {
    const data = await api.teamIdMeetingsPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name              | Type                              | Description    | Notes                     |
| ----------------- | --------------------------------- | -------------- | ------------------------- |
| **teamId**        | `string`                          |                | [Defaults to `undefined`] |
| **createMeeting** | [CreateMeeting](CreateMeeting.md) | 모임 생성 정보 | [Optional]                |

### Return type

[**MeetingWithHost**](MeetingWithHost.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                                                                                                                                                                                                                                             | Response headers |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **201**     | 생성 성공                                                                                                                                                                                                                                               | -                |
| **400**     | 유효하지 않은 요청: - DATETIME_MUST_BE_FUTURE: 모임 일시는 현재보다 미래여야 합니다 - REGISTRATION_END_BEFORE_DATETIME: 모집 마감일은 모임 일시 이전이어야 합니다 - INVALID_MEETING_TYPE: 존재하지 않는 모임 종류입니다 - 필수 필드 누락 또는 형식 오류 | -                |
| **401**     | 인증 필요 - Bearer 토큰이 없거나 유효하지 않음                                                                                                                                                                                                          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
