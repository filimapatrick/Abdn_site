# Technical Design Document (TDD)
## ABDN Fellowship Learning Platform

* **Organization:** African Brain Data Network (ABDN)
* **Product Lead:** Patrick Filima
* **Document Version:** 1.0
* **Status:** Proposed
* **Date:** August 2026
* **Related Document:** ABDN Fellowship Learning Platform PRD
* **Target Release:** V1 MVP

---

## 1. Executive Summary

The **ABDN Fellowship Learning Platform** is a learner-facing digital platform that unifies ABDN's existing fellowship infrastructure into a single learning experience.

The platform will not replace the systems ABDN already uses. Instead, it will create an orchestration layer across:
* **Firebase**
* **GitHub**
* **Zoom**
* **ABDN's existing Admin Dashboard**
* **ABDN's learner-facing website**

### Core Architectural Principle
> **Firebase** manages application state and learner state; **GitHub** manages educational content; the existing **Admin Dashboard** manages publishing; **Zoom** remains the recording platform; the **learner frontend** orchestrates these resources into a unified learning experience.

### High-Level Architecture Diagram

```text
                        ABDN ADMIN
                            │
                            ▼
                   ┌─────────────────┐
                   │ Admin Dashboard │
                   └────────┬────────┘
                            │
                Publish / Manage Lessons
                            │
                            ▼
                   ┌─────────────────┐
                   │    Firebase     │
                   │                 │
                   │ Auth            │
                   │ Firestore       │
                   │ Progress        │
                   │ Lesson State    │
                   └───────┬─────────┘
                           │
               ┌───────────┼────────────┐
               │           │            │
               ▼           ▼            ▼
            GitHub       Zoom        Analytics
               │           │
               └─────┬─────┘
                     ▼
            ┌─────────────────┐
            │ Learner         │
            │ Frontend        │
            └─────────────────┘
                     │
                     ▼
                Fellow
```

---

## 2. Technical Objectives

The architecture must:
1. Provide a single unified learning experience.
2. Reuse ABDN's existing infrastructure.
3. Minimize unnecessary backend development.
4. Keep sensitive recording-access information protected.
5. Allow curriculum content to evolve without requiring frontend redeployment.
6. Allow lessons to be published dynamically.
7. Track learner progress reliably.
8. Support GitHub-hosted educational resources.
9. Provide graceful degradation when external services are unavailable.
10. Scale to additional cohorts and modalities.

---

## 3. Design Principles

### 3.1 Single Source of Truth by Domain

The system deliberately does not make one system responsible for everything.

| Domain | Source of Truth |
| :--- | :--- |
| **Authentication** | Firebase Auth |
| **User profile** | Firestore |
| **Lesson publishing state** | Firestore |
| **Learner progress** | Firestore |
| **Curriculum** | GitHub Curriculum Repository |
| **Lecture materials** | GitHub Cohort Repository |
| **Video recordings** | Zoom |
| **Product analytics** | Firebase / Analytics layer |

This separation prevents unnecessary duplication.

---

## 4. System Architecture

### 4.1 High-Level Architecture

```text
                   ┌──────────────────────┐
                   │   ABDN ADMIN USERS   │
                   └──────────┬───────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │   ABDN ADMIN         │
                   │   DASHBOARD          │
                   └──────────┬───────────┘
                              │
                Create / Edit / Publish
                              │
                              ▼
                   ┌──────────────────────┐
                   │      FIREBASE        │
                   │                      │
                   │ Firebase Auth        │
                   │ Firestore            │
                   │ Security Rules       │
                   │ Progress             │
                   └──────────┬───────────┘
                              │
              ┌───────────────┼────────────────┐
              │               │                │
              ▼               ▼                ▼
      ┌─────────────┐ ┌─────────────┐ ┌──────────────┐
      │   GitHub    │ │    Zoom     │ │  Analytics   │
      │             │ │             │ │              │
      │ Curriculum  │ │ Recordings  │ │ Events       │
      │ Materials   │ │             │ │ Metrics      │
      └──────┬──────┘ └──────┬──────┘ └──────┬───────┘
             │               │                │
             └───────────────┼────────────────┘
                             ▼
                  ┌─────────────────────┐
                  │ ABDN LEARNER        │
                  │ FRONTEND            │
                  │                     │
                  │ Dashboard           │
                  │ Learning Paths      │
                  │ Lesson Player       │
                  │ Progress            │
                  └──────────┬──────────┘
                             │
                             ▼
                          FELLOW
```

---

## 5. Existing Technology Stack

The V1 architecture is designed around the technology already used by ABDN.

* **Frontend:** React, TypeScript, Existing ABDN website/application
* **Backend / Application Services:** Firebase, Firestore, Firebase Authentication, Firebase Security Rules
* **Content:** GitHub, Markdown, PDF, Jupyter notebooks, external resources, Google Colab
* **Video:** Zoom recordings
* **Administration:** Existing ABDN Admin Dashboard

---

## 6. Repository Architecture

The system uses two GitHub repositories with different responsibilities.

### 6.1 Curriculum Repository
`ABDN_TA_Fellowship_Curriculum`

**Purpose:** Defines *what* the fellowship teaches.

```text
ABDN_TA_Fellowship_Curriculum/
│
├── eeg.md
├── mri_fmri.md
├── electrophysiology.md
└── fnir.md
```

### 6.2 Cohort Repository
`ABDN_2026_FELLOWSHIP_COHORT`

**Purpose:** Stores actual educational artifacts and learner work.

```text
ABDN_2026_FELLOWSHIP_COHORT/
│
├── lectures/
│   ├── eeg/
│   ├── mri_fmri/
│   ├── electrophysiology/
│   └── fnirs/
│
├── assignments/
├── participants/
├── templates/
├── datasets/
└── showcase/
```

---

## 7. Why Two GitHub Repositories?

This separation prevents curriculum definition from being tightly coupled to cohort artifacts.

```text
Curriculum Repository
      │
      │ "What should be taught?"
      ▼
  Curriculum

Cohort Repository
      │
      │ "What resources support it?"
      ▼
Slides / Notebooks / Assignments
```

This allows ABDN to update lecture materials without restructuring the master curriculum.

---

## 8. Firebase Architecture

Firebase is the application's operational state layer.

```text
Firebase
│
├── Authentication
│
├── Firestore
│   ├── users
│   ├── lessons
│   ├── videoAccess
│   └── analytics
│
└── Security Rules
```

---

## 9. Firestore Data Model

### 9.1 Users
Collection: `users/{uid}`

```json
{
  "displayName": "Jane Doe",
  "email": "jane@example.com",
  "role": "fellow",
  "cohort": "ABDN-2026",
  "enrolledModalities": [
    "eeg",
    "mri"
  ],
  "createdAt": "...",
  "lastActiveAt": "..."
}
```

---

## 10. Lessons Collection

Collection: `lessons/{lessonId}`

```json
{
  "lessonId": "MRI-001",
  "title": "Intro to MRI Physics",
  "modality": "MRI",
  "weekId": "2026-W03",
  "date": "2026-07-24",
  "module": "MRI Foundations",
  "description": "Introduction to MRI physics",
  "status": "published",
  "videoAccessId": "VIDEO-MRI-001",
  "githubPath": "lectures/mri_fmri/week_03",
  "assignmentPath": "assignments/mri_fmri/week_03",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## 11. Week Model

Weeks should be represented independently from lessons.

Collection: `weeks/{weekId}`

```json
{
  "weekId": "2026-W03",
  "cohort": "ABDN-2026",
  "weekNumber": 3,
  "startDate": "2026-07-20",
  "endDate": "2026-07-24",
  "status": "active"
}
```

This is important because a week is not the same thing as a lesson. For example:

```text
Week 3
│
├── MRI
│   └── Intro to MRI Physics
│
├── EEG
│   └── Artifacts in EEG
│
└── fNIRS
    └── (No lesson)
```

The frontend should not assume every modality has a lesson every week.

---

## 12. Modality Model

Collection: `modalities/{modalityId}`

```json
{
  "id": "eeg",
  "name": "EEG",
  "description": "Electroencephalography",
  "curriculumFile": "eeg.md",
  "githubLecturePath": "lectures/eeg"
}
```

This enables new modalities to be added without rewriting dashboard logic.

---

## 13. Video Access Model

Video metadata should be separated from normal lesson metadata.

Collection: `videoAccess/{videoAccessId}`

```json
{
  "lessonId": "MRI-001",
  "recordingReference": "...",
  "accessStatus": "available"
}
```

### Important Security Requirement
The system should not treat a Zoom password as a normal lesson field. The password should not be:
* committed to GitHub
* embedded in frontend code
* exposed through a public spreadsheet
* included in publicly readable lesson documents

The exact mechanism used to retrieve or broker protected recording access must depend on ABDN's current Firebase security architecture.

---

## 14. Learner Progress Model

Recommended structure: `users/{uid}/progress/{lessonId}`

```json
{
  "lessonId": "MRI-001",
  "status": "completed",
  "startedAt": "...",
  "completedAt": "...",
  "lastAccessedAt": "..."
}
```

Relationship:
```text
User
 │
 └── Progress
         │
         └── Lesson
```

---

## 15. Lesson Lifecycle

Lessons should follow a controlled state machine:

```text
DRAFT  ──►  READY  ──►  PUBLISHED  ──►  ARCHIVED
```

* **DRAFT:** Lesson is being prepared.
* **READY:** Required metadata/resources have been configured.
* **PUBLISHED:** Visible to learners.
* **ARCHIVED:** No longer active.

---

## 16. Publishing Workflow

```text
Faculty/Admin
     │
     ▼
Create Lesson
     │
     ▼
Add Metadata
     ├── Curriculum
     ├── Recording
     ├── GitHub materials
     └── Assignment
     │
     ▼
Content Validation
     │
     ▼
   READY
     │
     ▼
  PUBLISH
     │
     ▼
 Firestore
     │
     ▼
Learner Dashboard
```

---

## 17. Frontend Architecture

The frontend is responsible for presentation and learner interaction, not being the source of truth.

Recommended structure:
```text
src/
│
├── pages/
│   └── learning/
│       └── Dashboard.tsx
│
├── components/
│   └── learning/
│       ├── DashboardTopNav.tsx
│       ├── DashboardSidebar.tsx
│       ├── LearningPathCard.tsx
│       ├── WeekSection.tsx
│       ├── LessonCard.tsx
│       └── LessonPlayerModal.tsx
│
└── services/
    ├── elearningService.ts
    ├── progressService.ts
    └── authService.ts
```

---

## 18. Service Responsibilities

### `authService.ts`
Responsible for:
* authentication
* user profile
* enrollment
* authorization-related operations

### `elearningService.ts`
Responsible for:
* lesson retrieval
* GitHub curriculum retrieval
* GitHub material retrieval
* curriculum parsing
* resource mapping

### `progressService.ts`
Responsible for:
* lesson start
* lesson completion
* progress retrieval
* progress calculation
* progress aggregation

*This separation prevents business logic from becoming embedded directly inside React components.*

---

## 19. Data Flow — Dashboard

When a fellow opens the dashboard:

```text
Fellow
 │
 ▼
Dashboard.tsx
 │
 ├───────────────┐
 ▼               ▼
Firebase        GitHub
 │               │
 │               ├── Curriculum
 │               └── Materials
 │
 ├── User
 ├── Lessons
 └── Progress
 │
 ▼
elearningService
 │
 ▼
Dashboard State
 │
 ▼
UI
```

---

## 20. Data Flow — Lesson

When a learner opens a lesson:

```text
LessonCard
   │
   ▼
LessonPlayerModal
   │
   ├── Lesson metadata ──► Firestore
   │
   ├── Recording       ──► Zoom
   │
   ├── Slides          ──► GitHub
   │
   ├── Notebook        ──► GitHub
   │
   └── Progress        ──► Firestore
```

---

## 21. Curriculum Data Flow

```text
GitHub
 │
 ▼
GET curriculum markdown
 │
 ▼
Cache
 │
 ▼
Markdown parser
 │
 ├── Modules
 ├── Objectives
 ├── Weeks
 └── Topics
 │
 ▼
Structured curriculum
 │
 ▼
Dashboard
```

---

## 22. GitHub API Integration

The frontend/service layer can retrieve public repository content through GitHub's APIs. For example:
`GET /repos/{owner}/{repo}/contents/{path}`

The system can retrieve directory listings, file metadata, file URLs, and raw content.

For public educational repositories, a GitHub token is generally not required for basic public-content retrieval. This is preferable to embedding a privileged GitHub credential in the browser.

---

## 23. GitHub Security Model

* **Public repositories:** Use unauthenticated requests where practical (or raw content endpoints).
* **Private repositories:** Do not place a GitHub personal access token in frontend JavaScript. Instead:

```text
Frontend  ──►  Trusted Backend / Proxy  ──►  GitHub API
```

The backend securely stores the GitHub credential.

---

## 24. GitHub Material Mapping

The system maps materials to lessons using a stable Lesson ID to GitHub path strategy.

```text
Lesson ID (MRI-001)  ──►  GitHub path (lectures/mri_fmri/week_03/)
```

Folder contents:
```text
lectures/mri_fmri/week_03/
│
├── MRI_Physics.pdf
├── MRI_Physics.ipynb
└── README.md
```

The frontend categorizes them automatically:
* 📊 **Slides:** `MRI_Physics.pdf`
* 💻 **Notebook:** `MRI_Physics.ipynb`
* 📄 **Notes:** `README.md`

---

## 25. Colab Integration

For Jupyter notebooks:

```text
GitHub Notebook  ──►  Colab URL Generator  ──►  Open in Google Colab
```

Example conceptual URL:
`https://colab.research.google.com/github/.../notebook.ipynb`

The platform does not need to host execution runtime for notebooks.

---

## 26. Video Integration

The system treats Zoom as an external recording provider.

```text
Lesson ──► videoAccessId ──► Video access metadata ──► Recording
```

The learner does not need to know which Zoom account originally created the recording. This abstraction is important because recordings may come from different Zoom accounts.

---

## 27. Why Not Store Zoom Passwords in the Lesson?

The lesson is a normal educational entity. A Zoom password is an access credential. They have different security classifications.

```text
Lesson (Public/Learner Entity)
├── title
├── week
├── modality
├── curriculum
└── videoAccessId  (Reference Pointer)
```

This reduces the risk of accidentally exposing credentials through Firestore reads, frontend state, browser developer tools, GitHub, analytics, or logs.

---

## 28. Progress Architecture

```text
Learner opens lesson  ──►  lesson_started
                                 │
                                 ▼
Learner interacts     ──►  lesson_completed  ──►  Firestore  ──►  Dashboard recalculates
```

---

## 29. Completion Definition

For V1, completion should be deliberately simple.

**Recommended definition:** A learner explicitly marks the lesson as completed after accessing the lesson experience.

This is preferable to pretending that *"video played for 37 minutes = learning occurred"*. Actual learning outcomes should eventually be measured through assessments.

---

## 30. Progress Calculation

* **Lesson:**
  * Completed = 100%
  * Not Started = 0%
  * In Progress = optional intermediate state
* **Modality:**
  $$\text{Modality Progress} = \frac{\text{Completed Lessons}}{\text{Published Lessons}} \times 100$$
* **Overall:**
  $$\text{Overall Progress} = \frac{\text{All Completed Lessons}}{\text{All Published Lessons Available}} \times 100$$

---

## 31. Caching Strategy

GitHub curriculum content does not need to be requested on every page render.

```text
Request  ──►  Check memory cache
                 │
                 ├── Valid ──► Return cached content
                 │
                 └── Expired ──► Fetch from GitHub ──► Update cache
```

A 10-minute cache is reasonable for V1, subject to observed API usage. Firebase lesson/progress state should remain authoritative and should not rely solely on frontend caching.

---

## 32. Failure Handling

The platform depends on external services, so failure must be expected and handled gracefully.

### GitHub Unavailable
The dashboard should still show cached curriculum where available, Firebase lesson metadata, recordings, and progress.
* **Display UI:** *"Learning materials are temporarily unavailable."*

### Zoom Unavailable
The lesson remains visible.
* **Display UI:** *"Recording currently unavailable."*
* The learner can still access slides, notes, notebooks, and assignments.

### Firebase Unavailable
The application cannot reliably retrieve current state.
* **Display UI:** The UI should provide a clear error rather than showing misleading progress.

---

## 33. API Failure Strategy

External API requests should use:
* timeout handling
* retries where appropriate (with exponential backoff)
* caching
* graceful fallback
* error logging

*Avoid infinite retry loops.*

---

## 34. Notification Architecture

Notifications are derived from two sources:

```text
Firebase (New lesson / New recording)  ──┐
                                         ├──► Notification Engine ──► Learner UI (🔔 3)
GitHub (Relevant content update)       ──┘
```

Read state can initially be stored locally. If ABDN eventually needs cross-device notification state, notification-read state should move to Firestore.

---

## 35. Analytics Architecture

Events should be captured around meaningful learner actions:
* `user_registered`
* `pathway_enrolled`
* `lesson_viewed`
* `lesson_started`
* `lesson_completed`
* `material_opened`
* `notebook_opened`
* `assignment_opened`

```text
Frontend  ──►  Analytics Event  ──►  Analytics Store  ──►  Metrics  ──►  Admin / Product Dashboard
```

---

## 36. Key Product Metrics

The technical system must make the following measurable:

* **Activation Rate:**
  $$\frac{\text{Activated Users}}{\text{Registered Users}}$$
* **Weekly Active Learners (WAL):** Unique learners performing meaningful learning actions per week.
* **Lesson Completion Rate:**
  $$\frac{\text{Completed Lessons}}{\text{Started Lessons}}$$
* **Modality Completion Rate:**
  $$\frac{\text{Completed Lessons}}{\text{Published Lessons}}$$
* **Content Readiness Rate:**
  $$\frac{\text{Lessons with required resources}}{\text{Published Lessons}}$$

---

## 37. Observability

The platform should monitor:
* **Application:** frontend errors, failed API calls, authentication failures
* **Firebase:** Firestore errors, permission errors, unusual read/write activity
* **GitHub:** API failures, rate-limit events, repository availability
* **Learning:** lesson completion anomalies, unusually high drop-off, content access failures

---

## 38. Security Architecture

```text
                   PUBLIC
                      │
            ┌─────────┴─────────┐
            │                   │
       Learner UI           GitHub Public
            │
            ▼
        Firebase Auth
            │
            ▼
      Firebase Rules
            │
      ┌─────┴─────┐
      │           │
   Learner      Admin
      │           │
      ▼           ▼
  User Data    Admin Data
```

---

## 39. Authorization

Roles should be explicitly represented: `fellow`, `faculty`, `admin`.

A fellow should **not** be able to:
* publish lessons
* modify another learner's progress
* access administrative records
* modify video-access configuration

---

## 40. Firestore Security Rules

Conceptually:

* **Fellow:**
  * `read` $\rightarrow$ published lessons
  * `read/write` $\rightarrow$ own progress (`request.auth.uid == userId`)
  * `read` $\rightarrow$ own profile
* **Faculty/Admin:**
  * `create/update` $\rightarrow$ lessons
  * `manage` $\rightarrow$ approved content
* **Admin:**
  * `manage` $\rightarrow$ administrative resources

*The exact Firestore rules must be tested against the production data model before release.*

---

## 41. Scalability

The architecture should support multi-cohort scaling without requiring separate web applications:

```text
2026 Cohort  ──►  2027 Cohort  ──►  2028 Cohort  ──►  Multiple Concurrent Cohorts
```

The cohort should therefore be a data attribute: `cohort: "ABDN-2026"` rather than being hardcoded into frontend logic.

---

## 42. Multi-Cohort Architecture

```text
lessons/
│
├── ABDN-2026/
│   ├── MRI
│   ├── EEG
│   └── fNIRS
│
└── ABDN-2027/
    ├── MRI
    ├── EEG
    └── fNIRS
```

---

## 43. Extensibility Roadmap

The architecture makes future additions possible without redesigning the entire core:

```text
V1: Learning Platform  ──►  V2: Assignments & Assessments  ──►  V3: Projects & Portfolio  ──►  V4: Certificates  ──►  V5: Alumni & Research Network
```

---

## 44. Technical Risks & Mitigations

| Risk | Severity | Mitigation |
| :--- | :--- | :--- |
| **Zoom authentication complexity** | High | Separate video-access abstraction layer |
| **GitHub API rate limits** | Medium | Cache requests / raw endpoints |
| **GitHub repository structure changes** | Medium | Enforce stable conventions + lesson IDs |
| **Firebase security misconfiguration** | High | Automated rules testing + least privilege access |
| **Frontend exposing credentials** | Critical | Never store secrets/tokens in client-side JS |
| **External service outage** | Medium | Graceful degradation UI patterns |
| **Curriculum parser breaks** | Medium | Input validation + fallback views |
| **Scope expansion** | High | Enforce strict V1 MVP boundary |

---

## 45. Key Technical Decision: Lesson ID

A stable lesson ID is one of the most critical architectural decisions (`MRI-001`, `EEG-001`, `FNIRS-001`, `EPHY-001`).

The ID becomes the universal key linking:

```text
Curriculum  ──┐
Lesson      ──┼──►  LESSON ID  ◄──  Zoom Recording
GitHub      ──┤                      Assignment & Progress
```

Without a stable identifier, the system becomes dependent on matching fragile strings such as lesson titles.

---

## 46. Canonical Lesson Relationship

```text
                        LESSON ID
                           │
         ┌─────────────────┼──────────────────┐
         │                 │                  │
         ▼                 ▼                  ▼
     Curriculum         Firebase            GitHub
         │              Lesson             Materials
         │                 │                  │
         └─────────────────┼──────────────────┘
                           │
                           ▼
                          Zoom
                           │
                           ▼
                        Progress
```

---

## 47. Example End-to-End Flow

**Scenario:** *MRI — Intro to MRI Physics*

1. **Admin Creation:**
   * `lessonId`: `MRI-001`
   * `modality`: `MRI`
   * `week`: `2026-W03`
   * Associated Curriculum: `mri_fmri.md`
   * Associated GitHub Path: `lectures/mri_fmri/week_03/`
   * Associated Zoom ID: `VIDEO-MRI-001`
   * Associated Assignment: `assignments/mri_fmri/week_03/`
2. **Storage:** Firestore persists the published lesson document.
3. **Learner Fetch:** Fellow logs in $\rightarrow$ Frontend queries published MRI lessons $\rightarrow$ Retrieves `MRI-001`.
4. **UI Render:** Dashboard displays:
   * **Week 3** | **MRI Foundations** | *Intro to MRI Physics*
   * Buttons: `[Watch Recording]`, `[View Slides]`, `[Open Notebook]`, `[View Assignment]`
5. **Completion:** Learner finishes lesson and clicks "Mark Complete".
6. **State Update:** Firestore records `users/{uid}/progress/MRI-001` $\rightarrow$ Dashboard recalculates progress bar to 100%.

---

## 48. Deployment Strategy

V1 will use a staged deployment strategy:

```text
Development  ──►  Internal Testing  ──►  Faculty/Admin UAT  ──►  Small Fellow Pilot  ──►  Production Release
```

---

## 49. Rollback Strategy

Every production release must have a documented rollback path:
* Version-controlled frontend releases
* Previous production build artifact retained
* Firebase configuration backups
* Backward-compatible Firestore schema changes
* Documented rollback procedures

---

## 50. Testing Strategy

* **Unit Testing:** Curriculum parser, modality resolver, progress calculations, material categorizer.
* **Integration Testing:** Firebase $\rightarrow$ frontend, GitHub $\rightarrow$ frontend, lesson $\rightarrow$ recording link, user $\rightarrow$ progress store.
* **Security Testing:** Unauthorized Firestore access attempts, fellow vs admin permissions, cross-user progress isolation, credential exposure prevention.
* **End-to-End Testing:** Complete journey from Sign In $\rightarrow$ Select Modality $\rightarrow$ Dashboard $\rightarrow$ View Materials $\rightarrow$ Mark Complete $\rightarrow$ Verify Metrics.

---

## 51. Definition of Technical Readiness

The platform is technically ready for pilot when:
- [x] Authentication works securely.
- [x] Firestore security rules are validated.
- [x] Published lessons load correctly.
- [x] Weeks and modalities map correctly.
- [x] GitHub curriculum and materials load reliably.
- [x] Recordings open correctly without exposing sensitive passcodes.
- [x] Progress persists across sessions.
- [x] Dashboard metrics calculate accurately.
- [x] GitHub or Zoom failure does not crash the learner dashboard.
- [x] Firebase errors are handled gracefully.
- [x] Admin publishing workflow operates smoothly.
- [x] Production rollback procedure is documented.

---

## 52. Recommended Implementation Sequence

```text
Sprint 1: Foundation      ──►  Auth, Firebase models, security rules, lesson schema
Sprint 2: Learning Struct ──►  Modalities, Weeks, Lessons, Dashboard shell
Sprint 3: Content Integ   ──►  GitHub curriculum/materials parser, Colab links
Sprint 4: Video Integration──► Video access broker, Lesson player modal, Zoom integration
Sprint 5: Progress Sync   ──►  Lesson states, progress persistence, aggregated completion
Sprint 6: Analytics & Hard──►  Telemetry, notifications, error fallbacks, UAT & security tests
```

---

## 53. Architecture Decision Record (ADR) Summary

| Decision | Rationale |
| :--- | :--- |
| **Firebase for application state** | Uses existing ABDN infrastructure |
| **GitHub for educational content** | Matches existing faculty workflow and version control |
| **Zoom remains video provider** | Avoids costly custom video infrastructure |
| **Two GitHub repositories** | Separates master curriculum from cohort-specific runtime artifacts |
| **Stable lesson IDs** | Enables reliable cross-system resource mapping |
| **Separate video access from lesson** | Enforces strict security boundary around recording passcodes |
| **Firestore for progress** | Persistent, user-scoped real-time application state |
| **Frontend service layer** | Keeps business logic clean and decoupled from React components |
| **Cache GitHub content** | Prevents hitting API rate limits and speeds up render times |
| **Dynamic lessons** | Avoids hardcoding curriculum in client-side code |
| **Cohort as data attribute** | Ensures multi-cohort scalability |

---

## 54. Architectural Trade-offs

* **Why GitHub instead of copying materials into Firebase?**
  * Because GitHub is already the faculty's working environment and provides version control, collaboration, and reproducibility.
* **Why Firebase instead of GitHub for progress?**
  * Because learner progress is dynamic application state, not source-controlled static educational content.
* **Why not build custom video hosting?**
  * ABDN already uses Zoom. V1 prioritizes smart integration over rebuilding expensive media infrastructure.
* **Why not put everything into one database?**
  * Curriculum, application state, recordings, and learner progress have different security boundaries, ownership, and lifecycles.

---

## 55. Technical Program Governance & Delivery Model

The technical delivery of the ABDN Fellowship Learning Platform follows a structured Technical Program Management framework:

* **Requirements Alignment:** Translates educational PRD goals directly into decoupled, production-grade system architecture and database schemas.
* **Interface Specification:** Defines strict integration contracts and domain boundaries across Firebase (application state), GitHub (curriculum & materials), and Zoom (video media).
* **Risk & Security Governance:** Enforces least-privilege security access, isolates video credentials, and implements graceful degradation strategies against third-party service downtime.
* **Outcome-Driven Execution:** Coordinates engineering sprints and rollout milestones against measurable learning metrics (WAL, completion rate, content readiness).

---

## 56. Final Architecture Summary

```text
                        ┌────────────────────┐
                        │   ADMIN DASHBOARD  │
                        └─────────┬──────────┘
                                  │
                                  ▼
                        ┌────────────────────┐
                        │      FIREBASE      │
                        │                    │
                        │ • Authentication   │
                        │ • Firestore        │
                        │ • Security Rules   │
                        │ • Learner Progress │
                        └─────────┬──────────┘
                                  │
             ┌────────────────────┼────────────────────┐
             │                    │                    │
             ▼                    ▼                    ▼
     ┌───────────────┐    ┌───────────────┐     ┌──────────────┐
     │    GITHUB     │    │     ZOOM      │     │  ANALYTICS   │
     │               │    │               │     │              │
     │ Curriculum    │    │ Recordings    │     │ Events       │
     │ Slides        │    │               │     │ Engagement   │
     │ Notebooks     │    │               │     │ Completion   │
     │ Assignments   │    │               │     │              │
     └───────┬───────┘    └───────┬───────┘     └──────┬───────┘
             │                    │                    │
             └────────────────────┼────────────────────┘
                                  ▼
                        ┌────────────────────┐
                        │ ABDN LEARNING APP  │
                        │                    │
                        │ Dashboard          │
                        │ Learning Paths     │
                        │ Weeks              │
                        │ Lessons            │
                        │ Lesson Player      │
                        │ Progress           │
                        └─────────┬──────────┘
                                  │
                                  ▼
                             ┌──────────┐
                             │  FELLOW  │
                             └──────────┘
```

### Core Architectural Takeaway
* **GitHub** tells the platform *what* educational content exists.
* **Firebase** tells the platform *what* is published and *what* the learner has accomplished.
* **Zoom** provides the video recording experience.
* The **ABDN Frontend** orchestrates all three into a single, seamless learning journey.
