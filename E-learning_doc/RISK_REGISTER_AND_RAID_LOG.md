# Risk Register & RAID Log
## ABDN Fellowship Learning Platform

* **Document Owner:** Patrick Filima
* **Role:** Product Lead / Technical Program Manager
* **Organization:** African Brain Data Network (ABDN)
* **Product:** ABDN Fellowship Learning Platform
* **Version:** 1.0
* **Status:** Proposed

---

## 1. Purpose

This document establishes the framework for identifying, tracking, mitigating, and escalating risks, assumptions, issues, and dependencies (RAID) associated with the ABDN Fellowship Learning Platform.

The objective is to ensure that:
* Risks are identified early and assigned clear owners
* External and internal dependencies are explicitly visible
* Active issues are escalated before impacting target release dates
* Underlying operational assumptions are systematically validated
* Architecture decisions are logged and traceable
* Delivery remains aligned with ABDN's fellowship objectives

### Multi-System Architecture Dependencies

```text
               ABDN Admin Dashboard
                        │
                        ▼
                     Firebase
                        │
                        ▼
                 Learner Platform
                  ↙          ↘
             GitHub          Zoom
               │               │
          Curriculum       Recordings
           Materials
```

*A failure or delay in any one of these connected layers directly impacts the learner experience.*

---

## 2. RAID Framework

The program maintains a four-part RAID log:

| Category | Meaning | Operational Objective |
| :--- | :--- | :--- |
| **R — Risks** | Potential future events that could negatively affect delivery | Implement proactive mitigations & contingencies |
| **A — Assumptions** | Hypotheses currently believed true but not yet validated | Systematically test & validate |
| **I — Issues** | Active problems currently impacting the program | Triage, assign owner, and resolve |
| **D — Dependencies** | Internal/external items required for successful delivery | Track status & SLA compliance |

---

## 3. Risk Scoring Framework

Each risk is evaluated using a quantitative probability-impact scoring matrix:

$$\text{Risk Score} = \text{Probability} \times \text{Impact}$$

### Probability Scale (1–5)
| Score | Rating | Description |
| :---: | :--- | :--- |
| **1** | Very Unlikely | Rare edge case ($<10\%$ chance) |
| **2** | Unlikely | Possible under specific conditions ($10\% - 30\%$) |
| **3** | Possible | May occur during program lifecycle ($30\% - 60\%$) |
| **4** | Likely | Expected to occur ($60\% - 85\%$) |
| **5** | Almost Certain | Highly probable ($>85\%$ chance) |

### Impact Scale (1–5)
| Score | Rating | Description |
| :---: | :--- | :--- |
| **1** | Minimal | Negligible UI or operational impact |
| **2** | Low | Minor inconvenience; standard workaround exists |
| **3** | Moderate | Modest delay or feature degradation |
| **4** | High | Significant milestone delay or major feature failure |
| **5** | Critical | Platform unusable; data incident; release halted |

### Risk Classification Matrix

| Score Range | Severity Classification | Action Required |
| :---: | :--- | :--- |
| **1 – 4** | 🟢 **Low Risk** | Monitor periodically in regular sprint reviews |
| **5 – 9** | 🟡 **Medium Risk** | Define active mitigation plan |
| **10 – 16** | 🔴 **High Risk** | Assign dedicated owner, active mitigation, executive visibility |
| **17 – 25** | 🔴 **Critical Risk** | Immediate program prioritization & escalation |

---

## 4. Executive Risk Summary

| ID | Risk Description | Prob | Impact | Score | Level | Owner |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **R-001** | Zoom access credentials exposed | 3 | 5 | **15** | 🔴 High | Engineering / Product |
| **R-002** | GitHub repository structure changes | 3 | 4 | **12** | 🔴 High | Engineering |
| **R-003** | Faculty fails to publish materials on time | 4 | 4 | **16** | 🔴 High | Program / Admin |
| **R-004** | Incorrect lesson-to-material mapping | 3 | 4 | **12** | 🔴 High | Product / Engineering |
| **R-005** | GitHub API rate limiting | 3 | 3 | **9** | 🟡 Medium | Engineering |
| **R-006** | Firebase cost growth | 2 | 4 | **8** | 🟡 Medium | Engineering |
| **R-007** | Learner engagement is low | 4 | 5 | **20** | 🔴 Critical | Product Lead |
| **R-008** | Progress tracking becomes inaccurate | 3 | 5 | **15** | 🔴 High | Engineering |
| **R-009** | Zoom recording becomes unavailable | 2 | 5 | **10** | 🔴 High | Admin Team |
| **R-010** | Curriculum changes during fellowship | 4 | 3 | **12** | 🔴 High | Product / Faculty |

---

## 5. Detailed Risk Register & Mitigations

### R-001 — Zoom Credentials Exposure
* **Description:** Session recordings require passcodes and originate from multiple Zoom accounts. Exposing passcodes in public GitHub repos, client-side JS bundles, or public spreadsheets compromises restricted fellowship media.
* **Score:** $3 \times 5 = \mathbf{15}$ (**High**)
* **Mitigation:** Store credential references in a restricted Firestore collection protected by security rules. Frontend retrieves ephemeral access tokens via server-brokered logic.
* **Contingency:** Revoke exposed passcode, notify Zoom admin, update Firestore record, and audit access logs.
* **Owner:** Engineering & Product Lead

---

### R-002 — GitHub Repository Structure Changes
* **Description:** The platform expects strict repository pathing (e.g., `lectures/{modality}/{week}/`). If faculty arbitrarily rename directories, material fetches fail.
* **Score:** $3 \times 4 = \mathbf{12}$ (**High**)
* **Mitigation:** Establish a formal **GitHub Content Contract** enforced by template repos and PR checks.
* **Owner:** Engineering Team

---

### R-003 — Faculty Content Publishing Delays
* **Description:** A lecture is delivered, but slides, notebooks, or recordings are uploaded late, blocking learner progression.
* **Score:** $4 \times 4 = \mathbf{16}$ (**High**)
* **Mitigation:** Implement a structured publishing pipeline with a target SLA:

```text
Lecture Delivered  ──►  Recording Processed  ──►  Materials Uploaded  ──►  Admin Validates  ──►  Lesson Published  ──►  Learners Notified
```

* **KPI:** Track *Lecture-to-Publication Latency* (Target: $<24$ hours post-session).
* **Owner:** Program Coordinator & Admin Team

---

### R-004 — Incorrect Lesson Mapping
* **Description:** Recordings or slides are attached to the wrong week, modality, or assignment.
* **Score:** $3 \times 4 = \mathbf{12}$ (**High**)
* **Mitigation:** Enforce a universal, immutable `lessonId` key (`MRI-001`, `EEG-002`) across all services:

```text
                                LESSON ID (MRI-001)
                                         │
        ┌───────────────────┬────────────┴───────┬───────────────────┐
        ▼                   ▼                    ▼                   ▼
Firestore Lesson      Zoom Recording      GitHub Materials    Progress Record
```

* **Owner:** Product Lead & Engineering

---

### R-005 — GitHub API Rate Limiting
* **Description:** Frequent client-side REST fetches hit GitHub's unauthenticated API limit (60 req/hr).
* **Score:** $3 \times 3 = \mathbf{9}$ (**Medium**)
* **Mitigation:** Implement 10-minute in-memory caching in `elearningService.ts`, leverage GitHub Raw content URLs, and proxy requests when needed.
* **Owner:** Engineering Team

---

### R-006 — Firebase Cost Growth
* **Description:** Unoptimized client polling or unindexed queries lead to excessive Firestore read/write operations.
* **Score:** $2 \times 4 = \mathbf{8}$ (**Medium**)
* **Mitigation:** Implement client-side Firestore caching, avoid global snapshot listeners where document reads suffice, and audit index efficiency.
* **Owner:** Engineering Team

---

### R-007 — Low Learner Engagement
* **Description:** The platform operates flawlessly technically, but fellows fail to complete modules.

```text
100 Registered Fellows  ──►  80 Log In  ──►  50 Open Lesson  ──►  25 Complete Lessons  ──►  10 Graduate
```

* **Score:** $4 \times 5 = \mathbf{20}$ (**Critical**)
* **Mitigation:** Monitor Weekly Active Learners (WAL) and completion drop-off points. Trigger automated reminders, "Continue Learning" dashboard widgets, and faculty follow-ups.
* **Owner:** Product Lead

---

### R-008 — Inaccurate Progress Tracking
* **Description:** Learners mark lessons complete without viewing content, or complete work without receiving credit.
* **Score:** $3 \times 5 = \mathbf{15}$ (**High**)
* **Mitigation:** Require explicit interaction events in V1; implement milestone verification (video access + assignment submission) in V2.
* **Owner:** Engineering Team

---

### R-009 — Zoom Recording Link Expiration / Deletion
* **Description:** Zoom recordings become unavailable due to cloud storage rotation or permission changes.
* **Score:** $2 \times 5 = \mathbf{10}$ (**High**)
* **Mitigation:** Provide a "Video Access Health" diagnostic view on the Admin Dashboard to test link validity before fellows report errors.
* **Owner:** Admin Team

---

### R-010 — In-Flight Curriculum Modifications
* **Description:** Faculty adjust topics or assignment requirements mid-fellowship.
* **Score:** $4 \times 3 = \mathbf{12}$ (**High**)
* **Mitigation:** Maintain dynamic curriculum loading from GitHub markdown files rather than hardcoding course outlines in application code.
* **Owner:** Product Lead & Faculty

---

## 15. Assumption Register

| ID | Assumption Statement | Validation Method | Owner | Status |
| :--- | :--- | :--- | :--- | :---: |
| **A-001** | Fellows have active, authenticated ABDN user accounts | Auth pilot test | Product | Open |
| **A-002** | GitHub cohort repository remains publicly readable | Automated API health check | Engineering | **Validated** |
| **A-003** | Faculty will adhere to the agreed GitHub folder schema | Repository audit | Admin / Faculty | Open |
| **A-004** | Zoom cloud recordings can be accessed seamlessly via web embed | Pilot stream test | Admin | Open |
| **A-005** | Firebase Free/Spark or Blaze tier covers projected read volume | Load & cost model | Engineering | Open |
| **A-006** | Faculty will upload lecture slides prior to or within 24h of live session | Operational pilot | Program Team | Open |
| **A-007** | Fellows will adopt the platform as their primary learning hub | Onboarding analytics | Product | Open |

---

## 16. Dependency Register

| ID | Dependency Name | Description | Dependency Owner | Status |
| :--- | :--- | :--- | :--- | :---: |
| **D-001** | **Firebase Services** | Auth, Firestore database, security rules engine | Engineering | 🟢 On Track |
| **D-002** | **GitHub Infrastructure** | Curriculum repository and cohort materials repo | Engineering / Faculty | 🟢 On Track |
| **D-003** | **Zoom Media Service** | Cloud recording storage and streaming URLs | ABDN Administration | 🟡 At Risk |
| **D-004** | **Faculty Content Team** | Timely submission of slides, notebooks, & assignments | Program Team | 🟡 At Risk |
| **D-005** | **Admin Operations** | Verification of lesson metadata & publishing state | Admin Team | 🟢 On Track |

---

## 17. Current Active Issues Log

| ID | Issue Description | Impact | Owner | Target Resolution | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **I-001** | Lesson metadata currently managed in manual spreadsheets | Medium | Product Lead | Migrate schema to Firestore Admin UI | Open |
| **I-002** | Zoom recordings span multiple disjointed Zoom accounts | High | Admin Team | Centralize access broker via Firestore | Open |
| **I-003** | Inconsistent lecture folder naming across track repos | High | Engineering | Enforce GitHub Content Contract | Open |
| **I-004** | Curriculum files and lesson records stored in separate systems | Medium | Product Lead | Standardize `lessonId` key mapping | Open |

---

## 18. Program Decision Log

| ID | Decision Made | Architectural Rationale | Decision Owner | Status |
| :--- | :--- | :--- | :--- | :---: |
| **DEC-001** | Firebase is the authoritative source for lesson state | Enables dynamic publishing via Admin Dashboard | Product / Engineering | **Approved** |
| **DEC-002** | GitHub remains the source of truth for educational assets | Preserves faculty git workflow and version history | Product | **Approved** |
| **DEC-003** | Zoom passcodes isolated from frontend JavaScript | Prevents credential exposure | Product / Engineering | **Approved** |
| **DEC-004** | Canonical `lessonId` used to bind cross-system resources | Eliminates fragile string matching on lesson titles | Product / Engineering | **Approved** |
| **DEC-005** | MVP focuses on content delivery and progress tracking | Deferring complex quiz engines reduces release risk | Product | **Approved** |

---

## 19. Escalation Framework

```text
Level 1: Team Level        ──► Handled by Engineering / Product Lead (UI bugs, broken links, formatting)
                                     │
                                     ▼
Level 2: Program Level     ──► Escalate to Program Coordinator (Missing faculty content, publishing delays)
                                     │
                                     ▼
Level 3: Executive Level   ──► Escalate to ABDN Director (Major scope change, security breach, budget shift)
```

---

## 20. Weekly RAID Governance Review

Program leadership conducts a weekly RAID review with the core team using the following agenda:

1. **New Risks:** Identify emerging technical, content, or operational risks.
2. **Existing Risks:** Review probability and impact score changes.
3. **Active Issues:** Triage blockers currently delaying delivery.
4. **Dependencies:** Verify status of external service integrations and content deliveries.
5. **Decisions:** Document required architectural or scope decisions.
6. **Escalations:** Flag items requiring Director intervention.

---

## 21. Program Health Dashboard

```text
ABDN LEARNING PLATFORM — PROGRAM HEALTH DASHBOARD

Overall Status:      🟢 GREEN

Risks
🔴 High       4
🟡 Medium     5
🟢 Low        2

Active Issues
🔴 Critical   0
🟠 High       2
🟡 Medium     2

Dependencies
🟢 On Track   3
🟡 At Risk    2
🔴 Blocked    0

Decisions Required:  2 Pending Sign-off
```

---

## 22. Program Health Criteria

| Health Status | Indicators | Action |
| :---: | :--- | :--- |
| 🟢 **Green** | No critical blockers; core dependencies on track; target milestone on schedule. | Continue planned sprint execution. |
| 🟡 **Amber** | High risk emerging; dependency delayed; milestone potentially at risk. | Activate mitigation plan; increase review cadence. |
| 🔴 **Red** | Unresolved P0 blocker; security incident; critical service failure; schedule breached. | Immediate escalation to Director; initiate emergency triage. |

---

## 23. Program Management Summary & Value Realization

The **Risk Register & RAID Log** provides essential structural governance across the platform lifecycle:

* **Risk Governance:** Establishes a quantitative risk-scoring framework ($\text{Risk Score} = \text{Probability} \times \text{Impact}$) with clear owners and actionable mitigations.
* **Dependency Control:** Explicitly maps technical and operational dependencies across Firebase, GitHub, Zoom, faculty workflows, and administrative functions.
* **Cross-Functional Alignment:** Clarifies responsibilities across engineering, faculty, administration, and product leadership.
* **Architectural Rigor:** Enforces the canonical `lessonId` key as the contract binding Firebase, GitHub, and Zoom.
* **Outcome Orientation:** Identifies low learner engagement as a primary product risk, ensuring technology delivers measurable educational impact.
* **Executive Visibility:** Provides leadership with crisp RAID summaries and decision logs without cluttering executive reviews with low-level implementation noise.
