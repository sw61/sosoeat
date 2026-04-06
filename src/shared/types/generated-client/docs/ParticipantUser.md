# ParticipantUser

## Properties

| Name    | Type   |
| ------- | ------ |
| `id`    | number |
| `name`  | string |
| `image` | string |

## Example

```typescript
import type { ParticipantUser } from '';

// TODO: Update the object below with actual values
const example = {
  id: 2,
  name: 김철수,
  image: null,
} satisfies ParticipantUser;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ParticipantUser;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
