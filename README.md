# NetflixClone — PAP-394 Fix

A production-ready Netflix clone built with **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS**.

## PAP-394: Fix Missing TMDB Types for Vercel Build

This branch (`pap-394-feature`) resolves the Vercel build failure caused by missing TMDB type exports.

### Root Cause

`types/index.ts` was missing `TMDBTitle`, `TMDBResponse`, and related interfaces. Multiple files imported these non-existent types, causing TypeScript compilation to fail.

### Fix Applied

1. **`types/index.ts`** — Added complete TMDB type definitions:
   - `TMDBTitle` — unified type for both movies and TV shows
   - `TMDBResponse<T>` — generic paginated API response wrapper
   - `TMDBSearchResponse<T>` — search-specific response alias
   - `TMDBMovieDetails`, `TMDBTVDetails` — extended detail types
   - Supporting types: `TMDBGenre`, `TMDBCastMember`, `TMDBCrewMember`, `TMDBCredits`, `TMDBVideo`, etc.
   - `MovieRow` — application-level row type
   - `Movie` — deprecated alias for `TMDBTitle` (backward compat)

2. **`lib/tmdb.ts`** — Updated to import and use `TMDBTitle`, `TMDBResponse`, `TMDBSearchResponse` from `@/types`.

3. **`components/CategoryRow.tsx`** — Updated to import `TMDBTitle` and `MovieRow` from `@/types`.

4. **`components/DetailModal.tsx`** — Updated to import `TMDBTitle` from `@/types`.

5. **`components/MovieCard.tsx`** — Unified to use `TMDBTitle` (was using mixed `Movie`/`TMDBTitle` types).

### Type System Decision

We chose **Option A**: add `TMDBTitle` and related types to `types/index.ts` and use them repo-wide. The old `Movie` type is kept as a deprecated alias (`export type Movie = TMDBTitle`) to avoid breaking any remaining consumers during migration.

## Getting Started

### Prerequisites

- Node.js 18+
- A [TMDB API key](https://www.themoviedb.org/settings/api)

### Environment Variables

Create a `.env.local` file:

```env
TMDB_API_KEY=your_tmdb_api_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

### Installation

```bash
npm install
npm run build   # Must exit 0
npm run dev
```

### Build Verification

```bash
npm install && npm run build
# Expected: exit code 0, zero TypeScript errors
```

## Project Structure

```
.
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── browse/page.tsx     # Browse all
│   ├── movies/page.tsx     # Movies
│   ├── tv/page.tsx         # TV Shows
│   └── search/page.tsx     # Search
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroBanner.tsx
│   ├── CategoryRow.tsx     # Fixed: TMDBTitle import
│   ├── DetailModal.tsx     # Fixed: TMDBTitle import
│   ├── MovieCard.tsx       # Fixed: unified to TMDBTitle
│   └── SearchResults.tsx
├── lib/
│   ├── tmdb.ts             # Fixed: TMDBTitle, TMDBResponse imports
│   └── utils.ts
└── types/
    └── index.ts            # Fixed: added TMDBTitle, TMDBResponse, etc.
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **Data**: TMDB API v3
- **Deployment**: Vercel

## Commit

```
feat(pap-394): fix missing TMDB types for Vercel build
```

## Related

- Parent issue: PAP-393 (export fix merged)
- This issue: PAP-394 (type definitions)
- Repo: https://github.com/akashissu/netflixClone
