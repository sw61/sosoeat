# Comment

## Properties

| Name        | Type                |
| ----------- | ------------------- |
| `id`        | number              |
| `teamId`    | string              |
| `postId`    | number              |
| `authorId`  | number              |
| `author`    | [Author](Author.md) |
| `content`   | string              |
| `createdAt` | Date                |
| `updatedAt` | Date                |

## Example

```typescript
import type { Comment } from '';

// TODO: Update the object below with actual values
const example = {
  id: null,
  teamId: null,
  postId: null,
  authorId: null,
  author: null,
  content: null,
  createdAt: null,
  updatedAt: null,
} satisfies Comment;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Comment;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
