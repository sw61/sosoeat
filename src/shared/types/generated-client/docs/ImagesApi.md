# ImagesApi

All URIs are relative to *https://together-dallaem-api.vercel.app*

| Method                                                | HTTP request              | Description                        |
| ----------------------------------------------------- | ------------------------- | ---------------------------------- |
| [**teamIdImagesPost**](ImagesApi.md#teamidimagespost) | **POST** /{teamId}/images | 이미지 업로드 (Presigned URL 발급) |

## teamIdImagesPost

> PresignedUrlResponse teamIdImagesPost(teamId, presignedUrlRequest)

이미지 업로드 (Presigned URL 발급)

S3 직접 업로드를 위한 presigned URL을 발급합니다. **사용 흐름:** 1. 이 엔드포인트로 presigned URL 발급 2. 발급받은 presignedUrl로 PUT 요청 (body: 파일, Content-Type 헤더 필수) 3. publicUrl을 서버에 저장/표시용으로 사용 **지원 형식:** JPEG, PNG, WebP, GIF **URL 유효 시간:** 5분

### Example

```ts
import {
  Configuration,
  ImagesApi,
} from '';
import type { TeamIdImagesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ImagesApi(config);

  const body = {
    // string
    teamId: dallaem,
    // PresignedUrlRequest (optional)
    presignedUrlRequest: ...,
  } satisfies TeamIdImagesPostRequest;

  try {
    const data = await api.teamIdImagesPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                    | Type                                          | Description | Notes                     |
| ----------------------- | --------------------------------------------- | ----------- | ------------------------- |
| **teamId**              | `string`                                      |             | [Defaults to `undefined`] |
| **presignedUrlRequest** | [PresignedUrlRequest](PresignedUrlRequest.md) |             | [Optional]                |

### Return type

[**PresignedUrlResponse**](PresignedUrlResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                                               | Response headers |
| ----------- | --------------------------------------------------------- | ---------------- |
| **200**     | Presigned URL 발급 성공                                   | -                |
| **400**     | 잘못된 요청: - INVALID_FILE_TYPE: 지원하지 않는 파일 형식 | -                |
| **401**     | 인증 필요 - Bearer 토큰이 없거나 유효하지 않음            | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
