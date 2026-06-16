# Netflix Clone — Next.js 14 App Router

A production-ready Netflix clone built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Fix: PAP-393 — Vercel Build Export/Import Mismatches

This PR fixes the Vercel build failure caused by export/import mismatches introduced in PAP-392.

### Root Cause

PAP-392 refactored `Footer` and `MovieCard` to named exports (`export function Footer()`, `export function MovieCard()`) while consumer pages still used default imports (`import Footer from ...`, `import MovieCard from ...`).

### Fix Applied

All components now export **both** named and default exports for maximum compatibility:

```ts
// Named export (primary)
export function Footer() { ... }
export function MovieCard() { ... }
export function Header() { ... }
export function MovieRow() { ... }

// Default export (re-export for legacy compatibility)
export default Footer;
export default MovieCard;
```

All consumer pages updated to use **named imports** consistently:

```ts
import { Footer } from '@/components/Footer';
import { MovieCard } from '@/components/MovieCard';
import { Header } from '@/components/Header';
import { MovieRow } from '@/components/MovieRow';
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with sign-up CTA |
| `/browse` | Main browse page with hero banner and movie rows |
| `/movies` | All movies grid with genre filter |
| `/tv-shows` | All TV shows grid with genre filter |
| `/search` | Search page |
| `/title/[id]` | Individual title detail page |
| `/my-list` | User's saved list |

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Images**: Next.js Image component with picsum.photos

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Global styles
│   ├── browse/page.tsx     # Browse page
│   ├── movies/page.tsx     # Movies page
│   ├── tv-shows/page.tsx   # TV Shows page
│   ├── search/page.tsx     # Search page
│   ├── title/[id]/page.tsx # Title detail page
│   └── my-list/page.tsx    # My List page
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Site footer
│   ├── HeroBanner.tsx      # Hero banner component
│   ├── MovieCard.tsx       # Individual movie card
│   ├── MovieRow.tsx        # Horizontal scrollable row
│   ├── GenreTag.tsx        # Genre filter tag
│   └── RatingBadge.tsx     # Match score badge
├── lib/
│   ├── utils.ts            # Utility functions
│   └── data.ts             # Mock data
└── types/
    └── index.ts            # TypeScript types
```

## Branch

`pap-393-feature`

## Commit

`feat(pap-393): fix Vercel build export/import mismatches`
