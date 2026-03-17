# PR 제목: [Feat]: 드롭다운 컴포넌트 구현 및 className props 추가 (#8)

### 📌 유형 (Type)

다음 중 PR의 성격에 해당하는 항목에 `[x]`를 표시해주세요.

- [x] **Feat (기능):** 새로운 기능 추가
- [ ] **Fix (버그 수정):** 버그 수정
- [ ] **Refactor (리팩토링):** 코드 구조/개선 (기능 변경 없음)
- [ ] **Docs (문서):** 문서 관련 변경 (README, Wiki 등)
- [ ] **Style (스타일):** 코드 포맷, 세미콜론 누락 등 (코드 동작에 영향 없음)
- [ ] **Chore (기타):** 빌드 시스템, 라이브러리 업데이트, 설정 등

### 📝 변경 사항 (Changes)

이 PR에서 변경된 내용을 **간결하고 명확하게** 설명해주세요.

- 어떤 문제가 있었는지? (이슈 번호 명시 권장: #8)
- 무엇을 어떻게 변경했는지?

> - **#8** 네비게이션·설정 메뉴, 지역 선택 등에서 사용할 드롭다운 컴포넌트가 없어 Radix UI 기반으로 구현했습니다.
> - **DropdownSimple**: 서브메뉴 없는 단순 드롭다운 (플랫 옵션, 단일 선택, 토글)을 추가했습니다.
> - **DropdownSub**: 카테고리별 옵션을 가진 드롭다운 (지역 선택 등에 사용)을 추가했습니다.
> - **Tailwind className 지원**: `triggerClassName`, `contentClassName`, `itemClassName` props를 추가해 스타일 커스터마이징을 지원합니다.
> - **index 중심**: `@/components/ui/dropdown`에서 통합 export 및 import 구조로 정리했습니다.
> - **regionData**: `korea-regions-districts.json` 기반 지역 데이터를 index에서 export합니다.
> - **docs/ISSUE-8.md**: 구현 내용을 문서화했습니다.

### 🧪 테스트 방법 (How to Test)

변경 사항을 확인하기 위해 **테스트해야 할 단계나 시나리오**를 상세히 설명해주세요.

1. `npm run storybook`으로 Storybook을 실행합니다.
2. **DropdownSimple** 스토리에서 트리거 클릭 → 옵션 선택 → 체크 표시 → 같은 항목 재클릭 시 체크 해제가 되는지 확인합니다.
3. **DropdownSub** 스토리에서 트리거 클릭 → 옵션 선택 → 체크 표시 → 같은 항목 재클릭 시 체크 해제가 되는지 확인합니다.
4. `triggerClassName`, `itemClassName` 등 props로 전달한 스타일이 적용되는지 확인합니다.
5. 선택 후에도 메뉴가 닫히지 않고 유지되는지 확인합니다.

### 📸 스크린샷 또는 영상 (Optional)

(UI/UX 변경 사항이 있을 경우, 변경 전/후 스크린샷이나 동작 영상 첨부)

| 변경 전 (Before) |                  변경 후 (After)                   |
| :--------------: | :------------------------------------------------: |
|  드롭다운 없음   | DropdownSimple, DropdownSub 드롭다운 컴포넌트 추가 |

### 🚨 기타 참고 사항 (Notes)

- [ ] **코드 리뷰 시 특별히 확인이 필요한 부분이 있다면 명시해주세요.**
- [ ] **배포 시점에 고려해야 할 사항이 있다면 명시해주세요.**

- `className` props는 선택적이며, `DropdownMenuContent`의 `cn()` 사용으로 기존 스타일과 병합됩니다.
- `regionData`는 `@/components/ui/dropdown`에서 import하여 사용할 수 있습니다.
