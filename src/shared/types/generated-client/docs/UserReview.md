# UserReview

## Properties

| Name        | Type                                      |
| ----------- | ----------------------------------------- |
| `id`        | number                                    |
| `score`     | number                                    |
| `comment`   | string                                    |
| `meetingId` | number                                    |
| `meeting`   | [UserReviewMeeting](UserReviewMeeting.md) |
| `createdAt` | Date                                      |

## Example

```typescript
import type { UserReview } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 1,
  "score": 5,
  "comment": 너무 좋았어요!,
  "meetingId": 123,
  "meeting": null,
  "createdAt": 2026-02-01T20:00:00Z,
} satisfies UserReview

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserReview
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
