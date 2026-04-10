# MeetingList

## Properties

| Name            | Type                                               |
| --------------- | -------------------------------------------------- |
| `data`          | [Array&lt;MeetingWithHost&gt;](MeetingWithHost.md) |
| `nextCursor`    | string                                             |
| `hasMore`       | boolean                                            |
| `totalCount`    | number                                             |
| `currentOffset` | number                                             |
| `limit`         | number                                             |

## Example

```typescript
import type { MeetingList } from '';

// TODO: Update the object below with actual values
const example = {
  data: null,
  nextCursor: null,
  hasMore: null,
  totalCount: null,
  currentOffset: null,
  limit: null,
} satisfies MeetingList;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MeetingList;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
