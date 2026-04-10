# JoinedMeeting

## Properties

| Name               | Type            |
| ------------------ | --------------- |
| `id`               | number          |
| `teamId`           | string          |
| `name`             | string          |
| `type`             | string          |
| `region`           | string          |
| `address`          | string          |
| `latitude`         | number          |
| `longitude`        | number          |
| `dateTime`         | Date            |
| `registrationEnd`  | Date            |
| `capacity`         | number          |
| `participantCount` | number          |
| `image`            | string          |
| `description`      | string          |
| `canceledAt`       | Date            |
| `confirmedAt`      | Date            |
| `hostId`           | number          |
| `createdBy`        | number          |
| `createdAt`        | Date            |
| `updatedAt`        | Date            |
| `host`             | [Host](Host.md) |
| `isFavorited`      | boolean         |
| `isJoined`         | boolean         |
| `isCompleted`      | boolean         |
| `joinedAt`         | Date            |
| `isReviewed`       | boolean         |

## Example

```typescript
import type { JoinedMeeting } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 1,
  "teamId": dallaem,
  "name": 달램핏 모임,
  "type": 달램핏,
  "region": 건대입구,
  "address": 서울시 광진구 자양동 123-45,
  "latitude": 37.5407,
  "longitude": 127.0693,
  "dateTime": 2026-02-10T14:00:00.000Z,
  "registrationEnd": 2026-02-09T23:59:59.000Z,
  "capacity": 10,
  "participantCount": 5,
  "image": https://example.com/meeting.jpg,
  "description": 함께 운동하며 건강을 챙겨요!,
  "canceledAt": null,
  "confirmedAt": null,
  "hostId": 1,
  "createdBy": 1,
  "createdAt": 2026-02-01T10:00:00.000Z,
  "updatedAt": 2026-02-01T10:00:00.000Z,
  "host": null,
  "isFavorited": false,
  "isJoined": false,
  "isCompleted": false,
  "joinedAt": 2026-02-01T10:00:00.000Z,
  "isReviewed": false,
} satisfies JoinedMeeting

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoinedMeeting
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
