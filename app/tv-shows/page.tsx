import MovieGrid from '@/components/MovieGrid';
import { tvShows } from '@/lib/data';
import { Tv } from 'lucide-react';

export const metadata = {
  title: 'TV Shows - StreamFlix',
  description: 'Browse all TV shows available on StreamFlix',
};

export default function TVShowsPage() {
  const categories = ['All', 'Drama', 'Comedy', 'Crime', 'Sci-Fi', 'Reality', 'Animation', 'Documentary'];

  return (
    <div className="min-h-screen bg-netflix-black pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-8">
          <Tv className="w-8 h-8 text-netflix-red" />
          <h1 className="text-3xl font-bold text-white">TV Shows</h1>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                cat === 'All'
                  ? 'bg-netflix-red text-white'
                  : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-gray-400 text-sm">{tvShows.length} shows available</span>
        </div>

        {/* TV Shows Grid */}
        <MovieGrid movies={tvShows} />
      </div>
    </div>
  );
}
