# Product Roadmap
## ABDN Fellowship Learning Platform

* **Document Owner:** Patrick Filima
* **Role:** Product Lead / Technical Program Manager
* **Organization:** African Brain Data Network (ABDN)
* **Product:** ABDN Fellowship Learning Platform
* **Version:** 2.0
* **Status:** Approved & Active

---

## 1. Executive Summary & Strategic Vision

The **ABDN Fellowship Learning Platform Product Roadmap** defines a streamlined **Two-Phase Execution Strategy** for ABDN's digital learning infrastructure.

Phase 1 establishes the operational core learning experience (V1 MVP), while Phase 2 consolidates AI-driven mentorship, bio-ethical governance, data sovereignty, automated assessment, and multi-cohort scaling into modular sub-implementations for post-MVP grant funding.

```text
Phase 1: V1 MVP (Completed / Live)  ──►  Phase 2: Scale, AI Engine, Governance & Impact (Next Implementation Horizon)
```

---

## 2. Two-Phase Strategic Horizon Map

| Horizon Phase | Focus | Core Deliverable | Target Timeline | Status |
| :--- | :--- | :--- | :---: | :---: |
| **Phase 1** | **V1 MVP: Core Learning Loop** | Auth, Pathways, Learning Hub, TA Gallery & Bio Modals, Lesson Player, Firestore Engine | Months 1 – 3 | ✅ Completed / Live |
| **Phase 2** | **Scale, AI Engine & Data Governance** | Sub 2.1: SynapseAI Copilot<br>Sub 2.2: CARE Data Sovereignty<br>Sub 2.3: NeuroBench AI Auditor<br>Sub 2.4: Notifications & Analytics<br>Sub 2.5: Certificates & Scale | Months 4 – 12 | 🟢 Next Horizon |

---

## 3. Phase 1 — V1 MVP: Core Learning Loop (Completed / Live)

* **Objective:** Establish a seamless, reliable learner experience connecting modality tracks to session recordings, Jupyter notebooks, and TA mentorship profiles.
* **Status:** ✅ Fully Built & Live in Production Codebase.

```text
Discover Track  ──►  Enroll Pathway  ──►  View Week  ──►  Open Lesson Player  ──►  Watch Recording  ──►  Access Slides/Notebooks  ──►  Mark Complete  ──►  Progress Persisted
```

### Core Capabilities Delivered in Phase 1
* **Authentication & Closed Fellowship Access Control (`approvedEmails.ts`, `authService.ts`, `AuthContext.tsx`)**:
  * Enforced **Pre-Approved Roster Whitelist (Strategy 1)** restricting platform login exclusively to verified 2026 fellowship fellows and superadmins.
  * Superadmin Whitelist (`filimapatrick@gmail.com`, `africanbraindatanetwork@gmail.com`, `eberechi.wogu@uniport.edu.ng`, `chinyemighodaro@gmail.com`, `bnsaanee7@gmail.com`).
  * Automatic Firebase Auth token session revocation (`signOut(auth)`) for unauthorized logins.
* **TA Live Session Attendance & Progress Engine (`elearningService.ts`, `progressService.ts`)**:
  * Optional `attendedEmails[]` schema contract supporting TA live session attendance ticking in `Abdn_dashboard`.
  * Dynamic Attendance & Progress Percentage calculation formula:
    $$\text{Attendance Rate (\%)} = \left( \frac{\text{Sessions Attended}}{\text{Total Curriculum Sessions in Modality}} \right) \times 100$$
  * Real-time synchronization between TA attendance entries and student learner dashboards.
* **Dynamic Learning Hub (`Learning.tsx`)**:
  * Hero Section with interactive modality preview widget.
  * 4-on-a-row responsive Curriculum Pathways grid.
  * Interactive **Pathway Detail Modal (`PathwayModal.tsx`)** breaking down modules, topics, datasets, and skills gained.
  * **2026 Fellowship TA Gallery**: Clean light theme gallery with 4-in-a-row circular photos, actual 2026 TA photos (*Raphael, Nada, Eric, Nicole, Rodas, Zubair, Huimin, Sude, Obed, Anita, Lynn*), color-coded team tags, and interactive **TA Profile Bio Modals**.
* **Learner Dashboard & UI Experience (`Dashboard.tsx`, `DashboardTopNav.tsx`, `index.css`)**:
  * Enrolled pathways overview, week-by-week progress indicators, and course status.
  * **Scrollable Live Notifications Dropdown**: Viewport max-height constraints (`max-h-[calc(100vh-5rem)]`), flex header/footer layout, and custom dark mode scrollbars.
  * Standardized telemetry event tracking (`material_view`, `video_start`, `video_complete`).
* **Content Management & Infrastructure (`elearningService.ts`, `Admin.tsx`)**: Firestore schemas, lesson metadata, publish/unpublish toggles, video access configuration, and GitHub material parser setup.

---

## 4. Phase 2 — Scale, AI Engine, Governance & Impact (Next Implementation Horizon)

* **Objective:** Elevate the platform into an **AI-Native, Bio-Ethically Governed Neuroinformatics Ecosystem** designed for multi-cohort scaling and major grant funding (*Chan Zuckerberg Initiative, Wellcome Trust, NIH DS-I Africa, Gates Foundation*).

Phase 2 is structured into 5 high-impact **sub-implementations**:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              PHASE 2 SUB-IMPLEMENTATION MAP                            │
├───────────────────────────────────┬────────────────────────────────────────────────────┤
│ Sub 2.1: SynapseAI Socratic Tutor │ Context-Aware AI NeuroTutor & In-Notebook Debugger │
│ Sub 2.2: CARE Data Sovereignty    │ African Bioethics, Privacy & Algorithmic Guardrails│
│ Sub 2.3: NeuroBench AI Auditor    │ Automated FAIR Code Inspector & TA Grading CoPilot │
│ Sub 2.4: Engagement Telemetry     │ Notifications, Recommender & Activity Timelines    │
│ Sub 2.5: Outcomes & Scale         │ Cryptographic Certificates & Multi-Cohort Scaling  │
└───────────────────────────────────┴────────────────────────────────────────────────────┘
```

### Sub-Implementation 2.1 — SynapseAI Socratic Copilot & In-Notebook Mentorship
* **Context-Aware Socratic Debugger:** Embedded AI assistant in Jupyter notebooks that reads MNE-Python, fMRIPrep, or FreeSurfer stack traces and asks guiding questions to teach signal processing principles.
* **Math-to-Code Explainer:** Interactive AI explainer translating Fourier transforms, wavelet formulas, and BOLD signal contrast into step-by-step Python code.
* **24/7 Fellow Mentorship:** Fills the regional faculty shortage by providing continuous code guidance without replacing TA human touch.

### Sub-Implementation 2.2 — BioEthical AI & CARE African Data Sovereignty Framework
* **CARE Principles Enforcement:** Technical guardrails enforcing Collective Benefit, Authority to Control, Responsibility, and Ethics for African brain data.
* **Algorithmic Bias Inspector:** Module allowing fellows to benchmark AI models trained on Western brain datasets (*e.g., UK Biobank*) against African population cohorts to detect population bias.
* **Data Privacy Guardrails:** Automatic compliance checks for cross-border data protection (*NDPR, POPIA, GDPR*) and participant de-identification.

### Sub-Implementation 2.3 — NeuroBench AI (Automated FAIR Code & Capstone Inspector)
* **FAIR Code Auditor:** Automated evaluation engine checking fellow Jupyter notebook submissions for reproducibility, set random seeds, clean filtering ranges, and FAIR annotations.
* **TA Co-Pilot:** Generates draft qualitative feedback notes for TAs to review and approve with 1 click, reducing TA grading workload by 80%.

### Sub-Implementation 2.4 — Engagement Telemetry & Notification Engine
* **In-App Notification Engine:** Real-time alerts for newly published session recordings, slide additions, and assignment deadlines.
* **"Continue Learning" Recommender:** Smart dashboard widget suggesting the fellow's next logical uncompleted lesson.
* **Learning Activity Timeline:** Visual history of completed lessons, notebook executions, and resource access events.

### Sub-Implementation 2.5 — Cryptographic Certification & Multi-Cohort Scale
* **Automated Fellowship Certificates:** Verification engine checking completion thresholds ($\ge 90\%$ lessons, capstone project approved) to issue cryptographic certificates.
* **Research Portfolio Showcase:** Public fellow profiles highlighting completed capstone projects, GitHub code repos, and fellowship credentials.
* **Multi-Cohort Scalability:** Multi-tenant architecture supporting concurrent fellowship cohorts (`ABDN-2026`, `ABDN-2027`, `ABDN-2028`) seamlessly.

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
