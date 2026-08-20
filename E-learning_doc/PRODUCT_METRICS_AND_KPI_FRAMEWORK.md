# Product Metrics & KPI Framework
## ABDN Fellowship Learning Platform

* **Document Owner:** Patrick Filima
* **Role:** Product Lead / Technical Program Manager
* **Organization:** African Brain Data Network (ABDN)
* **Product:** ABDN Fellowship Learning Platform
* **Version:** 1.0
* **Status:** Proposed

---

## 1. Executive Summary & Measurement Philosophy

The **ABDN Fellowship Learning Platform Product Metrics & KPI Framework** establishes a quantitative telemetry system for measuring product adoption, learner engagement, content operational health, and educational capacity outcomes.

### Core Measurement Philosophy
> **"Track Outcomes, Not Just Activity."**
> Simply measuring login counts or page views does not prove educational value. The platform measures meaningful learning actions—watching lecture streams, running Colab notebooks, completing practical assignments, and advancing modality progress.

```text
Product Instrumentation  ──►  Client Event Telemetry  ──►  Metrics Aggregation  ──►  Operational Dashboards  ──►  Program Optimization
```

---

## 2. North Star Metric

The primary overarching metric for the platform is:

$$\Large \text{North Star Metric} = \text{Weekly Active Learning Fellows (WAL)}$$

### Definition
The number of unique enrolled fellows who perform at least **one meaningful learning action** within a 7-day window.

A *meaningful learning action* includes:
1. Watching a lecture session recording
2. Launching and executing a Jupyter/Colab notebook
3. Reviewing lecture slide decks or notes
4. Marking a lesson as completed
5. Submitting an assignment

---

## 3. Product Metric Hierarchy

The telemetry framework is structured across three functional tiers:

```text
                                TIER 1: NORTH STAR METRIC
                        Weekly Active Learning Fellows (WAL)
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 ▼                                               ▼
      TIER 2: ENGAGEMENT & ADOPTION                   TIER 3: OPERATIONAL & QUALITY
    • Fellow Activation Rate                       • Content Readiness Score
    • Lesson Completion Rate                       • Lecture-to-Publishing SLA
    • Modality Progress Index                      • Video Stream Availability
    • Week-over-Week Retention                     • API Latency & Error Rate
```

---

## 4. Mathematical Definitions & Formulas

### 4.1 Fellow Activation Rate
Measures the percentage of registered fellows who successfully complete their onboarding and finish their first lesson:

$$\text{Activation Rate} = \frac{\text{Registered Fellows Who Complete 1st Lesson}}{\text{Total Registered Fellows}} \times 100$$

*Target Threshold:* $\ge 85\%$

---

### 4.2 Lesson Completion Rate
Measures the ratio of completed lesson attempts to total started lesson attempts:

$$\text{Lesson Completion Rate} = \frac{\text{Lessons Marked Completed}}{\text{Lessons Started}} \times 100$$

*Target Threshold:* $\ge 75\%$

---

### 4.3 Modality Pathway Progress
Measures fellow completion progress within a specific neuro-imaging track (MRI/fMRI, EEG, fNIRS, Electrophysiology):

$$\text{Modality Progress} = \frac{\text{Completed Published Lessons in Track}}{\text{Total Published Lessons in Track}} \times 100$$

---

### 4.4 Content Readiness Score
Measures the operational completeness of published lessons across required learning assets (Curriculum reference, Video link, Slide deck, Colab notebook, Assignment):

$$\text{Content Readiness Score} = \frac{\text{Published Lessons with 100\% Assets Attached}}{\text{Total Published Lessons}} \times 100$$

*Target Threshold:* $\ge 90\%$

---

### 4.5 Lecture-to-Publishing SLA
Measures operational publishing latency between a live session occurring and its availability on the dashboard:

$$\text{Publishing SLA Compliance} = \frac{\text{Lessons Published within 24h of Live Session}}{\text{Total Live Sessions Conducted}} \times 100$$

*Target Threshold:* $\ge 95\%$

---

## 5. Telemetry & Event Instrumentation Spec

The client application instruments events via `elearningMetricsService.ts` to log user interactions:

| Event Type | Trigger Condition | Payload Data | Business Value |
| :--- | :--- | :--- | :--- |
| `onboarding_complete` | Fellow completes profile setup | `userId`, `enrolledModalities` | Tracks Activation Rate |
| `enrollment` | Fellow enrolls in a track | `userId`, `modality` | Tracks Pathway Demand |
| `video_start` | Fellow launches Zoom recording | `userId`, `lessonId`, `modality` | Tracks Session Engagement |
| `video_complete` | Fellow finishes session stream | `userId`, `lessonId`, `duration` | Measures Content Consumption |
| `colab_launch` | Fellow clicks "Open in Colab" | `userId`, `lessonId`, `notebook` | Tracks Hands-on Code Practice |
| `material_view` | Fellow opens slide deck PDF | `userId`, `lessonId`, `fileType` | Measures Resource Utilization |
| `assignment_submit` | Fellow submits GitHub work | `userId`, `lessonId`, `assignment` | Measures Practical Work |

---

## 6. Learner Conversion Funnel

The platform measures fellow progression through eight sequential funnel stages:

```text
Stage 1: Registered Fellows       (100%)
   │
   ▼
Stage 2: Activated Fellows        (91.3%)   ──► Completed onboarding & 1st lesson
   │
   ▼
Stage 3: Enrolled Modality        (88.0%)   ──► Selected primary track
   │
   ▼
Stage 4: Started Lesson           (82.5%)   ──► Opened lesson player
   │
   ▼
Stage 5: Watched Recording        (76.0%)   ──► Launched Zoom video stream
   │
   ▼
Stage 6: Executed Code            (64.2%)   ──► Launched Colab notebook
   │
   ▼
Stage 7: Completed Lesson         (74.0%)   ──► Toggled complete status
   │
   ▼
Stage 8: Graduated Fellowship     (68.5%)   ──► Unlocked completion certificate
```

*Funnel analysis pinpoints exact drop-off points, allowing program teams to intervene when engagement drops between Stage 5 and Stage 6.*

---

## 7. System SLA & Technical Performance Benchmarks

In addition to product metrics, system technical health is evaluated against operational SLAs:

| Technical Benchmark | Target Threshold | Impact of Breach |
| :--- | :--- | :--- |
| **System Uptime SLA** | $\ge 99.5\%$ available | Fellows unable to access dashboard or resources |
| **Initial Dashboard Paint** | $< 2.0$ seconds | High initial bounce rate |
| **Firestore Query Latency** | $< 200$ ms read/write | Laggy progress updates and checkmark toggles |
| **GitHub API Success Rate** | $\ge 99.0\%$ successful fetches | Missing slide decks or broken Colab links |
| **Video Stream Launch SLA** | $\ge 95.0\%$ successful launches | Learner frustration and support tickets |

---

## 8. Operational & Executive Reporting Dashboards

Telemetry data is aggregated into two primary reporting interfaces:

### 8.1 Executive Cohort Dashboard

```text
===================================================================================
                       ABDN FELLOWSHIP COHORT DASHBOARD
===================================================================================
North Star (WAL):          58 Active Fellows / Week
Fellow Activation Rate:    91.3%
Average Modality Progress: 74.0%
Week-over-Week Retention:  88.5%

MODALITY BREAKDOWN
  • MRI / fMRI:            84% Progress  |  WAL: 42
  • EEG:                   78% Progress  |  WAL: 38
  • fNIRS:                 72% Progress  |  WAL: 29
  • Electrophysiology:     68% Progress  |  WAL: 24
===================================================================================
```

---

### 8.2 Content Health & Operations Dashboard

```text
===================================================================================
                   CONTENT READINESS & PUBLISHING HEALTH
===================================================================================
Published Lessons:         31
Content Readiness Score:   92%
Publishing SLA Compliance: 96.8% (Avg Latency: 14.2 hours post-session)

RESOURCE DIAGNOSTICS
  [✓] Curriculum References:   31 / 31 (100%)
  [✓] Zoom Recordings:         30 / 31 (96.8%)  ──► 1 Link Expiry Alert (fNIRS W3)
  [✓] Slide Decks (.pdf):      29 / 31 (93.5%)  ──► 2 Pending Submissions
  [✓] Colab Notebooks (.ipynb):28 / 31 (90.3%)  ──► 3 Pending Notebooks
===================================================================================
```
