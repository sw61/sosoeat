# CreatePost

## Properties

| Name      | Type   |
| --------- | ------ |
| `title`   | string |
| `content` | string |
| `image`   | string |

## Example

```typescript
import type { CreatePost } from ''

// TODO: Update the object below with actual values
const example = {
  "title": 달램핏 후기,
  "content": 정말 좋은 모임이었습니다.,
  "image": https://example.com/image.jpg,
} satisfies CreatePost

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreatePost
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
