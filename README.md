# CanadaPath AI 🍁

<div align="center">
  <img src="public/favicon.svg" alt="CanadaPath AI Logo" width="80"/>
  
  **AI-Powered Canadian Immigration Guidance Platform**
  
  [![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://canadapath-ai.web.app)
  [![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
  [![Firebase](https://img.shields.io/badge/Firebase-Auth-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
</div>

---

## 🌟 Overview

CanadaPath AI is an enterprise-grade web application that provides AI-powered immigration guidance for applicants seeking Canadian permanent residency. The platform features a robust **Immigration Core Engine** that handles CRS calculations, eligibility assessments, and personalized recommendations.

### ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🚀 **Onboarding Wizard** | 5-step interactive assessment with real-time CRS score preview |
| 📊 **User Dashboard** | Personalized overview of scores, trends, and application progress |
| 🧮 **CRS Engine** | Complex logic for Comprehensive Ranking System calculation (Zod-validated) |
| 📁 **Document Vault** | Secure management of required immigration documents and statuses |
| 🔍 **Job Matcher** | Search LMIA-approved jobs with profile matching logic |
| 🗺️ **Interactive Map** | Explore provincial pathways (PNPs) with advanced filters |
| 🤖 **AI Chat Assistant** | Intelligent chatbot with an immigration-specific knowledge base |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        COMPONENT LAYER                           │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    React 19 + Vite 7                     │    │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌──────────┐  │    │
│  │  │ Dashboard │ │ Onboarding│ │   Auth    │ │ Chatbot  │  │    │
│  │  └───────────┘ └───────────┘ └───────────┘ └──────────┘  │    │
│  └─────────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────────┤
│                        ENGINE & STATE                            │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────────┐    │
│  │ Zustand Store│  │  Zod Schema  │  │  CRS Logic Utility  │    │
│  │ (Persistence)│  │ (Validation) │  │ (Core Calculator)   │    │
│  └──────────────┘  └──────────────┘  └─────────────────────┘    │
├─────────────────────────────────────────────────────────────────┤
│                        INFRASTRUCTURE                            │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              Firebase Auth & Hosting & Firestore             │    │
│  │         Secure Sign-In | Global CDN | Profile Sync          │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure (Key Modules)

```
canadapath-ai/
├── src/
│   ├── components/
│   │   ├── dashboard/       # DashboardLayout, Sidebar, Metrics
│   │   ├── onboarding/      # EligibilityWizard
│   │   └── ui/              # Shadcn-inspired base components
│   ├── lib/
│   │   └── schema/          # ImmigrationProfile Zod schema + CRS engine
│   ├── store/
│   │   └── useImmigrationStore.ts # Central state with persistence
│   ├── pages/
│   │   ├── dashboard/       # Profile, Documents, Jobs, Settings pages
│   │   ├── OnboardingPage.tsx 
│   │   └── DashboardPage.tsx # Overview dashboard
│   ├── services/            # Firebase config and auth logic
│   └── App.tsx              # Auth-protected routing system
├── docs/                    # Technical Spec and User Manual
└── firebase.json            # Deployment configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Reach out for Firebase environment variables (.env)

### Installation
```bash
# Clone the repository
git clone https://github.com/SGajjar24/Immigration.git
cd Immigration

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build & Deploy
```bash
npm run build
firebase deploy --only hosting
```

---

## 🎨 Design System

We use a **Luminous Glass** design system:
- **Primary:** Dark Navy (`#1f3b61`)
- **Accent:** Maple Red (`#dc2626`)
- **Surface:** Semi-transparent Glass (`bg-white/5`)
- **Logic:** Responsive layouts using Tailwind v4 grid and flex utilities.

---

## 📄 Documentation

For detailed information, refer to the following documents in the `docs/` folder:
- [Technical Specification](docs/TECHNICAL_SPEC.md) - architecture, data structures, and logic.
- [User Manual](docs/USER_MANUAL.md) - Guide on using the platform.

---

<div align="center">
  <sub>Built with ❤️ for aspiring Canadian immigrants</sub>
</div>
