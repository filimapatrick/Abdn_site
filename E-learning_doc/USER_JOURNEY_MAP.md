# User Journey Map & Service Blueprint
## ABDN Fellowship Learning Platform

* **Document Owner:** Patrick Filima
* **Role:** Product Lead / Technical Program Manager
* **Organization:** African Brain Data Network (ABDN)
* **Product:** ABDN Fellowship Learning Platform
* **Version:** 1.0
* **Status:** Proposed

---

## 1. Purpose & User-Centered Design Principles

The **User Journey Map** defines the end-to-end user experience for participants, instructors, and administrators within the ABDN Fellowship Learning Platform.

By mapping every interaction stage—from account registration to lesson execution, cloud notebook coding, and pathway completion—this document ensures that the digital platform minimizes friction, supports low-bandwidth environments, and provides intuitive guidance.

### User-Centered Design Principles
1. **Zero-Friction Discovery:** Fellows must be able to locate their current week's lesson in fewer than 3 clicks.
2. **Contextual Integration:** Session recordings, slides, reading notes, and Jupyter Notebook links must coexist in a single view.
3. **Transparent Progress Feedback:** Learners must always know what they have completed and what action to take next.
4. **Resilient Low-Bandwidth Operation:** The interface must remain functional and responsive even under poor internet connectivity.

---

## 2. Target Personas

| Persona | Primary Goal | Key Pain Points Solved |
| :--- | :--- | :--- |
| **Fellow (Learner)** | Master neuro-imaging techniques (MRI, EEG, fNIRS, Ephys) and complete fellowship assignments. | Eliminates searching across scattered Zoom links, WhatsApp messages, and unorganized Google Drive folders. |
| **Faculty (Instructor)** | Share lecture materials, notebooks, and session recordings effortlessly. | Integrates directly with native GitHub repositories; eliminates repetitive manual file uploads. |
| **Admin (Operations)** | Publish lessons, verify video access links, and monitor cohort engagement. | Replaces manual spreadsheet tracking with real-time content health and student activity dashboards. |
| **Leadership (Executive)** | Evaluate fellowship completion rates, track retention, and measure scientific capacity building. | Provides real-time telemetry on Weekly Active Learners (WAL) and pathway completion rates. |

---

## 3. End-to-End Fellow User Journey Map

```text
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ STAGE 1         │     │ STAGE 2         │     │ STAGE 3         │     │ STAGE 4         │     │ STAGE 5         │     │ STAGE 6         │
│ Discovery &     │ ──► │ Pathway         │ ──► │ Dashboard       │ ──► │ Lesson Player   │ ──► │ Practical Code  │ ──► │ Completion &    │
│ Onboarding      │     │ Selection       │     │ Orientation     │     │ & Video Stream  │     │ Execution       │     │ Progress Sync   │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## 4. Detailed Stage Breakdown

### Stage 1 — Discovery & Account Onboarding

* **User Goal:** Register for the fellowship platform and set up a learner profile.
* **User Actions:**
  1. Fellow receives an email invitation or navigates to the ABDN platform.
  2. Clicks "Sign In / Register".
  3. Enters full name, email, password, and selects primary institution/cohort (`ABDN-2026`).
* **System Behavior:**
  * Firebase Auth creates user credential (`uid`).
  * `authService.ts` synchronizes profile record in `elearning_users` collection.
  * System directs user to the Onboarding Welcome Screen.
* **Friction & Mitigation:**
  * *Risk:* Fellow forgets password or struggles with email verification.
  * *Mitigation:* Clear password reset triggers and persistent session tokens via Firebase Auth.

---

### Stage 2 — Pathway Selection & Enrollment

* **User Goal:** Select primary neuro-imaging specialization tracks (e.g., MRI/fMRI, EEG).
* **User Actions:**
  1. Fellow views available fellowship modality cards (MRI/fMRI, EEG, fNIRS, Electrophysiology).
  2. Selects enrolled pathways via checkboxes or modal toggle.
  3. Clicks "Start Learning".
* **System Behavior:**
  * System writes `enrolledPathways` array to `users/{uid}` in Firestore.
  * `elearningMetricsService.ts` logs an `enrollment` engagement event.
  * Dashboard dynamically displays relevant curriculum tabs.
* **User Sentiment:** 🟢 *Empowered & Clear Direction.*

---

### Stage 3 — Dashboard & Weekly Orientation

* **User Goal:** Identify the current week's schedule, published lessons, and overall progress.
* **User Actions:**
  1. Fellow views the main Learning Dashboard.
  2. Inspects overall fellowship completion percentage bar.
  3. Uses the "Current Week" section to filter active sessions.
  4. Clicks the "Continue Learning" widget or a specific lesson card (e.g., `MRI-001`).
* **System Behavior:**
  * `elearningService.ts` queries published Firestore lessons where `status == "published"`.
  * `progressService.ts` fetches fellow progress records from `users/{uid}/progress`.
  * System calculates and displays real-time completion percentages.
* **Friction & Mitigation:**
  * *Risk:* Learner feels overwhelmed by multiple unread modules.
  * *Mitigation:* Prominent "Continue Learning" banner automatically highlights the exact next uncompleted lesson.

---

### Stage 4 — Lesson Player & Resource Access

* **User Goal:** Watch the recorded Zoom lecture session and review accompanying slide decks.
* **User Actions:**
  1. Fellow clicks on a lesson card.
  2. The interactive `<LessonPlayerModal />` launches.
  3. Fellow clicks "Watch Recording" to view the video stream.
  4. Fellow clicks "View Slides" to inspect the lecture presentation PDF.
* **System Behavior:**
  * System queries `videoAccess/{videoAccessId}` to securely retrieve Zoom streaming URL and passcode.
  * `elearningService.ts` fetches linked materials from GitHub (`lectures/mri_fmri/week_03/`).
  * `elearningMetricsService.ts` dispatches `video_start` and `material_view` telemetry events.
* **Friction & Mitigation:**
  * *Risk:* Zoom passcode is lost or broken link occurs.
  * *Mitigation:* Ephemeral video token brokerage displays passcode directly beside the video player modal with one-click copy.

---

### Stage 5 — Practical Code Execution (Google Colab)

* **User Goal:** Practice computational neuroscience algorithms on real research datasets.
* **User Actions:**
  1. Fellow clicks the **"Open in Google Colab"** action button inside the lesson player.
  2. System launches Google Colab in a new browser tab with the target Jupyter Notebook loaded.
  3. Fellow executes Python preprocessing scripts using the sample dataset *(e.g., ABDN Nigerian Parkinson's T1w Dataset)*.
* **System Behavior:**
  * System constructs dynamic URL: `https://colab.research.google.com/github/{repo}/blob/{path}/{notebook}`.
  * `elearningMetricsService.ts` records `colab_launch` event telemetry.
* **User Sentiment:** 🟢 *Engaged in Practical Research Practice.*

---

### Stage 6 — Completion & Progress Synchronization

* **User Goal:** Mark the lesson complete and see progress reflect on the dashboard.
* **User Actions:**
  1. Fellow completes watching the video and reviewing materials.
  2. Clicks the "Mark Complete" toggle button inside the lesson player.
  3. Closes modal and returns to dashboard.
* **System Behavior:**
  * System writes `status: "completed"` and `completedAt: timestamp` to `users/{uid}/progress/{lessonId}`.
  * Dashboard recalculates modality and overall progress percentages.
  * System checks if fellow has unlocked subsequent week modules.
* **Friction & Mitigation:**
  * *Risk:* Fellow loses internet connection while clicking complete.
  * *Mitigation:* Firestore offline persistence queues progress updates locally and syncs automatically when connection restores.

---

## 5. Cross-Functional Service Blueprint

The Service Blueprint aligns front-stage user actions with back-stage admin and system processes:

```text
FELLOW ACTIONS      Sign In  ──►  Select Track  ──►  Open Lesson  ──►  Watch Stream  ──►  Launch Colab  ──►  Mark Complete
                       │              │              │              │              │              │
───────────────────────┼──────────────┼──────────────┼──────────────┼──────────────┼──────────────┼────────────────────────
FRONT-STAGE FRONTEND   AuthModal      PathwayModal   LessonCard     LessonPlayer   Colab Button   Progress Toggle
                       │              │              │              │              │              │
───────────────────────┼──────────────┼──────────────┼──────────────┼──────────────┼──────────────┼────────────────────────
BACK-STAGE ADMIN       —              —              Publish Lesson Add Zoom Link  Upload Code    Monitor Telemetry
                       │              │              │              │              │              │
───────────────────────┼──────────────┼──────────────┼──────────────┼──────────────┼──────────────┼────────────────────────
SYSTEM SERVICES        Firebase Auth  users/{uid}    elearning      videoAccess    GitHub API     progressService
                       & Profile Sync Pathway Write  Service Query  Token Broker   Colab Builder  Subcollection Write
```

---

## 6. Accessibility & Low-Resource Design Standards

To support fellows accessing the platform across various African regions:
* **Mobile-First Responsive Layout:** Full UI functionality on mobile devices ($<640\text{px}$) for learners without desktop access.
* **Bandwidth Optimization:** Slide decks (`.pdf`) and notes load on-demand; heavy video streams use adaptive bitrate Zoom playback.
* **Keyboard Accessibility:** Complete Tab key focus support and high-contrast color scheme for visually impaired users.
* **Offline Resilience:** LocalStorage and IndexedDB caching ensure progress updates are never lost during network drops.
