# NotificationData

## Properties

| Name             | Type   |
| ---------------- | ------ |
| `meetingId`      | number |
| `meetingName`    | string |
| `postId`         | number |
| `postTitle`      | string |
| `commentId`      | number |
| `commentContent` | string |
| `image`          | string |

## Example

```typescript
import type { NotificationData } from '';

// TODO: Update the object below with actual values
const example = {
  meetingId: null,
  meetingName: null,
  postId: null,
  postTitle: null,
  commentId: null,
  commentContent: null,
  image: null,
} satisfies NotificationData;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as NotificationData;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
