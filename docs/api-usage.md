# 같이 달램 API 사용 가이드

생성된 TypeScript API 클라이언트 사용법을 정리합니다.

---

## 1. 설정

### 1.1 api-client.ts

`src/lib/api-client.ts`에서 API 인스턴스를 import하여 사용합니다.

```typescript
import { authApi, meetingsApi, usersApi } from '@/lib/api-client';
```

### 1.2 환경 변수

`.env.local`에 백엔드 URL을 설정합니다.

```
NEXT_PUBLIC_API_BASE_URL=https://dallaem-backend.vercel.app
```

### 1.3 teamId

같이 달램 API의 모든 경로에는 `teamId`가 포함됩니다. 기본값: `dallaem`

---

## 2. 인증 (AuthApi)

| 메서드                  | 용도               | 인증 |
| ----------------------- | ------------------ | ---- |
| `teamIdAuthSignupPost`  | 회원가입           | ❌   |
| `teamIdAuthLoginPost`   | 로그인             | ❌   |
| `teamIdAuthRefreshPost` | 토큰 갱신          | ❌   |
| `teamIdAuthLogoutPost`  | 로그아웃           | ✅   |
| `teamIdAuthGoogleGet`   | 구글 로그인 시작   | ❌   |
| `teamIdAuthKakaoGet`    | 카카오 로그인 시작 | ❌   |

**로그인 예시:**

```typescript
const result = await authApi.teamIdAuthLoginPost({
  teamId: 'dallaem',
  loginRequest: { email: 'test@example.com', password: 'password123' },
});
// result: { user, accessToken, refreshToken }
```

**회원가입 예시:**

```typescript
const user = await authApi.teamIdAuthSignupPost({
  teamId: 'dallaem',
  signupRequest: {
    email: 'new@example.com',
    password: 'password123',
    name: '홍길동',
    companyName: '코드잇',
  },
});
```

---

## 3. 유저 (UsersApi)

| 메서드                     | 용도                  | 인증 |
| -------------------------- | --------------------- | ---- |
| `teamIdUsersMeGet`         | 내 정보 조회          | ✅   |
| `teamIdUsersMePatch`       | 내 정보 수정          | ✅   |
| `teamIdUsersUserIdGet`     | 다른 유저 프로필 조회 | ❌   |
| `teamIdUsersMeMeetingsGet` | 내 모임 목록          | ✅   |
| `teamIdUsersMeReviewsGet`  | 내 리뷰 목록          | ✅   |

**내 정보 조회 (accessToken 필요):**

```typescript
const me = await usersApi.teamIdUsersMeGet({ teamId: 'dallaem' });
// me: User
```

## npm run generate:api

자세한 정보는 src\types\generated-client\docs

## 4. 모임 (MeetingsApi)

| 메서드                                   | 용도             | 인증 |
| ---------------------------------------- | ---------------- | ---- |
| `teamIdMeetingsGet`                      | 모임 목록        | ❌   |
| `teamIdMeetingsPost`                     | 모임 생성        | ✅   |
| `teamIdMeetingsMeetingIdGet`             | 모임 상세        | ❌   |
| `teamIdMeetingsMeetingIdPatch`           | 모임 수정        | ✅   |
| `teamIdMeetingsMeetingIdDelete`          | 모임 삭제        | ✅   |
| `teamIdMeetingsMeetingIdJoinPost`        | 참여             | ✅   |
| `teamIdMeetingsMeetingIdJoinDelete`      | 참여 취소        | ✅   |
| `teamIdMeetingsMeetingIdParticipantsGet` | 참가자 목록      | ❌   |
| `teamIdMeetingsMeetingIdStatusPatch`     | 모임 확정/취소   | ✅   |
| `teamIdMeetingsJoinedGet`                | 내가 참여한 모임 | ✅   |
| `teamIdMeetingsMyGet`                    | 내가 만든 모임   | ✅   |

**모임 목록 조회:**

```typescript
const list = await meetingsApi.teamIdMeetingsGet({
  teamId: 'dallaem',
  type: '달램핏',
  region: '강남',
  size: 10,
});
// list: { data: MeetingWithHost[], nextCursor, hasMore }
```

**모임 생성:**

```typescript
const meeting = await meetingsApi.teamIdMeetingsPost({
  teamId: 'dallaem',
  createMeeting: {
    name: '달램핏 모임',
    type: '달램핏',
    region: '서울 강남구',
    address: '스타벅스 강남역점',
    latitude: 37.4979,
    longitude: 127.0276,
    dateTime: '2026-02-10T14:00:00.000Z',
    registrationEnd: '2026-02-09T23:59:59.000Z',
    capacity: 20,
  },
});
```

---

## 5. 찜 (FavoritesApi)

| 메서드                                   | 용도    | 인증 |
| ---------------------------------------- | ------- | ---- |
| `teamIdFavoritesGet`                     | 찜 목록 | ✅   |
| `teamIdFavoritesCountGet`                | 찜 개수 | ✅   |
| `teamIdMeetingsMeetingIdFavoritesPost`   | 찜 추가 | ✅   |
| `teamIdMeetingsMeetingIdFavoritesDelete` | 찜 해제 | ✅   |

---

## 6. 리뷰 (ReviewsApi)

| 메서드                                 | 용도            | 인증 |
| -------------------------------------- | --------------- | ---- |
| `teamIdReviewsGet`                     | 리뷰 목록       | ❌   |
| `teamIdMeetingsMeetingIdReviewsGet`    | 특정 모임 리뷰  | ❌   |
| `teamIdMeetingsMeetingIdReviewsPost`   | 리뷰 작성       | ✅   |
| `teamIdReviewsReviewIdPatch`           | 리뷰 수정       | ✅   |
| `teamIdReviewsReviewIdDelete`          | 리뷰 삭제       | ✅   |
| `teamIdReviewsStatisticsGet`           | 전체 통계       | ❌   |
| `teamIdReviewsCategoriesStatisticsGet` | 카테고리별 통계 | ❌   |

---

## 7. 게시글 (PostsApi)

| 메서드                          | 용도        | 인증 |
| ------------------------------- | ----------- | ---- |
| `teamIdPostsGet`                | 게시글 목록 | ❌   |
| `teamIdPostsPost`               | 게시글 작성 | ✅   |
| `teamIdPostsPostIdGet`          | 게시글 상세 | ❌   |
| `teamIdPostsPostIdPatch`        | 게시글 수정 | ✅   |
| `teamIdPostsPostIdDelete`       | 게시글 삭제 | ✅   |
| `teamIdPostsPostIdCommentsGet`  | 댓글 목록   | ❌   |
| `teamIdPostsPostIdCommentsPost` | 댓글 작성   | ✅   |
| `teamIdPostsPostIdLikePost`     | 좋아요      | ✅   |
| `teamIdPostsPostIdLikeDelete`   | 좋아요 취소 | ✅   |

---

## 8. 이미지 (ImagesApi)

| 메서드             | 용도               | 인증 |
| ------------------ | ------------------ | ---- |
| `teamIdImagesPost` | Presigned URL 발급 | ✅   |

**사용 흐름:**

1. `teamIdImagesPost` 호출 → `presignedUrl`, `publicUrl` 수신
2. `presignedUrl`로 PUT 요청 (파일 업로드)
3. 저장 시 `publicUrl` 사용

```typescript
const { presignedUrl, publicUrl } = await imagesApi.teamIdImagesPost({
  teamId: 'dallaem',
  presignedUrlRequest: {
    fileName: 'photo.jpg',
    contentType: 'image/jpeg',
    folder: 'meetings',
  },
});
```

---

## 9. 모임 종류 (MeetingTypesApi)

| 메서드                           | 용도           | 인증 |
| -------------------------------- | -------------- | ---- |
| `teamIdMeetingTypesGet`          | 모임 종류 목록 | ❌   |
| `teamIdMeetingTypesPost`         | 모임 종류 생성 | ✅   |
| `teamIdMeetingTypesTypeIdPatch`  | 모임 종류 수정 | ✅   |
| `teamIdMeetingTypesTypeIdDelete` | 모임 종류 삭제 | ✅   |

---

## 10. 알림 (NotificationsApi)

| 메서드                                     | 용도           | 인증 |
| ------------------------------------------ | -------------- | ---- |
| `teamIdNotificationsGet`                   | 알림 목록      | ✅   |
| `teamIdNotificationsReadAllPut`            | 전체 읽음 처리 | ✅   |
| `teamIdNotificationsNotificationIdReadPut` | 알림 읽음      | ✅   |
| `teamIdNotificationsNotificationIdDelete`  | 알림 삭제      | ✅   |

---

## 11. JWT 인증 설정

인증이 필요한 API는 `Configuration`에 `accessToken`을 설정해야 합니다.

```typescript
import { authApi } from '@/lib/api-client';

// 로그인 후
const { accessToken } = await authApi.teamIdAuthLoginPost({ ... });

// accessToken 저장 후, api-client에서 동적으로 전달
const apiConfig = new Configuration({
  basePath: API_BASE_PATH,
  accessToken: () => getStoredAccessToken(), // 저장된 토큰 반환
});
```

---

## 12. 페이지네이션

목록 API는 `cursor`, `size`로 페이지네이션을 지원합니다.

```typescript
let cursor: string | undefined;
const page1 = await meetingsApi.teamIdMeetingsGet({
  teamId: 'dallaem',
  size: 10,
});
cursor = page1.nextCursor ?? undefined;

if (page1.hasMore && cursor) {
  const page2 = await meetingsApi.teamIdMeetingsGet({
    teamId: 'dallaem',
    cursor,
    size: 10,
  });
}
```

---

## 13. 관련 파일

- API 클라이언트: `src/lib/api-client.ts`
- 생성된 타입: `src/types/generated-client/`
- OpenAPI 스펙: https://dallaem-backend.vercel.app/doc
