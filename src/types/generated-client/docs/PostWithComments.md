# PostWithComments

## Properties

| Name        | Type                                                          |
| ----------- | ------------------------------------------------------------- |
| `id`        | number                                                        |
| `teamId`    | string                                                        |
| `title`     | string                                                        |
| `content`   | string                                                        |
| `image`     | string                                                        |
| `authorId`  | number                                                        |
| `viewCount` | number                                                        |
| `likeCount` | number                                                        |
| `createdAt` | Date                                                          |
| `updatedAt` | Date                                                          |
| `author`    | [PostWithCommentsAllOfAuthor](PostWithCommentsAllOfAuthor.md) |
| `count`     | [PostWithAuthorAllOfCount](PostWithAuthorAllOfCount.md)       |
| `comments`  | [Array&lt;Comment&gt;](Comment.md)                            |
| `isLiked`   | boolean                                                       |

## Example

```typescript
import type { PostWithComments } from '';

// TODO: Update the object below with actual values
const example = {
  id: null,
  teamId: null,
  title: null,
  content: null,
  image: null,
  authorId: null,
  viewCount: null,
  likeCount: null,
  createdAt: null,
  updatedAt: null,
  author: null,
  count: null,
  comments: null,
  isLiked: null,
} satisfies PostWithComments;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PostWithComments;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
