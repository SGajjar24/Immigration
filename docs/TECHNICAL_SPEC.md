# CanadaPath AI - Technical Specification

## Document Information
| Field | Value |
|-------|-------|
| Version | 1.0.0 |
| Last Updated | December 2025 |
| Status | Production |

---

## 1. Technology Stack

### Frontend Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.0.0 | UI Framework |
| TypeScript | 5.7.2 | Type Safety |
| Vite | 7.0.7 | Build Tool |
| Tailwind CSS | 4.0.0 | Styling |
| Framer Motion | 11.x | Animations |
| Lucide React | - | Icons |

### Build & Deployment
| Tool | Purpose |
|------|---------|
| Vite | Development server & bundling |
| TypeScript Compiler (tsc) | Type checking |
| Netlify | Hosting & CDN |

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
│                    APPLICATION LAYER                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐     │
│  │ Navigation  │  │  State Mgmt │  │  Event Handlers │     │
│  │ (useState)  │  │  (useState) │  │  (onClick, etc) │     │
│  └─────────────┘  └─────────────┘  └─────────────────┘     │
├─────────────────────────────────────────────────────────────┤
│                    DATA LAYER                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Static Data & Constants                 │    │
│  │  • Province Data (ALL_PROVINCES)                     │    │
│  │  • Immigration KB (IMMIGRATION_KB)                   │    │
│  │  • Time Slots, Team Members, Stats                   │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Component Hierarchy
```
App.tsx
├── Navbar.tsx
├── [Home Page]
│   ├── Hero.tsx
│   ├── QuickTools.tsx
│   ├── FeaturesSection.tsx
│   ├── CanadaMap.tsx
│   ├── TestimonialsSection.tsx
│   └── ConsultationBooking.tsx
├── [Assessment Page]
│   └── AssessmentWizard.tsx
├── [Calculator Page]
│   └── CRSCalculator.tsx
├── [Express Entry]
│   └── ExpressEntryHub.tsx
├── [Pathway Explorer]
│   └── PathwayExplorer.tsx
├── [About/Contact]
│   └── AboutContact.tsx
├── ChatWidget.tsx (Global)
└── ErrorBoundary.tsx (Wrapper)
```

---

## 3. Component Specifications

### Core Components

#### CanadaMap.tsx
| Property | Type | Description |
|----------|------|-------------|
| onNavigate | (page: string) => void | Navigation callback |

**State:**
- `selectedId: string | null` - Currently selected province
- `zoom: number` - Map zoom level (1-2)
- `filters: FilterState` - Active filters

**Data Structure:**
```typescript
interface ProvinceData {
  id: string;
  code: string;
  name: string;
  matchRate: number;
  crsCutoff: number;
  invites: number;
  streams: Stream[];
  highlight: string;
}
```

#### ChatWidget.tsx
| Property | Type | Description |
|----------|------|-------------|
| - | - | No props (self-contained) |

**Features:**
- Keyword-based response matching
- Immigration knowledge base
- Quick prompts
- Message history

#### ConsultationBooking.tsx
**State:**
- `step: 'select' | 'confirm'` - Current step
- `weekOffset: number` - Week navigation
- `selectedDate: Date | null` - Selected date
- `selectedTime: string | null` - Selected time slot

---

## 4. Data Structures

### Province Data (13 provinces/territories)
```typescript
const ALL_PROVINCES: Record<string, ProvinceData> = {
  on: { /* Ontario */ },
  bc: { /* British Columbia */ },
  ab: { /* Alberta */ },
  // ... 10 more
};
```

### Immigration Knowledge Base
```typescript
const IMMIGRATION_KB = {
  expressEntry: { /* Express Entry info */ },
  pnp: { /* Provincial Nominee Programs */ },
  scores: { /* CRS Score info */ },
  documents: { /* Document requirements */ },
  // ...
};
```

---

## 5. Styling System

### Design Tokens (Tailwind CSS v4)
```css
@theme {
  --color-primary: #1f3b61;
  --color-primary-light: #2d5283;
  --color-primary-dark: #0f172a;
  --color-maple-red: #dc2626;
  --color-maple-dark: #b91c1c;
  --color-accent-gold: #fbbf24;
  --color-background-dark: #0b1120;
  --font-display: "Plus Jakarta Sans", sans-serif;
  --font-body: "Inter", sans-serif;
}
```

### Glassmorphism Pattern
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}
```

---

## 6. Performance Specifications

### Bundle Analysis
| Asset | Size | Gzipped |
|-------|------|---------|
| JavaScript | ~498 KB | ~146 KB |
| CSS | ~156 KB | ~20 KB |
| HTML | ~3.5 KB | ~1.2 KB |

### Loading Targets
| Metric | Target | Method |
|--------|--------|--------|
| First Contentful Paint | < 1.5s | CSS optimization |
| Largest Contentful Paint | < 2.5s | Image lazy loading |
| Time to Interactive | < 3.5s | Code splitting |
| Cumulative Layout Shift | < 0.1 | Fixed dimensions |

### Image Strategy
- External CDN: Unsplash (images.unsplash.com)
- Auto-format: `?auto=format&fit=crop`
- Quality optimization: `?q=80`
- Responsive sizing: `&w=600` (or appropriate)

---

## 7. SEO Implementation

### Meta Tags
```html
<title>CanadaPath AI | AI-Powered Immigration</title>
<meta name="description" content="...">
<meta name="keywords" content="...">
```

### Open Graph
```html
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
```

### Structured Data
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CanadaPath AI",
  "url": "https://canadapath-ai.netlify.app"
}
```

---

## 8. Error Handling

### ErrorBoundary Component
Wraps entire application to catch React errors.

**Fallback UI:**
- Error message display
- Retry button
- Home navigation
- Stack trace (development only)

### Form Validation
- Client-side validation
- Required field indicators
- Real-time feedback
- Submit button disabled states

---

## 9. Browser Support

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

### Required Features
- ES2020+ (async/await, optional chaining)
- CSS Grid & Flexbox
- CSS Custom Properties
- Backdrop Filter (glassmorphism)

---

## 10. Deployment

### Netlify Configuration
```
# _redirects
/*  /index.html  200
```

### Build Command
```bash
npm run build
# Output: dist/
```

### Environment Variables
Currently none required (static frontend).

---

## 11. Future Considerations

### Planned Enhancements
- [ ] Backend API integration
- [ ] User authentication (Login)
- [ ] Profile persistence
- [ ] Real-time draw data
- [ ] Document upload system
- [ ] Payment integration

### Scalability
- Component-based architecture allows easy extension
- Feature-based folder structure for new modules
- TypeScript ensures type safety for larger codebase

---

*Document generated for CanadaPath AI v1.0.0*
