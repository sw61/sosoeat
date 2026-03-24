# MeetingTypesApi

All URIs are relative to *https://dallaem-backend.vercel.app*

| Method                                                                                  | HTTP request                                | Description    |
| --------------------------------------------------------------------------------------- | ------------------------------------------- | -------------- |
| [**teamIdMeetingTypesGet**](MeetingTypesApi.md#teamidmeetingtypesget)                   | **GET** /{teamId}/meeting-types             | 모임 종류 목록 |
| [**teamIdMeetingTypesPost**](MeetingTypesApi.md#teamidmeetingtypespost)                 | **POST** /{teamId}/meeting-types            | 모임 종류 생성 |
| [**teamIdMeetingTypesTypeIdDelete**](MeetingTypesApi.md#teamidmeetingtypestypeiddelete) | **DELETE** /{teamId}/meeting-types/{typeId} | 모임 종류 삭제 |
| [**teamIdMeetingTypesTypeIdPatch**](MeetingTypesApi.md#teamidmeetingtypestypeidpatch)   | **PATCH** /{teamId}/meeting-types/{typeId}  | 모임 종류 수정 |

## teamIdMeetingTypesGet

> Array&lt;MeetingType&gt; teamIdMeetingTypesGet(teamId)

모임 종류 목록

팀의 모임 종류 목록을 조회합니다.

### Example

```ts
import { Configuration, MeetingTypesApi } from '';
import type { TeamIdMeetingTypesGetRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new MeetingTypesApi(config);

  const body = {
    // string
    teamId: dallaem,
  } satisfies TeamIdMeetingTypesGetRequest;

  try {
    const data = await api.teamIdMeetingTypesGet(body);
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

[**Array&lt;MeetingType&gt;**](MeetingType.md)

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

## teamIdMeetingTypesPost

> MeetingType teamIdMeetingTypesPost(teamId, createMeetingType)

모임 종류 생성

새로운 모임 종류를 생성합니다. 팀 내에서 이름은 고유해야 합니다.

### Example

```ts
import {
  Configuration,
  MeetingTypesApi,
} from '';
import type { TeamIdMeetingTypesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MeetingTypesApi(config);

  const body = {
    // string
    teamId: dallaem,
    // CreateMeetingType | 모임 종류 생성 정보 (optional)
    createMeetingType: ...,
  } satisfies TeamIdMeetingTypesPostRequest;

  try {
    const data = await api.teamIdMeetingTypesPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                  | Type                                      | Description         | Notes                     |
| --------------------- | ----------------------------------------- | ------------------- | ------------------------- |
| **teamId**            | `string`                                  |                     | [Defaults to `undefined`] |
| **createMeetingType** | [CreateMeetingType](CreateMeetingType.md) | 모임 종류 생성 정보 | [Optional]                |

### Return type

[**MeetingType**](MeetingType.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description        | Response headers |
| ----------- | ------------------ | ---------------- |
| **201**     | 생성 성공          | -                |
| **401**     | 인증 필요          | -                |
| **409**     | 이미 존재하는 이름 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdMeetingTypesTypeIdDelete

> TeamIdMeetingsMeetingIdDelete200Response teamIdMeetingTypesTypeIdDelete(teamId, typeId)

모임 종류 삭제

모임 종류를 삭제합니다.

### Example

```ts
import { Configuration, MeetingTypesApi } from '';
import type { TeamIdMeetingTypesTypeIdDeleteRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new MeetingTypesApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    typeId: 1,
  } satisfies TeamIdMeetingTypesTypeIdDeleteRequest;

  try {
    const data = await api.teamIdMeetingTypesTypeIdDelete(body);
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
| **typeId** | `number` |             | [Defaults to `undefined`] |

### Return type

[**TeamIdMeetingsMeetingIdDelete200Response**](TeamIdMeetingsMeetingIdDelete200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description    | Response headers |
| ----------- | -------------- | ---------------- |
| **200**     | 삭제 성공      | -                |
| **401**     | 인증 필요      | -                |
| **404**     | 모임 종류 없음 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdMeetingTypesTypeIdPatch

> MeetingType teamIdMeetingTypesTypeIdPatch(teamId, typeId, updateMeetingType)

모임 종류 수정

모임 종류 정보를 수정합니다.

### Example

```ts
import {
  Configuration,
  MeetingTypesApi,
} from '';
import type { TeamIdMeetingTypesTypeIdPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MeetingTypesApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    typeId: 1,
    // UpdateMeetingType | 수정할 정보 (optional)
    updateMeetingType: ...,
  } satisfies TeamIdMeetingTypesTypeIdPatchRequest;

  try {
    const data = await api.teamIdMeetingTypesTypeIdPatch(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                  | Type                                      | Description | Notes                     |
| --------------------- | ----------------------------------------- | ----------- | ------------------------- |
| **teamId**            | `string`                                  |             | [Defaults to `undefined`] |
| **typeId**            | `number`                                  |             | [Defaults to `undefined`] |
| **updateMeetingType** | [UpdateMeetingType](UpdateMeetingType.md) | 수정할 정보 | [Optional]                |

### Return type

[**MeetingType**](MeetingType.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description        | Response headers |
| ----------- | ------------------ | ---------------- |
| **200**     | 수정 성공          | -                |
| **401**     | 인증 필요          | -                |
| **404**     | 모임 종류 없음     | -                |
| **409**     | 이미 존재하는 이름 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
