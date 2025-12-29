# CanadaPath AI - Core Engine & Dashboard Release

**Deployment URL:** [https://canadapath-ai.web.app](https://canadapath-ai.web.app)

## Major Updates (v1.1.0)

### 1. Immigration Core Engine
- **Zod-Validated Schema:** Strictly typed immigration profiles for accurate data processing.
- **CRS Calculation Logic:** Fully implemented Comprehensive Ranking System formula (Age, Education, Language, Experience, Spouse, PNP).
- **Recommendation Engine:** Dynamic insight generation based on profile gaps.

### 2. Eligibility & Onboarding
- **Multi-Step Wizard:** A 5-step guided flow with a live CRS score preview.
- **Persistence:** Onboarding progress and profile data saved in Zustand (with Firestore backup placeholders).

### 3. Integrated User Dashboard
- **Application Tracker:** Visual roadmap of the immigration process.
- **Sub-pages:**
    - **My Profile:** View and edit personal immigration data.
    - **Document Vault:** Checklist and management for required IRCC docs.
    - **Job Matcher:** LMIA job search with profile alignment scoring.
    - **Settings:** Account preferences and data reset functionality.

### 4. Technical Infrastructure
- **Firebase Auth:** Google Sign-In fully integrated for dashboard protection.
- **Firebase Hosting:** High-performance global deployment.
- **Persistence Layer:** Zustand state management for a seamless "App-like" experience.

---
*Release Date: December 30, 2025*
