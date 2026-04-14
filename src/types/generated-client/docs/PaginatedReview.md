# PaginatedReview

## Properties

| Name         | Type                                                   |
| ------------ | ------------------------------------------------------ |
| `data`       | [Array&lt;ReviewWithDetails&gt;](ReviewWithDetails.md) |
| `nextCursor` | string                                                 |
| `hasMore`    | boolean                                                |

## Example

```typescript
import type { PaginatedReview } from ''

// TODO: Update the object below with actual values
const example = {
  "data": [{id=1, teamId=dallaem, meetingId=10, userId=2, score=5, comment=너무 좋았어요!, createdAt=2026-02-01T20:00:00.000Z, updatedAt=2026-02-01T20:00:00.000Z, user={id=2, email=chulsoo@example.com, name=김철수, image=null}, meeting={id=10, name=달램핏 모임, type=달램핏, region=건대입구, image=https://example.com/meeting.jpg, dateTime=2026-02-10T14:00:00.000Z}}],
  "nextCursor": eyJpZCI6MTB9,
  "hasMore": true,
} satisfies PaginatedReview

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PaginatedReview
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
