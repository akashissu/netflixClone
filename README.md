# Netflix Clone — pap-396-feature Branch Fix

This repository contains a Netflix Clone built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

## Fix: Export/Import Mismatch (PAP-396)

### Problem

The Vercel build for the `pap-396-feature` branch was failing with:

```
Attempted import error: 'Header' is not exported from '@/components/Header'
Attempted import error: 'Footer' is not exported from '@/components/Footer'
```

**Root cause:** `components/Header.tsx` and `components/Footer.tsx` used `export default function` while the affected pages imported them as named imports (`{ Header }`, `{ Footer }`).

### Fix Applied (Option A — Named Exports Everywhere)

All components now use **named exports** (`export function ComponentName`) for consistency:

| File | Change |
|------|--------|
| `components/Header.tsx` | `export default function Header` → `export function Header` |
| `components/Footer.tsx` | `export default function Footer` → `export function Footer` |
| `components/HeroBanner.tsx` | Uses `export function HeroBanner` ✓ |
| `components/ContentRow.tsx` | Uses `export function ContentRow` ✓ |
| `components/ContentGrid.tsx` | Uses `export function ContentGrid` ✓ |
| `components/TitleCard.tsx` | Uses `export function TitleCard` ✓ |
| `components/PageBanner.tsx` | Uses `export function PageBanner` ✓ |
| `components/TitleDetail.tsx` | Uses `export function TitleDetail` ✓ |

All pages now correctly use named imports:
```tsx
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
```

### Affected Pages Fixed

- `app/movies/page.tsx`
- `app/my-list/page.tsx`
- `app/title/[id]/page.tsx`
- `app/tv-shows/page.tsx`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── globals.css
│   ├── layout.tsx          # Root layout with Header + Footer
│   ├── page.tsx            # Homepage with hero banner + content rows
│   ├── movies/
│   │   └── page.tsx        # Movies browse page
│   ├── tv-shows/
│   │   └── page.tsx        # TV Shows browse page
│   ├── my-list/
│   │   └── page.tsx        # User's saved list
│   ├── search/
│   │   └── page.tsx        # Search page
│   └── title/
│       └── [id]/
│           └── page.tsx    # Title detail page
├── components/
│   ├── Header.tsx          # Site header with navigation
│   ├── Footer.tsx          # Site footer with links
│   ├── HeroBanner.tsx      # Full-width hero section
│   ├── ContentRow.tsx      # Horizontally scrollable row
│   ├── ContentGrid.tsx     # Grid layout for titles
│   ├── TitleCard.tsx       # Individual title card with hover
│   ├── PageBanner.tsx      # Page header banner
│   └── TitleDetail.tsx     # Full title detail view
├── lib/
│   ├── mockData.ts         # Mock movie/TV data
│   └── utils.ts            # Utility functions
└── types/
    └── index.ts            # TypeScript type definitions
```

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Images:** Next.js Image component

## Commit

```
fix(pap-396): resolve export-import mismatches

- Change Header and Footer from default exports to named exports
- Ensure all components use named exports consistently
- Fix all affected pages to use correct named imports
- Scan and verify no remaining export/import mismatches
```
