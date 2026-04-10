# Participant

## Properties

| Name        | Type                                  |
| ----------- | ------------------------------------- |
| `id`        | number                                |
| `teamId`    | string                                |
| `meetingId` | number                                |
| `userId`    | number                                |
| `joinedAt`  | Date                                  |
| `user`      | [ParticipantUser](ParticipantUser.md) |

## Example

```typescript
import type { Participant } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 1,
  "teamId": dallaem,
  "meetingId": 1,
  "userId": 2,
  "joinedAt": 2026-02-01T10:00:00.000Z,
  "user": null,
} satisfies Participant

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Participant
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
