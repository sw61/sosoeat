# ReviewWithDetails

## Properties

| Name        | Type                                                              |
| ----------- | ----------------------------------------------------------------- |
| `id`        | number                                                            |
| `teamId`    | string                                                            |
| `meetingId` | number                                                            |
| `userId`    | number                                                            |
| `score`     | number                                                            |
| `comment`   | string                                                            |
| `createdAt` | Date                                                              |
| `updatedAt` | Date                                                              |
| `user`      | [ParticipantUser](ParticipantUser.md)                             |
| `meeting`   | [ReviewWithDetailsAllOfMeeting](ReviewWithDetailsAllOfMeeting.md) |

## Example

```typescript
import type { ReviewWithDetails } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 1,
  "teamId": dallaem,
  "meetingId": 10,
  "userId": 2,
  "score": 5,
  "comment": 너무 좋았어요!,
  "createdAt": 2026-02-01T20:00:00.000Z,
  "updatedAt": 2026-02-01T20:00:00.000Z,
  "user": null,
  "meeting": null,
} satisfies ReviewWithDetails

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ReviewWithDetails
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
