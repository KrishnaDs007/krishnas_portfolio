# 🚀 Krishna Devashish - Premium Portfolio

A state-of-the-art, high-performance portfolio website designed for a **Senior Frontend Engineer**. Built with a focus on modern aesthetics, accessibility, and seamless user experience using **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**.

![Portfolio Overview](public/assets/hero-mockup.png) *(Note: Add your actual mockup here later)*

---

## ✨ Features & Highlights

### 🎨 Modern UI/UX
- **Aesthetic Excellence**: Premium design using backdrop blurs, glassmorphism, and subtle micro-animations.
- **Theme Intelligence**: Automatically respects system theme preferences (Dark/Light) with a persistent manual override toggle.
- **Scroll-Spy Interaction**: Smooth navigation with an active section tracker.

### 🏠 Hero & Technical expertise
- **Expertise Tags**: Technical skills (React, TS, Node.js, etc.) presented as modern, interactive tags with Lucide icons.
- **Premium Animations**: Staggered fade-in effects for a high-end initial load experience.

### 📂 Projects & Gallery
- **Dynamic Content**: High-quality project visuals powered by Unsplash.
- **Smart Filtering**: Seamlessly filter projects by category (Web Apps, Mobile, Backend).
- **Pro Modal Gallery**: 
  - Fixed-height modal to prevent layout jumping.
  - Directional slide transitions and video support.
  - Detailed project breakdowns and tech stack badges.

### 💬 Directional Testimonials
- **Fluid Carousel**: Directional "Slide-in" animations (Left-to-Right/Right-to-Left) for an intuitive navigation feel.
- **Adaptive Centering**: Perfectly centers single testimonials on smaller screens for balanced layouts.

### 📩 Full-Stack Contact System (Resend)
- **Server Actions**: Secure server-side email processing using **Resend**.
- **Formatted Templates**: Professional, React-rendered HTML emails using **React Email**.
- **Real-time Feedback**: Interactive form with loading spinners and success/error alerts.
- **Instant Connect**: Integration for WhatsApp and direct calling.

---

## 🛠️ Tech Stack & Architecture

### Core
- **Next.js 16 (App Router)**: Leveraging Server Components and Server Actions.
- **TypeScript**: Strict typing for robust code and better developer experience.
- **Tailwind CSS v4**: Next-generation utility classes with modern CSS-first configuration.

### Email & Communication
- **Resend**: Email delivery for developers.
- **React Email**: Building and rendering professional email templates.

### UI & Animation
- **shadcn/ui**: High-quality, accessible base components.
- **Lucide React**: Consistent and lightweight iconography.
- **Intersection Observer**: Powering scroll-spy and scroll-triggered animations.

---

## 📂 Project Structure

```bash
krishna_portfolio/
├── app/                  # Next.js App Router
│   ├── actions/         # Server Actions (Email, etc.)
│   ├── globals.css      # Core styles & Tailwind v4 config
│   └── page.tsx         # Main Portfolio Page
├── components/           # React Components
│   ├── sections/        # Page sections (Hero, About, Projects, etc.)
│   ├── ui/              # Base UI components
│   └── email-template.tsx # React Email Template
├── lib/                  # Constants, Utils, and Data
└── public/               # Static assets & images
```

---

## ⚙️ Development & Setup

### Prerequisites
- Node.js 18.17+
- A [Resend](https://resend.com) Account & API Key

### Quick Start
1. **Clone & Install**
   ```bash
   git clone https://github.com/KrishnaDs007/krishna_portfolio.git
   cd krishna_portfolio
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the root and add your Resend API key:
   ```env
   RESEND_API_KEY=your_resend_api_key_here
   ```

3. **Run Dev Server**
   ```bash
   npm run dev
   ```

---

## 📐 Design Philosophy

1. **Performance First**: 
   - Image optimization using `next/image`.
   - Minimal client-side JavaScript via Server Components.
   - Built for speed and high Lighthouse scores.

2. **Accessibility (a11y)**:
   - High contrast ratios for readability.
   - Semantic HTML and ARIA labels where appropriate.
   - Fully keyboard-navigable interface.

---

## 📄 License

This project is [MIT](LICENSE) licensed. Created by Krishna Devashish.
