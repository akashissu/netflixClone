import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MovieCard from '@/components/MovieCard';
import { getAllMovies } from '@/lib/data';

export const metadata = {
  title: 'Movies - StreamFlix',
  description: 'Browse all movies on StreamFlix',
};

const GENRES = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance', 'Animation'];

export default function MoviesPage() {
  const movies = getAllMovies();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-netflix-black pt-24 px-4 md:px-8 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6">Movies</h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {GENRES.map((genre) => (
              <button
                key={genre}
                className="px-4 py-2 rounded-full border border-gray-600 text-sm text-gray-300 hover:border-white hover:text-white transition-colors"
              >
                {genre}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
