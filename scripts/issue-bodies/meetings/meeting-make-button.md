# [Feature] MeetingMakeButton - 모임 만들기 플로팅/CTA 버튼

## 📋 요약

모임 생성 플로우로 이동하는 버튼이다. 라벨·모바일 전용 스크린리더 라벨·클릭 핸들러를 props로 받는다.

**스택:** Next.js + TypeScript + Tailwind CSS

---

## 🎯 목표

- 터치·포커스 영역이 충분하다.
- 라우팅은 부모 `onClick` 또는 래핑 링크로 유연하게 연결 가능하다.
- Storybook에서 조합을 확인한다.

---

## ✅ 완료 조건

**동작**

- [ ] 클릭 시 `onClick`이 호출된다(제공된 경우).

**UI·접근성**

- [ ] `mobileAriaLabel`이 필요 시 스크린 리더에 전달된다.
- [ ] `className`으로 스타일 확장이 가능하다.

**품질**

- [ ] 스토리가 기본 라벨을 보여준다.

---

## 🔧 구현 계획

**컴포넌트 구조**

```
src/app/meetings/_components/meeting-make-button.tsx/
  ├── index.ts
  ├── meeting-make-button.tsx
  ├── meeting-make-button.types.ts
  └── meeting-make-button.stories.tsx
```

**주요 Props 설계**

| Prop              | Type         | 기본값 | 필수 | 설명               |
| ----------------- | ------------ | ------ | ---- | ------------------ |
| `onClick`         | `() => void` | —      |      | 클릭 시            |
| `label`           | `string`     | —      |      | 버튼 텍스트        |
| `mobileAriaLabel` | `string`     | —      |      | 모바일 보조 레이블 |
| `className`       | `string`     | —      |      | 루트 클래스        |

**사용 예시**

```tsx
<MeetingMakeButton label="모임 만들기" onClick={() => router.push('/meetings/new')} />
```

---

## 🚫 의도적으로 제외한 기능

- 모임 생성 폼·API
- 권한별 비표시 로직(페이지/레이아웃 책임)

---

## 📎 참고 자료

- 디자인 시안: <!-- Figma 링크 -->
- 사용 예정 화면: `/meetings`
- 관련 이슈/PR: <!-- # -->
