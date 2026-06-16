import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MovieCard from '@/components/MovieCard';
import { ALL_TV_SHOWS } from '@/lib/data';

export default function TVShowsPage() {
  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      <main className="pt-24 px-4 md:px-12 pb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">TV Shows</h1>

        {/* Genre Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {['All', 'Drama', 'Crime', 'Comedy', 'Reality', 'Documentary', 'Anime', 'Kids'].map(
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

        {/* TV Shows Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {ALL_TV_SHOWS.map((show) => (
            <MovieCard key={show.id} title={show} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
