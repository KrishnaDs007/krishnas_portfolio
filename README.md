# 🚀 Krishna Devashish - Premium Portfolio

A state-of-the-art, high-performance portfolio website designed for a **Senior Frontend Engineer**. Built with a focus on modern aesthetics, accessibility, and seamless user experience using **Next.js 15**, **TypeScript**, and **Tailwind CSS v4**.

![Portfolio Overview](public/assets/hero-mockup.png) *(Note: Add your actual mockup here later)*

---

## ✨ Features & Highlights

### 🎨 Modern UI/UX
- **Glassmorphism & Aesthetics**: Premium design using backdrop blurs, subtle micro-animations, and a curated color palette (Vibrant Orange & Sleek Zinc).
- **Responsive Design**: Fully optimized for all screen sizes, from mobile-first navigation to wide-screen container constraints.
- **Theme Intelligence**: Automatically respects system theme preferences (Dark/Light) with a persistent manual override toggle.

### 🏠 Hero & Technical Expertise
- **Dynamic Tags**: Technical skills (React, TS, AWS, etc.) presented as modern, interactive tags with Lucide icons.
- **Glass-Card Hero**: Premium background effects with smooth fade-in animations.

### 📂 Advanced Projects Showcase
- **Category Filtering**: Seamlessly filter projects by type (All, Frontend, Backend, Full Stack).
- **Smooth Modal Gallery**: 
  - Fixed-height modal to prevent layout jumping.
  - Directional slide transitions for image navigation.
  - Video support and detailed project breakdowns.
- **Interactive Thumbnails**: Quick-access dots for multi-image projects.

### 👤 Detailed About & Experience
- **Tag-Based Navigation**: Modern expertise switching (Architecture, Frontend, Design Systems).
- **Chronological Timeline**: Sleek experience and education tracking with brand icons.

### 📩 Integrated Contact System
- **Multi-Channel Connection**: Direct Mail (mailto), WhatsApp integration, and Quick Call features.
- **Modern Form**: Validated contact form with beautiful focus states and success feedback.

### � Mobile-First Optimization
- **Auto-Hide Menu**: Bottom navigation that gracefully slides out of view when the footer appears to provide a clean reading experience.
- **Touch-Friendly**: Large interactive targets and smooth touch-swipe feel.

---

## 🛠️ Tech Stack & Architecture

### Core
- **Next.js 15 (App Router)**: Utilizing server components and optimized routing.
- **TypeScript**: Strict typing for robust code and better developer experience.
- **Tailwind CSS v4**: Next-generation utility classes with modern CSS-first configuration.

### UI & Animation
- **shadcn/ui**: High-quality, accessible base components.
- **Lucide React**: Consistent and lightweight iconography.
- **Intersection Observer API**: Powering scroll-spy and auto-hiding navigations.

### State & Utilities
- **Next Themes**: Reliable theme switching and persistence.
- **Scroll Utils**: Custom handlers for anchor-link smooth scrolling.

---

## 📂 Project Structure

```bash
krishna_portfolio/
├── app/                  # Next.js App Router (Layouts, Pages, Global Styles)
├── components/           # React Components
│   ├── layout/          # Header, Footer, Navigation
│   ├── sections/        # Main page sections (Hero, About, Projects, etc.)
│   └── ui/              # shadcn/ui and custom reusable elements
├── hooks/                # Custom React hooks (useScrollSpy, etc.)
├── lib/                  # Constants, Utils, and Data Configurations
├── public/               # Static assets (Images, Lottie, JSON)
└── types/                # Core TypeScript definitions
```

---

## � Development & Setup

### Prerequisites
- Node.js 18.17+
- npm (standard)

### Quick Start
1. **Clone & Install**
   ```bash
   git clone https://github.com/KrishnaDs007/krishna_portfolio.git
   cd krishna_portfolio
   npm install
   ```

2. **Run Dev Server**
   ```bash
   npm run dev
   ```

3. **Build Profile**
   ```bash
   npm run build
   ```

---

## 📐 Design Philosophy & Flows

1. **User Flow**: The site follows a logical professional journey:
   - *Discovery*: Immediate value proposition in the Hero.
   - *Proof*: Detailed Projects and Skills sections.
   - *Story*: Educational and professional background.
   - *Action*: Strong CTAs in the Contact section and Footer.

2. **Performance First**: 
   - Image optimization using `next/image`.
   - Minimal client-side JavaScript by leveraging Server Components.
   - Smooth local font loading (Geist).

3. **Accessibility (a11y)**:
   - High contrast ratios for text.
   - Semantic HTML (main, section, nav, etc.).
   - Keyboard-navigable modals and buttons.

---

## 📄 License

This project is [MIT](LICENSE) licensed. Created by Krishna Devashish.
