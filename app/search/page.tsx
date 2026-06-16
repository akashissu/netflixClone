import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MovieCard } from '@/components/MovieCard';
import { ALL_MOVIES, ALL_TV_SHOWS } from '@/lib/data';

const ALL_CONTENT = [...ALL_MOVIES, ...ALL_TV_SHOWS];

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      <main className="pt-24 px-4 md:px-12 pb-16">
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search titles, people, genres"
              className="w-full bg-gray-800 text-white pl-12 pr-4 py-4 rounded text-lg outline-none border border-gray-700 focus:border-white transition-colors"
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mb-6">Popular on Netflix Clone</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {ALL_CONTENT.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
