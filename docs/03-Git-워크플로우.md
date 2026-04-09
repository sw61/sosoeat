# 03 📝 Git 워크플로우 & 커밋 컨벤션

## 커밋 메시지

Angular 스타일의 커밋 메시지 형식을 따릅니다.

```
type: description

optional body
```

### 커밋 타입

| 타입       | 설명                              | 예시                       |
| :--------- | :-------------------------------- | :------------------------- |
| `feat`     | 새로운 기능 추가                  | `feat: 로그인 페이지 구현` |
| `fix`      | 버그 수정                         | `fix: 댓글 삭제 오류 해결` |
| `docs`     | 문서 추가/변경                    | `docs: README 업데이트`    |
| `style`    | 코드 스타일 변경 (기능 변화 없음) | `style: 들여쓰기 정렬`     |
| `refactor` | 코드 리팩토링 (기능 변화 없음)    | `refactor: 인증 로직 정리` |
| `test`     | 테스트 추가/변경                  | `test: 로그인 테스트 추가` |
| `chore`    | 빌드, 의존성 등 유지보수 작업     | `chore: 패키지 업데이트`   |

### 예시

```
feat: 모임 검색 필터 기능 추가

- 카테고리별 필터링 추가
- 날짜 범위 선택 기능
- 정렬 옵션 구현
```

---

## Pre-commit 훅

커밋 전 자동으로 다음 검사가 실행됩니다:

1. **TypeScript 타입 체크** (`npm run type-check`)
2. **코드 포맷팅** (`npm run format`)
3. **Linting** (`npm run lint`)
4. **관련 Jest 테스트** (변경된 파일 관련 테스트만)

이 중 하나라도 실패하면 커밋이 중단되므로, 반드시 수정 후 다시 커밋해야 합니다.

### 훅 실패 시 대응

```bash
# 1. 타입 에러 수정
npm run type-check

# 2. 코드 포맷팅
npm run format

# 3. Lint 에러 수정
npm run lint

# 4. 관련 테스트 통과 확인
npm run test

# 5. 다시 커밋
git commit -m "type: description"
```

---

## 브랜치 전략

### 브랜치 네이밍

```
type/#issue-number-description
```

**형식**:

- `feat/#123-login-page` — 새 기능
- `fix/#456-auth-error` — 버그 수정
- `docs/#789-readme` — 문서

자세한 내용은 👉 **[프로젝트 컨벤션 가이드](./CONVENTION.md#-브랜치-및-커밋-전략)** 참고
