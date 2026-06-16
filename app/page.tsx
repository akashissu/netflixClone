import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroBanner from '@/components/HeroBanner';
import MovieRow from '@/components/MovieRow';
import { getFeaturedMovie, getMovieRows } from '@/lib/data';

export default function HomePage() {
  const featuredMovie = getFeaturedMovie();
  const movieRows = getMovieRows();

  return (
    <main className="bg-netflix-black min-h-screen">
      <Header />
      <HeroBanner movie={featuredMovie} />
      <div className="relative z-10 -mt-32 pb-10">
        {movieRows.map((row) => (
          <MovieRow key={row.id} title={row.title} movies={row.movies} />
        ))}
      </div>
      <Footer />
    </main>
  );
}
