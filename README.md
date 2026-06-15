# Netflix Clone

A Netflix-style streaming UI built with Next.js 14 App Router, TypeScript, and Tailwind CSS.

## Features

- 🎬 Hero banner with featured title
- 📺 Horizontally scrollable category rows
- 🔍 Real-time search with debouncing
- 🎥 YouTube trailer playback in detail modal
- 📋 Personal "My List" with localStorage persistence
- 📱 Fully responsive design
- 🌙 Dark Netflix-style theme

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and add your TMDB API key:

```bash
cp .env.example .env.local
```

Get a free API key at [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

**Note:** The app works without an API key using static seed data.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
npm start
```

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Data:** TMDB API with static fallback
- **Icons:** React Icons

## Routes

- `/` — Home page with hero and category rows
- `/search` — Real-time search
- `/title/[id]` — Detail modal with trailer
- `/my-list` — Saved titles
