# CareerDNA 🧬

> AI-powered career guidance platform for Indian students

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Auth**: Clerk (Google + Email sign-in, role-based redirects)
- **Styling**: Tailwind CSS + Glassmorphism design system
- **Animations**: Framer Motion
- **3D**: Three.js + @react-three/fiber (landing hero sphere)
- **Charts**: Recharts (radar, bar, area charts)
- **State**: Zustand (persisted student store)
- **Forms**: React Hook Form + Zod
- **Toasts**: React Hot Toast
- **Icons**: Lucide React
- **QR Codes**: qrcode.react

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Environment variables are pre-configured in .env.local

# 3. Start dev server
npm run dev

# 4. Open http://localhost:3000
```

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with 3D hero, features, pricing |
| `/sign-in` | Clerk sign-in (Google + email) |
| `/sign-up` | Clerk sign-up with role selection |
| `/student` | Student dashboard with DNA radar chart |
| `/student/assessment` | 15-question Career DNA assessment |
| `/student/recommendations` | AI career matches with expandable cards |
| `/student/simulations/[careerId]` | Interactive career simulations |
| `/student/passport` | Blockchain badge collection + QR share |
| `/student/mentors` | Mentor discovery and session booking |
| `/student/market` | Live job market data and salary charts |
| `/student/progress` | Journey timeline and weekly activity |
| `/mentor` | Mentor dashboard |
| `/counselor` | Counselor student management |
| `/admin` | Platform admin panel |

## Key Features

- **Career DNA Assessment**: 15 psychometric questions (scale, multiple choice, open-ended with voice input)
- **Radar Chart**: 6-dimensional personality visualization (Analytical, Creative, Technical, Communication, Leadership, Empathy)
- **Career Simulations**: Interactive decision-based scenarios for top career matches
- **Passport**: Blockchain-verified skill badges with QR sharing
- **Market Intelligence**: Real salary benchmarks and demand trend charts

## Design System

- Dark theme: `hsl(222, 47%, 4%)` base
- Glassmorphism: `backdrop-blur-xl bg-white/5 border-white/10`
- Accent: Cyan `#00d2ff` → Blue `#3b82f6` gradients
- Secondary: Violet `#8b5cf6` → Purple `#7c3aed`
- Fonts: Syne (display) + DM Sans (body) from Google Fonts
