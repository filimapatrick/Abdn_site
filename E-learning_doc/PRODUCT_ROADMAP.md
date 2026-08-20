# Product Roadmap
## ABDN Fellowship Learning Platform

* **Document Owner:** Patrick Filima
* **Role:** Product Lead / Technical Program Manager
* **Organization:** African Brain Data Network (ABDN)
* **Product:** ABDN Fellowship Learning Platform
* **Version:** 1.0
* **Status:** Proposed

---

## 1. Executive Summary & Strategic Vision

The **ABDN Fellowship Learning Platform Product Roadmap** defines the multi-phase strategic evolution of ABDN's digital learning infrastructure.

Rather than attempting a monolithic software release, the roadmap adopts a phased, progressive execution model. It balances near-term operational delivery (V1 MVP core learning loop) with long-term strategic capabilities (assessments, capstone projects, automated certifications, and multi-cohort scaling).

```text
Phase 0: Alignment  ──►  Phase 1: V1 MVP  ──►  Phase 2: Engagement  ──►  Phase 3: Assessment  ──►  Phase 4: Outcomes & Scale
```

---

## 2. Strategic Horizon Map

| Horizon Phase | Focus | Core Deliverable | Target Timeline | Status |
| :--- | :--- | :--- | :---: | :---: |
| **Phase 0** | **Discovery & Alignment** | PRD, TDD, Data Models, RAID Log, RACI Matrix | Month 1 | ✅ Completed |
| **Phase 1** | **V1 MVP (Learn)** | Auth, Dashboard, Lessons, Zoom Launcher, GitHub Parser, Progress | Months 2 – 3 | 🟢 Active Sprint |
| **Phase 2** | **Engagement (Track)** | In-App Notifications, Continue Learning Widget, Activity Timelines | Months 4 – 5 | 🟡 Planned |
| **Phase 3** | **Assessment (Practice)** | In-Lesson Quizzes, Assignment Submission Tracking, Capstone Milestones | Months 6 – 8 | 🔵 Future |
| **Phase 4** | **Outcomes (Scale)** | Automated Certificates, Portfolio Showcase, Multi-Cohort Scaling | Months 9 – 12 | 🔵 Future |

---

## 3. Phase 0 — Discovery, Governance & Technical Alignment

* **Objective:** Establish formal product requirements, technical contracts, database schemas, and stakeholder governance.
* **Key Milestone:** M1 (PRD Approved) & M2 (TDD Approved).
* **Deliverables:**
  * Product Requirements Document (PRD) specifying FR-01 through FR-22
  * Technical Design Document (TDD) defining Firebase, GitHub, and Zoom schemas
  * Risk Register & RAID Log with quantitative risk scoring
  * Stakeholder Communication Plan & RACI Matrix

---

## 4. Phase 1 — V1 MVP: Core Learning Loop

* **Objective:** Establish a seamless, reliable learner experience connecting course outlines to session recordings and lecture code.
* **Key Milestone:** M3 (Foundation) through M7 (MVP Complete) & M8 (Pilot Launch).

```text
Discover Track  ──►  Enroll Pathway  ──►  View Week  ──►  Open Lesson Player  ──►  Watch Recording  ──►  Access Slides/Notebooks  ──►  Mark Complete  ──►  Progress Persisted
```

### Key Capabilities Delivered in V1 MVP
* **Authentication & Enrollment:** Firebase Auth, user profiles, modality pathway selection (MRI/fMRI, EEG, fNIRS, Electrophysiology).
* **Dynamic Learning Hub:** Dashboard displaying enrolled tracks, current fellowship week, and lesson cards.
* **Admin Publishing Workflow:** Admin Dashboard tools to create lessons, configure metadata, attach Zoom recording references, and toggle publish state (`draft`/`published`).
* **Interactive Lesson Player Modal:** Secure Zoom recording launcher, slide viewer (`.pdf`), notes viewer, Google Colab launcher (`.ipynb`), and assignment links.
* **Progress Engine:** Real-time lesson completion persistence (`users/{uid}/progress/{lessonId}`) and aggregated progress formulas.

---

## 5. Phase 2 — Learner Engagement & Notifications

* **Objective:** Transition the application from a static content portal into an interactive, habit-forming learning environment.
* **Key Milestone:** M9 (Pilot Validation) & M10 (Production Launch).
* **Deliverables:**
  * **In-App Notification Engine:** Real-time alerts for newly published session recordings, slide deck additions, and assignment deadlines.
  * **"Continue Learning" Recommender:** Smart dashboard widget suggesting the fellow's next logical uncompleted lesson.
  * **Learning Activity Timeline:** Visual history of completed lessons, notebook executions, and resource access events.
  * **Upcoming Session Reminders:** Integrated countdown badges for live fellowship webinars.

---

## 6. Phase 3 — Assessments & Capstone Projects

* **Objective:** Shift focus from content consumption to formal learning validation and skill demonstration.
* **Deliverables:**
  * **In-Lesson Comprehension Quizzes:** Short formative knowledge checks following lecture video streams.
  * **Assignment Submission Tracking:** Integration with GitHub repository submissions to track practical code exercise completions.
  * **Capstone Project Milestones:** Structured submission tracking for fellow neuro-imaging capstone research projects.
  * **Faculty Review Portal:** Dedicated admin workflow for faculty to review, grade, and provide qualitative feedback on fellow submissions.

---

## 7. Phase 4 — Certification, Analytics & Scale

* **Objective:** Deliver institutional recognition and scale the platform across multi-institutional cohorts.
* **Deliverables:**
  * **Automated Fellowship Certificates:** Verification engine checking completion thresholds ($\ge 90\%$ lessons, capstone project approved) to generate cryptographic completion certificates.
  * **Research Portfolio Showcase:** Public fellow profiles highlighting completed capstone projects, GitHub code repos, and fellowship credentials.
  * **Executive Cohort Analytics:** Advanced multi-cohort comparative reports for ABDN Leadership tracking retention, engagement, and modality effectiveness.
  * **Multi-Cohort Scalability:** Supporting concurrent fellowship cohorts (`ABDN-2026`, `ABDN-2027`, `ABDN-2028`) without software redeployment.

---

## 8. Sprint Implementation Schedule & Backlog

```text
Sprint 1: Foundation      ──►  Firebase Auth, Firestore schemas, security rules, user profiles
Sprint 2: Dashboard Shell ──►  Learning Hub UI, modality cards, enrolled track navigation
Sprint 3: Lesson System   ──►  Dynamic lesson query engine, Firestore lesson data models
Sprint 4: Video Broker    ──►  Zoom recording launcher modal, video access token brokerage
Sprint 5: GitHub Parser   ──►  Curriculum parser (.md), cohort asset categorization (.pdf, .ipynb)
Sprint 6: Progress Engine ──►  Real-time progress tracking (started, completed), formula aggregation
Sprint 7: Notifications   ──►  In-app alert system for newly published lessons and recordings
Sprint 8: QA & Security   ──►  End-to-end regression suite, mobile testing, security rules audit
Sprint 9: Controlled Pilot──►  10–20 fellow pilot deployment across all 4 modality tracks
Sprint 10: Production     ──►  Full cohort release, telemetry monitoring, operational sign-off
```

---

## 9. Dependency & Critical Path Analysis

```text
Firebase Auth  ──►  Firestore Schemas  ──►  Admin Publishing  ──►  Lesson Querying  ──►  Zoom Video Brokerage  ──►  GitHub Material Parser  ──►  Progress Engine  ──►  Controlled Pilot  ──►  Production Launch
```

### Critical Path Management Guidelines
* **Primary Bottleneck Risk:** Delays in Admin lesson metadata configuration or GitHub directory naming conventions directly impact downstream lesson player rendering.
* **Mitigation:** Enforce the **GitHub Content Contract** and establish a strict 24-hour post-session publication SLA.

---

## 10. Release Milestones & Governance Gates

| Milestone | Target Output | Primary Owner | Governance Gate |
| :--- | :--- | :--- | :---: |
| **M1** | Product Requirements Document (PRD) Approved | Product Lead | Gate 1 Passed |
| **M2** | Technical Design Document (TDD) Approved | Engineering Lead / TPM | Gate 1 Passed |
| **M3** | Platform Foundation & Auth Complete | Engineering Team | Gate 2 Passed |
| **M4** | Lesson System Operational | Engineering Team | Gate 2 Passed |
| **M5** | GitHub Curriculum & Materials Parser Live | Engineering Team | Gate 2 Passed |
| **M6** | Progress Engine & Dashboard Shell Complete | Engineering Team | Gate 2 Passed |
| **M7** | V1 MVP Feature Complete | Product / Engineering | Gate 3 Passed |
| **M8** | Controlled Pilot Launched (10–20 Fellows) | Program Coordinator | Gate 4 Passed |
| **M9** | Pilot Validation & Feedback Incorporated | Product Lead | Gate 4 Passed |
| **M10** | Production Release to Full Fellowship Cohort | TPM & Engineering | Gate 5 Passed |
| **M11** | Post-Launch Retrospective & Telemetry Review | All Stakeholders | Post-Launch |

---

## 11. Multi-Cohort Scaling Strategy

To ensure long-term sustainability, the application architecture decouples static client code from cohort data attributes:

```text
lessons/
│
├── ABDN-2026/
│   ├── MRI/fMRI
│   ├── EEG
│   ├── fNIRS
│   └── Electrophysiology
│
└── ABDN-2027/
    ├── MRI/fMRI
    ├── EEG
    ├── fNIRS
    └── Electrophysiology
```

*This enables ABDN to launch new fellowship cohorts annually by simply adding database collections, preserving full historical progress records for alumni.*
