# CreateComment

## Properties

| Name      | Type   |
| --------- | ------ |
| `content` | string |

## Example

```typescript
import type { CreateComment } from ''

// TODO: Update the object below with actual values
const example = {
  "content": 좋은 글이네요!,
} satisfies CreateComment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateComment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
