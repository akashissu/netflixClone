import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MovieCard from '@/components/MovieCard';
import { ALL_MOVIES } from '@/lib/data';

const MY_LIST = ALL_MOVIES.slice(0, 8);

export default function MyListPage() {
  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      <main className="pt-24 px-4 md:px-12 pb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">My List</h1>

        {MY_LIST.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <svg
              className="w-20 h-20 text-gray-600 mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-white mb-2">Your list is empty</h2>
            <p className="text-gray-400">
              Add movies and TV shows to your list to watch them later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {MY_LIST.map((movie) => (
              <MovieCard key={movie.id} title={movie} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
