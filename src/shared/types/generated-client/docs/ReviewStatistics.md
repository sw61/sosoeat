# ReviewStatistics

## Properties

| Name           | Type   |
| -------------- | ------ |
| `averageScore` | number |
| `totalReviews` | number |
| `oneStar`      | number |
| `twoStars`     | number |
| `threeStars`   | number |
| `fourStars`    | number |
| `fiveStars`    | number |

## Example

```typescript
import type { ReviewStatistics } from '';

// TODO: Update the object below with actual values
const example = {
  averageScore: 4.5,
  totalReviews: 42,
  oneStar: 1,
  twoStars: 2,
  threeStars: 5,
  fourStars: 14,
  fiveStars: 20,
} satisfies ReviewStatistics;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ReviewStatistics;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
