# LikedMeetingBadge

navigation에서 찜한 모임 카운트를 시각적으로 보여주는 배지 컴포넌트입니다.

---

## 위치 선정 이유

navigation에서 2번 사용되는 컴포넌트이기 때문에 `navigation-bar/` 폴더 아래에 위치시켰습니다.

---

## react-query 사용 이유

`NavigationBar`는 모든 페이지에 렌더링됩니다.
`fetch`를 직접 사용하면 페이지 이동 시마다 API를 새로 호출하게 되므로, `react-query`의 캐싱을 활용해 불필요한 재요청을 방지합니다.

---

## 로딩 처리

로딩 중에는 `null`을 반환해 배지를 숨깁니다.
`0`을 표시하면 "찜한 모임이 없다"는 의미로 오해할 수 있기 때문입니다.

---

## Props

없음.

```tsx
<LikedMeetingBadge />
```

---

## 찜 버튼과의 연동

react-query는 캐시를 자동으로 갱신하지 않습니다.
찜 버튼 컴포넌트에서 찜 액션 성공 후 아래 코드로 캐시를 무효화해야 카운트가 즉시 반영됩니다.

```tsx
queryClient.invalidateQueries({ queryKey: ['likedMeetingCount'] });
```

---

## 의존성

| 항목                    | 설명                                         |
| :---------------------- | :------------------------------------------- |
| `@tanstack/react-query` | `likedMeetingCount` 키로 카운트 캐싱 및 조회 |
