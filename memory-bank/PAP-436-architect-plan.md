# PAP-436 Architect Plan

## Objective
Restore a green production build with the smallest safe surface area. This is a compile-contract repair task, not a feature redesign.

## Stack
- Next.js 14.2.5 App Router
- React 18
- TypeScript (`strict: true`)
- Tailwind CSS
- Mixed local data sources:
  - Netflix-style title data: `lib/mockData.ts`, `lib/tmdb.ts`, `lib/data.ts`, `lib/movieData.ts`
  - Spotify-style artist/playlist data expected by `app/artist/[id]`, `app/browse`, `app/playlist/[id]`, `components/Sidebar`, `components/PlayerBar`

## What failed
Vercel stopped on missing exports from `@/lib/utils` during type-checking, but a full TypeScript pass shows the issue is broader:
1. `lib/utils.ts` only exports styling/runtime helpers, while many Spotify routes/components import datasets and formatters from it.
2. `types/index.ts` is incomplete for the current repo and does not export `Movie`, `MovieRow`, `Album`, `Artist`, `Playlist`, `Track`, `TMDBTitle`, or `TMDBResponse`.
3. Several components are out of contract with each other:
   - `CategoryRow` passes `title`/`variant` props into `MovieCard`, but `MovieCard` expects `movie`.
   - `MovieGrid` passes `movie` into `DetailModal`, but `DetailModal` expects `title`.
4. Missing dependency usage exists for `react-icons/fa` and `react-icons/fi`.
5. `DetailModal` uses `formatDate` that does not exist and calls `getImageUrl(..., 'w1280')` even though `getImageUrl` does not allow that size.

## Recommended implementation approach for Grunt

### Phase 1 — Rebuild shared contracts first
1. **Expand `types/index.ts` into a complete barrel** for both current domains.
2. Add/export the interfaces actually used by the codebase:
   - Netflix domain: `Movie`, `MovieRow`, `TMDBTitle`, `TMDBResponse`
   - Spotify domain: `Artist`, `Album`, `Playlist`, `Track`, `Category`
3. Keep existing `Title` exports intact so already-working pages (`/`, `/movies`, `/tv-shows`, `/search`, `/title/[id]`, `/my-list`) remain stable.

### Phase 2 — Separate data from generic utilities without forcing a large import rewrite
1. Introduce a dedicated Spotify mock-data module, e.g. `lib/spotifyData.ts`, containing:
   - `SAMPLE_ARTISTS`
   - `SAMPLE_ALBUMS`
   - `SAMPLE_PLAYLISTS`
   - `SAMPLE_TRACKS`
   - `SAMPLE_CATEGORIES`
2. Add generic formatter helpers in a small shared module or directly in `lib/utils.ts`:
   - `formatNumber`
   - `formatDuration`
   - `formatDate`
3. For lowest-risk rollout, **re-export** these symbols from `lib/utils.ts` so existing imports keep compiling, then optionally tighten imports later.

### Phase 3 — Fix the Spotify route/component build blockers
Target files:
- `app/artist/[id]/page.tsx`
- `app/browse/page.tsx`
- `app/playlist/[id]/page.tsx`
- `components/ArtistCard.tsx`
- `components/TrackRow.tsx`
- `components/Sidebar.tsx`
- `components/PlayerBar.tsx`

Implementation intent:
1. Point each file at the restored exports.
2. Ensure the restored dataset shapes match actual field usage:
   - Artist: `id`, `name`, `imageUrl`, `verified`, `monthlyListeners`, `topTracks`, `bio`, `genres`
   - Album: `id`, `artistId`, `artist`, `title`, `coverUrl`, `releaseYear`
   - Playlist: `id`, `name`, `description`, `owner`, `coverUrl`, `followers`, `tracks`
   - Track: `id`, `title`, `artist`, `artistId`, `album`, `albumId`, `coverUrl`, `duration`, `explicit`
   - Category: `id`, `name`, `color`, `imageUrl`
3. Keep route behavior as-is; this ticket is about restoring compile-time compatibility, not redesigning UX.

### Phase 4 — Fix latent TypeScript blockers exposed after Phase 3
Target files:
- `components/CategoryRow.tsx`
- `components/MovieCard.tsx`
- `components/MovieGrid.tsx`
- `components/DetailModal.tsx`
- `components/MyListButton.tsx`
- `lib/tmdb.ts`

Concrete fixes:
1. Align `CategoryRow` ↔ `MovieCard` props.
   - Either adapt `CategoryRow` to pass a `movie` prop of the correct type,
   - or add a separate TMDB-aware card component if needed.
   - Minimal-risk preference: adapt to existing `MovieCard` contract only if data shapes are compatible; otherwise isolate with a new TMDB card.
2. Align `MovieGrid` ↔ `DetailModal` props.
   - Either make `DetailModal` accept the current `Movie` shape,
   - or transform `Movie` into the `TMDBTitle`-like shape it expects.
3. Add `formatDate` and either:
   - widen `getImageUrl` to accept `'w1280'`, or
   - switch the callsite to an allowed size.
4. Resolve `noImplicitAny` fallout in `lib/tmdb.ts` and any map/filter callbacks once real types exist.
5. Handle icon imports:
   - preferred quick fix: add `react-icons` to dependencies,
   - alternative: replace those two usages with inline SVGs if dependency churn is undesirable.

### Phase 5 — Validation
Run in order:
1. `npx tsc --noEmit`
2. `npm run build`

Success criteria:
- zero TS2305/TS2307 contract errors
- no implicit-any errors from repaired files
- production build completes locally and on Vercel

## Pages / components / APIs affected
### Pages
- `/artist/[id]`
- `/browse`
- `/playlist/[id]`
- Potentially shared Netflix pages indirectly through repaired type contracts

### Components
- `ArtistCard`, `TrackRow`, `Sidebar`, `PlayerBar`
- `MovieCard`, `MovieGrid`, `CategoryRow`, `DetailModal`, `MyListButton`

### APIs / data layers
- No external API contract changes required.
- Internal contract repair required for:
  - `@/types`
  - `@/lib/utils`
  - Spotify mock data module
  - `lib/tmdb.ts` typed wrapper

## Suggested execution order for Grunt
1. Rebuild `types/index.ts`
2. Create/restore Spotify data exports + formatter exports
3. Re-run `npx tsc --noEmit`
4. Fix remaining prop mismatches and missing dependency/import issues
5. Run `npm run build`
6. Hand off clean build/test notes to Pedant/Scribe

## Notes for the next role
- Do **not** scope-creep into visual refactors.
- Preserve both domains unless the repo clearly intends one to replace the other; the ticket only requires build restoration.
- Vercel’s first failure is `SAMPLE_ARTISTS` from `@/lib/utils`, but local TS check shows many additional blockers that should be fixed in the same implementation pass.
