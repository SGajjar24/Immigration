# CanadaPath AI - Documentation Map

Welcome to the CanadaPath AI codebase. This map provides clear directions to all project documentation and core modules.

## 📖 Key Documentation
- **[README.md](./README.md)**: High-level overview, quick start, and system architecture.
- **[ROADMAP.md](./ROADMAP.md)**: Open bugs, future improvements, API integration backlog, and version history.
- **[TECHNICAL_SPEC.md](./docs/TECHNICAL_SPEC.md)**: Deep dive into the Immigration Engine, State Management (Zustand), and Component structure.
- **[USER_MANUAL.md](./docs/USER_MANUAL.md)**: Official guide for end-users on how to use the Dashboard, Wizard, and Tools.
- **[DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md)**: Latest release notes and live hosting details.

## 🏗️ Core Logic Directories
- **Immigration Engine**: `src/lib/schema/immigrationProfile.ts` (Calculations & Validation)
- **User State**: `src/store/useImmigrationStore.ts` (Zustand hooks)
- **Eligibility Wizard**: `src/components/onboarding/EligibilityWizard.tsx` (Multi-step logic)
- **Dashboard Pages**: `src/pages/dashboard/` (Profile, Docs, Jobs, Settings)

## 🛠️ Operational Commands
- **Run Locally**: `npm run dev`
- **Type Check**: `npm run build` (runs `tsc && vite build`)
- **Deploy**: `firebase deploy --only hosting`

---
*For any technical assistance, please refer to the entries above.*
