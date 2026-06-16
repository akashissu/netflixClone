# Spotify Clone — Music Streaming UI

A full-featured Spotify-style music streaming application built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## 🎵 Features

- **Home Page** — Hero section, featured playlists, popular artists, new releases, trending tracks
- **Browse Page** — Charts, new releases, genre categories
- **Search Page** — Real-time search with results for tracks, artists, albums, and playlists
- **Playlist Detail** — Full tracklist with play controls, recommended tracks
- **Artist Profile** — Bio, top tracks, discography, related artists

## 🧩 Components

- **Sidebar** — Desktop navigation with library playlists
- **PlayerBar** — Fixed bottom player with controls, progress bar, volume
- **MobileNav** — Bottom navigation for mobile devices
- **PlaylistCard** — Playlist grid card with hover play button
- **TrackRow** — Track list row with play/pause, duration, album link
- **ArtistCard** — Artist grid card with monthly listeners
- **AlbumCard** — Album grid card with release year
- **SearchBar** — Debounced search input with clear button
- **Header** — Navigation arrows and user actions
- **Footer** — Links, social icons, legal info

## 🛠 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript** — strict mode
- **Tailwind CSS** — all styling
- **React 18** — hooks throughout

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx              # Home
│   ├── browse/page.tsx       # Browse
│   ├── search/page.tsx       # Search
│   ├── playlist/[id]/page.tsx
│   └── artist/[id]/page.tsx
├── components/
│   ├── Sidebar.tsx
│   ├── PlayerBar.tsx
│   ├── MobileNav.tsx
│   ├── PlaylistCard.tsx
│   ├── TrackRow.tsx
│   ├── ArtistCard.tsx
│   ├── AlbumCard.tsx
│   ├── SearchBar.tsx
│   ├── Header.tsx
│   └── Footer.tsx
├── lib/
│   └── utils.ts              # Helpers + sample data
├── types/
│   └── index.ts              # All TypeScript types
└── README.md
```

## 🎨 Design

Faithfully recreates the Spotify dark theme:
- Background: `#121212`
- Cards: `#282828`
- Accent: `#1DB954` (Spotify Green)
- Text: `#FFFFFF` / `#B3B3B3`

## 📝 Notes

- All data is static/mock — no real Spotify API calls
- Images sourced from `picsum.photos` (placeholder)
- Player controls are UI-only (no actual audio playback)
- Fully responsive: mobile, tablet, desktop
