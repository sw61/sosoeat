# JoinedMeetingList

## Properties

| Name         | Type                                           |
| ------------ | ---------------------------------------------- |
| `data`       | [Array&lt;JoinedMeeting&gt;](JoinedMeeting.md) |
| `nextCursor` | string                                         |
| `hasMore`    | boolean                                        |

## Example

```typescript
import type { JoinedMeetingList } from '';

// TODO: Update the object below with actual values
const example = {
  data: null,
  nextCursor: null,
  hasMore: null,
} satisfies JoinedMeetingList;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoinedMeetingList;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
