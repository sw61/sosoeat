# NotificationsApi

All URIs are relative to *https://together-dallaem-api.vercel.app*

| Method                                                                                                       | HTTP request                                          | Description            |
| ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- | ---------------------- |
| [**teamIdNotificationsDelete**](NotificationsApi.md#teamidnotificationsdelete)                               | **DELETE** /{teamId}/notifications                    | 전체 알림 삭제         |
| [**teamIdNotificationsGet**](NotificationsApi.md#teamidnotificationsget)                                     | **GET** /{teamId}/notifications                       | 알림 목록              |
| [**teamIdNotificationsNotificationIdDelete**](NotificationsApi.md#teamidnotificationsnotificationiddelete)   | **DELETE** /{teamId}/notifications/{notificationId}   | 알림 삭제              |
| [**teamIdNotificationsNotificationIdReadPut**](NotificationsApi.md#teamidnotificationsnotificationidreadput) | **PUT** /{teamId}/notifications/{notificationId}/read | 알림 읽음 처리         |
| [**teamIdNotificationsReadAllPut**](NotificationsApi.md#teamidnotificationsreadallput)                       | **PUT** /{teamId}/notifications/read-all              | 모든 알림 읽음 처리    |
| [**teamIdNotificationsUnreadCountGet**](NotificationsApi.md#teamidnotificationsunreadcountget)               | **GET** /{teamId}/notifications/unread-count          | 읽지 않은 알림 수 조회 |

## teamIdNotificationsDelete

> TeamIdNotificationsDelete200Response teamIdNotificationsDelete(teamId)

전체 알림 삭제

현재 사용자의 모든 알림을 삭제합니다.

### Example

```ts
import { Configuration, NotificationsApi } from '';
import type { TeamIdNotificationsDeleteRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new NotificationsApi(config);

  const body = {
    // string
    teamId: dallaem,
  } satisfies TeamIdNotificationsDeleteRequest;

  try {
    const data = await api.teamIdNotificationsDelete(body);
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

[**TeamIdNotificationsDelete200Response**](TeamIdNotificationsDelete200Response.md)

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

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdNotificationsGet

> NotificationList teamIdNotificationsGet(teamId, isRead, cursor, size)

알림 목록

현재 사용자의 알림 목록을 조회합니다. - 알림 종류: 개설 확정(MEETING_CONFIRMED), 모임 취소(MEETING_CANCELED), 모임 삭제(MEETING_DELETED), 댓글(COMMENT) - isRead 파라미터로 읽음/미읽음 필터링 가능

### Example

```ts
import { Configuration, NotificationsApi } from '';
import type { TeamIdNotificationsGetRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new NotificationsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // 'true' | 'false' | 읽음 여부로 필터링 (optional)
    isRead: isRead_example,
    // string | 다음 페이지를 위한 커서 (optional)
    cursor: eyJpZCI6MTB9,
    // number | 페이지 크기 (1-100) (optional)
    size: 10,
  } satisfies TeamIdNotificationsGetRequest;

  try {
    const data = await api.teamIdNotificationsGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name       | Type            | Description             | Notes                                                    |
| ---------- | --------------- | ----------------------- | -------------------------------------------------------- |
| **teamId** | `string`        |                         | [Defaults to `undefined`]                                |
| **isRead** | `true`, `false` | 읽음 여부로 필터링      | [Optional] [Defaults to `undefined`] [Enum: true, false] |
| **cursor** | `string`        | 다음 페이지를 위한 커서 | [Optional] [Defaults to `undefined`]                     |
| **size**   | `number`        | 페이지 크기 (1-100)     | [Optional] [Defaults to `10`]                            |

### Return type

[**NotificationList**](NotificationList.md)

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

## teamIdNotificationsNotificationIdDelete

> TeamIdMeetingsMeetingIdDelete200Response teamIdNotificationsNotificationIdDelete(teamId, notificationId)

알림 삭제

특정 알림을 삭제합니다.

### Example

```ts
import { Configuration, NotificationsApi } from '';
import type { TeamIdNotificationsNotificationIdDeleteRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new NotificationsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    notificationId: 1,
  } satisfies TeamIdNotificationsNotificationIdDeleteRequest;

  try {
    const data = await api.teamIdNotificationsNotificationIdDelete(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name               | Type     | Description | Notes                     |
| ------------------ | -------- | ----------- | ------------------------- |
| **teamId**         | `string` |             | [Defaults to `undefined`] |
| **notificationId** | `number` |             | [Defaults to `undefined`] |

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
| **404**     | 알림 없음   | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdNotificationsNotificationIdReadPut

> Notification teamIdNotificationsNotificationIdReadPut(teamId, notificationId)

알림 읽음 처리

특정 알림을 읽음으로 표시합니다.

### Example

```ts
import { Configuration, NotificationsApi } from '';
import type { TeamIdNotificationsNotificationIdReadPutRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new NotificationsApi(config);

  const body = {
    // string
    teamId: dallaem,
    // number
    notificationId: 1,
  } satisfies TeamIdNotificationsNotificationIdReadPutRequest;

  try {
    const data = await api.teamIdNotificationsNotificationIdReadPut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name               | Type     | Description | Notes                     |
| ------------------ | -------- | ----------- | ------------------------- |
| **teamId**         | `string` |             | [Defaults to `undefined`] |
| **notificationId** | `number` |             | [Defaults to `undefined`] |

### Return type

[**Notification**](Notification.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | 처리 성공   | -                |
| **401**     | 인증 필요   | -                |
| **404**     | 알림 없음   | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdNotificationsReadAllPut

> TeamIdNotificationsDelete200Response teamIdNotificationsReadAllPut(teamId)

모든 알림 읽음 처리

모든 읽지 않은 알림을 읽음으로 표시합니다.

### Example

```ts
import { Configuration, NotificationsApi } from '';
import type { TeamIdNotificationsReadAllPutRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new NotificationsApi(config);

  const body = {
    // string
    teamId: dallaem,
  } satisfies TeamIdNotificationsReadAllPutRequest;

  try {
    const data = await api.teamIdNotificationsReadAllPut(body);
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

[**TeamIdNotificationsDelete200Response**](TeamIdNotificationsDelete200Response.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | 처리 성공   | -                |
| **401**     | 인증 필요   | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## teamIdNotificationsUnreadCountGet

> TeamIdNotificationsDelete200Response teamIdNotificationsUnreadCountGet(teamId)

읽지 않은 알림 수 조회

현재 사용자의 읽지 않은 알림 수를 조회합니다.

### Example

```ts
import { Configuration, NotificationsApi } from '';
import type { TeamIdNotificationsUnreadCountGetRequest } from '';

async function example() {
  console.log('🚀 Testing  SDK...');
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: 'YOUR BEARER TOKEN',
  });
  const api = new NotificationsApi(config);

  const body = {
    // string
    teamId: dallaem,
  } satisfies TeamIdNotificationsUnreadCountGetRequest;

  try {
    const data = await api.teamIdNotificationsUnreadCountGet(body);
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

[**TeamIdNotificationsDelete200Response**](TeamIdNotificationsDelete200Response.md)

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
