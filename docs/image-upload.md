# 이미지 업로드 가이드

이 문서는 **이미지 업로드 로직**의 동작 방식 및 사용법을 설명합니다.

---

## 1. 이미지 업로드 로직 (Image Upload Logic)

이미지 업로드는 보안과 효율성을 위해 **S3 Presigned URL** 방식을 사용하여 클라이언트에서 S3로 직접 업로드합니다.

### 아키텍처 (Service Layer)

- **파일 위치**: `src/services/images/`
- **핵심 파일**:
  - `images.api.ts`: API 통신 정의 (Presigned URL 발급 및 S3 PUT 요청)
  - `images.queries.ts`: TanStack Query를 사용한 `useUploadImage` 훅

### 동작 순서

1. **Presigned URL 발급**: 백엔드(`POST /images`)에 파일명, 타입, 저장 폴더 정보를 보내 S3 업로드용 URL과 최종 접근용 Public URL을 받습니다.
2. **S3 직접 업로드**: 발급받은 Presigned URL을 사용하여 `fetch` (PUT)로 파일을 S3에 직접 전송합니다.
3. **결과 반환**: 업로드가 성공하면 최종 이미지 주소(`publicUrl`)를 반환합니다.

### 사용법 (Usage)

`useUploadImage` 훅을 호출하여 `mutateAsync`를 통해 업로드를 실행합니다.

```tsx
const { mutateAsync, isPending } = useUploadImage('meetings'); // 'meetings' 폴더에 저장

const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const publicUrl = await mutateAsync(file); // 업로드 실행 및 URL 획득
  if (publicUrl) {
    setValue('image', publicUrl); // 폼의 'image' 필드에 저장
  }
};
```
