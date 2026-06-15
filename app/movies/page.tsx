import MovieGrid from '@/components/MovieGrid';
import { allMovies } from '@/lib/data';
import { Film } from 'lucide-react';

export const metadata = {
  title: 'Movies - StreamFlix',
  description: 'Browse all movies available on StreamFlix',
};

export default function MoviesPage() {
  const genres = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Documentary', 'Thriller', 'Romance'];

  return (
    <div className="min-h-screen bg-netflix-black pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-8">
          <Film className="w-8 h-8 text-netflix-red" />
          <h1 className="text-3xl font-bold text-white">Movies</h1>
        </div>

        {/* Genre Filter */}
        <div className="flex flex-wrap gap-3 mb-10">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                genre === 'All'
                  ? 'bg-netflix-red text-white'
                  : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-gray-400 text-sm">{allMovies.length} titles available</span>
        </div>

        {/* Movie Grid */}
        <MovieGrid movies={allMovies} />
      </div>
    </div>
  );
}
