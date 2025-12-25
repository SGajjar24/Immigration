# CanadaPath AI 🍁

<div align="center">
  <img src="public/favicon.svg" alt="CanadaPath AI Logo" width="80"/>
  
  **AI-Powered Canadian Immigration Guidance Platform**
  
  [![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://canadapath-ai.netlify.app)
  [![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
</div>

---

## 🌟 Overview

CanadaPath AI is an enterprise-grade web application that provides AI-powered immigration guidance for applicants seeking Canadian permanent residency. The platform offers real-time eligibility assessments, CRS score calculations, provincial pathway exploration, and intelligent chatbot assistance.

### ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🎯 **Eligibility Assessment** | Multi-step wizard to evaluate immigration eligibility |
| 🧮 **CRS Calculator** | Real-time Comprehensive Ranking System score calculation |
| 🗺️ **Interactive Canada Map** | Explore all 13 provinces/territories with filtering |
| 🤖 **AI Chat Assistant** | Intelligent chatbot with immigration knowledge base |
| 📅 **Consultation Booking** | Schedule 1-on-1 sessions with immigration experts |
| 📊 **Express Entry Hub** | Dashboard for Express Entry pool management |
| 🛤️ **Pathway Explorer** | Visual flowchart for immigration pathways |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    React 19 + Vite 7                     │    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────┐   │    │
│  │  │  Hero   │ │  Map    │ │  Forms  │ │  ChatWidget │   │    │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────────┤
│                        STATE LAYER                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐     │
│  │ React State │  │ URL Routing │  │ Local Storage Cache │     │
│  └─────────────┘  └─────────────┘  └─────────────────────┘     │
├─────────────────────────────────────────────────────────────────┤
│                        UI FRAMEWORK                              │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              Tailwind CSS v4 + Framer Motion             │    │
│  │         Glassmorphism | Animations | Responsive          │    │
│  └─────────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────────┤
│                        DEPLOYMENT                                │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                     Netlify CDN                          │    │
│  │              HTTPS | Edge Caching | CI/CD                │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
canadapath-ai/
├── public/
│   ├── favicon.svg          # Brand logo
│   └── _redirects            # Netlify SPA routing
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── CanadaMap.tsx     # Interactive map with filters
│   │   ├── ChatWidget.tsx    # AI chatbot assistant
│   │   ├── ConsultationBooking.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── Hero.tsx          # Landing hero section
│   │   ├── PathwayExplorer.tsx
│   │   ├── QuickTools.tsx
│   │   └── TestimonialsSection.tsx
│   ├── features/
│   │   ├── Assessment/       # Assessment wizard & CRS calc
│   │   └── ExpressEntry/     # Express Entry dashboard
│   ├── layouts/
│   │   └── Navbar.tsx        # Global navigation
│   ├── pages/
│   │   ├── AboutContact.tsx  # About/Contact combined
│   │   ├── AssessmentPage.tsx
│   │   └── CalculatorPage.tsx
│   ├── utils/
│   │   └── cn.ts             # Class name utility
│   ├── App.tsx               # Main application
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── index.html                # HTML template with SEO
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ 
- **npm** v9+

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

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

---

## 🎨 Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#1f3b61` | Primary actions, links |
| `maple-red` | `#dc2626` | CTA buttons, accents |
| `accent-gold` | `#fbbf24` | Highlights, badges |
| `background-dark` | `#0b1120` | Page background |

### Typography

- **Display Font:** Plus Jakarta Sans
- **Body Font:** Inter

### Components

All components follow a glassmorphism design pattern with:
- Semi-transparent backgrounds (`bg-white/5`)
- Subtle borders (`border-white/10`)
- Backdrop blur effects
- Smooth hover transitions

---

## 📊 Performance Optimizations

| Optimization | Implementation |
|--------------|----------------|
| **Code Splitting** | Vite automatic chunking |
| **CSS Optimization** | Tailwind v4 atomic CSS |
| **Image Loading** | External CDN (Unsplash) with auto-format |
| **Tree Shaking** | Unused code elimination |
| **Minification** | Terser for JS, Lightning CSS |

### Lighthouse Scores (Target)

- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 100
- **SEO:** 100

---

## 🤖 AI Chatbot Features

The chatbot uses an internal knowledge base covering:

- Express Entry eligibility
- Provincial Nominee Programs (PNP)
- CRS score improvement tips
- Document requirements
- Processing times
- Language test requirements (IELTS/CELPIP/TEF)

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 👥 Contributors

- **CanadaPath AI Team**

---

<div align="center">
  <sub>Built with ❤️ for aspiring Canadian immigrants</sub>
</div>
