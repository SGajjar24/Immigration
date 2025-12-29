# CanadaPath AI - Technical Specification

## Document Information
| Field | Value |
|-------|-------|
| Version | 1.1.0 |
| Last Updated | December 30, 2025 |
| Status | Production |

---

## 1. Technology Stack

### Frontend Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.0.0 | UI Framework |
| TypeScript | 5.7.2 | Type Safety |
| Vite | 7.3.0 | Build Tool |
| Tailwind CSS | 4.0.0 | Styling |
| Framer Motion | 11.x | Animations |
| Lucide React | - | Icons |
| Zustand | 5.0.x | State Management |
| React Hook Form | 7.x | Form Management |
| Zod | 3.x | Validation Schema |

### Backend & infrastructure
| Tool | Purpose |
|------|---------|
| Firebase Auth | User authentication (Google Sign-In) |
| Firebase Hosting | Static web hosting & CDN |
| Firebase Firestore | NoSQL database (profile persistence) |

---

## 2. Architecture Overview

### Application Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   React Components                   │    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │    │
│  │  │ Pages   │ │Features │ │Components│ │ Layouts │   │    │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │    │
│  └─────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│                    APPLICATION LAYER (Zustand)               │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐    │
│  │ Auth State  │  │ Profile Data │  │  CRS Logic      │    │
│  │ (Firebase)  │  │ (Dashboard)  │  │  (Core Engine)  │    │
│  └─────────────┘  └──────────────┘  └─────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│                    DATA LAYER                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Static & Persistent Data                │    │
│  │  • Province Data (ALL_PROVINCES)                     │    │
│  │  • Immigration KB (IMMIGRATION_KB)                   │    │
│  │  • User Profiles (Firestore)                         │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Component Hierarchy (Enhanced)
```
App.tsx
├── AuthGuard.tsx (Route Protection)
├── MainLayout.tsx / DashboardLayout.tsx
├── [Public Site]
│   ├── HomePage.tsx
│   ├── AssessmentPage.tsx
│   ├── CalculatorPage.tsx
│   └── ...
├── [Onboarding]
│   └── OnboardingPage.tsx
│       └── EligibilityWizard.tsx
└── [Dashboard]
    ├── DashboardPage.tsx (Overview)
    ├── ProfilePage.tsx
    ├── DocumentVaultPage.tsx
    ├── JobMatcherPage.tsx
    └── SettingsPage.tsx
```

---

## 3. Core Engine (Immigration)

### Zod Schema & Validation
Located in `src/lib/schema/immigrationProfile.ts`.
- Validates age, education levels, language scores (CLB 1-12), work experience, and additional factors.
- Supports conditional logic for spouse details.

### CRS Calculator
`calculateCRS(profile: ImmigrationProfile)` implementation:
- **Core Factors:** Age, Education, Language, Canadian Experience.
- **Skill Transferability:** Multi-factor points based on language + education or language + experience.
- **Additional Points:** PNP (600), Job Offer (50), Sibling (15), Trade Cert (50).

### Recommendation Engine
`generateSuggestions(profile: ImmigrationProfile)`:
- Dynamically analyzes profile gaps.
- Returns actionable insights like "Improve CLB to 9+", "Gain 1 year Canadian Experience", or "Apply for PNP".

---

## 4. State Management

### userProfile Store (`useImmigrationStore.ts`)
| State Property | Description |
|----------------|-------------|
| `userProfile` | Name, email, onboarding status, target province |
| `crsData` | Detailed immigration profile data for score calculation |
| `onboarded` | Boolean flag to trigger onboarding vs dashboard view |

---

## 5. Component Specifications

#### EligibilityWizard.tsx
- Multi-step form built with `react-hook-form`.
- Real-time CRS score preview update on any input change.
- Progress visualization with `Progress` component and `Check` icons.

#### DashboardLayout.tsx
- Sidebar navigation with active state tracking.
- Profile dropdown with "Sign Out" functionality.
- Mobile-responsive sidebar with overlay.

---

## 6. Styling System

### Design Tokens (Tailwind CSS v4)
- **Primary:** Dark Navy (#1f3b61)
- **Accent:** Maple Red (#dc2626)
- **Background:** Deep Dark (#0b1120)
- **Gradient:** Blue to Purple for premium actions.

---

## 7. Performance & Deployment

### Build Command
`npm run build` (Vite + TS)

### Deployment
`firebase deploy --only hosting`
Production URL: `https://canadapath-ai.web.app`

---

## 8. Future Considerations

### Planned Enhancements
- [ ] AI OCR for document verification in Document Vault.
- [ ] Real-time PNP draw notifications via Firebase Cloud Messaging.
- [ ] Detailed PDF report generation for CRS assessments.
- [ ] Mentor chat integration for direct RCIC consultation.

---

*Document generated for CanadaPath AI v1.1.0*
