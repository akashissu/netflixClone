import type { Metadata } from 'next';
import Header from '@/components/Header';
import CategoryRow from '@/components/CategoryRow';
import Footer from '@/components/Footer';
import { getMoviesByCategory, getTVByCategory, getTrendingTitles } from '@/lib/tmdb';
import type { MovieRow } from '@/types';

export const metadata: Metadata = {
  title: 'Browse — All Movies & TV Shows',
  description: 'Browse all available movies and TV shows on NetflixClone.',
};

export const revalidate = 3600;

export default async function BrowsePage() {
  let rows: MovieRow[] = [];

  try {
    const results = await Promise.allSettled([
      getTrendingTitles('movie', 'day'),
      getTrendingTitles('tv', 'day'),
      getMoviesByCategory('popular'),
      getMoviesByCategory('top_rated'),
      getMoviesByCategory('now_playing'),
      getMoviesByCategory('upcoming'),
      getTVByCategory('popular'),
      getTVByCategory('top_rated'),
      getTVByCategory('on_the_air'),
      getTVByCategory('airing_today'),
    ]);

    const labels = [
      'Trending Movies Today',
      'Trending TV Today',
      'Popular Movies',
      'Top Rated Movies',
      'Now Playing',
      'Upcoming Movies',
      'Popular TV Shows',
      'Top Rated TV Shows',
      'Currently Airing',
      'Airing Today',
    ];

    rows = results
      .map((result, i) => ({
        id: `row-${i}`,
        title: labels[i],
        titles: result.status === 'fulfilled' ? result.value : [],
      }))
      .filter((row) => row.titles.length > 0);
  } catch (error) {
    console.error('Browse page fetch error:', error);
  }

  return (
    <main className="min-h-screen bg-netflix-black">
      <Header />
      <div className="pt-24 pb-20">
        <div className="px-4 md:px-12 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Browse All</h1>
          <p className="text-netflix-light-gray mt-2">Explore our full catalog of movies and TV shows</p>
        </div>
        {rows.length > 0 ? (
          rows.map((row) => <CategoryRow key={row.id} row={row} />)
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-netflix-light-gray text-lg">Content unavailable. Please check your API configuration.</p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
