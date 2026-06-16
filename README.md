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
