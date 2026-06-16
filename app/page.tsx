import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import MovieRow from '@/components/MovieRow';
import Footer from '@/components/Footer';
import { getFeaturedMovie, getMovieRows } from '@/lib/movieData';

export default function HomePage() {
  const featuredMovie = getFeaturedMovie();
  const movieRows = getMovieRows();

  return (
    <main className="bg-netflix-black min-h-screen">
      <Header />
      <HeroBanner movie={featuredMovie} />
      <div className="relative z-10 -mt-32 pb-20">
        {movieRows.map((row) => (
          <MovieRow key={row.id} title={row.title} movies={row.movies} />
        ))}
      </div>
      <Footer />
    </main>
  );
}
