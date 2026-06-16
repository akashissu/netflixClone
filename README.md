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
