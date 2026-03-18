# [Feature] Progress - 진행률 표시 컴포넌트

## 📋 요약

모임 참여 인원, 업로드 진행률 등 진행 상태를 시각적으로 표시하는 Progress Bar 컴포넌트를 구현합니다.
Radix UI Progress 기반으로 variant(공동구매/같이먹기)에 따른 색상 구분을 지원합니다.
사용 기술: Next.js + TypeScript + Tailwind CSS + Radix UI + shadcn/ui

---

## 🎯 목표

- Radix UI 기반 Progress Bar 컴포넌트 구현
- variant에 따른 시각적 구분 (groupBuy: 파란색, groupEat: 주황색)
- 라벨과 함께 사용 가능한 ProgressWithLabel 컴포넌트 제공

---

## ✅ 완료 조건

**Progress**

- [ ] variant='groupBuy' | 'groupEat' 시 색상 적용
- [ ] value(0–100)에 따른 진행률 표시
- [ ] Storybook 스토리 작성
- [ ] 단위 테스트 (variant별 클래스, progressbar role)

**ProgressWithLabel**

- [ ] current/max 표시
- [ ] progress 계산식 (current/max)\*100 적용
- [ ] 참여중 텍스트 및 아이콘 표시
- [ ] 단위 테스트 (텍스트 렌더링, 진행률 전달)

---

## 🔧 구현 계획

**컴포넌트 구조**

```
src/components/ui/progress-bar/
  ├── progress.tsx              # 메인 Progress 컴포넌트
  ├── progress.type.ts          # Props 타입 정의
  ├── progress.test.tsx         # 단위 테스트
  ├── progress.stories.tsx      # Storybook
  ├── progress-with-label.tsx   # 라벨 포함 래퍼
  ├── progress-with-label.test.tsx
  └── progress-with-label.stories.tsx
```

**주요 Props 설계**

| Prop        | Type                       | 필수 | 설명                  |
| ----------- | -------------------------- | ---- | --------------------- |
| `value`     | `number`                   |      | 진행률 (0–100)        |
| `variant`   | `'groupBuy' \| 'groupEat'` | ✅   | 색상 변형 (파랑/주황) |
| `className` | `string`                   |      | 추가 스타일           |

**ProgressWithLabel Props**

| Prop      | Type                       | 필수 | 설명             |
| --------- | -------------------------- | ---- | ---------------- |
| `current` | `number`                   | ✅   | 현재 인원        |
| `max`     | `number`                   | ✅   | 최대 인원        |
| `variant` | `'groupBuy' \| 'groupEat'` | ✅   | Progress variant |

**사용 예시**

```tsx
<Progress value={50} variant="groupBuy" />
<ProgressWithLabel current={5} max={10} variant="groupEat" />
```

---

## 🚫 의도적으로 제외한 기능

- 애니메이션(motion) – CSS transition으로 대체
- error variant – 추후 확장 시 추가

---

## 📎 참고 자료

- Radix UI Progress: https://www.radix-ui.com/primitives/docs/components/progress
- shadcn/ui Progress
- 관련 이슈/PR: #
