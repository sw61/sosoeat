# CreateMeeting

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
import type { CreateMeeting } from ''

// TODO: Update the object below with actual values
const example = {
  "name": 달램핏 모임,
  "type": 달램핏,
  "region": 서울 강남구,
  "address": 스타벅스 강남역점, 서울 강남구 강남대로 390, 3층,
  "latitude": 37.4979,
  "longitude": 127.0276,
  "dateTime": 2026-02-01T14:00:00.000Z,
  "registrationEnd": 2026-01-31T23:59:59.000Z,
  "capacity": 20,
  "image": https://example.com/image.jpg,
  "description": 함께 운동하며 건강을 챙겨요!,
} satisfies CreateMeeting

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateMeeting
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
