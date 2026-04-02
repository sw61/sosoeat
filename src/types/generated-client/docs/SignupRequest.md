# SignupRequest

## Properties

| Name          | Type   |
| ------------- | ------ |
| `email`       | string |
| `password`    | string |
| `name`        | string |
| `companyName` | string |

## Example

```typescript
import type { SignupRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "email": test@example.com,
  "password": password123,
  "name": 홍길동,
  "companyName": 코드잇,
} satisfies SignupRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SignupRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
