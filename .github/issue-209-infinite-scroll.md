# [Feature] MeetingsPageInfiniteScroll - 모임 목록 무한 스크롤 전환

## 📋 요약

모임 목록 페이지의 기존 단건 조회(useQuery) 방식을 커서 기반 무한 조회(useInfiniteQuery)로 전환합니다.
react-intersection-observer를 사용해 하단 감지 시 다음 페이지를 자동 요청하고, 필터/정렬 조건은 기존 UX를 유지합니다.

스택: Next.js + TypeScript + TanStack Query + react-intersection-observer

---

## 🎯 목표

- 모임 목록의 다음 페이지를 버튼 없이 자동 로드한다.
- 기존 필터/정렬 상태에서 커서 기반 페이지네이션이 정상 동작한다.
- 로딩/에러/성공 상태를 무한 조회 구조에 맞게 안정적으로 렌더링한다.

---

## ✅ 완료 조건

**무한 조회 전환**

- [x] meetingsQueryOptions에 infiniteOptions를 추가한다.
- [x] useMeetingPage에서 useInfiniteQuery를 사용한다.

**스크롤 트리거 연결**

- [x] MeetingsPage에 useInView를 연결한다.
- [x] inView && hasNextPage 조건에서 fetchNextPage를 호출한다.

**렌더링 및 상태 처리**

- [x] status(pending/error/success) 기반 렌더링으로 정리한다.
- [x] pages.flatMap(page => page.data)로 목록을 누적 렌더링한다.

---

## 🔧 구현 계획

**대상 파일**

```
src/services/meetings/meetings.options.ts
src/app/meetings/usehooks/use-meeting-page.ts
src/app/meetings/page.tsx
package.json
package-lock.json
```

**변경 포인트**

| 항목             | 변경 전          | 변경 후                          |
| ---------------- | ---------------- | -------------------------------- |
| 데이터 조회 훅   | useQuery         | useInfiniteQuery                 |
| 페이징 트리거    | 없음             | useInView + fetchNextPage        |
| 목록 데이터 구조 | meetingList.data | meetingList.pages[].data         |
| 의존성           | 미사용           | react-intersection-observer 추가 |

**사용 예시**

```tsx
const [viewRef, inView] = useInView({ threshold: 0.1 });

useEffect(() => {
  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }
}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
```

---

## 🚫 의도적으로 제외한 기능

- 가상 스크롤(virtualized list) 적용
- 스켈레톤 UI 디자인 리뉴얼
- 서버 API 스펙 변경(응답 필드명 재정의)

---

## 📎 참고 자료

- 사용 예정 화면: /meetings
- 관련 이슈/PR: #209
