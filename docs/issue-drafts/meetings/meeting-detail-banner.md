# [Feature] MeetingDetailBanner - 모임 목록 상단 히어로 배너

## 📋 요약

모임 목록 페이지 상단에 배경 이미지·그라데이션·제목·부제를 표시하는 히어로 영역이다. 반응형으로 높이·타이포·부제 노출을 조정한다.

**스택:** Next.js + TypeScript + Tailwind CSS + `next/image`

---

## 🎯 목표

- 뷰포트별 레이아웃(모바일·태블릿·데스크톱)을 유지한다.
- 이미지 LCP·접근성(`alt`)을 만족한다.
- Props로 문구·이미지를 교체 가능하게 유지한다.

---

## ✅ 완료 조건

**표시**

- [ ] `imageUrl` 배경이 `object-cover`로 영역을 채운다.
- [ ] `titleContent`·`subtitleContent`가 디자인 타이포 클래스에 맞게 표시된다.
- [ ] `subtitle`(ReactNode)은 376px 이상에서만 표시(기존 스펙 유지).

**품질**

- [ ] Storybook에서 대표 이미지·문구 조합을 확인할 수 있다.
- [ ] 테스트에서 주요 텍스트·역할이 노출됨을 검증한다.

---

## 🔧 구현 계획

**컴포넌트 구조**

```
src/app/meetings/_components/meeting-detail-banner/
  ├── meeting-detail-banner.tsx
  ├── meeting-detail-banner.type.ts
  ├── meeting-detail-banner.test.tsx
  └── meeting-detail-banner.stories.tsx
```

**주요 Props 설계**

| Prop              | Type        | 기본값 | 필수 | 설명                     |
| ----------------- | ----------- | ------ | ---- | ------------------------ |
| `imageUrl`        | `string`    | —      | ✅   | 배경 이미지 URL          |
| `alt`             | `string`    | —      | ✅   | 이미지 대체 텍스트       |
| `titleContent`    | `string`    | —      | ✅   | 메인 제목                |
| `subtitleContent` | `string`    | —      | ✅   | 부제 문자열(항상 전달)   |
| `subtitle`        | `ReactNode` | —      |      | 넓은 화면 전용 추가 부제 |
| `className`       | `string`    | —      |      | 루트 래퍼                |

**사용 예시**

```tsx
<MeetingDetailBanner
  imageUrl="/images/example.jpg"
  alt="모임 배너"
  titleContent="같이 먹어요"
  subtitleContent="부제"
  subtitle={<span>추가 설명</span>}
/>
```

---

## 🚫 의도적으로 제외한 기능

- 배너 클릭·라우팅
- 이미지 업로드·CMS 연동
- 다국어(i18n) 전환

---

## 📎 참고 자료

- 디자인 시안: <!-- Figma 링크 -->
- 사용 예정 화면: `/meetings`
- 관련 이슈/PR: <!-- # -->
