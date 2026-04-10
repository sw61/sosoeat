# Git Rebase vs Merge 정리

## 오늘 겪은 문제

같이 쓰는 브랜치에서 `git rebase origin/develop`을 했다가 push가 막히고 히스토리가 꼬인 사건.

### 실제 reflog 흐름

```
[1단계] rebase 시작
674f73b  rebase (start): checkout origin/develop
45f5b54  rebase (continue): 필터 초기화 추가
2e18cb7  rebase (continue): 무한 스크롤 구현
27d4c6a  rebase (finish) ← 커밋 해시가 모두 바뀜

[2단계] 잘못된 걸 느끼고 수습 시도
         checkout → backup/rebase-save (백업)
         checkout → 다시 Feat/#265로 복귀
         reset → origin/Feat/#265
         reset → origin/Feat/#265~
         reset → HEAD

[3단계] develop 머지 + 백업 복구
b7b3127  merge origin/develop
f02804e  merge backup/rebase-save

[4단계] pull --rebase 또 발생 → 최종 merge commit
```

---

## Merge vs Rebase 차이

### Merge

```
[develop]   A → B → C
[내 브랜치]      → D → E

merge 후:
[내 브랜치]  A → B → C → D → E → M(머지 커밋)
```

- 커밋 해시 안 바뀜 → push 그냥 됨
- 머지 커밋이 생겨서 히스토리가 지저분해 보일 수 있음

### Rebase

```
[develop]   A → B → C
[내 브랜치]      → D → E

rebase 후:
[내 브랜치]  A → B → C → D' → E'
                         ↑ 해시가 바뀜
```

- 히스토리가 깔끔하게 한 줄로 정리됨
- 이미 push한 브랜치에서 하면 origin이랑 달라져서 push 막힘 → force push 필요

---

## 왜 D'가 생기는가 (해시가 바뀌는 이유)

rebase는 기존 커밋을 새로 만드는 게 아니라 **복사해서 다시 쌓는 거예요.** 내용은 같지만 해시가 달라지는 이유는 **부모 커밋이 바뀌기 때문이에요.**

```
[before rebase]
D의 부모 = B
D의 해시 = hash(D의 내용 + B)  →  D

[after rebase]
D의 부모 = C  ← 부모가 바뀜
D의 해시 = hash(D의 내용 + C)  →  D'  (내용 같아도 해시 다름)
```

C 자체가 바뀌는 게 아니라, D가 **"어디서 갈라졌냐"** 가 달라지는 거예요.

---

## Push가 막히는 이유

이미 origin에 D, E를 push한 상태에서 rebase를 하면:

```
[origin]   A → B → C → D → E
[로컬]     A → B → C → D'→ E'  ← 해시가 달라서 "평행 우주"
```

git 입장에서 로컬이 origin보다 뒤처진 것처럼 보여서 push를 거부함.
해결하려면 `git push --force-with-lease` 필요.

---

## Rebase 써도 되는 상황 vs 안 되는 상황

| 상황                              | rebase             | merge |
| --------------------------------- | ------------------ | ----- |
| 혼자 쓰는 브랜치, 아직 push 안 함 | ✅                 | ✅    |
| 혼자 쓰는 브랜치, 이미 push 함    | ⚠️ force push 필요 | ✅    |
| 팀원과 같이 쓰는 브랜치           | ❌                 | ✅    |
| main / develop 공용 브랜치        | ❌                 | ✅    |

**한 줄 요약: "아직 아무도 안 본 내 커밋들"에만 rebase 써라.**

---

## 팀 프로젝트에서 develop 최신 반영하는 올바른 방법

```bash
# O
git merge origin/develop

# X (같이 쓰는 브랜치에서)
git rebase origin/develop
```
