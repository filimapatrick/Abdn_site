# Product Requirements Document (PRD)
## ABDN Fellowship Learning Platform

* **Product:** ABDN Fellowship Learning Platform
* **Organization:** African Brain Data Network (ABDN)
* **Product Lead:** Patrick Filima
* **Document Type:** Product Requirements Document
* **Version:** 1.0 — MVP
* **Status:** Proposed
* **Date:** August 2026
* **Target Users:** ABDN Fellows, Faculty, Program Administrators, ABDN Leadership

---

## 1. Document Purpose

This PRD defines the product requirements for the **ABDN Fellowship Learning Platform**, a unified digital learning experience for ABDN fellowship participants.

The platform will integrate ABDN's existing:
* Firebase infrastructure
* Administrative dashboard
* GitHub curriculum repository
* GitHub cohort repository
* Zoom session recordings
* Learner authentication services
* Learning-progress data model

into a single learner-facing experience.

> **Core Objective:** The goal is not to replace existing infrastructure components, but to orchestrate them into a seamless, measurable, and scalable learning product.

---

## 2. Product Vision

Create a unified, measurable, and scalable digital learning environment that enables ABDN fellows to discover, access, complete, and track their fellowship learning journey.

The platform must allow a fellow to answer four core questions immediately:
1. *What am I supposed to learn?*
2. *Where is the educational material?*
3. *What have I completed so far?*
4. *What should I do next?*

---

## 3. Problem Statement

ABDN provides high-quality fellowship education, but learning resources are currently distributed across disparate platforms.

```text
ABDN Website  ──►  Zoom Recordings  ──►  GitHub Repos  ──►  Google Colab  ──►  Assignments  ──►  External Links
```

### Key Operational Challenges

* **Learner Challenges:**
  * Friction finding specific session recordings
  * Difficulty linking recordings to specific curriculum lessons
  * Educational resources disconnected from course outlines
  * Lack of progress visibility and next-step guidance
* **Faculty Challenges:**
  * Teaching materials fragmented across separate storage tools
  * Lesson-to-resource relationships are implicit rather than structured
  * Limited insight into fellow engagement
* **Administrative Challenges:**
  * Lack of real-time visibility into fellow completion rates
  * Difficulty identifying resource gaps before sessions
  * Limited cohort-level analytical insights

---

## 4. Product Opportunity

ABDN already possesses robust underlying infrastructure. The product opportunity is to construct a unified orchestration layer over these existing assets:

```text
                     EXISTING ABDN ASSETS
            ┌──────────────────┼──────────────────┐
            │                  │                  │
         GitHub              Zoom              Firebase
            │                  │                  │
            └──────────────────┼──────────────────┘
                               │
                               ▼
                    ABDN LEARNING PLATFORM
                               │
                               ▼
                   Learner Experience Layer
```

This allows ABDN to deliver a modern learning management experience without rebuilding underlying media or database infrastructure.

---

## 5. Goals

### 5.1 Primary Goal
Create a single, unified learning portal for the ABDN Fellowship.

### 5.2 Product Goals (V1 MVP)
* Centralize access to all fellowship learning assets.
* Provide structured modality-based learning paths (MRI/fMRI, EEG, fNIRS, Electrophysiology).
* Connect `Curriculum` $\rightarrow$ `Week` $\rightarrow$ `Lesson` $\rightarrow$ `Recording` $\rightarrow$ `Materials`.
* Enable reliable lesson-level completion tracking.
* Deliver personalized learner progress dashboards.
* Seamlessly integrate GitHub curriculum files and cohort resources.
* Securely broker Zoom session recordings.
* Equip administrators with content readiness and fellow activity metrics.
* Establish a extensible foundation for future assessments and certifications.

---

## 6. Non-Goals (Out of Scope for V1 MVP)

The MVP is intentionally bounded to avoid scope expansion. The following features are explicitly out of scope for V1:

- ❌ AI tutor / AI-generated curriculum
- ❌ Automated assignment grading
- ❌ Advanced online examination engines
- ❌ Complex peer-review workflows
- ❌ Full GitHub submission automation
- ❌ Digital certificate generation
- ❌ Recommendation engines
- ❌ Social networking features
- ❌ Replacing GitHub, Zoom, or the existing ABDN Admin Dashboard

---

## 7. Target Users

| User Persona | Role | Core Needs |
| :--- | :--- | :--- |
| **Fellow** | Primary Learner | Structured curriculum, easy video streaming, slide decks, notebooks, progress tracking, clear next steps |
| **Faculty / Instructor** | Content Owner | Easy lesson publishing, linking session recordings, attaching notebook/assignment links |
| **Program Administrator** | Operational Admin | Managing published lessons, monitoring content readiness, tracking cohort completion rates |
| **ABDN Leadership** | Executive Sponsor | Cohort performance analytics, retention metrics, long-term learning outcome visibility |

---

## 8. Product Scope

The V1 MVP consists of six core functional modules:
1. **Authentication & Profile Management**
2. **Learning Hub (Track Discovery)**
3. **Personalized Learning Dashboard**
4. **Interactive Lesson Player Experience**
5. **Progress & Completion Engine**
6. **Admin Dashboard & Telemetry Analytics**

---

## 9. User Journey Map

```text
Learning Hub  ──►  Sign Up / Sign In  ──►  Onboarding  ──►  Select Track  ──►  Dashboard  ──►  Week View  ──►  Lesson Player  ──►  Watch Recording  ──►  Access Materials  ──►  View Assignment  ──►  Mark Complete  ──►  Progress Updated
```

*(Future iterations will extend this journey to include Assessments, Capstone Projects, and Certificates).*

---

## 10. Information Architecture

```text
ABDN Learning Platform
│
├── Learning Hub
│
├── My Learning Pathways
│   ├── MRI / fMRI
│   ├── EEG
│   ├── fNIRS
│   └── Electrophysiology
│
├── Dashboard
│   ├── Overall Progress Indicator
│   ├── Current Week Section
│   ├── Continue Learning Widget
│   └── In-App Notifications
│
├── Learning Path Detail
│   ├── Modules
│   ├── Weeks
│   └── Lesson Cards
│
├── Lesson Player Modal
│   ├── Session Video Player
│   ├── Lecture Slide Deck (.pdf)
│   ├── Lesson Notes & Objectives
│   ├── Colab Notebook Link (.ipynb)
│   └── Assignment Link
│
└── User Profile & Settings
```

---

## 11. Supported Modalities

V1 MVP must support ABDN's four core fellowship tracks:
* **MRI / fMRI:** Magnetic Resonance Imaging & Functional MRI
* **EEG:** Electroencephalography
* **fNIRS:** Functional Near-Infrared Spectroscopy
* **Electrophysiology:** Cellular & Systems Electrophysiology

*The architecture allows new modalities to be added via database configuration without code refactoring.*

---

## 12. Functional Requirements

### FR-01 — Authentication & Authorization
* The system shall allow fellows to create accounts, sign in, sign out, and persist profile state via Firebase Auth.
* Unauthenticated users must be prevented from accessing protected learner routes.
* User progress must be bound to the authenticated Firebase `uid`.

### FR-02 — Fellowship Enrollment
* Fellows shall be able to enroll in or switch between supported modality pathways.
* Enrollment state must persist in Firestore under `users/{uid}`.

### FR-03 — Learning Hub Overview
* The Learning Hub shall render active modality cards displaying: modality title, description, total published lessons, fellow progress percentage, and enrollment state.

### FR-04 — GitHub Curriculum Integration
* The platform shall dynamically retrieve master curriculum Markdown files (`eeg.md`, `mri_fmri.md`, `electrophysiology.md`, `fnir.md`) from the `ABDN_TA_Fellowship_Curriculum` repository.

### FR-05 — Curriculum Parsing
* The client service (`elearningService.ts`) shall parse raw Markdown into structured JSON objects containing modules, weeks, learning objectives, and topics.

### FR-06 — Weekly Lesson Organization
* Lessons must be organized hierarchically by fellowship week (`2026-W01`, `2026-W02`, etc.).
* The system must maintain clear separation between calendar dates, fellowship week numbers, modalities, and lesson items (as some modalities may not hold sessions every week).

### FR-07 — Universal Lesson Entity
* Every lesson must possess a canonical `lessonId` key (e.g., `MRI-001`, `EEG-002`).

```json
{
  "lessonId": "MRI-001",
  "title": "Intro to MRI Physics",
  "modality": "MRI",
  "weekId": "2026-W03",
  "status": "published",
  "videoAccessId": "VIDEO-MRI-001",
  "githubPath": "lectures/mri_fmri/week_03",
  "assignmentPath": "assignments/mri_fmri/week_03"
}
```

### FR-08 — Published Lesson Filtering
* The learner dashboard shall query Firestore for lessons where `status == "published"`. Draft or archived lessons must remain hidden from fellows.

### FR-09 — Video Recording Brokerage
* Lessons with recordings shall render a secure video launcher modal.
* Passcodes or administrative Zoom credentials must never be exposed in public client data payloads.

### FR-10 — GitHub Cohort Material Mapping
* The platform shall query the `ABDN_2026_FELLOWSHIP_COHORT` repository for assets under the lesson's target path (`lectures/mri_fmri/week_03/`).
* Materials are automatically categorized in the UI:
  * 📊 **Slides:** PDF/PPTX files
  * 💻 **Notebooks:** `.ipynb` files
  * 📄 **Notes:** Markdown/text files
  * 🔗 **External Links:** Web references

### FR-11 — Google Colab Integration
* For Jupyter Notebook files, the UI shall render an **"Open in Google Colab"** action button mapping to `https://colab.research.google.com/github/{repo}/blob/{path}`.

### FR-12 — Deterministic Asset Mapping
* GitHub materials must map to lessons via stable `lessonId` conventions rather than relying on brittle, changing file titles.

### FR-13 — Lesson Player Modal
* The Lesson Player shall display: Lesson Title, Week ID, Video Player/Link, Slide Viewer, Notes, Notebook Link, Assignment Button, and Completion Toggle.

### FR-14 — Progress Tracking Engine
* The platform shall track lesson status per fellow: `NOT_STARTED`, `IN_PROGRESS`, `COMPLETED`.
* Records persist in Firestore under `users/{uid}/progress/{lessonId}`.

### FR-15 — Modality Progress Aggregation
$$\text{Modality Progress} = \frac{\text{Completed Published Lessons}}{\text{Total Published Lessons in Modality}} \times 100$$

### FR-16 — Overall Fellowship Progress
$$\text{Overall Progress} = \frac{\text{Total Completed Lessons Across Enrolled Tracks}}{\text{Total Published Lessons Across Enrolled Tracks}} \times 100$$

### FR-17 — "Continue Learning" Recommender
* The dashboard shall highlight the fellow's next logical uncompleted published lesson based on curriculum sequence.

### FR-18 — Learning Notifications
* The system shall surface notifications for new lesson publications, newly uploaded recordings, or assigned materials.

### FR-19 — Admin Lesson Management
* Administrators shall be able to create, update, and manage lesson records via the Admin Dashboard.

### FR-20 — Lesson Lifecycle State Machine
$$\text{DRAFT} \quad\longrightarrow\quad \text{READY} \quad\longrightarrow\quad \text{PUBLISHED} \quad\longrightarrow\quad \text{ARCHIVED}$$

### FR-21 — Content Readiness Diagnostics
* The Admin Dashboard shall automatically evaluate whether published lessons possess all required assets (Curriculum reference, Video link, Slides, Notebook, Assignment).

### FR-22 — Product Analytics Telemetry
* The frontend shall emit key behavioral events (`user_registered`, `pathway_enrolled`, `lesson_started`, `lesson_completed`, `material_opened`, `notebook_opened`).

---

## 13. Product Analytics Framework

### 13.1 North Star Metric: Weekly Learning Completion Rate
$$\text{Weekly Completion Rate} = \frac{\text{Lessons Completed During Target Week}}{\text{Lessons Scheduled During Target Week}} \times 100$$

### 13.2 Activation Rate
$$\text{Activation Rate} = \frac{\text{Registered Learners Who Complete 1st Lesson}}{\text{Total Registered Learners}} \times 100$$

### 13.3 Weekly Active Learners (WAL)
* Unique fellows completing at least one meaningful learning action (watching a recording, opening slides/notebooks, or marking a lesson complete) per week.

### 13.4 Lesson Completion Rate
$$\text{Lesson Completion Rate} = \frac{\text{Completed Lesson Attempts}}{\text{Started Lesson Attempts}} \times 100$$

### 13.5 Content Readiness Rate
$$\text{Content Readiness Rate} = \frac{\text{Published Lessons With All 4 Assets Ready}}{\text{Total Published Lessons}} \times 100$$

---

## 14. Executive Admin Analytics Preview

```text
=====================================================
               ABDN COHORT OVERVIEW
=====================================================
Registered Fellows:      127
Activated Fellows:       116 (91.3%)
Weekly Active Learners:   91
Average Completion:       74%
-----------------------------------------------------
MODALITY COMPLETION
  • MRI / fMRI:           84%
  • EEG:                  78%
  • fNIRS:                72%
  • Electrophysiology:    68%
-----------------------------------------------------
CONTENT READINESS HEALTH
  • Published Lessons:    42
  • Fully Ready:          39
  • Missing Recording:     3
  • Missing Materials:     4
=====================================================
```

---

## 15. Data Model Schemas

```text
users/{uid}
  ├── displayName: string
  ├── email: string
  ├── role: "fellow" | "faculty" | "admin"
  ├── cohort: string
  ├── enrolledModalities: string[]
  └── createdAt / lastActiveAt: timestamp

lessons/{lessonId}
  ├── lessonId: string (e.g. "MRI-001")
  ├── title: string
  ├── modality: string
  ├── weekId: string
  ├── status: "draft" | "ready" | "published" | "archived"
  ├── videoAccessId: string
  ├── githubPath: string
  └── assignmentPath: string

videoAccess/{videoAccessId}
  ├── lessonId: string
  ├── recordingReference: string
  └── accessConfiguration: map

users/{uid}/progress/{lessonId}
  ├── status: "started" | "completed"
  ├── startedAt: timestamp
  └── completedAt: timestamp
```

---

## 16. Technical Architecture Overview

```text
       ┌──────────────────────┐         ┌──────────────────────┐
       │   Curriculum Repo    │         │     Cohort Repo      │
       │ (Master Curriculum)  │         │ (Lectures & Assets)  │
       └──────────┬───────────┘         └──────────┬───────────┘
                  │                                │
                  └────────────────┬───────────────┘
                                   ▼
                         ┌──────────────────┐
                         │   GitHub API     │
                         └─────────┬────────┘
                                   │
                                   ▼
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Firebase Auth  │ ──► │ ABDN LEARNER APP │ ◄── │  Zoom Media API  │
└──────────────────┘     └─────────┬────────┘     └──────────────────┘
                                   │
                                   ▼
                         ┌──────────────────┐
                         │    Firestore     │
                         │ (User & Progress)│
                         └──────────────────┘
```

---

## 17. Non-Functional Requirements

### Performance & Latency
* The dashboard shell must render in $< 2.0$ seconds.
* GitHub curriculum fetches must be cached in memory for 10 minutes to prevent API rate limits.
* External service degradation (e.g., GitHub API slowdown) must not block core Firebase dashboard rendering.

### Reliability & Resiliency
* If GitHub is unavailable, the UI must display cached curriculum and notification alerts while keeping video recordings and progress tracking functional.

### Security & Privacy
* Passcodes and internal Zoom credentials must never be exposed in public client bundles or Firestore public read nodes.
* Strict Firebase Security Rules must restrict lesson write access to authenticated administrators.

---

## 18. MVP User Stories

* **As a Fellow,** I want to view my enrolled learning path so that I know where to focus my study.
* **As a Fellow,** I want to filter lessons by current fellowship week so that I stay aligned with live sessions.
* **As a Fellow,** I want to watch session recordings directly inside the lesson player so I don't have to search through email threads.
* **As a Fellow,** I want to launch Jupyter Notebooks directly in Google Colab so I can complete hands-on coding exercises.
* **As a Fellow,** I want to mark lessons complete so that my progress indicator updates automatically.
* **As an Administrator,** I want to publish lessons via the dashboard so fellows gain instant access to new materials.
* **As an Administrator,** I want a content readiness view so I can identify missing slides or recordings before live sessions start.
* **As Leadership,** I want cohort completion metrics so I can evaluate fellowship educational impact.

---

## 19. Acceptance Criteria for V1 MVP Release

| Feature Area | Criteria for Pass |
| :--- | :--- |
| **Authentication** | Sign in, sign up, session persistence, protected route guards functional. |
| **Curriculum** | Dynamic fetching from GitHub; modality mapping accurate; week grouping verified. |
| **Lesson Player** | Published lessons viewable; draft lessons hidden; Zoom stream & slides launch cleanly. |
| **Progress** | Lesson complete toggle updates Firestore; modality & overall progress formulas accurate. |
| **Admin Controls** | Lesson creation, publishing state updates, and content readiness diagnostics operational. |
| **Analytics** | WAL, Activation Rate, and Completion Rate telemetry events fire accurately. |

---

## 20. Product Funnel Analysis

```text
Registered Fellows  ──►  Activated Fellows  ──►  Enrolled Track  ──►  Started Lesson  ──►  Watched Recording  ──►  Opened Notebook  ──►  Completed Lesson  ──►  Completed Pathway
```

*Tracking drop-offs across this funnel allows ABDN to pinpoint where fellows encounter friction.*

---

## 21. Release Roadmap

```text
V1 MVP: Learn     ──►  Curriculum, lessons, Zoom recordings, GitHub materials, progress tracking
V1.1:   Track     ──►  Advanced progress analytics, content health diagnostics, in-app notifications
V1.5:   Practice  ──►  Assignment tracking, notebook submission links
V2.0:   Assess    ──►  In-lesson quizzes, comprehension assessments, learning gain metrics
V2.5:   Showcase  ──►  Capstone project submission, fellow research portfolio
V3.0:   Scale     ──►  Automated certificates, alumni network, personalized research recommendations
```

---

## 22. Feature Prioritization (V1 MVP Boundary)

### P0 — Must Have (Release Blockers)
* Firebase Authentication & user profiles
* Learning Hub & Modality track selection
* Weekly lesson structure & dynamic GitHub curriculum fetching
* Lesson Player modal with Zoom recording launcher
* GitHub slide deck & notebook material linking
* Firebase progress tracking engine (`started`, `completed`)
* Basic Admin lesson publishing workflow

### P1 — Should Have (Secondary Priority)
* In-app learning notifications
* Content readiness diagnostic dashboard
* "Continue Learning" widget
* Automated material file categorization (Slides vs. Notebooks vs. Notes)

### P2 — Future Scope (Deferred)
* Automated quiz assessments & grading
* Project portfolio submission
* Digital certificates
* AI learning assistant / recommendation engine

---

## 23. Definition of Done (V1 MVP)

The V1 MVP product is certified **Complete** when:

1. **A Fellow can:** Sign in $\rightarrow$ select a modality track $\rightarrow$ view the current week $\rightarrow$ open a lesson $\rightarrow$ watch the recording $\rightarrow$ review slide decks $\rightarrow$ open Colab notebooks $\rightarrow$ mark the lesson complete $\rightarrow$ see overall progress update in real time.
2. **An Administrator can:** Create $\rightarrow$ configure metadata $\rightarrow$ publish $\rightarrow$ monitor content readiness for any fellowship lesson.
3. **ABDN Leadership can:** View real-time active learner counts, weekly completion rates, track engagement, and content readiness status across the fellowship cohort.
