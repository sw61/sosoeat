# AuthTokens

## Properties

| Name           | Type   |
| -------------- | ------ |
| `accessToken`  | string |
| `refreshToken` | string |

## Example

```typescript
import type { AuthTokens } from ''

// TODO: Update the object below with actual values
const example = {
  "accessToken": eyJhbGciOiJIUzI1NiIs...,
  "refreshToken": eyJhbGciOiJIUzI1NiIs...,
} satisfies AuthTokens

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AuthTokens
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
