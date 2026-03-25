# SignupForm 컴포넌트 문서

`SignupForm`은 사용자의 가입 프로세스를 단계별로 나누어 처리하는 **다단계 폼(Multi-step Funnel Form)** 컴포넌트입니다. 이메일 입력, 비밀번호 설정, 프로필 설정의 총 3단계로 구성되어 있으며, 각 단계별 유효성 검사와 상태 관리를 수행합니다.

## 📂 파일 구조

```text
signup-form/
├── _components/          # 단계별 하위 컴포넌트 (Email, Password, Nickname Step 등)
├── hooks/
│   ├── index.ts          # 훅 배럴 파일
│   └── use-signup-form.ts # 다단계 폼 비즈니스 로직 및 상태 관리
├── signup-form.tsx       # 메인 UI 컴포넌트 (Funnel 구조)
├── signup-form.schema.ts # Zod 유효성 검사 스키마 (단계별 정의)
├── signup-form.types.ts  # 타입 정의
├── signup-form.constants.ts # 단계별 제목, 설명, 단계 번호 등 상수
├── signup-form.stories.tsx # Storybook 설정
├── signup-form.test.tsx   # 단위 및 통합 테스트
├── index.ts             # 컴포넌트 배럴 파일
└── README.md            # 컴포넌트 기능 명세 (현재 파일)
```

## 🚀 주요 기능

### 1. 비즈니스 로직: `useSignupForm` (커스텀 훅)

다단계 폼의 단계 이동과 각 단계에서 수집된 데이터를 하나로 취합하는 역할을 담당합니다.

| 반환 객체/함수       | 역할                                                          |
| :------------------- | :------------------------------------------------------------ |
| `step`               | 현재 활성화된 단계 상태 (`email` \| `password` \| `nickname`) |
| `formData`           | 각 단계에서 입력된 데이터의 중간 집합체                       |
| `handleEmailNext`    | 1단계(이메일) 완료 및 데이터 저장 후 다음 단계 이동           |
| `handlePasswordNext` | 2단계(비밀번호) 완료 및 데이터 저장 후 다음 단계 이동         |
| `handleNicknameNext` | 3단계(닉네임) 완료 및 최종 전체 데이터 제출 (`onSubmit` 실행) |
| `handlePrev`         | 이전 단계로 돌아가는 함수 (입력 데이터 유지)                  |

**💡 에러 노출 로직 (중간 단계 공통)**
사용자 경험을 위해 다음과 같은 조건(`src/app/(auth)/_components/auth.utils.ts`의 `getAuthFieldError` 사용)에서 에러를 노출합니다:

- **조건**: `(폼 제출 시도 혹은 해당 필드 focus out(blur))` AND `에러 존재` AND `값이 비어있지 않음`.
- 필드에 진입하자마자 에러가 표시되지 않으며, 의미 있는 입력값이 있고 포커스를 잃은 시점부터 검증 결과를 보여줍니다.

### 2. UI 컴포넌트: `SignupForm`

퍼널(Funnel) 패턴을 사용하여 선언적으로 단계를 렌더링합니다.

- **퍼널 패턴**: `Funnel`과 `Step` 컴포넌트를 사용해 각 단계의 가독성을 높였습니다.
- **공통 컴포넌트 활용**: 로그인 폼과 동일한 디자인 가이드를 준수하기 위해 `AuthSubmitButton` 및 공통 `Input` 스타일 유틸리티를 사용합니다.
- **프로세스 시각화**: `SignupStepper`를 통해 현재 가입 진행 상황을 사용자에게 직관적으로 보여줍니다.

### 3. 유효성 검사 (Zod)

- **이메일**: 올바른 이메일 형식 필수.
- **비밀번호**: 최소 8자 이상, 비밀번호와 비밀번호 확인 필드 일치 여부 실시간 검증.
- **닉네임**: 특수문자/공백 금지, 자음/모음 단일 사용 금지 (한글/영문/숫자 조합).

## 🛠️ 사용 방법

회원가입 페이지(`page.tsx`)에서 호출하여 사용하며, 최종 제출 시 실행될 `onSubmit` 함수를 주입합니다.

```tsx
import { SignupForm } from '@/app/(auth)/signup/_components/signup-form';

export default function SignupPage() {
  const handleSignup = async (data: SignupFormValues) => {
    // API 연동 로직
    console.log(data);
  };

  return <SignupForm onSubmit={handleSignup} />;
}
```

## 🧪 테스트 코드 (Testing)

`signup-form.test.tsx` 파일을 통해 다음과 같은 시나리오를 검증합니다:

1. **단계별 렌더링**: 각 단계 진입 시 적절한 입력창과 가이드 텍스트가 표시되는지 확인합니다.
2. **이메일 유효성 및 단계 이동**: 유효한 이메일 입력 시에만 '다음' 버튼이 활성화되고 2단계로 넘어가는지 확인합니다.
3. **비밀번호 일치 검증**: 비밀번호와 확인 필드가 일치하지 않을 때 즉시 에러 메시지가 노출되는지 확인합니다.
4. **이전 단계 이동**: '이전' 버튼 클릭 시 입력했던 데이터가 유지된 채로 전 단계 화면으로 복귀하는지 확인합니다.
5. **닉네임 규칙 검사**: 닉네임에 공백이나 특수문자 입력 시 정책에 맞는 에러 메시지가 출력되는지 확인합니다.
6. **로딩 상태 대응**: `isLoading` 프롭이 `true`일 때 최종 버튼에 "회원가입 중..."이 표시되고 버튼이 비활성화되는지 확인합니다.
7. **에러 노출 시점**: 값이 비어있는 상태에서 포커스만 이동했을 때는 에러가 노출되지 않는지 확인합니다. (UX 검증)
8. **비밀번호 가시성 토글**: 눈 아이콘 버튼 클릭 시 입력 내용의 마스킹 상태(`password` ↔ `text`)가 정상적으로 전환되는지 확인합니다.
