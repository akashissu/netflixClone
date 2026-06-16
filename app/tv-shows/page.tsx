import Header from '@/components/Header';
import MovieGrid from '@/components/MovieGrid';
import Footer from '@/components/Footer';
import { getAllTVShows } from '@/lib/movieData';

export default function TVShowsPage() {
  const shows = getAllTVShows();

  return (
    <main className="bg-netflix-black min-h-screen">
      <Header />
      <div className="pt-24 pb-20 px-4 md:px-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">TV Shows</h1>
          <p className="text-netflix-lightgray mt-2 text-lg">
            Binge-watch the most talked-about series from around the world
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex gap-6 mb-8 border-b border-gray-700">
          {['All Shows', 'Currently Airing', 'Completed', 'New Releases'].map((tab, i) => (
            <button
              key={tab}
              className={`pb-3 text-sm font-medium transition-colors ${
                i === 0
                  ? 'text-white border-b-2 border-netflix-red'
                  : 'text-netflix-lightgray hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <MovieGrid movies={shows} />
      </div>
      <Footer />
    </main>
  );
}
