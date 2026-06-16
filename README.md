# StreamFlix - Netflix Clone

A production-ready Netflix clone built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## 🚀 Features

- **Hero Banner** - Featured movie with play/info buttons and mute toggle
- **Movie Rows** - Horizontally scrollable rows with left/right navigation
- **Movie Cards** - Hover effects with action buttons and expanded info
- **Detail Modal** - Full movie details with cast, genres, and similar titles
- **Browse Page** - All content in scrollable rows
- **Movies Page** - Grid view with genre filtering
- **TV Shows Page** - Grid view with category tabs
- **My List Page** - Saved titles management
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Dark Theme** - Netflix-inspired dark color scheme

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: react-icons (fa, fi)
- **Images**: Next.js Image component with picsum.photos

## 📦 Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx              # Homepage
│   ├── browse/page.tsx       # Browse all
│   ├── movies/page.tsx       # Movies grid
│   ├── tv-shows/page.tsx     # TV Shows grid
│   └── my-list/page.tsx      # Saved list
├── components/
│   ├── Header.tsx            # Navigation header
│   ├── Footer.tsx            # Site footer
│   ├── HeroBanner.tsx        # Hero section
│   ├── MovieRow.tsx          # Horizontal scroll row
│   ├── MovieCard.tsx         # Individual card
│   ├── MovieGrid.tsx         # Grid layout
│   └── DetailModal.tsx       # Movie detail modal
├── lib/
│   ├── utils.ts              # Utility functions
│   └── movieData.ts          # Mock movie data
└── types/
    └── index.ts              # TypeScript types
```

## 🔧 Fix Applied

The original build error was:
```
Module not found: Can't resolve 'react-icons/fi'
```

**Root Cause**: The `react-icons` package was not listed in `package.json` dependencies.

**Fix**: Added `"react-icons": "^5.3.0"` to the `dependencies` in `package.json`.

Also upgraded from `next@14.2.15` (which had a security vulnerability) to `next@15.0.0`.

## 📝 License

MIT License - This is a demo application for educational purposes.
