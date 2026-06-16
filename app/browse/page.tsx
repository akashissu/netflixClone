import Header from '@/components/Header';
import MovieRow from '@/components/MovieRow';
import Footer from '@/components/Footer';
import { getMovieRows } from '@/lib/movieData';

export default function BrowsePage() {
  const movieRows = getMovieRows();

  return (
    <main className="bg-netflix-black min-h-screen">
      <Header />
      <div className="pt-24 pb-20">
        <div className="px-4 md:px-12 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Browse All Content</h1>
          <p className="text-netflix-lightgray mt-2 text-lg">
            Explore thousands of movies and TV shows across all genres
          </p>
        </div>
        <div className="space-y-2">
          {movieRows.map((row) => (
            <MovieRow key={row.id} title={row.title} movies={row.movies} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
