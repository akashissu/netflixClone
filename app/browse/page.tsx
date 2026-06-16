import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroBanner } from '@/components/HeroBanner';
import { MovieRow } from '@/components/MovieRow';
import { FEATURED_MOVIE, MOVIE_ROWS } from '@/lib/data';

export default function BrowsePage() {
  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      <main>
        <HeroBanner movie={FEATURED_MOVIE} />
        <div className="relative z-10 -mt-32 pb-10 space-y-8">
          {MOVIE_ROWS.map((row) => (
            <MovieRow key={row.id} title={row.title} movies={row.movies} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
