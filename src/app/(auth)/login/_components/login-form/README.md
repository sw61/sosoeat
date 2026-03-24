# LoginForm 컴포넌트 문서

`LoginForm`은 사용자의 이메일과 비밀번호를 입력받아 유효성을 검증하고 로그인을 처리하는 독립적인 UI 컴포넌트입니다.

## 📂 파일 구조

```text
login-form/
├── hooks/
│   ├── index.ts          # 훅 배럴 파일
│   └── use-login-form.ts  # 로그인 폼 비즈니스 로직 및 상태 관리
├── login-form.tsx        # 메인 UI 컴포넌트
├── login-form.schema.ts  # Zod 유효성 검사 스키마
├── login-form.types.ts   # 타입 정의
├── login-form.stories.tsx # Storybook 설정
├── login-form.test.tsx    # 단위 테스트
├── index.ts              # 컴포넌트 배럴 파일
└── README.md             # 컴포넌트 기능 명세 (현재 파일)
```

## 🚀 주요 기능

### 1. 비즈니스 로직: `useLoginForm` (커스텀 훅)

폼의 상태 관리와 유효성 검사 및 제출 로직을 담당합니다.

| 반환 객체/함수       | 역할                                               |
| :------------------- | :------------------------------------------------- |
| `register`           | React Hook Form의 필드 등록 함수                   |
| `handleFormSubmit`   | 폼 제출을 처리하는 함수 (유효성 검사 통과 시 실행) |
| `emailError`         | 현재 이메일 필드에 표시할 에러 객체                |
| `passwordError`      | 현재 비밀번호 필드에 표시할 에러 객체              |
| `showPassword`       | 비밀번호 표시/숨기기 상태 (boolean)                |
| `toggleShowPassword` | 비밀번호 표시 상태를 토글하는 함수                 |
| `isPending`          | 로그인 처리 중인지 여부                            |
| `isButtonActive`     | 로그인 버튼의 활성화 상태 (폼이 유효할 때만 true)  |
| `hasEmailError`      | 이메일 에러 존재 여부 (UI 스타일링용)              |
| `hasPasswordError`   | 비밀번호 에러 존재 여부 (UI 스타일링용)            |

**💡 에러 노출 로직 (중요)**
사용자 경험을 위해 다음과 같은 조건(`src/app/(auth)/_components/auth.utils.ts`의 `getAuthFieldError` 사용)에서 에러를 노출합니다:

- **조건**: `(폼이 한 번이라도 제출되었거나 해당 필드에서 포커스가 나갔을 때(blur))` AND `에러가 존재함` AND `값이 비어있지 않음`.
- 처음 입력을 시작할 때는 에러가 나타나지 않으며, 포커스를 잃은 시점부터 실시간으로 검사가 이루어집니다.

### 2. UI 컴포넌트: `LoginForm`

접근성을 고려한 HTML 구조와 스타일링을 제공합니다.

- **`noValidate` 적용**: 브라우저 기본 유효성 검사 대신 Zod와 React Hook Form의 커스텀 검사 로직을 사용합니다.
- **접근성(A11y)**: `Field`, `FieldLabel`, `Input` 등에 `aria-invalid`, `htmlFor`, `id`를 상호 연결하여 스크린 리더 대응이 되어 있습니다.
- **애니메이션**: `getErrorAnimationClasses` 유틸리티를 사용하여 에러 메시지 등장 시 부드러운 그리드 확장 애니메이션을 적용했습니다.

### 3. 유효성 검사: `loginSchema` (Zod)

- **이메일**: 올바른 이메일 형식이어야 합니다.
- **비밀번호**: 최소 8자 이상이어야 합니다.

## 🛠️ 사용 방법

로그인 페이지(`page.tsx`) 혹은 팝업 등에서 호출하여 사용합니다.

```tsx
import { LoginForm } from '@/app/(auth)/login/_components/login-form';

export default function LoginPage() {
  // onSubmit을 넘기지 않으면 기본 mock 로직이 작동합니다.
  return <LoginForm />;
}
```

## 🧩 기술 스택

- **React Hook Form**: 폼 상태 및 검증 관리
- **Zod**: 스키마 기반 유효성 검사
- **Lucide React**: Eye, EyeOff 아이콘 사용
- **Tailwind CSS**: 스타일링 및 애니메이션 처리

## 🧪 테스트 코드 (Testing)

`login-form.test.tsx` 파일을 통해 다음과 같은 유즈케이스들을 검증합니다:

1. **로그인 폼 렌더링**: 이메일 입력창, 비밀번호 입력창, 로그인 버튼이 정상적으로 화면에 표시되는지 확인합니다.
2. **이메일 빈 값 검증**: 이메일 입력창이 비어있을 때는 에러 메시지를 표시하지 않는지 확인합니다.
3. **이메일 형식 유효성 검사**: 올바르지 않은 이메일 형식을 입력하고 포커스를 잃었을 때(blur), 일정 시간 후에 에러 메시지가 나타나는지 확인합니다.
4. **비밀번호 길이 유효성 검사**: 비밀번호를 8자 미만으로 입력하고 포커스를 잃었을 때(blur), 에러 메시지가 표시되는지 확인합니다.
5. **비밀번호 표시 토글**: 비밀번호 옆의 눈 아이콘(표시/숨기기) 버튼을 클릭했을 때, 입력창의 타입이 `password`에서 `text`로, 다시 `password`로 정상적으로 변경되는지 확인합니다.
6. **로딩 상태 대응**: `isLoading` 프롭이 `true`일 때 모든 입력 요소와 버튼이 비활성화(disabled)되는지 확인합니다.
7. **폼 제출**: 유효한 이메일과 비밀번호를 입력했을 때 로그인 버튼이 활성화(색상 변경)되고, 클릭 시 입력된 데이터와 함께 `onSubmit` 함수가 호출되는지 확인합니다.
8. **에러 메시지 초기화 (이메일)**: 이메일 에러가 떠 있는 상태에서 입력을 모두 지우면 에러 메시지가 즉시 사라지는지 확인합니다.
9. **에러 메시지 초기화 (비밀번호)**: 비밀번호 에러가 떠 있는 상태에서 입력을 모두 지우면 에러 메시지가 즉시 사라지는지 확인합니다.
