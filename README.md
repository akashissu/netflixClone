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
