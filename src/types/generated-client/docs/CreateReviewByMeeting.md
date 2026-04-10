# CreateReviewByMeeting

## Properties

| Name      | Type   |
| --------- | ------ |
| `score`   | number |
| `comment` | string |

## Example

```typescript
import type { CreateReviewByMeeting } from ''

// TODO: Update the object below with actual values
const example = {
  "score": 5,
  "comment": 정말 좋은 모임이었습니다!,
} satisfies CreateReviewByMeeting

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateReviewByMeeting
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
