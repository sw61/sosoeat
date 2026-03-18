Issue Title

<!-- This issue will be created in repo sw61/sosoeat (https://github.com/sw61/sosoeat). Changing this line has no effect. -->

Assignees: @cncn0069
Labels: feat
Milestone:
Projects: 칸반보드

<!-- Edit the body of your new issue then click the ✓ "Create Issue" button in the top right of the editor. The first line will be the issue title. Assignees and Labels follow after a blank line. Leave an empty line before beginning the body of the issue -->

# [Feature] DropdownMenu - 중첩 드롭다운 메뉴 컴포넌트

## 📋 Overview

네비게이션·설정 메뉴 등에서 1차 메뉴 선택 시 하위 메뉴(sub-menu)가 펼쳐지는 중첩 드롭다운을 구현합니다.
Radix UI DropdownMenu 기반으로, 선택 시 스타일 변경·모달 위 표시를 지원합니다.

사용 기술: Next.js + TypeScript + Tailwind CSS + Radix UI + shadcn/ui

---

## 🎯 Goals

- 드롭다운이 잘 보여야 함
- 드롭다운 선택 시 색깔 변경 되어야 함
- 드롭다운 선택 시 서브 메뉴 나와야 함
- 모달 위에서도 잘 작동해야 함

---

## ✅ Acceptance Criteria

**처음 들어올 때 드롭다운이 잘 표시되어야 함**

- [ ] Trigger 클릭/호버 시 메뉴 패널이 표시된다
- [ ] 메뉴 아이템이 가독성 있게 배치된다

**선택 시 시각적 피드백**

- [ ] 메뉴 아이템 호버 시 배경색/텍스트색이 변경된다
- [ ] 선택된(active) 항목은 구분되는 스타일이 적용된다

**서브 메뉴(중첩 드롭다운)**

- [ ] 서브 메뉴가 있는 항목에 호버/클릭 시 우측에 서브 패널이 표시된다
- [ ] 서브 메뉴도 아이템 선택 가능하다
- [ ] z-index 레이어가 올바르게 적용된다 (자식 메뉴가 부모 위에)

**모달 위에서 동작**

- [ ] 모달이 열린 상태에서 드롭다운이 모달 위에 렌더링된다
- [ ] Portal을 사용해 body 최상단에 그려진다

---

## 🔧 Implementation Plan

**컴포넌트 구조**

```
src/components/ui/dropdown-menu/
  ├── index.ts
  ├── dropdown-menu.tsx            # 메인 컴포넌트 (Root, Trigger, Content)
  ├── dropdown-menu-sub.tsx         # 서브 메뉴 (Sub, SubTrigger, SubContent)
  ├── dropdown-menu-item.tsx        # 메뉴 아이템
  ├── dropdown-menu.types.ts        # Props 타입 정의
  ├── dropdown-menu.test.tsx        # 단위 테스트
  └── dropdown-menu.stories.tsx     # Storybook
```

**주요 Props 설계**

| Prop           | Type                                     | 기본값     | 필수 | 설명                |
| -------------- | ---------------------------------------- | ---------- | ---- | ------------------- |
| `trigger`      | `ReactNode`                              | —          | ✅   | 트리거(버튼/아이콘) |
| `children`     | `ReactNode`                              | —          | ✅   | 메뉴 콘텐츠         |
| `align`        | `'start' \| 'center' \| 'end'`           | `'center'` |      | 패널 정렬           |
| `side`         | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` |      | 패널 위치           |
| `onOpenChange` | `(open: boolean) => void`                | —          |      | 열림/닫힘 콜백      |

**메뉴 아이템 타입**

```ts
type DropdownMenuItem = {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  children?: DropdownMenuItem[]; // 서브 메뉴
};
```

**사용 예시**

```tsx
<DropdownMenu trigger={<Button>메뉴</Button>}>
  <DropdownMenu.Content>
    <DropdownMenu.Item onClick={() => {}}>일반 항목</DropdownMenu.Item>
    <DropdownMenu.Sub trigger="하위 메뉴 ▶">
      <DropdownMenu.Item>하위 A</DropdownMenu.Item>
      <DropdownMenu.Item>하위 B</DropdownMenu.Item>
    </DropdownMenu.Sub>
  </DropdownMenu.Content>
</DropdownMenu>
```

---

## 🚫 Out of Scope

- 키보드 네비게이션 상세 커스텀 (Radix 기본 동작 활용)
- 메가 메뉴(대량 아이템) 형태의 레이아웃
- 애니메이션 커스텀 (기본 transition 사용)

---

## 📎 References

- 디자인 시안: <!-- Figma 링크 -->
- 사용 예정 화면: NavigationBar 프로필 메뉴, 설정 메뉴 등
- Radix UI DropdownMenu: https://www.radix-ui.com/primitives/docs/components/dropdown-menu
- 관련 이슈/PR: <!-- # -->
