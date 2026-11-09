<div align="center">

<!-- ═══════════════════════════════════════════ -->
<!--           ANIMATED SVG HEADER BANNER        -->
<!-- ═══════════════════════════════════════════ -->

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=🚗%20TYROOLA&fontSize=72&fontColor=FFD700&fontAlignY=38&desc=Australia%27s%20Premium%20Tyre%20E-Commerce%20Platform&descSize=20&descAlignY=62&descColor=ffffff&animation=twinkling" width="100%" />

<!-- ANIMATED TYPING EFFECT -->
<a href="https://github.com/Hashitha7/tyroola">
  <img src="https://readme-typing-svg.demolab.com?font=Orbitron&size=22&duration=3000&pause=800&color=FFD700&center=true&vCenter=true&multiline=true&width=700&height=80&lines=Buy+Tyres+Online.+Fit+Locally.+Done.;All+Brands.+All+Options.+All+Across+Australia.;🔧+Car+Repairs+%7C+🔍+Inspections+%7C+🛞+Tyres" alt="Typing SVG" />
</a>

<br/>

<!-- BADGES ROW 1 -->
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />

<br/>

<!-- BADGES ROW 2 -->
<img src="https://img.shields.io/badge/status-live-brightgreen?style=for-the-badge&logo=statuspage&logoColor=white" />
<img src="https://img.shields.io/badge/version-2.0.0-FFD700?style=for-the-badge" />
<img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" />
<img src="https://img.shields.io/badge/PRs-welcome-ff69b4?style=for-the-badge" />
<img src="https://img.shields.io/github/last-commit/Hashitha7/tyroola?style=for-the-badge&color=orange" />

</div>

---

<!-- ═══════════════════════════════════════════ -->
<!--                3D SECTION DIVIDER           -->
<!-- ═══════════════════════════════════════════ -->

<div align="center">

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║    🛞  T Y R O O L A  —  TYRE PLATFORM  v2.0                   ║
║    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                ║
║    Full-Stack • 3D UI • Real-Time Search • Multi-Step Modals    ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

</div>

---

## ✨ What is Tyroola?

> **Tyroola** is a premium, full-stack Australian tyre e-commerce platform built with React + Vite + Node.js. It features a cinematic 3D UI, smart tyre search, multi-step modals, sticky search bars, and full service booking — designed to rival the best tyre retailers in Australia.

---

<!-- ═══════════════════════════════════════════ -->
<!--              FEATURE SHOWCASE               -->
<!-- ═══════════════════════════════════════════ -->

## 🚀 Core Features

<table>
<tr>
<td width="50%">

### 🛞 Tyre Search Engine
- **Search by Tyre Size** — 3-step 3D modal
  - Width → Aspect Ratio → Rim Size
  - Animated tyre graphic with live selection
  - Load index & Speed rating filters
- **Search by Rego** — 2-step 3D modal
  - Australian State grid selector
  - Plate number input → auto lookup
- **Pinned Smart Search Bar** — appears on ALL pages on scroll, centered & fixed

</td>
<td width="50%">

### 🎨 Cinematic 3D UI
- **Hero Section** — animated car carousel (4 vehicles auto-rotate)
- **Mega Navigation** — full-width dropdown menus with blur backdrops
- **3D Card Effects** — `transform: perspective` on hover
- **Scroll Animations** — elements fade-in as they enter viewport
- **Yellow + Dark theme** — Tyroola brand identity throughout

</td>
</tr>
<tr>
<td width="50%">

### 🔧 Services Platform
- **Auto Repairs page** — Book mechanic services
- **Vehicle Inspections page** — Comprehensive inspection booking
- **Car Services page** — Full service menu
- **Deals page** — Live offer carousel with countdown badges
- **How It Works page** — 3-step animated guide

</td>
<td width="50%">

### 🛒 E-Commerce Features
- **Featured Tyres** — Brand filtered tyre grid
- **Tyre Detail page** — Full product view with specs
- **Wheels page** — Alloy & steel wheel catalog
- **Payment Badges** — Zip, PayPal, Visa, Mastercard, AMEX, Apple Pay, Google Pay, Afterpay
- **Trust Bar** — Nationwide Fitting | Price Match | 0% Afterpay | 4.7★ Reviews

</td>
</tr>
</table>

---

## 🏗️ Project Architecture

```
tyroola/
├── 📁 client/                    # React + Vite Frontend
│   ├── 📁 src/
│   │   ├── 📁 components/        # Reusable UI Components
│   │   │   ├── 🧩 Navbar.jsx           # Mega-menu navigation
│   │   │   ├── 🧩 Hero.jsx             # Animated hero + car carousel
│   │   │   ├── 🧩 PinnedSearchBar.jsx  # Sticky search bar (all pages)
│   │   │   ├── 🧩 TyreSizeModal.jsx    # 3D 3-step tyre size modal
│   │   │   ├── 🧩 RegoSearchModal.jsx  # 3D 2-step rego search modal
│   │   │   ├── 🧩 FeaturedTyres.jsx    # Brand-filtered tyre grid
│   │   │   ├── 🧩 DealsSlider.jsx      # Animated deals carousel
│   │   │   ├── 🧩 MechanicServicesSection.jsx
│   │   │   ├── 🧩 PartnerSection.jsx   # Brand logos marquee
│   │   │   ├── 🧩 Footer.jsx           # Full footer with payments
│   │   │   └── 🧩 ...more components
│   │   ├── 📁 pages/             # Route Pages
│   │   │   ├── 🗂️ Home.jsx
│   │   │   ├── 🗂️ Tyres.jsx
│   │   │   ├── 🗂️ TyreDetail.jsx
│   │   │   ├── 🗂️ Wheels.jsx
│   │   │   ├── 🗂️ AutoRepairs.jsx
│   │   │   ├── 🗂️ CarServices.jsx
│   │   │   ├── 🗂️ VehicleInspections.jsx
│   │   │   ├── 🗂️ Deals.jsx
│   │   │   ├── 🗂️ HowItWorks.jsx
│   │   │   └── 🗂️ Contact.jsx
│   │   ├── 📁 Images/            # Static assets (cars, backgrounds)
│   │   ├── 📄 App.jsx            # Router + global layout
│   │   └── 📄 index.css          # Global styles + 3D utilities
│   └── 📄 vite.config.js
│
├── 📁 server/                    # Node.js + Express Backend
│   ├── 📄 index.js               # Express server entry
│   └── 📁 routes/                # API routes
│
└── 📄 README.md
```

---

## 🎯 UI / UX Highlights

<div align="center">

| Feature | Technology | Detail |
|:-------:|:----------:|:------:|
| 🎠 Car Carousel | CSS Transitions + React state | 4 vehicles, 3.2s auto-rotate |
| 🔎 Pinned Search | `position: fixed` + scroll events | Appears at 380px (Home) / 70px (others) |
| 🪟 3D Modals | CSS `perspective` + `rotateX/Y` | Multi-step with animated tyre diagram |
| 🌟 Mega Menu | React state + CSS blur backdrop | Full-width with sub-links & CTAs |
| 💳 Payment Grid | CSS Grid 4-col | 8 payment methods with hover lift |
| 📱 Responsive | CSS Grid + Flexbox + Media Queries | Mobile-first design |
| ⚡ Build | Vite 8.3 | ~760ms production build |

</div>

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
<img src="https://skillicons.dev/icons?i=react,vite,css,js,html&theme=dark" />

### Backend
<img src="https://skillicons.dev/icons?i=nodejs,express,mongodb&theme=dark" />

### Tools & Deployment
<img src="https://skillicons.dev/icons?i=git,github,npm,vscode&theme=dark" />

</div>

---

## ⚡ Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/Hashitha7/tyroola.git
cd tyroola

# 2. Install Frontend dependencies
cd client
npm install

# 3. Install Backend dependencies
cd ../server
npm install

# 4. Start Backend (port 5000)
node index.js

# 5. Start Frontend dev server (port 3000)
cd ../client
npm run dev

# 6. Build for production
npm run build
```

---

## 🗺️ Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero + Featured Tyres + Deals + How It Works |
| `/tyres` | Tyres | Full tyre catalog with filters |
| `/tyres/:id` | Tyre Detail | Individual tyre product page |
| `/wheels` | Wheels | Alloy & steel wheel catalog |
| `/car-repairs` | Auto Repairs | Book auto repair services |
| `/inspections` | Vehicle Inspections | Book vehicle inspection |
| `/car-services` | Car Services | Full service menu |
| `/deals` | Deals | Promotional offers & discounts |
| `/how-it-works` | How It Works | 3-step guide |
| `/contact` | Contact | Contact & support |

---

## 🎨 Design System

```css
/* Tyroola Brand Colours */
--yellow:      #FFD700   /* Primary CTA & Accents */
--yellow-dark: #FFC700   /* Search bar & badges */
--black:       #0A0A0F   /* Background */
--dark:        #111118   /* Cards & sections */
--blue-cta:    #007AFF   /* Arrow icons & pills */
--white:       #FFFFFF   /* Button fills & text */

/* Typography */
--font-display: 'Orbitron'   /* Headlines & logo */
--font-body:    'Inter'      /* Body & UI text */
--font-accent:  'Rajdhani'   /* Section labels */
```

---

## 📦 Key Dependencies

```json
{
  "react": "^18.x",
  "react-router-dom": "^6.x",
  "react-icons": "^5.x",
  "vite": "^8.x",
  "express": "^4.x",
  "mongoose": "^8.x",
  "cors": "^2.x"
}
```

---

## 🌟 Recent Updates (v2.0)

```
✅ feat: 3D TyreSizeModal — 3-step animated with live tyre diagram
✅ feat: 3D RegoSearchModal — Australian state grid + plate input
✅ feat: PinnedSearchBar — sticky centered bar on ALL pages on scroll
✅ feat: AutoRepairs page — full hero + sections
✅ feat: VehicleInspections page — full hero + sections
✅ fix:  Hero search bar click fix — overflow + z-index correction
✅ fix:  Navbar sticky restore — prevents mega-menu blur bleed
✅ style: Footer payment badges — brand colors + gradient + hover lift
✅ style: Enlarged hero car images — cinematic scale upgrade
✅ remove: Animated brands marquee bar — cleaner hero layout
```

---

<div align="center">

<!-- BOTTOM WAVE -->
<!-- <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=120&section=footer&text=Built%20with%20❤️%20for%20Australia&fontSize=18&fontColor=FFD700&fontAlignY=65&animation=twinkling" width="100%" /> -->

<br/>

**⭐ Star this repo if you like it! ⭐**

<br/>

<img src="https://img.shields.io/github/stars/Hashitha7/tyroola?style=social" />
&nbsp;
<img src="https://img.shields.io/github/forks/Hashitha7/tyroola?style=social" />
&nbsp;
<img src="https://img.shields.io/github/watchers/Hashitha7/tyroola?style=social" />

<br/><br/>

*🚗 Tyroola — Buy Tyres Online. Fit Locally. Done.*

</div>
