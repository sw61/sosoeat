# Alert Modal

사용자에게 특정 동작(삭제, 탈퇴, 등록 등)에 대한 확인을 받거나 중요한 알림을 띄울 때 사용하는 공통 모달 팝업 컴포넌트입니다.

모달의 열림/닫힘 상태를 깔끔하게 관리하기 위해 **`useModal` 커스텀 훅과 함께 사용하는 것을 권장**합니다.

---

## 🚀 빠른 시작 (Quick Start)

모달을 띄우고자 하는 페이지나 컴포넌트에서 `useModal` 훅을 불러와 상태와 다이얼로그 액션을 연결합니다.

```tsx
import { useModal } from '@/hooks/use-modal';
import { AlertModal } from '@/shared/ui/alert-modal/alert-modal';

export default function MyPage() {
  // 1. useModal 훅 선언
  const { isOpen, open, close } = useModal();

  const handleDelete = () => {
    // API 삭제 로직 실행 ...
    // Note: AlertModal은 확인(onConfirm) 버튼 클릭 시 위 로직을 수행하고 '자동으로' 모달이 닫힙니다!
  };

  return (
    <div>
      {/* 2. 모달 열기 버튼 이벤트 연결 */}
      <button onClick={open}>삭제하기</button>

      {/* 3. AlertModal 연결 */}
      <AlertModal
        open={isOpen} // 열리기/닫히기 상태
        title="정말 삭제하시겠습니까?" // (필수) 안내 타이틀
        description={'삭제 후에는 데이터 복구가 불가능합니다.\n신중하게 선택해주세요.'} // (선택) 부가 설명문
        cancelText="돌아가기" // (선택) 취소 버튼 문구 커스텀. 기본값: '취소'
        confirmText="삭제 진행" // (선택) 확인 버튼 문구 커스텀. 기본값: '확인'
        onCancel={close} // (필수) 취소 및 여백 클릭 시 모달을 닫는 함수
        onConfirm={handleDelete} // (필수) 확인 버튼 클릭 시 수행할 커스텀 동작
      />
    </div>
  );
}
```

---

## 🧩 컴포넌트 구조 설명

### 1. `useModal` Hook

`/src/hooks/use-modal.ts` 파일에 정의된 범용 상태 관리 훅입니다.
모달과 관련된 복잡한 `useState` 선언을 제거하고 직관적으로 사용할 수 있게 돕습니다.

- `isOpen (boolean)`: 현재 모달이 켜져 있는지 여부 상태 값
- `open (() => void)`: 모달을 여는 함수
- `close (() => void)`: 모달을 닫는 함수

> 💡 **Tip:** 이 훅은 반드시 `AlertModal`에만 써야 하는 것은 아닙니다. Bottom Sheet, Drawer, Tooltip 등 `열림/닫힘` 상태가 필요한 곳 어디서든 자유롭게 재사용이 가능합니다.

### 2. `AlertModal` Component

화면에 실제로 렌더링되는 다이얼로그(Dialog) 기반 UI 모달입니다.

#### ✨ 주요 특징

- **자동 닫힘 (Auto Close 처리)**:
  - `취소` 버튼 클릭 시 Props로 넘어온 `onCancel`을 호출하여 닫힙니다.
  - `확인` 버튼 클릭 시 개발자가 정의한 `onConfirm` 커스텀 함수를 우선 수행한 뒤 **자동으로 `onCancel`을 호출하여 닫힙니다.** (즉, 수동으로 닫기 처리를 작성할 필요가 없습니다.)
- **줄바꿈 및 한국어 디자인 최적화**:
  - `description`에 들어가는 안내글이 길어질 경우를 대비해 자동으로 단어 단위 줄바꿈(`break-keep`)이 되어 가독성을 높입니다.
  - 개발자가 문자열 내부에서 `\n` 개행 문자를 사용하면 의도한 대로 줄바꿈이 반영됩니다.

---

## ⚙️ Props 명세 (`AlertModalProps`)

컴포넌트에 넘길 수 있는 Props 목록입니다.

| Property          | Type         | Default     | Description                                                                                |
| ----------------- | ------------ | ----------- | ------------------------------------------------------------------------------------------ |
| **`open`**        | `boolean`    | **필수**    | 모달 화면 표시 여부. `useModal`의 `isOpen` 매핑                                            |
| **`title`**       | `string`     | **필수**    | 모달 중앙에 강조되는 메인 타이틀 문구                                                      |
| **`description`** | `string`     | `undefined` | 제목 하단 작은 글씨 부가 설명 (생략 가능, `\n` 가능)                                       |
| **`cancelText`**  | `string`     | `'취소'`    | 왼쪽 닫기 버튼 텍스트                                                                      |
| **`confirmText`** | `string`     | `'확인'`    | 오른쪽 실행 버튼 텍스트                                                                    |
| **`onCancel`**    | `() => void` | **필수**    | 취소 버튼, 여백(Dim), 혹은 ESC 키를 눌러 닫을 때 실행하는 함수 (`useModal`의 `close` 매핑) |
| **`onConfirm`**   | `() => void` | **필수**    | 제1목적 (확인 버튼) 발생 시 실행할 동작                                                    |
| **`dismissible`** | `boolean`    | `true`      | `false` 지정 시 여백(Dim) 클릭, ESC 클릭을 해도 모달이 닫히지 않고 클릭을 강제합니다.      |
