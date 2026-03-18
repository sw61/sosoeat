# [Feature] {ComponentName} - {컴포넌트 한 줄 설명}

## 📋 요약

{컴포넌트가 해결하는 문제와 주요 목적을 2~3줄로 작성합니다.}
{사용 기술 스택을 명시합니다. 예: Next.js + TypeScript + Tailwind CSS + shadcn/ui}

---

## 🎯 목표

- {목표 1}
- {목표 2}
- {목표 3}

---

## ✅ 완료 조건

**{기능 그룹 1}**

- [ ] {완료 조건 1}
- [ ] {완료 조건 2}

**{기능 그룹 2}**

- [ ] {완료 조건 1}
- [ ] {완료 조건 2}

**{기능 그룹 3}**

- [ ] {완료 조건 1}
- [ ] {완료 조건 2}

---

## 🔧 구현 계획

**컴포넌트 구조**

```
components/
  └── {ComponentName}/
        ├── index.ts
        ├── {ComponentName}.tsx            # 메인 컴포넌트
        ├── {ComponentName}.types.ts       # Props 타입 정의
        ├── {ComponentName}.test.tsx       # 단위 테스트
        └── {ComponentName}.stories.tsx    # Storybook
```

**주요 Props 설계 (안)**

| Prop        | Type                        | 기본값     | 필수 | 설명   |
| ----------- | --------------------------- | ---------- | ---- | ------ |
| `{prop1}`   | `{type}`                    | —          | ✅   | {설명} |
| `{prop2}`   | `{type}`                    | `{기본값}` |      | {설명} |
| `{prop3}`   | `{type}`                    | `{기본값}` |      | {설명} |
| `{onEvent}` | `({param}: {type}) => void` | —          |      | {설명} |

**{주요 타입} 타입 (안)**

```ts
type {TypeName} = {
  id: string;
  // {필드 설명}
};
```

**사용 예시**

```tsx
<{ComponentName}
  {prop1}={value}
  {prop2}={value}
  {onEvent}={(param) => console.log(param)}
/>
```

---

## 🚫 의도적으로 제외한 기능

- {이번 작업에서 제외하는 기능 1}
- {이번 작업에서 제외하는 기능 2}
- {이번 작업에서 제외하는 기능 3}

---

## 📎 참고 자료

- 디자인 시안: <!-- Figma 링크 -->
- 사용 예정 화면: <!-- 해당 페이지 목록 -->
- 관련 이슈/PR: <!-- # -->
