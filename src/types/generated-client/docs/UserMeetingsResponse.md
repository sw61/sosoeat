# UserMeetingsResponse

## Properties

| Name         | Type                                       |
| ------------ | ------------------------------------------ |
| `data`       | [Array&lt;UserMeeting&gt;](UserMeeting.md) |
| `nextCursor` | string                                     |
| `hasMore`    | boolean                                    |

## Example

```typescript
import type { UserMeetingsResponse } from '';

// TODO: Update the object below with actual values
const example = {
  data: null,
  nextCursor: null,
  hasMore: null,
} satisfies UserMeetingsResponse;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserMeetingsResponse;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
