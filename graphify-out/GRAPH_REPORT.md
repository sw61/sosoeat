# Graph Report - src/features + src/widgets (2026-04-10)

## Corpus Check

- 336 files · ~48,355 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary

- 579 nodes · 614 edges · 80 communities detected
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)

1. `useMeetingForm Hook` - 7 edges
2. `Entities Auth` - 6 edges
3. `getNotificationViewModel()` - 4 edges
4. `normalizePlainText()` - 4 edges
5. `extractTextFromHtml()` - 4 edges
6. `toInitialText()` - 4 edges
7. `Entities Favorites` - 4 edges
8. `NotificationPanelBody` - 4 edges
9. `NotificationTab Component` - 4 edges
10. `SosoTalkPostEditor Component` - 4 edges

## Surprising Connections (you probably didn't know these)

- `Step2 Basic Info Component` --calls--> `useMeetingForm Hook` [INFERRED]
  src/features/meeting-create/ui/\_components/step2-basic-info.tsx → src/features/meeting-create/model/use-meeting-form.ts
- `DesktopNav Component` --semantically_similar_to--> `MobileSheet Component` [INFERRED] [semantically similar]
  src/widgets/navigation-bar/ui/desktop-nav/desktop-nav.tsx → src/widgets/navigation-bar/ui/mobile-sheet/mobile-sheet.tsx
- `useMeetingForm Hook` --references--> `Meeting Create Schema` [EXTRACTED]
  src/features/meeting-create/model/use-meeting-form.ts → src/features/meeting-create/model/meeting-create.schema.ts
- `Meeting Edit Schema` --conceptually_related_to--> `Meeting Create Schema` [INFERRED]
  src/features/meeting-edit/model/meeting-edit.schema.ts → src/features/meeting-create/model/meeting-create.schema.ts
- `useMeetingForm Hook` --references--> `Meeting Create Types` [EXTRACTED]
  src/features/meeting-create/model/use-meeting-form.ts → src/features/meeting-create/model/meeting-create.types.ts

## Hyperedges (group relationships)

- **Auth State Management Hooks** — use_login, use_logout, use_social_login, use_signup, entities_auth [INFERRED 0.90]
- **Auth Form Validation Layer** — login_form_schema, signup_form_schema, signup_form_types, signup_form_constants [INFERRED 0.90]
- **Meeting Create Multi-Step Form Flow** — step1_category, step2_basicinfo, step3_description, step4_schedule, meetingcreatemodal, usemeetingform [INFERRED 0.90]
- **Notification query layer** — notifications_api, notification_queries, use_notification_service, use_notification_read_actions [EXTRACTED 1.00]
- **Notification Panel Entry Points** — notificationdialog_NotificationDialog, notificationpopover_NotificationPopover, notificationpanelbody_NotificationPanelBody [INFERRED 0.90]
- **SosoTalkPostEditor Component Composition** — sosotalk_post_editor_component, image_upload_field_component, post_editor_toolbar_component, use_sosotalk_post_editor [EXTRACTED 1.00]
- **Auth Modal State Management** — loginrequiremodal_component, sessionexpiredmodal_component, useauthstore_store [EXTRACTED 1.00]
- **Signup Multi-Step Funnel Flow** — signupform_component, emailstep_component, namestep_component, signupstepper_component, funnel_component [EXTRACTED 1.00]
- **Home Meeting Data Flow** — entities_meeting_get_meetings_server, main_page_section, main_page_card_with_heart, features_favorites_heart_button [EXTRACTED 1.00]
- **Meeting Location Display Group** — meeting_location_section_component, kakao_map_loader_component, meeting_location_address_row_component [EXTRACTED 1.00]
- **MyPage Data Flow** — mypage_queries, mypage_service, mypage_usemeetingtabs, mypage_meetingtabs, mypage_mypagecard [INFERRED 0.90]
- **NavigationBar Composition Pattern** — navigationbar_NavigationBar, desktopnav_DesktopNav, mobilesheet_MobileSheet, navactions_NavActions, navbarconstants_NAV_ITEMS [EXTRACTED 1.00]
- **Region Select Modal Feature** — regionselectmodal_RegionSelectModal, useregionselectmodal_hook, regionselectmodal_service, regionselectmodal_types, regioncascadeselect_RegionCascadeSelect [EXTRACTED 0.95]
- **SearchPage Infinite Scroll Pattern** — search_page_SearchPage, usesearchpage_hook, search_page_SearchSkeleton [EXTRACTED 1.00]
- **SosoTalk Post Detail Model Composition** — use_sosotalk_post_detail_page, use_sosotalk_post_detail_post_actions, use_sosotalk_post_detail_comment_actions, sosotalk_post_detail_page_utils [EXTRACTED 1.00]
- **SosotalkPostDetail Widget Slice** — sosotalk_post_detail_component, sosotalk_post_detail_actions, use_sosotalk_post_detail_page [EXTRACTED 1.00]

## Communities

### Community 0 - "Notification System"

Cohesion: 0.06
Nodes (4): Notification UI Component, NotificationDialog, NotificationPanelBody, NotificationPopover

### Community 1 - "Favorites & MyPage Tabs"

Cohesion: 0.06
Nodes (11): Favorites Feature, MeetingRecommendedSection Component, Mypage API Client, MeetingTabs Component, MyPageCard Component, isCompleted(), parseDateTime(), toMeetingCard() (+3 more)

### Community 2 - "Meeting Detail Actions"

Cohesion: 0.07
Nodes (9): AlertModal Component, MeetingEdit Feature, LoginRequireModal Component, MeetingHeroSection Component, SessionExpiredModal Component, resolveActionHandler(), useMeetingDetailCard(), useMeetingRole Hook (+1 more)

### Community 3 - "Auth Feature"

Cohesion: 0.06
Nodes (6): Entities Auth, Entities Favorites, useFavoriteMeeting(), useToggleFavorite(), Shared Button UI, Shared URL Utils

### Community 4 - "Search & Empty States"

Cohesion: 0.08
Nodes (0):

### Community 5 - "Meeting Create Flow"

Cohesion: 0.09
Nodes (10): createWrapper(), PointerEvent, renderWithClient(), Meeting Create Schema, Meeting Create Types, MeetingCreateModal Component, Meeting Edit Schema, Step2 Basic Info Component (+2 more)

### Community 6 - "SosoTalk Post Editor"

Cohesion: 0.07
Nodes (3): ImageUploadField Component, PostEditorToolbar Component, SosoTalkPostEditor Component

### Community 7 - "Meeting Comment Section"

Cohesion: 0.09
Nodes (0):

### Community 8 - "SosoTalk Feed Cards"

Cohesion: 0.09
Nodes (4): SosoTalkBanner Component, SosoTalkCard Component, SosoTalkFilterBar Component, SosoTalkMainPage Component

### Community 9 - "Notification Icons"

Cohesion: 0.13
Nodes (6): getNotificationDescription(), getNotificationViewModel(), notificationThumbnailKeyForType(), notificationTitleForType(), NotificationTab Component, NotificationTabBody Component

### Community 10 - "SosoTalk Comment Section"

Cohesion: 0.11
Nodes (0):

### Community 11 - "Search UI Buttons"

Cohesion: 0.12
Nodes (0):

### Community 12 - "SosoTalk Post Detail"

Cohesion: 0.17
Nodes (5): Comment Entity, entities/post Module, SosoTalkPostDetailPage Component, formatSosoTalkRelativeTime(), mapCommentToCommentItemData()

### Community 13 - "Meeting Edit Modal"

Cohesion: 0.18
Nodes (0):

### Community 14 - "Profile Edit"

Cohesion: 0.18
Nodes (0):

### Community 15 - "Navigation Bar"

Cohesion: 0.18
Nodes (0):

### Community 16 - "Main Page Cards"

Cohesion: 0.2
Nodes (6): MainPageCard Entity, getMeetings Server Function, HeartButton (features/favorites), SearchPage Component, SearchSkeleton Component, useSearchPage Hook

### Community 17 - "Notification Tab Body"

Cohesion: 0.22
Nodes (0):

### Community 18 - "Post Editor Utils"

Cohesion: 0.44
Nodes (8): calculateEffectiveContentLength(), createTextMeasurer(), extractTextFromHtml(), isRichTextHtml(), normalizePlainText(), stripHtmlToPlainTextFallback(), toInitialHtml(), toInitialText()

### Community 19 - "Best Soeat Card"

Cohesion: 0.25
Nodes (1): useDetailRouter Hook

### Community 20 - "Meeting Recommended Cards"

Cohesion: 0.25
Nodes (0):

### Community 21 - "Meeting Location Map"

Cohesion: 0.33
Nodes (2): hasValidMapCoords(), MeetingLocationSection()

### Community 22 - "Create Meeting Hook"

Cohesion: 0.33
Nodes (0):

### Community 23 - "MyPage API Server"

Cohesion: 0.33
Nodes (1): apiServer HTTP Client

### Community 24 - "Count Card UI"

Cohesion: 0.5
Nodes (0):

### Community 25 - "Signup Funnel Steps"

Cohesion: 0.4
Nodes (5): EmailStep Component, Funnel Component, NameStep Component, SignupForm Component, SignupStepper Component

### Community 26 - "Navigation Components"

Cohesion: 0.6
Nodes (5): DesktopNav Component, MobileSheet Component, NavActions Component, NAV_ITEMS Constants, NavigationBar Widget

### Community 27 - "Region Select Modal"

Cohesion: 0.5
Nodes (5): RegionCascadeSelect, RegionSelectModal, RegionSelectModal Service, RegionSelectModal Types, useRegionSelectModal Hook

### Community 28 - "Signup Form Logic"

Cohesion: 0.5
Nodes (0):

### Community 29 - "Footer Component"

Cohesion: 0.5
Nodes (0):

### Community 30 - "User Profile Card"

Cohesion: 0.5
Nodes (0):

### Community 31 - "Search Bar"

Cohesion: 0.5
Nodes (0):

### Community 32 - "Comment Badge UI"

Cohesion: 0.5
Nodes (4): CountingBadge UI Component, CommentItem Entity, NotificationTrigger Component, SosoTalkCommentSection Component

### Community 33 - "Kakao Map Components"

Cohesion: 0.5
Nodes (4): KakaoMapLoader Component, MeetingLocationAddressRow Component, MeetingLocationSection Component, KakaoMap Shared UI

### Community 34 - "Auth Input Utils"

Cohesion: 0.67
Nodes (0):

### Community 35 - "Social Login Layout"

Cohesion: 0.67
Nodes (0):

### Community 36 - "Image Crop & Upload"

Cohesion: 0.67
Nodes (3): useUploadImage, useProfileImageEditor Hook, getCroppedImg

### Community 37 - "Profile Edit API"

Cohesion: 0.67
Nodes (3): EditProfileModal Component, Profile Edit API, useUpdateProfile Mutation

### Community 38 - "Login Required Modal"

Cohesion: 1.0
Nodes (0):

### Community 39 - "Session Expired Modal"

Cohesion: 1.0
Nodes (0):

### Community 40 - "Signup Form"

Cohesion: 1.0
Nodes (0):

### Community 41 - "Signup Header"

Cohesion: 1.0
Nodes (0):

### Community 42 - "Step Header"

Cohesion: 1.0
Nodes (0):

### Community 43 - "Meeting CTA Section"

Cohesion: 1.0
Nodes (1): MeetingCreateModal & useMeetingCreateTrigger

### Community 44 - "Main Banner"

Cohesion: 1.0
Nodes (0):

### Community 45 - "Meeting Detail Server"

Cohesion: 1.0
Nodes (0):

### Community 46 - "Profile Edit Modal"

Cohesion: 1.0
Nodes (2): EditProfileModal Feature, UserCard Component

### Community 47 - "Meeting Filter Bar"

Cohesion: 1.0
Nodes (2): MeetingFilterBar Component, Meeting Sort Options Repository

### Community 48 - "Signup Schema"

Cohesion: 1.0
Nodes (0):

### Community 49 - "Notification Time Utils"

Cohesion: 1.0
Nodes (0):

### Community 50 - "Notification Types"

Cohesion: 1.0
Nodes (0):

### Community 51 - "Scroll Area Types"

Cohesion: 1.0
Nodes (0):

### Community 52 - "Image Upload Types"

Cohesion: 1.0
Nodes (0):

### Community 53 - "Stepper"

Cohesion: 1.0
Nodes (0):

### Community 54 - "Meeting Type Section"

Cohesion: 1.0
Nodes (0):

### Community 55 - "Auth Index"

Cohesion: 1.0
Nodes (1): Auth Feature Index

### Community 56 - "Auth Model"

Cohesion: 1.0
Nodes (1): Auth Model Index

### Community 57 - "Favorites Index"

Cohesion: 1.0
Nodes (1): Favorites Feature Index

### Community 58 - "Shared Utils"

Cohesion: 1.0
Nodes (1): Shared Utils (cn)

### Community 59 - "Generated Types"

Cohesion: 1.0
Nodes (1): Shared Generated Types

### Community 60 - "Heart Button Types"

Cohesion: 1.0
Nodes (1): HeartButton Types

### Community 61 - "Meeting Create Index"

Cohesion: 1.0
Nodes (1): Meeting Create Feature Index

### Community 62 - "Meeting Create Constants"

Cohesion: 1.0
Nodes (1): Meeting Create Constants

### Community 63 - "Meeting Create Trigger"

Cohesion: 1.0
Nodes (1): useMeetingCreateTrigger Hook

### Community 64 - "Meeting Edit Constants"

Cohesion: 1.0
Nodes (1): Meeting Edit Constants

### Community 65 - "Meeting Edit Types"

Cohesion: 1.0
Nodes (1): Meeting Edit Types

### Community 66 - "Scroll Area Classes"

Cohesion: 1.0
Nodes (1): scrollAreaClasses

### Community 67 - "Notification Icon Class"

Cohesion: 1.0
Nodes (1): NOTIFICATION_ICON_BOX_CLASS

### Community 68 - "Meeting Icon"

Cohesion: 1.0
Nodes (1): MeetingIcon

### Community 69 - "User Icon"

Cohesion: 1.0
Nodes (1): UserIcon

### Community 70 - "Read Check Icon"

Cohesion: 1.0
Nodes (1): ReadCheckIcon

### Community 71 - "Login Form"

Cohesion: 1.0
Nodes (1): LoginForm Component

### Community 72 - "MyPage Count Card"

Cohesion: 1.0
Nodes (1): CountCard Component

### Community 73 - "Filter Bar Types"

Cohesion: 1.0
Nodes (1): MeetingFilterBarProps Types

### Community 74 - "Search Bar Component"

Cohesion: 1.0
Nodes (1): SearchBar

### Community 75 - "Meeting Make Button"

Cohesion: 1.0
Nodes (1): MeetingMakeButton

### Community 76 - "Meeting Search Banner"

Cohesion: 1.0
Nodes (1): MeetingSearchBanner

### Community 77 - "Post Detail Component"

Cohesion: 1.0
Nodes (1): SosotalkPostDetail Component

### Community 78 - "Best Soeat Readme"

Cohesion: 1.0
Nodes (1): BestSoeatCard README

### Community 79 - "Navigation Readme"

Cohesion: 1.0
Nodes (1): NavigationBar README

## Knowledge Gaps

- **60 isolated node(s):** `Auth Feature Index`, `Auth Model Index`, `Favorites Feature Index`, `Shared Utils (cn)`, `Shared URL Utils` (+55 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Login Required Modal`** (2 nodes): `login-require-modal.tsx`, `LoginRequireModal()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Session Expired Modal`** (2 nodes): `session-expired-modal.tsx`, `SessionExpiredModal()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Signup Form`** (2 nodes): `signup-form.tsx`, `SignupForm()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Signup Header`** (2 nodes): `signup-header.tsx`, `SignupHeader()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Step Header`** (2 nodes): `step-header.tsx`, `SignupStepHeader()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Meeting CTA Section`** (2 nodes): `cta-section.tsx`, `MeetingCreateModal & useMeetingCreateTrigger`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Main Banner`** (2 nodes): `main-banner.tsx`, `onSelect()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Meeting Detail Server`** (2 nodes): `meeting-detail.server.ts`, `getMeetingById()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Profile Edit Modal`** (2 nodes): `EditProfileModal Feature`, `UserCard Component`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Meeting Filter Bar`** (2 nodes): `MeetingFilterBar Component`, `Meeting Sort Options Repository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Signup Schema`** (1 nodes): `signup-form.schema.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Notification Time Utils`** (1 nodes): `format-notification-meta-time.constants.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Notification Types`** (1 nodes): `notification.types.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Scroll Area Types`** (1 nodes): `notification-scroll-area.types.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Image Upload Types`** (1 nodes): `image-upload-field.types.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Stepper`** (1 nodes): `stepper.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Meeting Type Section`** (1 nodes): `meeting-type-section.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Auth Index`** (1 nodes): `Auth Feature Index`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Auth Model`** (1 nodes): `Auth Model Index`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Favorites Index`** (1 nodes): `Favorites Feature Index`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Shared Utils`** (1 nodes): `Shared Utils (cn)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Generated Types`** (1 nodes): `Shared Generated Types`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Heart Button Types`** (1 nodes): `HeartButton Types`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Meeting Create Index`** (1 nodes): `Meeting Create Feature Index`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Meeting Create Constants`** (1 nodes): `Meeting Create Constants`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Meeting Create Trigger`** (1 nodes): `useMeetingCreateTrigger Hook`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Meeting Edit Constants`** (1 nodes): `Meeting Edit Constants`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Meeting Edit Types`** (1 nodes): `Meeting Edit Types`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Scroll Area Classes`** (1 nodes): `scrollAreaClasses`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Notification Icon Class`** (1 nodes): `NOTIFICATION_ICON_BOX_CLASS`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Meeting Icon`** (1 nodes): `MeetingIcon`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `User Icon`** (1 nodes): `UserIcon`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Read Check Icon`** (1 nodes): `ReadCheckIcon`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Login Form`** (1 nodes): `LoginForm Component`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `MyPage Count Card`** (1 nodes): `CountCard Component`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Filter Bar Types`** (1 nodes): `MeetingFilterBarProps Types`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Search Bar Component`** (1 nodes): `SearchBar`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Meeting Make Button`** (1 nodes): `MeetingMakeButton`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Meeting Search Banner`** (1 nodes): `MeetingSearchBanner`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Post Detail Component`** (1 nodes): `SosotalkPostDetail Component`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Best Soeat Readme`** (1 nodes): `BestSoeatCard README`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Navigation Readme`** (1 nodes): `NavigationBar README`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `fetchClient` connect `Favorites & MyPage Tabs` to `Notification System`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `Entities Auth` connect `Auth Feature` to `SosoTalk Post Detail`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `useMeetingForm Hook` (e.g. with `step1-category.tsx` and `Step2 Basic Info Component`) actually correct?**
  _`useMeetingForm Hook` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Auth Feature Index`, `Auth Model Index`, `Favorites Feature Index` to the rest of the system?**
  _60 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Notification System` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Favorites & MyPage Tabs` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Meeting Detail Actions` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._
