# Stakeholder Management & Communication Plan
## ABDN Fellowship Learning Platform

* **Document Owner:** Patrick Filima
* **Role:** Product Lead / Technical Program Manager
* **Organization:** African Brain Data Network (ABDN)
* **Product:** ABDN Fellowship Learning Platform
* **Version:** 1.0
* **Status:** Proposed

---

## 1. Purpose

The ABDN Learning Platform is not simply a frontend application. It is a cross-functional program involving:
* ABDN leadership
* Faculty and lecturers
* Program administrators
* Software engineers
* Fellows
* GitHub repositories
* Firebase infrastructure
* Zoom
* Curriculum owners

The purpose of this document is to define who needs what information, when they need it, how they receive it, and who is accountable for decisions. The objective is to prevent communication gaps from becoming delivery bottlenecks or risks.

---

## 2. Stakeholder Landscape

The platform has six primary stakeholder groups:

```text
                        ABDN DIRECTOR
                             │
                    Program Leadership
                             │
            ┌────────────────┼────────────────┐
            │                │                │
         Faculty           Admin          Product / TPM
            │                │                │
            └────────────────┼────────────────┘
                             │
                        Engineering
                             │
                        Platform
                             │
                          Fellows
```

---

## 3. Stakeholder Register

| Stakeholder | Role | Interest | Influence | Primary Need |
| :--- | :--- | :--- | :--- | :--- |
| **ABDN Director** | Executive sponsor | High | Very High | Outcomes, strategic alignment, risk management, adoption |
| **Program Coordinator** | Fellowship operations | High | High | Delivery status, operational readiness |
| **Faculty** | Content providers | High | High | Easy, streamlined content publishing workflow |
| **Admin Team** | Content/platform operations | High | High | Reliable management & publishing tools |
| **Product Lead / TPM** | Program & product owner | Very High | High | Cross-functional execution, governance, scope control |
| **Engineering Team** | Platform implementation | High | High | Clear technical requirements, API contracts, priorities |
| **Fellows** | Primary users / learners | Very High | Medium | Simple, intuitive, reliable learning experience |
| **GitHub Maintainers** | Educational assets | Medium | Medium | Repository structure & naming consistency |
| **Zoom Administrators** | Recording infrastructure | Medium | Medium | Secure, reliable recording access configuration |

---

## 4. Executive Stakeholder: ABDN Director

### Primary Concern
The Director does not need micro-level implementation details. The Director needs high-level operational visibility:
* Is the product being delivered on schedule?
* Is it helping fellows achieve learning outcomes?
* Are there major critical risks or blockers?
* Are faculty participating effectively?
* Are learners actively engaging?
* What strategic decisions or resources are required?

### Information Provided: Weekly Executive Summary

```text
ABDN LEARNING PLATFORM
Weekly Program Executive Update

Overall Health: 🟢 GREEN

Fellows enrolled:       72
Weekly active learners: 58
Lessons published:      31
Lessons completed:      24
Assignment submissions: 41

Risks:
🔴 1 High
🟡 3 Medium

Issues:
• 1 open faculty publishing issue (fNIRS Week 3)

Upcoming:
• EEG module publication
• MRI assessment launch

Decision Required:
• Approve additional faculty publishing support resources
```

---

## 5. Faculty Stakeholders

Faculty members are responsible for core educational content. They provide:
* Lecture recordings
* Slides (`.pdf`)
* Code notebooks (`.ipynb`)
* Assignments
* Learning objectives
* Curriculum updates

### Primary Objective
The platform must not create an administrative burden. The system is designed to integrate into existing faculty workflows:

```text
Faculty  ──►  Deliver Lecture  ──►  Upload Materials to GitHub  ──►  Admin Adds Recording Metadata  ──►  Platform Automatically Connects Content
```

*Faculty members do not need to manually manage or update the learner dashboard.*

---

## 6. Program Administrator

The administrator acts as the operational bridge between faculty and the digital platform.

### Responsibilities
* Publish lessons and configure metadata
* Validate Zoom recordings and access tokens
* Verify GitHub lecture materials
* Manage lesson publication state
* Resolve content formatting issues

### Communication Needs
The admin should receive automated system alerts for:
* Publishing failures
* Missing repository materials
* Expired or broken recording links
* Upcoming content deadlines

**Example Alert:**
> *Action Required:* MRI Week 4 recording reference has been provided, but no GitHub lecture materials were detected under `lectures/mri_fmri/week_04/`.

---

## 7. Engineering Team

Engineering requires detailed technical specifications rather than high-level operational updates.

### Communication Content
* Technical requirements & user stories
* Data schemas & API contracts
* Acceptance criteria & testing definitions
* Architecture decision records (ADRs)
* Defect reports & release priorities

### Issue Formatting Standard
*Avoid vague reports such as "The dashboard isn't working."* Instead, use structured bug reports:

```text
Issue: MRI-004 materials not appearing in Lesson Player

Expected Behavior:
GitHub materials associated with MRI-004 should render in LessonPlayerModal.

Actual Behavior:
Video stream loads correctly, but the materials list renders empty.

Repository: ABDN_2026_FELLOWSHIP_COHORT
Target Path: lectures/mri_fmri/week_04/

Severity: Medium
Impact: Learners cannot access lecture slides for MRI Week 4.
```

---

## 8. Fellows

Fellows are the end users of the platform. Communication must be clear, actionable, and learner-focused.

### Example Notification

> **📢 New MRI Lesson Available**
> *"Introduction to fMRI Preprocessing"* is now live on your dashboard.
> * 🎥 Watch Session Recording
> * 📊 View Slide Deck
> * 💻 Open Colab Notebook

*Technical implementation events (e.g., "Firestore user doc synchronized") are internal log events and are never exposed to learners.*

---

## 9. GitHub Maintainers

GitHub maintainers require a predictable repository content contract:
* Folder structure conventions
* Modality directory keys (`eeg`, `mri_fmri`, `fnirs`, `electrophysiology`)
* Week naming standards (`week_01`, `week_02`)
* Accepted file extensions (`.md`, `.pdf`, `.ipynb`)

### Target Structure

```text
lectures/
├── eeg/
│   ├── week_01/
│   ├── week_02/
│   └── week_03/
├── mri_fmri/
│   ├── week_01/
│   └── week_02/
├── fnirs/
└── electrophysiology/
```

*Any modification to this schema must be communicated to maintainers prior to deployment.*

---

## 10. RACI Matrix

The RACI matrix defines clear cross-functional accountability:
* **R** = Responsible (*the team doing the work*)
* **A** = Accountable (*the single owner with final decision authority*)
* **C** = Consulted (*provides input*)
* **I** = Informed (*kept updated*)

| Activity | Director | Product / TPM | Engineering | Faculty | Admin | Fellows |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Product Strategy** | **A** | **R** | C | C | C | I |
| **Requirements Specification** | I | **A / R** | C | C | C | C |
| **Architecture Design** | I | C | **A / R** | I | I | I |
| **Curriculum Definition** | I | C | I | **A / R** | C | I |
| **Lecture Delivery** | I | I | I | **A / R** | C | I |
| **Recording Publication** | I | **A** | C | **R** | **R** | I |
| **GitHub Materials Upload** | I | C | C | **R** | C | I |
| **Lesson Publishing** | I | **A** | C | C | **R** | I |
| **QA & Verification** | I | **A** | **R** | C | C | C |
| **Release Management** | I | **A** | **R** | I | C | I |
| **Learner Support** | I | **A** | C | C | **R** | **R** |
| **Metrics & Analytics** | **A** | **R** | C | C | C | I |
| **Risk Management** | **A** | **R** | C | C | C | I |

---

## 11. Communication Cadence

| Cadence | Forum | Focus / Agenda | Participants |
| :--- | :--- | :--- | :--- |
| **Daily (Async)** | Engineering Standup | Progress, today's focus, technical blockers | Engineering, Product |
| **Weekly** | Delivery Meeting (30–45m) | Sprint progress, architectural blockers, release planning | Product, Engineering |
| **Weekly** | Content Readiness Sync | Review upcoming week's recording and slide readiness | Product, Faculty, Admin |
| **Biweekly** | Leadership Review | Platform adoption, learning outcome metrics, risk escalation | Director, Product Lead |

---

## 12. Communication Channels

| Information Type | Preferred Channel | Primary Audience |
| :--- | :--- | :--- |
| **Engineering Tasks & Bugs** | GitHub Issues / Projects | Engineering Team |
| **Code Changes & Reviews** | GitHub Pull Requests | Engineering Team |
| **Educational Materials** | GitHub Repositories | Faculty, Admin |
| **Lesson Publishing State** | Admin Dashboard | Admin Team |
| **Learner Announcements** | Platform In-App Notifications | Fellows |
| **Executive Program Updates** | Email & Executive Briefings | ABDN Director |
| **Risks & Decision Log** | Program RAID Log | Leadership & Product |
| **Product Specifications** | Product Requirements Document (PRD) | Product & Engineering |
| **Technical Specifications** | Technical Design Document (TDD) | Engineering & Leadership |

---

## 13. Decision-Making Framework

To prevent organizational bottlenecks, decision-making authority is delegated by domain:

### Product Lead / TPM Decides:
* UI/UX behavior and dashboard layout
* Notification rules and learner journeys
* Feature prioritization within approved MVP scope
* Sprint backlogs and delivery scheduling

### Engineering Lead Decides:
* Codebase architecture and design patterns
* Client-side caching and performance optimization
* API query strategies and data structure implementations

### Faculty Decides:
* Educational content, pedagogy, and lesson objectives
* Curriculum sequencing and modality requirements

### Director Decides:
* Major scope additions/modifications beyond MVP budget
* Strategic organizational direction and resource allocations
* Program-level policies and governance decisions

---

## 14. Decision Escalation Protocol

```text
Field Team  ──►  Product / Engineering Lead  ──►  Program Coordinator  ──►  ABDN Director
```

### Escalation Triggers
An issue or risk must be formally escalated when:
1. A technical or operational blocker exceeds its SLA without resolution.
2. A decision impacts multiple cross-functional teams or budget.
3. Scope changes threaten the fellowship launch date.
4. Security, data privacy, or compliance vulnerabilities are identified.

---

## 15. Change Control Management

Uncontrolled scope expansion ("scope creep") threatens delivery quality and target release dates.

```text
Proposed Change  ──►  Change Request (CR) Document  ──►  Impact Assessment  ──►  Governance Approval
```

### Change Request Document Requirements
Any proposed addition to the platform must detail:
1. Problem statement
2. Proposed scope change
3. User & technical impact
4. Timeline & resource impact
5. Risk assessment & mitigation
6. Final recommendation & decision

---

## 16. Example Change Request

```text
Change Request ID: CR-001
Title: Add Automated In-Lesson Quiz Assessments

Reason: Improve real-time comprehension tracking per lesson.
Product Impact: High (requires new quiz player UI and result storage schema).
Engineering Impact: Medium-High (+3 sprints engineering effort).
Schedule Impact: Estimated +2 to +4 weeks delay to V1 launch.
Risk: Threatens core fellowship launch timeline.

Recommendation:
Defer to Phase 2. Establish core lesson streaming, content mapping, and manual completion tracking in V1 MVP first.

Decision: DEFERRED TO PHASE 2 (Approved by Product Lead & Director)
```

---

## 17. Stakeholder Success Metrics

Communication efficacy and operational health are tracked using key performance indicators:

* **Decision Turnaround Time:** Average time elapsed from decision request to formal sign-off.
* **Blocker Resolution Age:** Average duration critical delivery blockers remain active.
* **Content Readiness Index:** % of upcoming lessons with 100% of required assets uploaded 48 hours prior to release.
* **Publishing SLA Compliance:** % of lecture recordings and slides published within 24 hours of session completion.
* **Requirement Volatility Rate:** Number of major specification changes introduced after sprint commitment.

---

## 18. Content Readiness Control Matrix

Operational status of upcoming modules is tracked in real-time:

| Modality | Module | Recording | Slides | Assignment | Overall Status |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **MRI** | Intro to MRI Physics | ✅ | ✅ | ✅ | 🟢 **Ready** |
| **EEG** | Artifact Removal | ✅ | ✅ | ❌ | 🟡 **At Risk** |
| **fNIRS** | Signal Preprocessing | ❌ | ✅ | ✅ | 🔴 **Blocked** |
| **Electrophysiology** | Spike Sorting | ✅ | ❌ | ❌ | 🔴 **Blocked** |

---

## 19. Executive Reporting Standard

Executive updates are designed for rapid evaluation (under 2 minutes reading time):

```text
ABDN Learning Platform — Biweekly Executive Briefing

Overall Status: 🟢 GREEN
Milestones Achieved:
• 80% of V1 MVP core features completed
• 31 lessons published across MRI and EEG pathways
• 72 fellows onboarded; 58 weekly active learners

Key Highlights:
• GitHub curriculum parsing operational
• Dynamic lesson publishing live on Admin Dashboard
• Firebase real-time progress persistence validated

Critical Risks & Mitigation:
• fNIRS Week 3 recording reference pending faculty submission (Admin following up)
• GitHub folder naming convention finalized with maintainers

Decisions Required from Leadership:
1. Formal sign-off on deferring automated quizzes to Phase 2.
2. Approval of 24-hour post-lecture content upload SLA for faculty.
```

---

## 20. Program Management Operating Model

The Technical Program Management (TPM) operating model acts as the central connective layer across strategy, technology, operations, and outcome metrics:

```text
                         STRATEGY
                            │
                            ▼
                      Product Vision
                            │
                            ▼
                     Program Planning
                            │
       ┌────────────────────┼────────────────────┐
       ▼                    ▼                    ▼
  Engineering            Faculty            Operations
       │                    │                    │
       └────────────────────┼────────────────────┘
                            ▼
                         PLATFORM
                            │
                            ▼
                         FELLOWS
                            │
                            ▼
                         METRICS
                            │
                            ▼
                         INSIGHTS
                            │
                            ▼
                     Product Decisions
```

*The Product Lead / TPM acts as the connective layer, ensuring that the system of people, technology, operational processes, and strategic decisions functions harmoniously across the program lifecycle.*

---

## 21. Key Program Governance Artifacts

The following core artifacts are maintained throughout the program lifecycle:

| Artifact | Purpose | Primary Owner |
| :--- | :--- | :--- |
| **Product Charter / Proposal** | Defines product vision, objectives, and value proposition | Product Lead |
| **Product Requirements Document (PRD)** | Specifies functional requirements, user flows, and scope | Product Lead |
| **Technical Design Document (TDD)** | Defines system architecture, data models, and API specifications | Engineering Lead / TPM |
| **Delivery & Release Plan** | Outlines sprint milestones, timelines, and deployment strategies | TPM |
| **RAID Log** | Tracks Risks, Assumptions, Issues, and Dependencies | TPM |
| **RACI Matrix** | Clarifies cross-functional ownership and decision rights | Product Lead / TPM |
| **Communication Plan** | Defines stakeholder information needs and engagement cadences | TPM |
| **Decision & Change Log** | Documents architectural decisions and approved scope changes | TPM |
| **Metrics & Analytics Spec** | Outlines key performance indicators and measurement frameworks | Product Lead |
| **Release & Rollback Plan** | Defines technical deployment steps and disaster recovery paths | Engineering Lead |
| **Postmortem / Retrospective** | Captures operational learnings and post-launch improvements | TPM & Engineering |
