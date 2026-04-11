# Graph Report - .  (2026-04-10)

## Corpus Check
- 821 files ¡¤ ~785,754 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 9544 nodes ¡¤ 21420 edges ¡¤ 100 communities detected
- Extraction: 100% EXTRACTED ¡¤ 0% INFERRED ¡¤ 0% AMBIGUOUS
- Token cost: 0 input ¡¤ 0 output

## God Nodes (most connected - your core abstractions)
1. `Js()` - 91 edges
2. `filter()` - 76 edges
3. `r()` - 73 edges
4. `get()` - 72 edges
5. `keys()` - 71 edges
6. `join()` - 58 edges
7. `slice()` - 57 edges
8. `createElement()` - 57 edges
9. `replace()` - 56 edges
10. `get()` - 51 edges

## Surprising Connections (you probably didn't know these)
- `mn()` --calls--> `Je()`  [EXTRACTED]
  storybook-static\sb-addons\chromatic-com-storybook-1\manager-bundle.js ¡æ storybook-static\sb-addons\onboarding-5\manager-bundle.js
- `zu()` --calls--> `Te()`  [EXTRACTED]
  storybook-static\sb-addons\chromatic-com-storybook-1\manager-bundle.js ¡æ storybook-static\sb-addons\vitest-2\manager-bundle.js
- `Te()` --calls--> `Un()`  [EXTRACTED]
  storybook-static\sb-addons\vitest-2\manager-bundle.js ¡æ storybook-static\sb-addons\onboarding-5\manager-bundle.js
- `Qu()` --calls--> `Yn()`  [EXTRACTED]
  storybook-static\sb-addons\chromatic-com-storybook-1\manager-bundle.js ¡æ storybook-static\sb-addons\onboarding-5\manager-bundle.js
- `readQuery()` --calls--> `Yn()`  [EXTRACTED]
  storybook-static\sb-addons\chromatic-com-storybook-1\manager-bundle.js ¡æ storybook-static\sb-addons\onboarding-5\manager-bundle.js

## Communities

### Community 0 - "Community 0"
Cohesion: 0.0
Nodes (1113): _1(), _3(), _4(), _5(), $8(), $9(), $A(), a1() (+1105 more)

### Community 1 - "Community 1"
Cohesion: 0.0
Nodes (119): $148a7a147e38ea7f$export$702d680b21cbd764(), $1e5a04cdaf7d1af8$export$f09106e7c6677ec5(), $1e5a04cdaf7d1af8$var$updateLocale(), $507fabe10e71c6fb$var$handleClickEvent(), $507fabe10e71c6fb$var$handleFocusEvent(), $507fabe10e71c6fb$var$handleKeyboardEvent(), $507fabe10e71c6fb$var$handlePointerEvent(), $507fabe10e71c6fb$var$isValidKey() (+111 more)

### Community 2 - "Community 2"
Cohesion: 0.01
Nodes (757): _1(), $2(), $4(), _6(), _7(), $8(), a_(), A1() (+749 more)

### Community 3 - "Community 3"
Cohesion: 0.01
Nodes (473): CategoryStatisticsItemFromJSON(), CategoryStatisticsItemFromJSONTyped(), CategoryStatisticsItemToJSON(), CategoryStatisticsItemToJSONTyped(), CreateCommentFromJSON(), CreateCommentFromJSONTyped(), CreateCommentToJSON(), CreateCommentToJSONTyped() (+465 more)

### Community 4 - "Community 4"
Cohesion: 0.0
Nodes (62): CookieStorage, CreateMeetingFromJSON(), CreateMeetingFromJSONTyped(), CreateMeetingToJSON(), CreateMeetingToJSONTyped(), checkEmailDuplicate(), onSubmit(), createBffErrorResponse() (+54 more)

### Community 5 - "Community 5"
Cohesion: 0.01
Nodes (494): $2(), _3(), a0(), a1(), a3(), A4(), a7(), Aa() (+486 more)

### Community 6 - "Community 6"
Cohesion: 0.01
Nodes (231): $a(), ac, ae(), ai(), al(), An(), ao(), ar() (+223 more)

### Community 7 - "Community 7"
Cohesion: 0.01
Nodes (318): _0(), A(), A0(), a2(), AA(), Ac(), aE(), Al() (+310 more)

### Community 8 - "Community 8"
Cohesion: 0.01
Nodes (70): j(), z(), GR(), WR(), b(), f(), i(), Ae() (+62 more)

### Community 9 - "Community 9"
Cohesion: 0.01
Nodes (88): AuthorFromJSON(), AuthorFromJSONTyped(), AuthorToJSON(), AuthorToJSONTyped(), CommentFromJSON(), CommentFromJSONTyped(), CommentToJSON(), CommentToJSONTyped() (+80 more)

### Community 10 - "Community 10"
Cohesion: 0.02
Nodes (66): A(), ae(), at(), B(), Be(), Bt(), c, ce() (+58 more)

### Community 11 - "Community 11"
Cohesion: 0.01
Nodes (207): $2a41e45df1593e64$var$translateRTL(), $9bf71ea28793e738$var$isTabbableRadio(), alloc(), arrayFromSet(), arrayFromSet2(), assertDescriptor(), assertNotNullOrUndefined(), build() (+199 more)

### Community 12 - "Community 12"
Cohesion: 0.02
Nodes (197): addPressed(), assertPointerEvents(), blurElement(), calculateNewValue(), checkPointerEvents(), clear(), clear2(), clearInitialValue() (+189 more)

### Community 13 - "Community 13"
Cohesion: 0.02
Nodes (170): $23b9f4fcf0fe224b$var$filterChildren(), $9bf71ea28793e738$export$1258395f99bf9cbf(), $9bf71ea28793e738$var$isAncestorScope(), $9bf71ea28793e738$var$isElementInAnyScope(), $9bf71ea28793e738$var$isElementInChildScope(), $9bf71ea28793e738$var$isElementInScope(), $9bf71ea28793e738$var$shouldContainFocus(), $9bf71ea28793e738$var$shouldRestoreFocus() (+162 more)

### Community 14 - "Community 14"
Cohesion: 0.02
Nodes (120): ai(), B(), Be(), bi(), Bn(), br(), Bs(), Ca() (+112 more)

### Community 15 - "Community 15"
Cohesion: 0.02
Nodes (133): allowsNameFromContent(), arrayFrom(), asFlatString(), asymmetricMatch(), canElementBeDisabled(), checkHasWindow(), checkHtmlElement(), checkNode() (+125 more)

### Community 16 - "Community 16"
Cohesion: 0.03
Nodes (62): ao(), at(), Be(), bn(), bo(), Ce(), co(), cr() (+54 more)

### Community 17 - "Community 17"
Cohesion: 0.02
Nodes (110): $1e5a04cdaf7d1af8$export$188ec29ebc2bdc3a(), $319e236875307eab$export$a9b970dcc4ae71a9(), $337b884510726a0d$export$c6fdb837b070b4ff(), $64fa3d84918910a7$export$2881499e37b75b9a(), $7135fc7d473fd974$var$useCollectionRender(), $96b38030c423d352$export$78efe591171d7d45(), $96b38030c423d352$export$9fc1347d4195ccb3(), $9bf71ea28793e738$export$20e40289641fbbb6() (+102 more)

### Community 18 - "Community 18"
Cohesion: 0.04
Nodes (105): $0065b146e7192841$export$7138b0d059a6e743(), $03deb23ff14920c4$export$4eaf04e54aa8eed6(), $07b14b47974efb58$var$PopoverInner(), $18f2051aff69b9bf$export$43bb16f9c6d9e3f7(), $1dbecbe27a04f9af$export$14d238f342723f25(), $204d9ebcedfb8806$export$ed5abd763a836edc(), $2680b1829e803644$export$fa142eb1681c5202(), $2a41e45df1593e64$export$d39e1813b3bdd0e1() (+97 more)

### Community 19 - "Community 19"
Cohesion: 0.04
Nodes (101): $14c0b72509d70225$export$b0d6fa1ab32e3295(), $2f04cbc44ee30ce0$export$53a0910f038337bd(), $2f04cbc44ee30ce0$export$c826860796309d1b(), $2f04cbc44ee30ce0$var$relativeOffset(), append(), applyStyles(), areValidElements(), arrow() (+93 more)

### Community 20 - "Community 20"
Cohesion: 0.05
Nodes (76): $0175d55c2a017ebc$export$fdf4756d5b8ef90a(), $5e3802645cc19319$export$1020fa7f77e17884(), $62d8ded9296f3872$export$cfa2225e87938781(), $7135fc7d473fd974$export$2dbbd341daed716d(), $76f919a04c5a7d14$var$findDefaultSelectedKey(), $875d6693e12af071$var$toggleKey(), $880e95eb8b93ba9a$export$ecf600387e221c37(), $a40c673dc9f6d9c7$export$94ed1c92c7beeb22() (+68 more)

### Community 21 - "Community 21"
Cohesion: 0.04
Nodes (38): ae(), cn(), ct(), Dn(), fe(), Gn(), Hn(), Ie() (+30 more)

### Community 22 - "Community 22"
Cohesion: 0.08
Nodes (61): ae(), L(), Js(), at(), Be(), br(), cr(), de() (+53 more)

### Community 23 - "Community 23"
Cohesion: 0.05
Nodes (68): a(), addChainableMethod(), addLengthGuard(), addMethod(), addProperty(), an(), assert(), assertAbove() (+60 more)

### Community 24 - "Community 24"
Cohesion: 0.04
Nodes (67): $488c6ddbf4ef74c2$var$getCachedNumberFormatter(), addListener(), appendErrorRef(), _check_private_redeclaration(), _class_apply_descriptor_get(), _class_apply_descriptor_set(), _class_extract_field_descriptor(), _class_private_field_get() (+59 more)

### Community 25 - "Community 25"
Cohesion: 0.11
Nodes (56): At(), cn(), Ct(), De(), dn(), Dt(), $e(), ee() (+48 more)

### Community 26 - "Community 26"
Cohesion: 0.04
Nodes (62): $488c6ddbf4ef74c2$export$711b50b3c525e0f2(), $5b160d28a433310d$var$getLanguage(), $5b160d28a433310d$var$getStringsForLocale(), assemble(), _construct(), create(), createIndent(), curried() (+54 more)

### Community 27 - "Community 27"
Cohesion: 0.05
Nodes (60): align(), clone2(), collectOwnProperties(), compareObjects(), comparePrimitive(), concatenateRelevantDiffs(), countChanges(), createPatchMark() (+52 more)

### Community 28 - "Community 28"
Cohesion: 0.08
Nodes (34): at(), B(), be(), ce(), D(), De(), E(), et() (+26 more)

### Community 29 - "Community 29"
Cohesion: 0.06
Nodes (41): A(), add(), Ce(), clear(), delete(), Ee(), fe(), fromJSON() (+33 more)

### Community 30 - "Community 30"
Cohesion: 0.07
Nodes (44): B(), Be(), Ce(), Co(), De(), _e(), Ee(), eo() (+36 more)

### Community 31 - "Community 31"
Cohesion: 0.06
Nodes (28): PaginatedReviewFromJSON(), PaginatedReviewFromJSONTyped(), PaginatedReviewToJSON(), PaginatedReviewToJSONTyped(), ParticipantFromJSON(), ParticipantFromJSONTyped(), ParticipantToJSON(), ParticipantToJSONTyped() (+20 more)

### Community 32 - "Community 32"
Cohesion: 0.08
Nodes (38): allowsNameFromContent2(), arrayFrom2(), asFlatString2(), computeAccessibleName2(), computeTextAlternative2(), findLabelableElement2(), getControlOfLabel2(), getLabels2() (+30 more)

### Community 33 - "Community 33"
Cohesion: 0.11
Nodes (36): adjustHue(), colorToHex(), colorToInt(), convertToHex(), convertToInt(), darken(), desaturate(), drawBorder() (+28 more)

### Community 34 - "Community 34"
Cohesion: 0.21
Nodes (36): atcontainer(), atcustommedia(), atdocument(), atfontface(), athost(), atkeyframes(), atlayer(), atmedia() (+28 more)

### Community 35 - "Community 35"
Cohesion: 0.1
Nodes (1): MeetingsApi

### Community 36 - "Community 36"
Cohesion: 0.1
Nodes (1): PostsApi

### Community 37 - "Community 37"
Cohesion: 0.09
Nodes (18): at(), be(), Bt(), De(), et(), Fe(), ft(), Je() (+10 more)

### Community 38 - "Community 38"
Cohesion: 0.1
Nodes (33): createKey(), createLocation(), DefaultErrorComponent(), _extends2(), _extends3(), _extends4(), getInvalidPathError(), getPathContributingMatches() (+25 more)

### Community 39 - "Community 39"
Cohesion: 0.09
Nodes (20): HostFromJSON(), HostFromJSONTyped(), HostToJSON(), HostToJSONTyped(), JoinedMeetingFromJSON(), JoinedMeetingFromJSONTyped(), JoinedMeetingToJSON(), JoinedMeetingToJSONTyped() (+12 more)

### Community 40 - "Community 40"
Cohesion: 0.09
Nodes (12): a(), Et(), Fe(), get(), gt(), le(), "node_modules/pretty-format/build/index.js"(), "node_modules/pretty-format/build/plugins/ConvertAnsi.js"() (+4 more)

### Community 41 - "Community 41"
Cohesion: 0.12
Nodes (1): AuthApi

### Community 42 - "Community 42"
Cohesion: 0.1
Nodes (12): bindMethods(), constructor(), ht, k(), nt(), #o(), onMutationUpdate(), #r() (+4 more)

### Community 43 - "Community 43"
Cohesion: 0.08
Nodes (28): $3ad3f6e1647bc98d$export$80f3e147d781571c(), $431fbd86ca7dc216$export$af51f0f06c0f328a(), $431fbd86ca7dc216$var$isNode(), $507fabe10e71c6fb$export$630ff653c5ada6a9(), $55f9b1ae81f22853$export$2b35b76d2e30e129(), $55f9b1ae81f22853$export$6c5dc7e81d2cc29a(), $55f9b1ae81f22853$export$759df0d867455a91(), $55f9b1ae81f22853$export$76e4e37e5339496d() (+20 more)

### Community 44 - "Community 44"
Cohesion: 0.09
Nodes (27): $21f1aa98acb08317$export$c57958e35f31ed73(), $49c51c25361d4cd2$var$addEvent(), $49c51c25361d4cd2$var$preventScrollMobileSafari(), $49c51c25361d4cd2$var$preventScrollStandard(), $49c51c25361d4cd2$var$scrollIntoView(), $49c51c25361d4cd2$var$scrollIntoViewWhenReady(), $49c51c25361d4cd2$var$setStyle(), $507fabe10e71c6fb$export$2f1888112f558a7d() (+19 more)

### Community 45 - "Community 45"
Cohesion: 0.11
Nodes (23): createDefaultFormatters(), createFastMemoizeCache(), formatRangeToParts(), formatToParts(), IntlMessageFormat2(), isArgumentElement(), isDateElement(), isDateTimeSkeleton() (+15 more)

### Community 46 - "Community 46"
Cohesion: 0.15
Nodes (1): ReviewsApi

### Community 47 - "Community 47"
Cohesion: 0.11
Nodes (22): buildQueries(), createDOMElementFilter(), filterCommentsAndDefaultIgnoreTagsTags(), fireEvent(), getConfig2(), getDefaultNormalizer(), getDocument(), getElementError() (+14 more)

### Community 48 - "Community 48"
Cohesion: 0.18
Nodes (1): NotificationsApi

### Community 49 - "Community 49"
Cohesion: 0.18
Nodes (1): UsersApi

### Community 50 - "Community 50"
Cohesion: 0.14
Nodes (19): _arrayLikeToArray(), _arrayWithoutHoles(), assembleLineNumberStyles(), createLineElement(), flattenCodeTree(), getCodeTree(), getEmWidthOfNumber(), getInlineLineNumber() (+11 more)

### Community 51 - "Community 51"
Cohesion: 0.16
Nodes (16): $9446cca9a3875146$export$7d15b64cf5a3a4c4(), $edcf132a9284368a$export$4b834cebd9e5cebe(), $edcf132a9284368a$export$6839422d1f33cee9(), $edcf132a9284368a$export$b3ceb0cbf1056d98(), $edcf132a9284368a$var$computePosition(), $edcf132a9284368a$var$getAvailableSpace(), $edcf132a9284368a$var$getContainerDimensions(), $edcf132a9284368a$var$getContainingBlock() (+8 more)

### Community 52 - "Community 52"
Cohesion: 0.24
Nodes (10): Ensure-TemplateExists(), Format-DateKey(), Get-CommitsByDate(), Get-SummaryFilePath(), Get-TopAreas(), Get-Weekdays(), New-AutoSection(), New-DaySection() (+2 more)

### Community 53 - "Community 53"
Cohesion: 0.23
Nodes (1): FavoritesApi

### Community 54 - "Community 54"
Cohesion: 0.23
Nodes (1): MeetingTypesApi

### Community 55 - "Community 55"
Cohesion: 0.23
Nodes (8): FavoriteListFromJSON(), FavoriteListFromJSONTyped(), FavoriteListToJSON(), FavoriteListToJSONTyped(), FavoriteWithMeetingFromJSON(), FavoriteWithMeetingFromJSONTyped(), FavoriteWithMeetingToJSON(), FavoriteWithMeetingToJSONTyped()

### Community 56 - "Community 56"
Cohesion: 0.27
Nodes (10): assignProps(), initClipboardEvent(), initFocusEvent(), initInputEvent(), initKeyboardEvent(), initMouseEvent(), initPointerEvent(), initUIEvent() (+2 more)

### Community 57 - "Community 57"
Cohesion: 0.22
Nodes (8): CustomOverlay, InfoWindow, LatLng, Map, Marker, MarkerImage, Point, Size

### Community 58 - "Community 58"
Cohesion: 0.4
Nodes (0): 

### Community 59 - "Community 59"
Cohesion: 0.5
Nodes (0): 

### Community 60 - "Community 60"
Cohesion: 1.0
Nodes (2): decodeBase64Url(), isTokenExpired()

### Community 61 - "Community 61"
Cohesion: 1.0
Nodes (2): a(), i()

### Community 62 - "Community 62"
Cohesion: 0.67
Nodes (0): 

### Community 63 - "Community 63"
Cohesion: 1.0
Nodes (0): 

### Community 64 - "Community 64"
Cohesion: 1.0
Nodes (0): 

### Community 65 - "Community 65"
Cohesion: 1.0
Nodes (0): 

### Community 66 - "Community 66"
Cohesion: 1.0
Nodes (0): 

### Community 67 - "Community 67"
Cohesion: 1.0
Nodes (0): 

### Community 68 - "Community 68"
Cohesion: 1.0
Nodes (0): 

### Community 69 - "Community 69"
Cohesion: 1.0
Nodes (0): 

### Community 70 - "Community 70"
Cohesion: 1.0
Nodes (0): 

### Community 71 - "Community 71"
Cohesion: 1.0
Nodes (0): 

### Community 72 - "Community 72"
Cohesion: 1.0
Nodes (0): 

### Community 73 - "Community 73"
Cohesion: 1.0
Nodes (0): 

### Community 74 - "Community 74"
Cohesion: 1.0
Nodes (0): 

### Community 75 - "Community 75"
Cohesion: 1.0
Nodes (0): 

### Community 76 - "Community 76"
Cohesion: 1.0
Nodes (0): 

### Community 77 - "Community 77"
Cohesion: 1.0
Nodes (0): 

### Community 78 - "Community 78"
Cohesion: 1.0
Nodes (0): 

### Community 79 - "Community 79"
Cohesion: 1.0
Nodes (0): 

### Community 80 - "Community 80"
Cohesion: 1.0
Nodes (0): 

### Community 81 - "Community 81"
Cohesion: 1.0
Nodes (0): 

### Community 82 - "Community 82"
Cohesion: 1.0
Nodes (0): 

### Community 83 - "Community 83"
Cohesion: 1.0
Nodes (0): 

### Community 84 - "Community 84"
Cohesion: 1.0
Nodes (0): 

### Community 85 - "Community 85"
Cohesion: 1.0
Nodes (0): 

### Community 86 - "Community 86"
Cohesion: 1.0
Nodes (0): 

### Community 87 - "Community 87"
Cohesion: 1.0
Nodes (0): 

### Community 88 - "Community 88"
Cohesion: 1.0
Nodes (0): 

### Community 89 - "Community 89"
Cohesion: 1.0
Nodes (0): 

### Community 90 - "Community 90"
Cohesion: 1.0
Nodes (0): 

### Community 91 - "Community 91"
Cohesion: 1.0
Nodes (0): 

### Community 92 - "Community 92"
Cohesion: 1.0
Nodes (0): 

### Community 93 - "Community 93"
Cohesion: 1.0
Nodes (0): 

### Community 94 - "Community 94"
Cohesion: 1.0
Nodes (0): 

### Community 95 - "Community 95"
Cohesion: 1.0
Nodes (0): 

### Community 96 - "Community 96"
Cohesion: 1.0
Nodes (0): 

### Community 97 - "Community 97"
Cohesion: 1.0
Nodes (0): 

### Community 98 - "Community 98"
Cohesion: 1.0
Nodes (0): 

### Community 99 - "Community 99"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **8 isolated node(s):** `LatLng`, `Size`, `Point`, `Map`, `MarkerImage` (+3 more)
  These have ¡Â1 connection - possible missing edges or undocumented components.
- **Thin community `Community 63`** (2 nodes): `jest.config.ts`, `jestConfig()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 64`** (2 nodes): `proxy.ts`, `proxy()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 65`** (2 nodes): `error.tsx`, `Error()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 66`** (2 nodes): `not-found.tsx`, `NotFound()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 67`** (2 nodes): `loading.tsx`, `Loading()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 68`** (2 nodes): `signup-header.tsx`, `SignupHeader()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 69`** (2 nodes): `step-header.tsx`, `SignupStepHeader()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 70`** (2 nodes): `meeting-description-section.tsx`, `MeetingDescriptionSection()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 71`** (1 nodes): `commitlint.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 72`** (1 nodes): `jest.setup.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 73`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 74`** (1 nodes): `next.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 75`** (1 nodes): `playwright.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 76`** (1 nodes): `vitest.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 77`** (1 nodes): `vitest.shims.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 78`** (1 nodes): `time-text-formater.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 79`** (1 nodes): `signup-form.schema.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 80`** (1 nodes): `format-notification-meta-time.constants.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 81`** (1 nodes): `notification.types.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 82`** (1 nodes): `notification-scroll-area.types.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 83`** (1 nodes): `image-upload-field.types.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 84`** (1 nodes): `json.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 85`** (1 nodes): `meeting.type.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 86`** (1 nodes): `meeting-type-section.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 87`** (1 nodes): `calendar-D93Cl5NN.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 88`** (1 nodes): `check-CVn41HP8.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 89`** (1 nodes): `chevron-down-CQ_k5Zww.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 90`** (1 nodes): `chevron-left-DLDDqD6J.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 91`** (1 nodes): `map-pin-CqmThPv2.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 92`** (1 nodes): `message-circle-BxMBzGOI.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 93`** (1 nodes): `plus-DfEtRhNF.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 94`** (1 nodes): `preload-helper-PPVm8Dsz.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 95`** (1 nodes): `users-jWgFN1f1.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 96`** (1 nodes): `x-Lf5C2xJo.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 97`** (1 nodes): `globals.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 98`** (1 nodes): `manager-stores.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 99`** (1 nodes): `placeholder.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Js()` connect `Community 8` to `Community 0`, `Community 2`, `Community 37`, `Community 6`, `Community 42`, `Community 10`, `Community 14`, `Community 16`, `Community 21`, `Community 22`, `Community 25`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **What connects `LatLng`, `Size`, `Point` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.0 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.0 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.01 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.01 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.0 - nodes in this community are weakly interconnected._