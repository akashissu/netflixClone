# Netflix Clone — Full Stack E2E (PAP-392)

A production-ready Netflix-style streaming UI built with Next.js 14 App Router, TypeScript, and Tailwind CSS.

## Features

- 🎬 **Home Page** — Hero banner with featured title + 4 category rows (Trending, Top Rated, Action, TV Shows)
- 🔍 **Search** — Live search with debounced input and grid results
- 📄 **Title Detail** — Full detail page with modal-style layout, video player, and similar titles
- 📋 **My List** — Persistent watchlist using localStorage
- 🎭 **TMDB Integration** — Real movie/TV data with seed fallback
- 📱 **Responsive** — Mobile-first design
- ⚡ **Performance** — Server components, image optimization, streaming

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data**: TMDB API + JSON seed fallback
- **State**: React hooks + localStorage

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your TMDB API key:

```
TMDB_API_KEY=your_actual_api_key
NEXT_PUBLIC_TMDB_API_KEY=your_actual_api_key
```

Get a free API key at [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

> **Note**: Without an API key, the app uses `data/seed.json` as fallback data automatically.

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with Navbar + Footer
│   ├── page.tsx            # Home page
│   ├── not-found.tsx       # 404 page
│   ├── search/
│   │   └── page.tsx        # Search page
│   ├── title/[id]/
│   │   └── page.tsx        # Title detail page
│   └── my-list/
│       └── page.tsx        # My List page
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── Footer.tsx          # Footer
│   ├── HeroSection.tsx     # Hero banner
│   ├── CategoryRow.tsx     # Horizontal scrollable row
│   ├── MovieCard.tsx       # Individual title card
│   ├── DetailModal.tsx     # Title detail modal/page
│   ├── SearchBar.tsx       # Search input
│   ├── VideoPlayer.tsx     # Video player component
│   └── LoadingSkeleton.tsx # Loading states
├── lib/
│   ├── tmdb.ts             # TMDB API client
│   └── utils.ts            # Utility functions
├── types/
│   └── index.ts            # TypeScript types
├── data/
│   └── seed.json           # Fallback data
└── .env.example            # Environment variables template
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home with hero + category rows |
| `/search` | Search with live results |
| `/title/[id]` | Title detail page |
| `/my-list` | Saved titles list |

## Components

| Component | Description |
|-----------|-------------|
| `Navbar` | Fixed navigation with scroll effect |
| `Footer` | Site footer with links |
| `HeroSection` | Full-width hero with backdrop image |
| `CategoryRow` | Horizontally scrollable card row |
| `MovieCard` | Hoverable title card with quick actions |
| `DetailModal` | Full detail view with play, add to list |
| `SearchBar` | Debounced search input |
| `VideoPlayer` | Custom video player with controls |
| `LoadingSkeleton` | Shimmer loading states |

## Branch & PR

- Branch: `pap-392-feature`
- Commit: `feat(pap-392): implement Netflix Clone`
- PR: Opens to `main`

## Acceptance Criteria

- [x] `npm install && npm run build` succeeds
- [x] 4 routes: `/`, `/search`, `/title/[id]`, `/my-list`
- [x] 9 components: Navbar, Footer, HeroSection, CategoryRow, MovieCard, DetailModal, SearchBar, VideoPlayer, LoadingSkeleton
- [x] TMDB integration with seed fallback
- [x] Real `.tsx`/`.ts` source files
