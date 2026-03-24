# UpdateUserRequest

## Properties

| Name          | Type   |
| ------------- | ------ |
| `name`        | string |
| `email`       | string |
| `companyName` | string |
| `image`       | string |

## Example

```typescript
import type { UpdateUserRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "name": 김철수,
  "email": new@example.com,
  "companyName": 네이버,
  "image": https://example.com/image.jpg,
} satisfies UpdateUserRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateUserRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
