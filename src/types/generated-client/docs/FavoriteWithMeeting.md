# FavoriteWithMeeting

## Properties

| Name        | Type                                  |
| ----------- | ------------------------------------- |
| `id`        | number                                |
| `teamId`    | string                                |
| `meetingId` | number                                |
| `userId`    | number                                |
| `createdAt` | Date                                  |
| `meeting`   | [MeetingWithHost](MeetingWithHost.md) |

## Example

```typescript
import type { FavoriteWithMeeting } from '';

// TODO: Update the object below with actual values
const example = {
  id: null,
  teamId: null,
  meetingId: null,
  userId: null,
  createdAt: null,
  meeting: null,
} satisfies FavoriteWithMeeting;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FavoriteWithMeeting;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
