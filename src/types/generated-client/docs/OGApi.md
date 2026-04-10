# OGApi

All URIs are relative to *https://together-dallaem-api.vercel.app*

| Method                      | HTTP request | Description                      |
| --------------------------- | ------------ | -------------------------------- |
| [**ogGet**](OGApi.md#ogget) | **GET** /og  | URL의 Open Graph 메타데이터 조회 |

## ogGet

> OgMetadata ogGet(url)

URL의 Open Graph 메타데이터 조회

주어진 URL에서 Open Graph 메타데이터(제목, 설명, 이미지 등)를 파싱하여 반환합니다.

### Example

```ts
import {
  Configuration,
  OGApi,
} from '';
import type { OgGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new OGApi(config);

  const body = {
    // string | OG 메타데이터를 가져올 URL
    url: https://example.com,
  } satisfies OgGetRequest;

  try {
    const data = await api.ogGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name    | Type     | Description                | Notes                     |
| ------- | -------- | -------------------------- | ------------------------- |
| **url** | `string` | OG 메타데이터를 가져올 URL | [Defaults to `undefined`] |

### Return type

[**OgMetadata**](OgMetadata.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                          | Response headers |
| ----------- | ------------------------------------ | ---------------- |
| **200**     | OG 메타데이터 조회 성공              | -                |
| **400**     | 잘못된 URL                           | -                |
| **502**     | 대상 URL에서 데이터를 가져올 수 없음 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
