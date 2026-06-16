import Header from '@/components/Header';
import MovieGrid from '@/components/MovieGrid';
import Footer from '@/components/Footer';
import { getAllMovies } from '@/lib/movieData';

export default function MoviesPage() {
  const movies = getAllMovies();

  return (
    <main className="bg-netflix-black min-h-screen">
      <Header />
      <div className="pt-24 pb-20 px-4 md:px-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Movies</h1>
          <p className="text-netflix-lightgray mt-2 text-lg">
            Discover the latest blockbusters, indie gems, and timeless classics
          </p>
        </div>

        {/* Genre Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance'].map((genre) => (
            <button
              key={genre}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                genre === 'All'
                  ? 'bg-netflix-red text-white'
                  : 'bg-netflix-dark text-netflix-lightgray hover:bg-gray-700 hover:text-white border border-gray-600'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        <MovieGrid movies={movies} />
      </div>
      <Footer />
    </main>
  );
}
