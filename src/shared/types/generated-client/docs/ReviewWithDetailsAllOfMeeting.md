# ReviewWithDetailsAllOfMeeting

## Properties

| Name       | Type   |
| ---------- | ------ |
| `id`       | number |
| `name`     | string |
| `type`     | string |
| `region`   | string |
| `image`    | string |
| `dateTime` | Date   |

## Example

```typescript
import type { ReviewWithDetailsAllOfMeeting } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 10,
  "name": 달램핏 모임,
  "type": 달램핏,
  "region": 건대입구,
  "image": https://example.com/meeting.jpg,
  "dateTime": 2026-02-10T14:00:00.000Z,
} satisfies ReviewWithDetailsAllOfMeeting

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ReviewWithDetailsAllOfMeeting
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
