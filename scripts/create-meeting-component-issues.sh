#!/usr/bin/env bash
# Create GitHub issues from scripts/issue-bodies/meetings/*.md, then for each:
#   branch feature/<issue#>-<slug>, empty commit, push, draft PR.
#
# Prerequisites:
#   gh auth login
#   git remote "origin" → github.com
#   clean working tree (or export SKIP_DIRTY=1)
#
# Usage:
#   ./scripts/create-meeting-component-issues.sh
#   DRY_RUN=1 ./scripts/create-meeting-component-issues.sh   # print commands only
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

BASE_BRANCH="${BASE_BRANCH:-main}"
DRY_RUN="${DRY_RUN:-0}"
SKIP_DIRTY="${SKIP_DIRTY:-0}"

DRAFT_DIR="scripts/issue-bodies/meetings"

if [[ "$DRY_RUN" == "1" ]]; then
  :
elif ! gh auth status &>/dev/null; then
  echo "error: not logged in. Run: gh auth login" >&2
  exit 1
elif [[ "$SKIP_DIRTY" != "1" ]] && [[ -n "$(git status --porcelain)" ]]; then
  echo "error: working tree is dirty. Commit/stash or SKIP_DIRTY=1" >&2
  exit 1
fi

# slug|issue title (GitHub issue title — not the H1 inside the .md body)
declare -a ITEMS=(
  "meeting-filter-bar|[Feature] MeetingFilterBar - 모임 목록 필터 바 (유형·날짜·지역·정렬)"
  "meeting-detail-banner|[Feature] MeetingDetailBanner - 모임 목록 상단 히어로 배너"
  "search-bar|[Feature] SearchBar - 모임 검색 입력 필드"
  "region-select-modal|[Feature] RegionSelectModal - 시·도·구·군 선택 모달"
  "empty-page|[Feature] EmptyPage - 모임 목록 빈 상태 일러스트"
  "meeting-make-button|[Feature] MeetingMakeButton - 모임 만들기 CTA 버튼"
)

create_issue() {
  local slug="$1"
  local title="$2"
  local body_file="${DRAFT_DIR}/${slug}.md"
  if [[ ! -f "$body_file" ]]; then
    echo "error: missing $body_file" >&2
    exit 1
  fi
  local url
  url="$(gh issue create --title "$title" --body-file "$body_file")"
  local num
  num="$(basename "$url")"
  if [[ ! "$num" =~ ^[0-9]+$ ]]; then
    echo "error: could not parse issue number from: $url" >&2
    exit 1
  fi
  echo "$num"
}

for item in "${ITEMS[@]}"; do
  IFS='|' read -r slug title <<<"$item"
  echo "==> $slug"

  if [[ "$DRY_RUN" == "1" ]]; then
    echo "[dry-run] gh issue create --title $(printf '%q' "$title") --body-file ${DRAFT_DIR}/${slug}.md"
    echo "[dry-run] git checkout $BASE_BRANCH && git pull --ff-only origin $BASE_BRANCH"
    echo "[dry-run] git checkout -b feature/<issue#>-${slug}"
    echo "[dry-run] git commit --allow-empty -m \"chore: draft branch for #<issue#> (${slug})\""
    echo "[dry-run] git push -u origin feature/<issue#>-${slug}"
    echo "[dry-run] gh pr create --draft --head feature/<issue#>-${slug} --title $(printf '%q' "$title")"
    echo ""
    continue
  fi

  issue_num="$(create_issue "$slug" "$title")"
  branch="feature/${issue_num}-${slug}"

  git checkout "$BASE_BRANCH"
  git pull --ff-only "origin" "$BASE_BRANCH"
  git checkout -b "$branch"
  git commit --allow-empty -m "chore: draft branch for #${issue_num} (${slug})"
  git push -u origin "$branch"
  gh pr create --draft \
    --head "$branch" \
    --title "$title" \
    --body "Related to #${issue_num}. Draft PR for **${slug}** — implementation can follow in this branch."

  git checkout "$BASE_BRANCH"
done

echo "Done."
