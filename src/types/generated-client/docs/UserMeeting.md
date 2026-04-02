# UserMeeting

## Properties

| Name               | Type    |
| ------------------ | ------- |
| `id`               | number  |
| `name`             | string  |
| `dateTime`         | Date    |
| `region`           | string  |
| `participantCount` | number  |
| `capacity`         | number  |
| `isReviewed`       | boolean |
| `role`             | string  |

## Example

```typescript
import type { UserMeeting } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 1,
  "name": 달램핏 모임,
  "dateTime": 2026-02-10T14:00:00Z,
  "region": 강남,
  "participantCount": 5,
  "capacity": 10,
  "isReviewed": false,
  "role": participant,
} satisfies UserMeeting

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserMeeting
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
