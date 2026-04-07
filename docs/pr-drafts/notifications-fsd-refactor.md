## PR 제목: [Refactor]: notifications FSD 구조 정리 및 알림 UI 안정화

### 📌 유형 (Type)

다음 중 PR의 성격에 해당하는 항목에 `[x]`를 표시해주세요.

- [x] **Feat (기능):** 새로운 기능 추가
- [ ] **Fix (버그 수정):** 버그 수정
- [x] **Refactor (리팩토링):** 코드 구조/개선 (기능 변경 없음)
- [ ] **Docs (문서):** 문서 관련 변경 (README, Wiki 등)
- [ ] **Style (스타일):** 코드 포맷, 세미콜론 누락 등 (코드 동작에 영향 없음)
- [ ] **Chore (기타):** 빌드 시스템, 라이브러리 업데이트, 설정 등

### 📝 변경 사항 (Changes)

- `NavigationBar`에 `Notification` 컴포넌트를 연결해 실제 알림 벨/패널 UI를 노출했습니다.
- `features/notifications` 내부를 `api / model / ui` 구조로 재정리하고, 중첩된 `hook`, `services`, `repository` 폴더를 정리했습니다.
- TanStack Query 기반 `notificationQueryOptions`, `useNotificationService`를 추가해 알림 목록/미읽음 수 조회 흐름을 정돈했습니다.
- `NotificationTab`, 알림 아이콘, 상대 시간 포맷, `MEETING_DELETED` 타입 처리를 보강했습니다.
- 테스트/스토리북을 갱신하고, 짧은 Tailwind class 상수는 다시 인라인으로 정리했습니다.

### 🧪 테스트 방법 (How to Test)

1. 로컬에서 `npm run dev`를 실행합니다.
2. 로그인 후 `/home`에서 상단 네비게이션 바의 알림 벨을 확인합니다.
3. 데스크톱/모바일 너비에서 알림 패널 또는 다이얼로그가 정상적으로 열리는지 확인합니다.
4. 알림 목록의 제목, 시간(`방금 전`, `N분 전`, `N일 전`)과 unread badge가 노출되는지 확인합니다.
5. 아래 명령어가 통과하는지 확인합니다.
   - `npm run type-check -- --pretty false`
   - `npx jest src/features/notifications --runInBand`

### 📸 스크린샷 또는 영상 (Optional)

| 변경 전 (Before)  |          변경 후 (After)          |
| :---------------: | :-------------------------------: |
| 기존 임시 벨 버튼 | Notification 패널/다이얼로그 연결 |

### 🚨 기타 참고 사항 (Notes)

- [x] **코드 리뷰 시 특별히 확인이 필요한 부분이 있다면 명시해주세요.**
  - FSD 경계(`api/model/ui`) 분리와 import 경로 정리가 의도대로 반영되었는지 확인 부탁드립니다.
- [x] **배포 시점에 고려해야 할 사항이 있다면 명시해주세요.**
  - QA에서 확인된 `"모두 읽기" 후 badge 미갱신`, `next/image` 경고 2건은 후속 작업 예정이며 이번 PR 범위에는 포함하지 않았습니다.
