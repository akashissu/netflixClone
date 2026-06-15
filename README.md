# StreamFlix

A Netflix-inspired streaming platform built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Features

- 🎬 **Browse Movies & TV Shows** — Explore a curated library of content organized by genre and category
- 🔍 **Search** — Find movies and shows by title, genre, or description
- ❤️ **My List** — Save your favorite content to watch later
- 🎭 **Hero Banner** — Featured content with cinematic presentation
- 📱 **Responsive Design** — Optimized for mobile, tablet, and desktop
- 🎨 **Netflix-inspired UI** — Dark theme with smooth animations and hover effects
- ⚡ **Fast Performance** — Built with Next.js App Router for optimal loading

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/streamflix.git
cd streamflix

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
streamflix/
├── app/
│   ├── globals.css          # Global styles with Tailwind directives
│   ├── layout.tsx           # Root layout with Header and Footer
│   ├── page.tsx             # Homepage with hero banner and movie rows
│   ├── movies/
│   │   └── page.tsx         # Movies browsing page
│   ├── tv-shows/
│   │   └── page.tsx         # TV Shows browsing page
│   ├── my-list/
│   │   └── page.tsx         # Saved content list
│   └── search/
│       └── page.tsx         # Search functionality
├── components/
│   ├── Header.tsx           # Navigation header with scroll effect
│   ├── Footer.tsx           # Site footer with links
│   ├── HeroBanner.tsx       # Featured content hero section
│   ├── MovieRow.tsx         # Horizontally scrollable movie row
│   ├── MovieCard.tsx        # Individual movie card with hover effects
│   ├── MovieGrid.tsx        # Grid layout for movie browsing
│   └── RatingBadge.tsx      # Color-coded rating display
├── lib/
│   ├── utils.ts             # Utility functions (cn, formatDuration, etc.)
│   └── data.ts              # Mock movie and TV show data
└── types/
    └── index.ts             # TypeScript type definitions
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero banner and categorized rows |
| `/movies` | Browse all movies with genre filtering |
| `/tv-shows` | Browse all TV shows with category filtering |
| `/my-list` | View and manage saved content |
| `/search` | Search across all content |

## Customization

### Adding Real Movie Data

Replace the mock data in `lib/data.ts` with real API calls to services like:
- [TMDB API](https://www.themoviedb.org/documentation/api)
- [OMDB API](http://www.omdbapi.com/)

### Adding Authentication

Integrate with authentication providers:
- [NextAuth.js](https://next-auth.js.org/)
- [Clerk](https://clerk.com/)
- [Supabase Auth](https://supabase.com/auth)

## License

MIT License — feel free to use this project for learning and personal projects.
