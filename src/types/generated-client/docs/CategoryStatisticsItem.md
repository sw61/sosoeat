# CategoryStatisticsItem

## Properties

| Name           | Type   |
| -------------- | ------ |
| `type`         | string |
| `averageScore` | number |
| `totalReviews` | number |
| `oneStar`      | number |
| `twoStars`     | number |
| `threeStars`   | number |
| `fourStars`    | number |
| `fiveStars`    | number |

## Example

```typescript
import type { CategoryStatisticsItem } from '';

// TODO: Update the object below with actual values
const example = {
  type: 달램핏,
  averageScore: 4.7,
  totalReviews: 28,
  oneStar: 1,
  twoStars: 2,
  threeStars: 3,
  fourStars: 8,
  fiveStars: 14,
} satisfies CategoryStatisticsItem;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CategoryStatisticsItem;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
