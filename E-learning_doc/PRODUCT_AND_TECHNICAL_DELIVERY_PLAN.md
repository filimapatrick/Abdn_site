# Product & Technical Delivery Plan
## ABDN Fellowship Learning Platform

* **Document Owner:** Patrick Filima
* **Role:** Product Lead / Technical Program Manager
* **Organization:** African Brain Data Network (ABDN)
* **Product:** ABDN Fellowship Learning Platform
* **Version:** 1.0
* **Status:** Proposed

---

## 1. Purpose

This document defines the execution strategy for transforming existing ABDN fellowship resources into an integrated digital learning platform.

The platform will bring together:
* Fellowship curriculum outlines
* Weekly lesson structures
* Recorded Zoom sessions
* Lecture slide decks
* GitHub notebooks and assignments
* Learner progress persistence
* Modality-specific learning paths
* In-app notifications
* Assessments and capstone projects
* Learning analytics telemetry

> **Core Objective:** Create a single, unified learning experience for ABDN fellows, while equipping administrators and leadership with the tools and data required to manage and continuously improve the fellowship program.

---

## 2. Delivery Principles

The program execution is guided by five core principles:

### 2.1 Build on Existing Infrastructure
Rather than introducing an entirely new custom backend or complex LMS engine, the platform leverages ABDN's established technology stack:
* Existing React/TypeScript website frontend
* Existing Firebase Authentication
* Existing Firestore database infrastructure
* Existing ABDN Admin Dashboard
* Existing GitHub repositories
* Existing Zoom recording storage

*This strategy minimizes implementation cost, reduces technical risk, and accelerates time-to-market.*

### 2.2 Single Source of Truth by Domain

| Information Domain | System of Record | Primary Responsibility |
| :--- | :--- | :--- |
| **User Identity** | Firebase Auth | User authentication & credentials |
| **User Profile** | Firestore | Roles, cohort association, enrolled pathways |
| **Lesson Metadata** | Firestore | Titles, weeks, dates, publishing status (`draft`/`published`) |
| **Video Access Metadata** | Firestore | Secure recording references & access token configuration |
| **Learning Progress** | Firestore | User lesson status (`started`/`completed`) and progress timestamps |
| **Master Curriculum** | GitHub Repo (`ABDN_TA_Fellowship_Curriculum`) | Modality curriculum outlines (`.md`) |
| **Lecture Materials** | GitHub Repo (`ABDN_2026_FELLOWSHIP_COHORT`) | Slides (`.pdf`), notebooks (`.ipynb`), reading notes |
| **Assignments** | GitHub Repo | Assignment instructions & templates |
| **Participant Submissions** | GitHub Repo | Fellow repository submissions & portfolio code |
| **Video Media** | Zoom Infrastructure | Session recording video streams |

### 2.3 Progressive Delivery Model
The platform does not attempt to deploy every complex feature simultaneously. Delivery is executed incrementally:

$$\text{MVP (V1)} \quad\longrightarrow\quad \text{Pilot} \quad\longrightarrow\quad \text{Engagement (V1.5)} \quad\longrightarrow\quad \text{Assessment & Analytics (V2+)}$$

### 2.4 Data-Driven Product Development
Every major technical capability must be tied to a measurable operational outcome. For example:
> *Instead of simply stating:* "We added lesson progress tracking."
> *The program measures:* "We increased the percentage of fellows completing weekly lessons from $X\%$ to $Y\%$."

### 2.5 Security by Design
Sensitive access credentials (e.g., Zoom session passcodes) must **never** be exposed in public GitHub repositories, hard-coded in client bundles, or exposed in public spreadsheets.

---

## 3. Product Workstreams

Program execution is structured across seven dedicated workstreams:

* **Workstream 1 — Learning Experience:** Learning Hub UI, modality pathways, weekly navigation, lesson cards, Lesson Player modal, course navigation, progress indicators.
* **Workstream 2 — Content Management:** Curriculum outlines, lesson records, video links, slide decks, notebooks, assignments, external reading links.
* **Workstream 3 — GitHub Integration:** Dynamic curriculum fetching (`elearningService.ts`), lecture material parsing, Google Colab link generation, repository health.
* **Workstream 4 — Learner Progress:** Lesson completion persistence, modality progress formulas, overall course progress, activity history, completion telemetry.
* **Workstream 5 — Notifications:** Automated alerts for newly published lessons, new session recordings, material additions, and assignment deadlines.
* **Workstream 6 — Administration:** Equipping ABDN staff via Admin Dashboard to create lessons, toggle publish state, configure video access, assign metadata, and monitor content readiness.
* **Workstream 7 — Analytics & Intelligence:** Event telemetry, weekly active learner metrics, content engagement tracking, modality completion reports, executive dashboards.

---

## 4. Delivery Phases

```text
Phase 0: Alignment  ──►  Phase 1: MVP  ──►  Phase 2: Engagement  ──►  Phase 3: Assessment  ──►  Phase 4: Outcomes
```

### Phase 0 — Discovery & Alignment
* **Objective:** Establish formal product requirements, technical boundaries, and stakeholder consensus.
* **Deliverables:** Product Proposal, PRD, Technical Design Document, Firestore Data Schemas, RACI Matrix, Risk Register, Success Metrics.
* **Exit Criteria:** ABDN leadership and engineering sign-off on product scope, MVP boundaries, data ownership, security rules, and release gates.

---

## 5. Phase 1 — MVP (Core Learning Experience)

Phase 1 establishes the core fellow learning loop:

$$\text{Discover} \quad\longrightarrow\quad \text{Enroll} \quad\longrightarrow\quad \text{Learn} \quad\longrightarrow\quad \text{Access Materials} \quad\longrightarrow\quad \text{Complete} \quad\longrightarrow\quad \text{Track Progress}$$

### MVP Functional Capabilities
* **Authentication:** Account registration, sign-in, profile management, Firebase session persistence.
* **Pathway Enrollment:** Enroll in and switch between supported modalities (MRI/fMRI, EEG, fNIRS, Electrophysiology).
* **Learning Dashboard:** Display enrolled tracks, current week, published lessons, overall progress, and upcoming sessions.
* **Admin Lesson Management:** Create lessons, configure modality/week/date metadata, assign Zoom video references, publish/unpublish.
* **Lesson Player Modal:** Watch recordings securely, view lesson notes, access PDF slides, launch Colab notebooks, view assignment instructions.
* **GitHub Material Categorization:** Automatically sort materials into Slides, Notebooks, Readings, and External Links.
* **Progress Tracking:** Track `started` and `completed` states per lesson; compute aggregated modality progress percentages.

---

## 6. Phase 2 — Engagement & Usability

Once the core learning loop is stable, Phase 2 introduces engagement capabilities:
* In-app notifications for newly published sessions
* "Continue Learning" widget recommending the next logical uncompleted lesson
* Learning streaks and activity history timelines
* Upcoming live session reminders
* Assignment deadline tracking

---

## 7. Phase 3 — Assessment & Learning Measurement

Phase 3 introduces formal educational measurement:
* In-lesson comprehension quizzes
* Assignment submission tracking
* Capstone project milestone tracking
* Instructor review and feedback workflow

```text
Lesson View  ──►  Comprehension Quiz  ──►  Assignment Submission  ──►  Capstone Milestone  ──►  Faculty Review
```

---

## 8. Phase 4 — Certification & Cohort Analytics

Phase 4 completes the fellowship learning lifecycle:
* Automated fellowship completion criteria verification
* Certificate eligibility verification and generation
* Fellow research portfolio showcase
* Executive cohort-wide analytics and modality comparative reports

---

## 9. High-Level Delivery Roadmap

| Phase | Primary Goal | Major Deliverables | Target Milestone |
| :--- | :--- | :--- | :--- |
| **Phase 0** | **Alignment** | PRD, TDD, Data Models, RAID Log, RACI Matrix | M1 – M2 |
| **Phase 1** | **V1 MVP** | Auth, Dashboard, Lessons, Zoom launcher, GitHub parser, Progress | M3 – M7 |
| **Phase 2** | **Engagement** | Notifications, Continue Learning widget, Activity timeline | M8 – M9 |
| **Phase 3** | **Assessment** | Quizzes, Assignment tracking, Capstone milestone tracking | Post-Launch Phase 2 |
| **Phase 4** | **Outcomes** | Certificates, Executive Analytics, Portfolio Showcase | Post-Launch Phase 3 |

---

## 10. Key Infrastructure Dependencies

* **Firebase:** Auth, Firestore database, security rules, user profiles, lesson state, user progress store.
* **GitHub Repositories:** Master curriculum outlines, cohort lecture slides, Colab notebooks, assignment templates.
* **Zoom Infrastructure:** Session recording storage and streaming URLs.
* **ABDN Admin Team:** Content publication, metadata configuration, video link verification.
* **Faculty Team:** Timely submission of lecture slides, notebooks, and assignment details.

---

## 11. Critical Dependency: Video Access Architecture

To prevent exposing Zoom passwords in client bundles or public repositories, video access follows a secure server-brokered workflow:

```text
Admin Dashboard  ──►  Firebase Auth  ──►  Firestore (videoAccess Collection)  ──►  Token Broker  ──►  Learner Lesson Player  ──►  Zoom Recording Stream
```

*Learners receive only the ephemeral information required to access their specific authorized session stream.*

---

## 12. GitHub Integration Strategy

GitHub remains the authoritative source of truth for educational assets.

```text
ABDN_2026_FELLOWSHIP_COHORT/
│
├── lectures/
│   ├── eeg/
│   ├── mri_fmri/
│   ├── fnirs/
│   └── electrophysiology/
│
├── assignments/
├── datasets/
├── participants/
└── showcase/
```

The client application dynamically queries repositories using:

$$\text{Target Path} = \text{lectures} + \text{modality} + \text{week}$$

*This eliminates manual file re-uploading into the web platform.*

---

## 13. Canonical Lesson ID Mapping

Every lesson is assigned an immutable, universal identifier (`MRI-001`, `EEG-001`, `FNIRS-001`, `EPHYS-001`).

```text
                                LESSON ID (MRI-001)
                                         │
        ┌───────────────────┬────────────┴───────┬───────────────────┐
        ▼                   ▼                    ▼                   ▼
Firestore Lesson      Zoom Recording      GitHub Materials    Progress Record
```

*This architectural key prevents breaking relationships when lesson titles or topics are updated.*

---

## 14. Progress Tracking Model

### Lesson-Level State Engine
$$\text{NOT\_STARTED} \quad\longrightarrow\quad \text{STARTED} \quad\longrightarrow\quad \text{IN\_PROGRESS} \quad\longrightarrow\quad \text{COMPLETED}$$

### Modality Aggregation
$$\text{Modality Progress} = \frac{\text{Completed Published Lessons}}{\text{Total Published Lessons in Modality}} \times 100$$

### Cohort Overview
The Admin Dashboard provides real-time operational visibility:
```text
Registered Fellows:      50
Active This Week:        42 (84%)
Lessons Completed:       186
Assignments Submitted:   141
Average Progress:        74%
```

---

## 15. Product & Telemetry Metrics

### North Star Metric
$$\text{North Star Metric} = \text{Weekly Active Learning Fellows (WAL)}$$
*(Defined as enrolled fellows completing at least one meaningful learning activity—watching a recording, reviewing slides/notebooks, or completing a lesson—within a 7-day window).*

### Supporting Metric Categories
* **Engagement:** Weekly Active Learners, Monthly Active Learners, Lessons Started vs. Completed, Average Session Frequency.
* **Content:** Most/Least viewed lessons, Video stream completion rates, GitHub material access counts, Colab notebook launches.
* **Learning:** Modality completion percentages, Pathway progression rates, Assessment pass rates.
* **Retention:** Week-1 Fellow Retention, Week-4 Fellow Retention, Cohort Completion Rate.
* **Operational:** Lesson Publication SLA ($<24$ hours post-session), Video health check error rate.

---

## 16. Technical Performance SLAs

| Performance Metric | Target SLA Threshold | Monitoring Mechanism |
| :--- | :--- | :--- |
| **API Reliability** | $\ge 99.0\%$ content fetch success | Client telemetry error logging |
| **Dashboard Load Time** | $< 2.0$ seconds initial paint | Browser performance metrics |
| **GitHub API Health** | $< 1\%$ HTTP rate-limit / failure rate | GitHub service response telemetry |
| **Firebase Response Latency** | $< 200$ ms read/write latency | Firebase performance monitoring |
| **Video Stream Launch SLA** | $\ge 95.0\%$ successful launches | Video player event telemetry |

---

## 17. Risk Register Summary

| Risk | Prob | Impact | Mitigation Strategy | Owner |
| :--- | :---: | :---: | :--- | :--- |
| **Zoom links expire/change** | Med | High | Centralized `videoAccess` records & admin health check | Admin Team |
| **Zoom passcodes exposed** | Med | High | Server-brokered token access; isolated Firestore node | Engineering |
| **GitHub API rate limits** | Med | Med | 10-minute client caching & raw endpoint fetching | Engineering |
| **Faculty publishing delays** | High | Med | Publishing pipeline SLA (<24h) & admin dashboard alerts | Program Team |
| **Incorrect lesson metadata** | Med | Med | Firestore schema validation & required fields | Engineering |
| **Low fellow completion** | High | High | In-app notifications, "Continue Learning" widget | Product Lead |
| **GitHub path changes** | Med | High | Enforce GitHub Content Contract | Engineering |
| **Firebase cost growth** | Low | Med | Query optimization & document read caching | Engineering |

---

## 18. RACI Assignment Matrix

| Activity | Product Lead | Engineering | Faculty | Admin | ABDN Director |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Product Requirements** | **A / R** | C | C | C | **A** |
| **System Architecture** | **A** | **R** | C | C | I |
| **Lesson Publishing** | **A** | C | **R** | **R** | I |
| **Curriculum Content** | C | I | **R** | C | **A** |
| **GitHub Materials** | **A** | **R** | **R** | C | I |
| **Analytics Telemetry** | **A / R** | **R** | C | C | I |
| **Release Approval** | **A** | **R** | C | C | **I** |

* **R** = Responsible, **A** = Accountable, **C** = Consulted, **I** = Informed

---

## 19. Multi-Tier Testing Strategy

```text
Unit Testing        ──►  Progress formulas, curriculum parser, modality resolver
Integration Testing ──►  Firebase ↔ Dashboard, GitHub API ↔ Client, Admin ↔ Firestore
End-to-End Testing  ──►  Sign In ──► Enroll ──► Select Lesson ──► Launch Video ──► Complete ──► Progress Check
UAT Testing         ──►  ABDN Fellows, Faculty, and Administrators validate workflows
```

---

## 20. Phased Release Strategy

A controlled, pilot-first deployment methodology is recommended:

```text
Internal Alpha (ABDN Team Only)  ──►  Fellowship Pilot (10–20 Selected Fellows)  ──►  Full Cohort Production Release  ──►  Post-Launch Optimization
```

1. **Internal Alpha:** Team validates data mapping, admin publishing workflows, and video player modal security.
2. **Fellowship Pilot:** Deployed to 10–20 fellows across all 4 tracks to measure login, video streaming, material downloads, and progress persistence.
3. **Cohort Release:** Production rollout to all enrolled fellowship participants.
4. **Post-Launch:** Continuous telemetry monitoring, support ticket triage, and content gap resolution.

---

## 21. Definition of Done Checklist

A feature is certified **Done** when:
- [x] Functional requirements met and verified.
- [x] React UI components implemented and responsive.
- [x] Firebase and GitHub service integrations complete.
- [x] Security and authorization rules verified.
- [x] Error boundaries and fallback states tested.
- [x] Telemetry analytics events instrumented.
- [x] Regression testing complete.
- [x] Technical documentation updated.
- [x] Stakeholder sign-off achieved.

---

## 22. Scope Change Management Framework

Scope modifications are managed according to three classification tiers:

* **Minor Change** *(e.g., updating lesson title or copy)*: Handled directly by administrators via the Admin Dashboard.
* **Medium Change** *(e.g., adding a new modality track)*: Requires Product and Engineering review and schema validation.
* **Major Change** *(e.g., adding automated grading engines in V1)*: Requires formal Change Request (CR) document, PRD update, architecture review, schedule adjustment, and Director approval.

---

## 23. Post-Launch Operating Model

Following production release, governance transitions from project mode to continuous product operation:

```text
Weekly Cadence    ──►  Review Weekly Active Learners, lesson completion rates, new publications, incident logs
Monthly Cadence   ──►  Review modality performance, fellow retention, content readiness, feature backlog
Cohort Completion ──►  Conduct comprehensive end-of-fellowship retrospective, drop-off analysis, fellow feedback
```

*Learnings from each cohort directly inform enhancements for subsequent fellowship cycles.*
