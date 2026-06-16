import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MovieCard from '@/components/MovieCard';
import { getAllTVShows } from '@/lib/data';

export const metadata = {
  title: 'TV Shows - StreamFlix',
  description: 'Browse all TV shows on StreamFlix',
};

const CATEGORIES = ['All', 'Drama', 'Comedy', 'Crime', 'Fantasy', 'Reality', 'Documentary', 'Anime'];

export default function TVShowsPage() {
  const shows = getAllTVShows();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-netflix-black pt-24 px-4 md:px-8 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6">TV Shows</h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-full border border-gray-600 text-sm text-gray-300 hover:border-white hover:text-white transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {shows.map((show) => (
              <MovieCard key={show.id} movie={show} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
