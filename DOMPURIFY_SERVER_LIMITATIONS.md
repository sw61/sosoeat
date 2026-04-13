# DOMPurify 서버 제한 사항

## 요약

이 프로젝트에서는 `isomorphic-dompurify`가 서버 사이드 렌더링 환경에서 실패할 수 있습니다.

현재 확인된 실패 흐름은 다음과 같습니다.

- 서버에서 렌더링되는 컴포넌트가 `isomorphic-dompurify`를 import함
- 서버 환경에서 `isomorphic-dompurify`가 내부적으로 `jsdom`을 불러옴
- `jsdom`이 다시 `@asamuzakjp/css-color` 같은 ESM 의존성을 불러옴
- Node/Next가 top-level `await`가 포함된 모듈 그래프를 `require()`로 읽으려 함
- 그 결과 `ERR_REQUIRE_ASYNC_MODULE` 에러로 렌더링이 실패함

## 확인된 에러 형태

대표적인 런타임 에러:

```text
Error [ERR_REQUIRE_ASYNC_MODULE]: require() cannot be used on an ESM graph with top-level await.
```

이 저장소에서는 아래 의존성 체인에서 문제가 관찰되었습니다.

- `isomorphic-dompurify`
- `jsdom`
- `@asamuzakjp/css-color`

## 실무적인 제한 사항

`isomorphic-dompurify`가 서버 렌더링 환경의 React/Next 컴포넌트에서 항상 안전하게 동작한다고 가정하면 안 됩니다.

이 코드베이스에서는 아래 기준을 기본값으로 봅니다.

- SSR 중에는 `isomorphic-dompurify` 실행을 피함
- 가능하면 클라이언트 전용 sanitize를 우선 고려함
- 서버에서 반드시 sanitize가 필요하다면, 현재 런타임과 의존성 조합이 실제로 호환되는지 먼저 검증함

## 권장 대응 방식

1. 상위 컴포넌트는 서버 컴포넌트로 유지하고, HTML sanitize 및 렌더링 부분만 작은 클라이언트 컴포넌트로 분리합니다.
2. 해당 컴포넌트 전체를 클라이언트에서 처리해도 괜찮다면 `use client`를 적용합니다.
3. 현재 Next/Node 환경과의 호환성을 확인한 뒤, 문제를 일으키는 의존성 버전을 pin 하거나 대체합니다.

## 오해하면 안 되는 점

- 이 문제는 반드시 해당 컴포넌트 로직 자체의 버그라는 뜻은 아닙니다.
- 이 문제는 반드시 Amplitude 코드 자체 때문에 발생한 것은 아닙니다.
- 관련 없어 보이는 기능 추가 이후라도, 의존성 재설치나 lockfile 변경으로 인해 이 문제가 드러날 수 있습니다.

## 판단 기준

어떤 컴포넌트가 `isomorphic-dompurify`를 import하고 있고 서버에서 렌더링될 가능성이 있다면, 호환성 검증 전까지는 위험 요소로 간주합니다.
