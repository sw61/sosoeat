Home hydration mismatch (`React error #418`) caused by time-dependent text rendering

## Summary

The home page can trigger a hydration mismatch because several UI branches and labels are computed from `new Date()` during the initial render. When the server render time and client hydration time differ, React sees different text/DOM and throws minified React error `#418`.

## Problem

The current implementation renders time-sensitive UI directly during the first render:

- Home meeting cards show the `���� �Ϸ�` overlay by comparing `registrationEnd < new Date()`.
- Deadline badges compute remaining time and closed/open text from the current time during render.
- Relative-time labels in some detail/comment UIs can also diverge between server and client.

This is especially visible on the home page because the meeting cards render immediately and include multiple time-based branches.

## Affected Areas

- `src/entities/meeting/ui/main-page-card/main-page-card.tsx`
- `src/entities/meeting/model/use-time-formatter.tsx`
- `src/entities/meeting/ui/deadline-badge/deadline-badge.tsx`
- `src/widgets/meeting-detail/ui/meeting-comment-section/meeting-comment-item.tsx`
- `src/widgets/sosotalk/ui/sosotalk-post-detail/sosotalk-post-detail/sosotalk-post-detail-header.tsx`
- `src/entities/sosotalk-comment/ui/sosotalk-comment-item/sosotalk-comment-item.tsx`

## Proposed Fix

- Pass a server-generated reference time into home meeting cards and deadline badges so the first render uses the same baseline on both server and client.
- Avoid relying on `Date.now()` / `new Date()` directly in the initial render path for home cards.
- For relative-time labels that are inherently time-variant, suppress hydration warnings or move the live update until after mount.

## Acceptance Criteria

- Home page no longer throws React hydration error `#418` due to time-based text differences.
- Home meeting cards render consistent closed/open state on first paint.
- Deadline badge text is stable during hydration.
- Relative-time labels in comment/detail UIs no longer cause hydration warnings.

## Notes

The root OG image setup already exists globally, so this issue is specifically about hydration stability rather than missing default OG metadata.
