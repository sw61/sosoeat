# MeetingType

## Properties

| Name          | Type   |
| ------------- | ------ |
| `id`          | number |
| `teamId`      | string |
| `name`        | string |
| `description` | string |
| `createdAt`   | Date   |

## Example

```typescript
import type { MeetingType } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 1,
  "teamId": team-1,
  "name": 달램핏,
  "description": 달램핏 모임입니다,
  "createdAt": 2026-01-28T12:00:00.000Z,
} satisfies MeetingType

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MeetingType
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
