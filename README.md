# StreamFlix - Netflix Clone

A production-ready Netflix clone built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## 🚀 Features

- **Home Page** - Hero banner with featured content + multiple movie rows
- **Movies Page** - Browse all movies with genre filtering
- **TV Shows Page** - Browse all TV shows with category filtering
- **Search Page** - Real-time search across all content
- **My List Page** - Saved movies and shows
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Hover Effects** - Netflix-style card hover with preview info
- **Smooth Scrolling** - Horizontal scroll rows with arrow navigation

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Custom SVG icon components (no external icon library dependency)
- **Images**: Next.js Image optimization

## 📦 Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx          # Home
│   ├── movies/page.tsx   # Movies
│   ├── tv-shows/page.tsx # TV Shows
│   ├── search/page.tsx   # Search
│   └── my-list/page.tsx  # My List
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroBanner.tsx
│   ├── MovieRow.tsx
│   ├── MovieCard.tsx
│   ├── RatingBadge.tsx
│   └── icons.tsx         # Custom SVG icons
├── lib/
│   ├── utils.ts
│   └── data.ts
└── types/
    └── index.ts
```

## ⚠️ Deployment Fix

The original deployment failed because `lucide-react` was imported in `app/search/page.tsx` but not installed as a dependency. This has been fixed by:

1. Creating a custom `components/icons.tsx` with inline SVG icons
2. Replacing all `lucide-react` imports with the custom icon components
3. Downgrading Next.js from 15.0.0 to 14.2.5 (stable, no security vulnerabilities)
4. Adding `lucide-react` to `package.json` dependencies as a fallback

## 🎨 Design

- Dark theme matching Netflix's aesthetic
- Netflix red (`#E50914`) as primary accent color
- Smooth hover animations and transitions
- Custom scrollbar styling
- Gradient overlays for hero sections
