# CanadaPath AI - Project Roadmap & Backlog

## 📋 Document Information
| Field | Value |
|-------|-------|
| Version | 1.0.0 |
| Last Updated | December 30, 2025 |
| Status | Active Development |

---

## 🐛 Known Issues / Open Bugs

### High Priority
| ID | Issue | Location | Status |
|----|-------|----------|--------|
| BUG-001 | Chunk size warning on build (index.js > 500KB) | `vite build` output | Open |
| BUG-002 | Type mismatch between Zod schema and react-hook-form (using ts-ignore) | `EligibilityWizard.tsx` | Workaround Applied |
| BUG-003 | Mobile sidebar overlay z-index conflict on some devices | `DashboardLayout.tsx` | Open |

### Medium Priority
| ID | Issue | Location | Status |
|----|-------|----------|--------|
| BUG-004 | Score trend chart shows mock data when no historical data exists | `ScoreTrendChart.tsx` | Open |
| BUG-005 | Document upload in Document Vault is simulated (no backend) | `DocumentVaultPage.tsx` | Expected (No Backend) |
| BUG-006 | Job Matcher uses static mock data instead of live LMIA feed | `JobMatcherPage.tsx` | Expected (No API) |

### Low Priority
| ID | Issue | Location | Status |
|----|-------|----------|--------|
| BUG-007 | Footer social links point to placeholder URLs | `Footer.tsx` | Open |
| BUG-008 | "Next Draw" countdown uses hardcoded date | `DashboardMetrics.tsx` | Open |

---

## 🚀 Future Improvement Blueprint

### Phase 1: Backend Integration (Q1 2025)
- [ ] **Firebase Firestore Integration**
  - Persist user profiles to Firestore
  - Sync CRS data and onboarding status across devices
  - Implement real-time listeners for profile updates

- [ ] **Firebase Cloud Functions**
  - Server-side CRS validation
  - Scheduled Express Entry draw scraper
  - Email notification triggers

### Phase 2: Advanced Features (Q2 2025)
- [ ] **AI Document OCR (Optical Character Recognition)**
  - Extract data from passport scans
  - Auto-populate profile from IELTS result PDFs
  - Verify document authenticity

- [ ] **Real-time Express Entry Draws**
  - Scrape IRCC draw data
  - Push notifications for new draws
  - Historical draw comparison charts

- [ ] **PDF Report Generation**
  - Export CRS breakdown as PDF
  - Generate personalized "PR Roadmap" document
  - Include recommendations and action items

### Phase 3: Monetization & Scale (Q3 2025)
- [ ] **Premium Tier Features**
  - Priority document review queue
  - Direct RCIC consultation booking
  - Advanced pathway simulations

- [ ] **Consultant Portal**
  - Multi-client management dashboard
  - Case tracking and notes
  - Bulk CRS calculations

---

## 🔌 API Integration - Remaining Work

### Required API Integrations

| API | Purpose | Priority | Status |
|-----|---------|----------|--------|
| **IRCC Express Entry Draws** | Real-time draw cutoffs and trends | High | Not Started |
| **Job Bank Canada** | Live LMIA-approved job listings | High | Not Started |
| **NOC 2021 Database** | Accurate occupation classification lookups | Medium | Partial (Static) |
| **WES/IQAS** | Education credential verification status | Medium | Not Started |
| **IELTS/CELPIP APIs** | Direct language score imports | Low | Not Started |

### Internal API Structure (To Build)

```
/api
├── /auth
│   ├── POST /login          # Firebase token exchange
│   └── POST /logout         # Session cleanup
├── /profile
│   ├── GET /me              # Get current user profile
│   ├── PUT /me              # Update profile
│   └── POST /calculate-crs  # Server-side CRS calculation
├── /draws
│   ├── GET /latest          # Latest Express Entry draw
│   └── GET /history         # Historical draw data
├── /jobs
│   ├── GET /search          # Search LMIA jobs
│   └── POST /save           # Save job to favorites
└── /documents
    ├── POST /upload         # Upload document
    ├── GET /list            # Get user's documents
    └── DELETE /:id          # Remove document
```

---

## 📱 Mobile App Considerations

### Future Mobile Strategy
- **React Native Migration**: Reuse core logic and Zustand stores
- **Push Notifications**: Alert on draw updates and application status changes
- **Offline Mode**: Cache profile data for offline CRS calculations
- **Biometric Auth**: Face ID / Fingerprint for secure login

---

## 🔐 Security Enhancements

### Pending Security Tasks
- [ ] Implement rate limiting on API endpoints
- [ ] Add CAPTCHA to public forms (assessment, contact)
- [ ] Set up Firebase App Check for request validation
- [ ] Enable 2FA for consultant accounts
- [ ] Audit and secure Firestore rules for production

---

## 🧪 Testing Coverage

### Current State
| Type | Coverage | Notes |
|------|----------|-------|
| Unit Tests | 0% | Not implemented |
| Integration Tests | 0% | Not implemented |
| E2E Tests | 0% | Not implemented |

### Planned Testing Strategy
- **Vitest** for unit tests (Zod schemas, CRS calculations)
- **Testing Library** for component tests
- **Playwright** for end-to-end browser testing
- **Target Coverage**: 80%+ on core engine (`src/lib/schema/`)

---

## 📊 Analytics & Monitoring

### To Implement
- [ ] Google Analytics 4 integration
- [ ] Firebase Crashlytics for error tracking
- [ ] Custom event tracking (wizard completion, CRS calculations)
- [ ] User journey funnel analysis
- [ ] Performance monitoring (Core Web Vitals)

---

## 🎨 UI/UX Improvements

### Backlog
- [ ] Add animated transitions between wizard steps
- [ ] Implement skeleton loaders for dashboard cards
- [ ] Create onboarding tour for first-time users
- [ ] Add confetti animation on successful ITA simulation
- [ ] Improve mobile responsiveness for complex tables
- [ ] Add dark/light theme toggle (currently dark only)

---

## 📝 Content & Localization

### Language Support (Future)
- [ ] French (Canadian official language)
- [ ] Hindi (Major user demographic)
- [ ] Mandarin (Major user demographic)
- [ ] Punjabi (Major user demographic)

### Content Additions
- [ ] Blog section with immigration tips
- [ ] Video tutorials for form completion
- [ ] Glossary of immigration terms
- [ ] FAQ expansion with AI-generated answers

---

## 🏷️ Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Dec 25, 2025 | Initial release with public pages |
| 1.1.0 | Dec 30, 2025 | Added Core Engine, Wizard, Dashboard sub-pages |

---

*This roadmap is a living document and will be updated as priorities shift.*
