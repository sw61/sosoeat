# PublicUser

## Properties

| Name          | Type   |
| ------------- | ------ |
| `id`          | number |
| `teamId`      | string |
| `email`       | string |
| `name`        | string |
| `companyName` | string |
| `image`       | string |

## Example

```typescript
import type { PublicUser } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 1,
  "teamId": dallaem,
  "email": test@example.com,
  "name": 홍길동,
  "companyName": 코드잇,
  "image": null,
} satisfies PublicUser

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PublicUser
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
