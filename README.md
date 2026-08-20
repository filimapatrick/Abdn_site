# African Brain Data Network (ABDN) Web Platform & Fellowship Learning Hub

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple.svg)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%26%20Auth-orange.svg)](https://firebase.google.com/)

An integrated, production-grade digital web application and **Fellowship E-Learning Platform** for the **African Brain Data Network (ABDN)**. The platform orchestrates ABDN's public organization portal, regional researcher network, and a unified digital learning environment connecting **Firebase**, **GitHub**, and **Zoom** for distributed neuroscience research training across Africa.

---

## 📌 Executive Summary

The ABDN Fellowship Learning Platform transforms distributed scientific training from a collection of disconnected tools—recorded Zoom sessions, GitHub code repositories, curriculum documents, and spreadsheets—into a single, structured, and measurable digital learning experience.

### Core Architectural Principle
> **Firebase** manages application state, user identities, and learner progress; **GitHub** manages curriculum outlines and Jupyter notebook assets; **Zoom** provides streaming video sessions; and the **React Learner Frontend** orchestrates these resources into a seamless, measurable fellowship journey.

---

## ✨ Key Features & Capabilities

### 🌐 Public Portal & Network Hub
* **Organization Portal:** Showcasing ABDN mission, regional neuro-imaging research initiatives, programs, and team.
* **Announcements & Events:** Filterable announcements, fellowship news, and upcoming scientific workshops.
* **Academy & Programs:** Public pathway descriptions and application guidelines.

### 🧠 Fellowship E-Learning Hub (`/learning/dashboard`)
* **Modality Learning Pathways:** Structured, multi-week curricula for four core neuroscience tracks:
  * **MRI / fMRI:** Magnetic Resonance Imaging & Functional MRI
  * **EEG:** Electroencephalography
  * **fNIRS:** Functional Near-Infrared Spectroscopy
  * **Electrophysiology:** Cellular & Systems Electrophysiology
* **Dynamic GitHub Curriculum Integration:** Real-time Markdown fetching and parsing from `ABDN_TA_Fellowship_Curriculum`.
* **GitHub Cohort Materials & One-Click Colab Launcher:** Automatic categorization of lecture slide decks (`.pdf`), reading notes, assignment templates, and one-click execution of Jupyter Notebooks (`.ipynb`) in **Google Colab**.
* **Protected Video Access Launcher:** Secure Zoom session recording player featuring server-brokered token access that isolates passcodes from public client data.
* **Firebase Progress Engine:** Real-time lesson completion persistence (`users/{uid}/progress/{lessonId}`) with dynamic modality progress calculations.
* **In-App Telemetry & Content Health:** Event instrumentation tracking Weekly Active Learning Fellows (WAL), activation rates, completion rates, and content readiness diagnostics.

---

## 🛠️ Technology Stack

* **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons, React Router v6
* **Backend & State:** Firebase Authentication, Firestore Database, Firebase Security Rules
* **Content & Code Runtime:** GitHub REST API, Google Colab runtime
* **Media Infrastructure:** Zoom Video Cloud
* **Build & Deployment:** Vite, ESLint, Netlify deployment pipeline

---

## 📂 Codebase & Project Architecture

```text
Abdn_2024_site/
├── E-learning_doc/                # Master 10-Artifact Senior TPM Documentation Suite
│   ├── PRODUCT_REQUIREMENTS_DOCUMENT.md
│   ├── TECHNICAL_DESIGN_DOCUMENT.md
│   ├── PRODUCT_AND_TECHNICAL_DELIVERY_PLAN.md
│   ├── PRODUCT_ROADMAP.md
│   ├── USER_JOURNEY_MAP.md
│   ├── PRODUCT_METRICS_AND_KPI_FRAMEWORK.md
│   ├── STAKEHOLDER_COMMUNICATION_PLAN.md
│   ├── TEST_QA_AND_RELEASE_PLAN.md
│   ├── RISK_REGISTER_AND_RAID_LOG.md
│   └── PROPOSED_RESEARCH_PAPERS.md
├── src/
│   ├── components/                # React UI Components
│   │   ├── learning/              # E-Learning Hub Components
│   │   │   ├── LessonPlayerModal.tsx
│   │   │   ├── DashboardSidebar.tsx
│   │   │   ├── DashboardTopNav.tsx
│   │   │   ├── PathwayModal.tsx
│   │   │   ├── AssessmentModal.tsx
│   │   │   ├── CertificateModal.tsx
│   │   │   └── AuthModal.tsx
│   │   └── Navbar.tsx, Footer.tsx, SEO.tsx
│   ├── context/                   # React Context (AuthContext.tsx)
│   ├── firebase/                  # Firebase Client Configuration (config.ts)
│   ├── pages/                     # Public & Application Pages
│   │   ├── learning/              # E-Learning Application Views
│   │   │   ├── Dashboard.tsx      # Main Fellowship Learner Dashboard
│   │   │   └── Onboarding.tsx     # Learner Onboarding & Pathway Selection
│   │   ├── Home.tsx, About.tsx, Announcements.tsx, Academy.tsx
│   └── services/                  # Core Business & API Service Layer
│       ├── elearningService.ts    # GitHub parser, lesson queries, curriculum resolver
│       ├── progressService.ts     # Firestore user progress persistence & formulas
│       ├── elearningMetricsService.ts # Analytics telemetry & content health diagnostics
│       ├── authService.ts         # Firebase auth & profile document sync
│       └── eventsService.ts       # Events & announcement data service
├── public/                        # Static Public Assets
└── package.json, vite.config.ts   # Build & Dependency Configurations
```

---

## 📚 Master Program Governance Documentation (`E-learning_doc/`)

The repository includes a complete **10-artifact Senior TPM Governance & Research Portfolio** in [`E-learning_doc/`](file:///Users/patrickfilima/Desktop/Abdn_2024_site/E-learning_doc):

1. 📄 [**`PRODUCT_REQUIREMENTS_DOCUMENT.md`**](file:///Users/patrickfilima/Desktop/Abdn_2024_site/E-learning_doc/PRODUCT_REQUIREMENTS_DOCUMENT.md) — Vision, problem statement, personas, functional requirements (FR-01 to FR-22), acceptance criteria.
2. 📄 [**`TECHNICAL_DESIGN_DOCUMENT.md`**](file:///Users/patrickfilima/Desktop/Abdn_2024_site/E-learning_doc/TECHNICAL_DESIGN_DOCUMENT.md) — System architecture, Firestore data models, GitHub dynamic integration, Zoom security isolation.
3. 📄 [**`PRODUCT_AND_TECHNICAL_DELIVERY_PLAN.md`**](file:///Users/patrickfilima/Desktop/Abdn_2024_site/E-learning_doc/PRODUCT_AND_TECHNICAL_DELIVERY_PLAN.md) — 7 product workstreams, 10-sprint schedule, critical path analysis, and post-launch operating model.
4. 📄 [**`PRODUCT_ROADMAP.md`**](file:///Users/patrickfilima/Desktop/Abdn_2024_site/E-learning_doc/PRODUCT_ROADMAP.md) — Strategic execution horizons (Phases 0–4), milestone gates, and multi-cohort scaling strategy.
5. 📄 [**`USER_JOURNEY_MAP.md`**](file:///Users/patrickfilima/Desktop/Abdn_2024_site/E-learning_doc/USER_JOURNEY_MAP.md) — 6-stage fellow journey map, touchpoints, friction mitigations, and cross-functional Service Blueprint.
6. 📄 [**`PRODUCT_METRICS_AND_KPI_FRAMEWORK.md`**](file:///Users/patrickfilima/Desktop/Abdn_2024_site/E-learning_doc/PRODUCT_METRICS_AND_KPI_FRAMEWORK.md) — North Star Metric (Weekly Active Learners), activation funnel, telemetry events, and system SLAs.
7. 📄 [**`STAKEHOLDER_COMMUNICATION_PLAN.md`**](file:///Users/patrickfilima/Desktop/Abdn_2024_site/E-learning_doc/STAKEHOLDER_COMMUNICATION_PLAN.md) — Cross-functional RACI assignment matrix, communication cadences, and decision escalation protocols.
8. 📄 [**`TEST_QA_AND_RELEASE_PLAN.md`**](file:///Users/patrickfilima/Desktop/Abdn_2024_site/E-learning_doc/TEST_QA_AND_RELEASE_PLAN.md) — Multi-tier QA testing strategy (Unit, Integration, E2E, UAT), P0–P3 defect SLAs, and rollback protocol.
9. 📄 [**`RISK_REGISTER_AND_RAID_LOG.md`**](file:///Users/patrickfilima/Desktop/Abdn_2024_site/E-learning_doc/RISK_REGISTER_AND_RAID_LOG.md) — Scored risk matrix ($\text{Risk Score} = \text{Probability} \times \text{Impact}$), assumption & dependency registers, and issue log.
10. 📄 [**`PROPOSED_RESEARCH_PAPERS.md`**](file:///Users/patrickfilima/Desktop/Abdn_2024_site/E-learning_doc/PROPOSED_RESEARCH_PAPERS.md) — 6 peer-reviewed academic publication proposals across digital education, learning analytics, and open science infrastructure.

---

## ⚡ Quick Start & Development Guide

### Prerequisites
* **Node.js:** `v18.0.0` or higher
* **npm:** `v9.0.0` or higher

### 1. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/African-Brain-Data-Network/Abdn_2024_site.git
cd Abdn_2024_site
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory (refer to `.env.example`):

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Running Development Server
Launch the local development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### 4. Build & Production Verification
To test a production bundle and run deployment verification:

```bash
npm run build
./verify-deployment.sh
```

---

## 🗄️ Firestore Database Schema Overview

```text
users/{uid}                      ──► User profile, role, cohort, enrolled modalities
lessons/{lessonId}              ──► Published lesson metadata, week, date, GitHub paths
videoAccess/{videoAccessId}     ──► Protected Zoom streaming references & access passcodes
users/{uid}/progress/{lessonId} ──► Individual learner completion status (started, completed)
elearning_metrics/cohort_2026   ──► Aggregated cohort telemetry & engagement events
```

---

## 🎓 Academic Publications Strategy

The platform serves as an empirical research intervention producing **6 peer-reviewed academic paper proposals**:

1. **Digital Infrastructure:** *Design and Evaluation of Digital Infrastructure for Distributed Neuroscience Research Training in Africa* (*BMC Medical Education*)
2. **Research Competency:** *From Learning Traces to Research Competency: A Digital Framework for Measuring Researcher Development* (*Journal of Learning Analytics*)
3. **Open Architecture:** *A Configurable, Open-Source Architecture for Competency-Aware Research Training* (*SoftwareX* / *JOSS*)
4. **Computational Integration:** *Bridging Research Training and Computational Infrastructure: Integrating Cloud Neuroimaging Workflows into African Researcher Development* (*PLOS Computational Biology*)
5. **Version-Controlled Education:** *Version-Controlled Scientific Education: A Git-Based Model for Continuous Curriculum Delivery in Research Training* (*IEEE Trans. Learning Tech.*)
6. **Reproducibility & Security:** *Reproducibility vs. Restricted Assets: Tiered Security Architecture in Open Health Science Research Training* (*JMIR*)

---

## 👤 Leadership & Authorship

* **Product Lead & Technical Program Manager:** Patrick Filima
* **Organization:** African Brain Data Network (ABDN)
* **Website:** [African Brain Data Network](https://africanbraindata.org)
