# UpdateMeetingType

## Properties

| Name          | Type   |
| ------------- | ------ |
| `name`        | string |
| `description` | string |

## Example

```typescript
import type { UpdateMeetingType } from ''

// TODO: Update the object below with actual values
const example = {
  "name": 달램핏,
  "description": 달램핏 모임입니다,
} satisfies UpdateMeetingType

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateMeetingType
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
