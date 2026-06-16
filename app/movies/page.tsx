import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MovieCard } from '@/components/MovieCard';
import { ALL_MOVIES } from '@/lib/data';

export default function MoviesPage() {
  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      <main className="pt-24 px-4 md:px-12 pb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Movies</h1>

        {/* Genre Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance'].map(
            (genre) => (
              <button
                key={genre}
                className="px-4 py-2 rounded-full border border-gray-600 text-sm text-white hover:border-white transition-colors"
              >
                {genre}
              </button>
            )
          )}
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {ALL_MOVIES.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
