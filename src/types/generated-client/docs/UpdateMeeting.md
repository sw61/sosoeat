# UpdateMeeting

## Properties

| Name              | Type   |
| ----------------- | ------ |
| `name`            | string |
| `type`            | string |
| `region`          | string |
| `address`         | string |
| `latitude`        | number |
| `longitude`       | number |
| `dateTime`        | Date   |
| `registrationEnd` | Date   |
| `capacity`        | number |
| `image`           | string |
| `description`     | string |

## Example

```typescript
import type { UpdateMeeting } from '';

// TODO: Update the object below with actual values
const example = {
  name: null,
  type: null,
  region: null,
  address: null,
  latitude: null,
  longitude: null,
  dateTime: null,
  registrationEnd: null,
  capacity: null,
  image: null,
  description: null,
} satisfies UpdateMeeting;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateMeeting;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
