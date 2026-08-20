# Test, QA & Release Management Plan
## ABDN Fellowship Learning Platform

* **Document Owner:** Patrick Filima
* **Role:** Product Lead / Technical Program Manager
* **Organization:** African Brain Data Network (ABDN)
* **Product:** ABDN Fellowship Learning Platform
* **Version:** 1.0
* **Status:** Proposed

---

## 1. Purpose

This document defines the quality assurance, testing, release, and production-readiness strategy for the ABDN Learning Platform.

The goal is to ensure that every major release is:
* Functionally correct
* Secure
* Reliable
* Usable
* Compatible with existing ABDN infrastructure
* Measurable
* Operationally supportable

### Platform Integration Architecture

```text
                   ABDN LEARNING PLATFORM
                          │
       ┌──────────────────┼──────────────────┐
       │                  │                  │
    Firebase            GitHub              Zoom
       │                  │                  │
Authentication       Curriculum          Recordings
Firestore             Materials           Sessions
Progress              Assignments
       │                  │                  │
       └──────────────────┼──────────────────┘
                          │
                          ▼
                   Learner Frontend
```

*Because a failure in any single dependency can impact the learner experience, Quality Assurance must validate the complete integrated ecosystem rather than isolated components.*

---

## 2. Quality Objectives

The platform must satisfy five primary quality objectives:

* **Q1 Reliability:** Learners must consistently be able to access published learning content without platform crashes or unexpected outages.
* **Q2 Data Integrity:** Lesson, user profile, pathway enrollment, and completion progress data must remain accurate and synchronized across sessions.
* **Q3 Security:** Authentication credentials and sensitive video recording passcodes must be strictly protected against unauthorized exposure.
* **Q4 Usability:** A fellow must be able to navigate the platform, launch lessons, and access resources intuitively without technical assistance.
* **Q5 Operational Readiness:** ABDN administrators must be able to publish and manage learning content smoothly through the Admin Dashboard without requiring manual engineering intervention for routine tasks.

---

## 3. Quality Strategy

Testing occurs across multiple technical and operational layers:

```text
                ┌──────────────────┐
                │ Acceptance Tests │
                └────────┬─────────┘
                         │
                ┌────────▼─────────┐
                │   End-to-End     │
                └────────┬─────────┘
                         │
             ┌───────────▼───────────┐
             │    Integration        │
             └───────────┬───────────┘
                         │
             ┌───────────▼───────────┐
             │     Component         │
             └───────────┬───────────┘
                         │
             ┌───────────▼───────────┐
             │       Unit            │
             └──────────────────────┘
```

*The lower technical testing layers provide engineering confidence, while the upper acceptance testing layers provide product confidence.*

---

## 4. Test Levels

### 4.1 Unit Testing
Tests individual utility functions, algorithms, and service functions in isolation.
* `getPublishedLessons()`
* `calculateProgress()`
* `getCurriculumFileName()`
* `categorizeMaterialFile()`
* `unenrollFromPathway()`

**Example Unit Test:**
* *Input:* `MRI`
* *Expected Output:* `mri_fmri.md`

---

## 5. Component Testing

Tests individual React components with mock props to verify presentation, layout, and UI state handling.
* Dashboard shell
* Lesson cards & Modality cards
* Progress indicators & progress bars
* Lesson player modal
* Notification panel
* GitHub material resource cards

**Example Component Test:**
Given a published MRI lesson, the `<LessonCard />` component must correctly render title, modality tag, week ID, and date.

---

## 6. Integration Testing

Validates data flow and API contracts across system boundaries.

```text
Firebase Integration:   Frontend ──► Firebase Auth ──► Firestore
GitHub Integration:     Frontend ──► GitHub REST API ──► Curriculum Repository
Content Integration:    Lesson Document ──► VideoAccess Reference ──► Zoom Stream
```

These integration points must be validated independently and in combination.

---

## 7. End-to-End (E2E) Testing

End-to-end tests simulate the complete fellow journey from authentication to course completion.

```text
Sign In  ──►  Dashboard  ──►  Select Modality  ──►  Select Week  ──►  Open Lesson  ──►  Watch Recording  ──►  View Slides  ──►  Open Notebook  ──►  Mark Complete  ──►  Progress Updated
```

*This is one of the highest-priority test workflows for release approval.*

---

## 8. User Acceptance Testing (UAT)

UAT validates whether the platform fulfills ABDN's operational and fellowship requirements.

### UAT Participant Panel
* At least one ABDN Administrator
* At least one Faculty Member
* Representatives from different fellowship modality tracks
* Selected pilot Fellows

*UAT is conducted by operational stakeholders and end users, not exclusively by developers.*

---

## 9. Core User Acceptance Scenarios

### Scenario 1 — New Fellow Onboarding
* **Given:** A new fellow has completed account registration.
* **When:** They log in for the first time.
* **Then:** They are presented with the onboarding interface displaying available and enrolled learning pathways.

### Scenario 2 — Published Lesson Visibility
* **Given:** An administrator changes lesson `MRI-001` status to `published`.
* **When:** A fellow opens the MRI track.
* **Then:** `MRI-001` immediately appears under the designated week.

### Scenario 3 — Unpublished Lesson Isolation
* **Given:** An administrator creates a lesson document with status `draft`.
* **Then:** The draft lesson must not be visible or accessible to learners.

### Scenario 4 — Protected Video Access Flow
* **Given:** A published lesson is associated with a valid `videoAccessId`.
* **When:** A learner clicks "Watch Session".
* **Then:** The recording access flow opens securely without exposing credentials in client-side storage.

### Scenario 5 — GitHub Material Rendering
* **Given:** A lesson has associated materials in the cohort repository.
* **When:** A learner views the lesson player.
* **Then:** Slides (`.pdf`), notebooks (`.ipynb`), and notes are correctly categorized and linked.

---

## 10. Curriculum Mapping Tests

Dynamic curriculum fetching introduces mapping risks. QA must validate the complete taxonomy chain:

```text
Modality  ──►  Curriculum File  ──►  Module  ──►  Week  ──►  Lesson  ──►  Materials
```

**Validation Example:**
```text
MRI ──► MRI Foundations ──► Week 3 ──► MRI-001 ──► Intro to MRI Physics ──► Slides + Recording
```
*A fellow must never see a lesson mapped under an incorrect modality or week.*

---

## 11. GitHub Integration Testing

Testing must cover normal and edge-case response scenarios from GitHub:

```text
Normal Response:         lectures/mri_fmri/ ──► Files returned ──► Cards rendered
Empty Directory:         lectures/mri_fmri/ ──► No files ──► Friendly empty state UI
Missing Repository:      GitHub 404 / Outage ──► Graceful error message
Unsupported File Type:   file.xyz ──► Unknown type ──► Render safely without crashing UI
```

---

## 12. GitHub Failure Resilience

GitHub service disruptions must not break the overall dashboard.

```text
GitHub Unavailable  ──►  Display "Materials temporarily unavailable" message  ──►  Keep Firebase lessons & Zoom recordings operational
```

---

## 13. Firebase Testing

QA must validate:
* Authentication flow (email/password, session persistence, password reset)
* Firestore read/write performance
* Security rules enforcement (fellow vs. admin write permissions)
* Real-time progress persistence
* Pathway enrollment/unenrollment logic

**Authorization Rules Validation:**
* Learner $\rightarrow$ `read` access to published lessons.
* Learner $\rightarrow$ *Forbidden* from modifying lesson documents.
* Admin $\rightarrow$ `write` access to publish and manage lessons.

---

## 14. Progress Tracking Tests

Progress accuracy is essential for fellow evaluation.

```text
Lesson Start:     Lesson Opened      ──►  Progress set to "started"
Lesson Complete:  Lesson Completed   ──►  Progress set to "completed"
Reopening:        Completed Reopened ──►  Status remains "completed"
Idempotency:      Repeated clicks    ──►  No duplicate progress records created
```

---

## 15. Progress Calculation Verification

**Validation Formula Test:**
* **Given:** 10 published lessons in a modality pathway, 8 marked as completed by user.
* **Expected Result:** $\text{Progress} = 80\%$

**Unpublished Lesson Exclusion Test:**
* **Given:** 10 published lessons + 2 unpublished draft lessons; 8 completed.
* **Expected Result:** $\text{Progress} = \frac{8}{10} = 80\%$ (draft lessons must be excluded from progress calculations, *not* $\frac{8}{12} = 66.7\%$).

---

## 16. Authentication & Authorization Testing

* **Registration:** Valid email format, duplicate account handling, password strength rules.
* **Authentication:** Valid/invalid login credentials, session persistence across tab reloads, clean logout.
* **Authorization:** Direct URL manipulation (e.g., attempting to access `/admin/publish` as a fellow) must redirect to unauthorized access page.

---

## 17. Security & Secrets Protection

Sensitive credentials must **never** be:
* Committed to GitHub repositories
* Embedded in client-side JavaScript bundles
* Stored in publicly readable Firestore collections
* Exposed through unauthenticated API endpoints

*A strict boundary must isolate public lesson metadata from protected video access credentials.*

---

## 18. Secrets & Video Token Brokerage

```text
Admin Config  ──►  Secure Firebase Store  ──►  Token Broker (Server Rule / Function)  ──►  Ephemeral Fellow Stream
```

*Static Zoom passcodes are never passed directly to client-side storage.*

---

## 19. Performance & Latency Guidelines

The platform must maintain responsive target metrics under load:

| Performance Metric | Target Threshold |
| :--- | :--- |
| **Dashboard Initial Load Time** | $< 2.0$ seconds |
| **Lesson Retrieval Latency** | $< 300$ ms |
| **GitHub Material Fetch Latency** | $< 1.2$ seconds |
| **Firestore Progress Read/Write** | $< 200$ ms |
| **Lesson Player Modal Render** | $< 150$ ms |

---

## 20. API Failure & Retry Testing

External network requests must handle failure gracefully:

```text
GitHub API Timeout  ──►  Catch Exception  ──►  Log Telemetry  ──►  Display Fallback UI Notice
Firebase Network Err ──►  Retry (Backoff)  ──►  Display Connection Alert if offline
```

---

## 21. Device & Browser Compatibility Matrix

Testing must cover the following baseline platforms:

* **Desktop Browsers:** Google Chrome, Apple Safari, Mozilla Firefox, Microsoft Edge
* **Mobile Browsers:** iOS Safari, Android Chrome
* **Responsive Layout Breakpoints:** Mobile ($<640\text{px}$), Tablet ($768\text{px} - 1024\text{px}$), Desktop ($>1024\text{px}$)

---

## 22. Accessibility Requirements

The platform UI must adhere to WCAG 2.1 AA standards:
* Full keyboard navigation support (Tab order)
* High contrast ratio for text and badges ($\ge 4.5:1$)
* Semantic HTML5 headings (`<h1>` through `<h3>`)
* Accessible ARIA labels on button icons
* Visible focus ring indicators

---

## 23. Regression Testing Protocol

Every release candidate must pass automated and manual regression suites:

- [x] Authentication & Session Persistence
- [x] Dashboard Layout & Modality Cards
- [x] Pathway Enrollment / Unenrollment
- [x] Lesson Filtering by Week and Status
- [x] Video Player Modal Launch
- [x] GitHub Materials Retrieval
- [x] Progress Persistence & Aggregation
- [x] In-App Notifications
- [x] Admin Lesson Creation & Publishing Workflow

---

## 24. Test Data Management

Environment separation ensures clean test execution:

```text
Development Environment  ──►  Synthetic Test Users & Mock Data
Staging Environment      ──►  Controlled Test Cohort Data
Production Environment   ──►  Real Fellows & Live Fellowship Data
```

*Real fellow personal data is strictly prohibited in non-production environments.*

---

## 25. Defect Classification & Severity SLA

Defects discovered during testing are prioritized using a 4-tier severity model:

| Severity Level | Definition | Example | SLA / Release Impact |
| :--- | :--- | :--- | :--- |
| **P0 — Critical** | Platform unusable; security breach; severe data corruption | Auth completely broken; passcodes exposed | **Immediate Hotfix.** Blocks release. |
| **P1 — High** | Core functionality broken with no workaround | Fellows cannot access lesson recordings | **Fix Required.** Blocks release. |
| **P2 — Medium** | Non-blocking feature defect with workaround available | Progress percentage miscalculates for one track | **Fix Scheduled.** Target next release. |
| **P3 — Low** | Minor UI alignment, cosmetic, or copy defect | Mobile padding misaligned on lesson badge | **Backlog.** Defer to regular sprint. |

---

## 26. Defect Resolution Lifecycle

```text
Bug Identified  ──►  Logged in GitHub Issues  ──►  Triaged  ──►  Severity Assigned  ──►  Engineer Assigned  ──►  Fix Submitted  ──►  QA Verification  ──►  Regression Suite  ──►  Closed
```

---

## 27. Quality Release Gates

No build may be promoted to Production unless all five release gates pass sign-off:

* **Gate 1 — Functional Gate:** 100% of core unit and component acceptance tests pass.
* **Gate 2 — Integration Gate:** Firebase, GitHub API, and Zoom video integrations operate cleanly.
* **Gate 3 — Security Gate:** Zero unresolved P0 or P1 security vulnerabilities.
* **Gate 4 — UAT Gate:** Formal approval from ABDN Admin and Faculty representatives.
* **Gate 5 — Operational Gate:** Rollback procedure, release notes, and monitoring alerts prepared.

---

## 28. Release Decision Matrix

| Condition | Release Decision | Action Required |
| :--- | :---: | :--- |
| Any P0 Defect Unresolved | ❌ **REJECTED** | Halt deployment; immediate engineering triage. |
| Any P1 Defect Unresolved | ❌ **REJECTED** | Block release candidate until fix verified. |
| UAT Rejection by Stakeholders | ❌ **REJECTED** | Resolve operational feedback before deployment. |
| P2/P3 Cosmetic Issues Only | 🟢 **APPROVED** | Proceed with release; log open items in backlog. |
| Minor GitHub API Flake with Fallback | 🟢 **CONDITIONAL** | Proceed with release under active monitoring. |
| All Release Gates Passed | ✅ **APPROVED** | Execute production release checklist. |

---

## 29. Production Release Process

```text
Feature Complete  ──►  Code Review  ──►  Automated Tests  ──►  Integration Verification  ──►  UAT Sign-off  ──►  Tag Release Candidate  ──►  Production Deployment  ──►  Smoke Test  ──►  Telemetry Monitoring
```

---

## 30. Production Smoke Test Suite

Immediately following production deployment, the release manager executes a 10-point smoke test:

- [x] Verify Homepage loads without console errors.
- [x] Perform Fellow Login.
- [x] Load Dashboard shell.
- [x] Select Modality track.
- [x] Retrieve published Lesson.
- [x] Verify Zoom Video Access modal launch.
- [x] Fetch GitHub slides/notebooks.
- [x] Mark lesson as Complete and verify progress increment.
- [x] Test Admin Dashboard access.
- [x] Perform Logout.

---

## 31. Rollback Protocol

If a production incident occurs post-deployment:

```text
Production Incident Detected  ──►  Triage Severity  ──►  Execute Rollback Command  ──►  Restore Previous Stable Build  ──►  Verify Health  ──►  Root Cause Analysis  ──►  Fix & Re-release
```

---

## 32. Incident Management Lifecycle

1. **Detection:** Automated error alert or user bug report received.
2. **Triage:** Assign severity rating (P0 – P3).
3. **Ownership:** Designate Incident Commander.
4. **Communication:** Dispatch status updates to stakeholders per Communication Plan.
5. **Mitigation:** Apply hotfix or trigger rollback.
6. **Recovery:** Verify system restoration.
7. **Postmortem:** Conduct blameless root-cause analysis within 48 hours.

---

## 33. Incident Communication Protocol

| Audience | Detail Level | Example Message |
| :--- | :--- | :--- |
| **Engineering** | Technical stack trace, logs | *"Firestore permission denied error on `videoAccess` collection read."* |
| **Leadership** | High-level impact & ETA | *"Zoom recording launch is experiencing an issue. Engineering is applying a hotfix. ETA 30m."* |
| **Fellows** | User impact & simple guidance | *"Session recordings are temporarily undergoing maintenance. Slide decks and notebooks remain fully accessible."* |

---

## 34. Monitoring & Telemetry

### Technical Telemetry
* Frontend JavaScript exception rate
* Firebase Auth failure rate
* GitHub API HTTP error rate (403 rate limit / 404 / 500)
* Firestore query latency

### Product Engagement Telemetry
* Daily/Weekly Active Learners
* Lesson completion events
* Resource download events (slides/notebooks)

---

## 35. Release Quality Metrics

Post-release performance is evaluated using standard metrics:

| Metric | Calculation / Target | Objective |
| :--- | :--- | :--- |
| **Deployment Success Rate** | $\ge 95\%$ successful releases without rollback | Release process stability |
| **Rollback Rate** | $< 5\%$ of production deployments | Release candidate quality |
| **Defect Escape Rate** | Zero P0/P1 defects discovered post-release | QA test coverage effectiveness |
| **Mean Time to Recovery (MTTR)** | $< 30$ minutes for critical incidents | Incident resolution efficiency |
| **Change Failure Rate** | $< 10\%$ deployments causing degraded service | Engineering execution stability |

---

## 36. Definition of Release Ready

A release candidate is certified **Release Ready** when:
- [x] 100% of sprint functional requirements met.
- [x] Acceptance criteria verified by QA.
- [x] Zero open P0 or P1 defects.
- [x] Security and access rules validated.
- [x] UAT approval received from ABDN Admin & Faculty.
- [x] Analytics telemetry verified.
- [x] Documentation and release notes updated.
- [x] Rollback plan verified.
- [x] Stakeholders notified per Communication Plan.

---

## 37. QA Responsibility Assignment Matrix (RACI)

| Activity | Product Lead | Engineering | Faculty / Admin | QA Lead |
| :--- | :---: | :---: | :---: | :---: |
| **Test Strategy & Acceptance Criteria** | **A** | C | C | **R** |
| **Unit Test Implementation** | C | **A / R** | — | C |
| **Integration Testing** | C | **R** | — | **A / R** |
| **User Acceptance Testing (UAT)** | **A** | C | **R** | **R** |
| **Content Validation** | C | C | **A / R** | **R** |
| **Production Release Sign-off** | **A** | C | C | **R** |
| **Post-Release Monitoring** | **A** | **R** | C | C |

* **R** = Responsible, **A** = Accountable, **C** = Consulted

---

## 38. MVP Quality Priorities (V1 Scope Boundary)

To ensure launch deadlines are met without compromising stability:

* **Tier 1 (Critical for V1):** Authentication, lesson publishing, Zoom video access, GitHub material rendering, learner progress persistence.
* **Tier 2 (Secondary for V1):** Automated notifications, polished metrics dashboards, pathway badges.
* **Tier 3 (Deferred to V2+):** Automated quiz assessments, certificate generation, peer review, AI tutor assistant.

---

## 39. Final Launch Readiness Checklist

- [ ] **Product:** MVP scope validated, acceptance criteria completed.
- [ ] **Content:** Modality curricula mapped, lesson metadata configured, recordings verified.
- [ ] **Engineering:** Firebase security rules locked down, GitHub integration tested, progress engine verified.
- [ ] **QA:** Regression suite passed, UAT signed off, mobile responsiveness verified.
- [ ] **Operations:** Monitoring alerts active, rollback script verified, incident team on call.
- [ ] **Release:** Stakeholders briefed, smoke test executed, production build tagged.
