import type { Metadata } from 'next';
import Header from '@/components/Header';
import CategoryRow from '@/components/CategoryRow';
import Footer from '@/components/Footer';
import { getMoviesByCategory } from '@/lib/tmdb';
import type { MovieRow } from '@/types';

export const metadata: Metadata = {
  title: 'Movies — Stream the Latest Films',
  description: 'Watch the latest and greatest movies on NetflixClone. From blockbusters to indie gems.',
};

export const revalidate = 3600;

export default async function MoviesPage() {
  let rows: MovieRow[] = [];

  try {
    const [popular, topRated, nowPlaying, upcoming] = await Promise.allSettled([
      getMoviesByCategory('popular'),
      getMoviesByCategory('top_rated'),
      getMoviesByCategory('now_playing'),
      getMoviesByCategory('upcoming'),
    ]);

    rows = [
      {
        id: 'popular',
        title: 'Popular Movies',
        titles: popular.status === 'fulfilled' ? popular.value : [],
      },
      {
        id: 'top-rated',
        title: 'Top Rated Movies',
        titles: topRated.status === 'fulfilled' ? topRated.value : [],
      },
      {
        id: 'now-playing',
        title: 'Now Playing in Theaters',
        titles: nowPlaying.status === 'fulfilled' ? nowPlaying.value : [],
      },
      {
        id: 'upcoming',
        title: 'Coming Soon',
        titles: upcoming.status === 'fulfilled' ? upcoming.value : [],
      },
    ].filter((row) => row.titles.length > 0);
  } catch (error) {
    console.error('Movies page fetch error:', error);
  }

  return (
    <main className="min-h-screen bg-netflix-black">
      <Header />
      <div className="pt-24 pb-20">
        <div className="px-4 md:px-12 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Movies</h1>
          <p className="text-netflix-light-gray mt-2">Blockbusters, classics, and everything in between</p>
        </div>
        {rows.length > 0 ? (
          rows.map((row) => <CategoryRow key={row.id} row={row} />)
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-netflix-light-gray text-lg">Movies unavailable. Please check your API configuration.</p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
