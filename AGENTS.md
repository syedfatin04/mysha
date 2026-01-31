## Project Summary
MYSHA TRANSPORT is a premium corporate logistics and transportation website for a Dubai-based company. It focuses on a cinematic, motion-driven experience that reflects the scale, trust, and professionalism of their operations across the UAE and GCC.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Components:** Radix UI / Shadcn UI
- **Language:** TypeScript

## Architecture
- `src/app/`: Multi-page routing (Home, About, Services, Fleet, Clients, Contact)
- `src/components/`: Reusable UI components and layout elements (Navbar, Footer, Motion wrappers)
- `src/lib/`: Utility functions and animation variants
- `public/`: Assets (images of trucks, logistics icons, etc.)

## User Preferences
- **Theme:** Corporate (Deep Blue, White, Silver)
- **Vibe:** Industrial, Smooth, Confident, Premium, Expensive
- **Animations:** Mandatory global motion (scroll, hover, cursor, transitions)
- **Layout:** Multi-page website (strictly NOT one-page)

## Project Guidelines
- Use named exports for components.
- Minimize `use client` by wrapping interactive parts.
- Ensure all sections have scroll reveals and motion depth.
- Follow a strong typographic hierarchy with bold sans-serif fonts.

## Common Patterns
- **Page Transitions:** Blue to white cinematic wipes.
- **Scroll Reveals:** Staggered text and element entrance.
- **Hover Effects:** Magnetic buttons, micro-interactions on cards.
