# NotificationList

## Properties

| Name         | Type                                         |
| ------------ | -------------------------------------------- |
| `data`       | [Array&lt;Notification&gt;](Notification.md) |
| `nextCursor` | string                                       |
| `hasMore`    | boolean                                      |

## Example

```typescript
import type { NotificationList } from '';

// TODO: Update the object below with actual values
const example = {
  data: null,
  nextCursor: null,
  hasMore: null,
} satisfies NotificationList;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as NotificationList;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
