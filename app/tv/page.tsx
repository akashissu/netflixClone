import type { Metadata } from 'next';
import Header from '@/components/Header';
import CategoryRow from '@/components/CategoryRow';
import Footer from '@/components/Footer';
import { getTVByCategory } from '@/lib/tmdb';
import type { MovieRow } from '@/types';

export const metadata: Metadata = {
  title: 'TV Shows — Stream the Best Series',
  description: 'Watch the best TV shows and series on NetflixClone. Drama, comedy, thriller and more.',
};

export const revalidate = 3600;

export default async function TVPage() {
  let rows: MovieRow[] = [];

  try {
    const [popular, topRated, onTheAir, airingToday] = await Promise.allSettled([
      getTVByCategory('popular'),
      getTVByCategory('top_rated'),
      getTVByCategory('on_the_air'),
      getTVByCategory('airing_today'),
    ]);

    rows = [
      {
        id: 'popular-tv',
        title: 'Popular TV Shows',
        titles: popular.status === 'fulfilled' ? popular.value : [],
      },
      {
        id: 'top-rated-tv',
        title: 'Top Rated Series',
        titles: topRated.status === 'fulfilled' ? topRated.value : [],
      },
      {
        id: 'on-the-air',
        title: 'Currently Airing',
        titles: onTheAir.status === 'fulfilled' ? onTheAir.value : [],
      },
      {
        id: 'airing-today',
        title: 'Airing Today',
        titles: airingToday.status === 'fulfilled' ? airingToday.value : [],
      },
    ].filter((row) => row.titles.length > 0);
  } catch (error) {
    console.error('TV page fetch error:', error);
  }

  return (
    <main className="min-h-screen bg-netflix-black">
      <Header />
      <div className="pt-24 pb-20">
        <div className="px-4 md:px-12 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">TV Shows</h1>
          <p className="text-netflix-light-gray mt-2">Binge-worthy series from around the world</p>
        </div>
        {rows.length > 0 ? (
          rows.map((row) => <CategoryRow key={row.id} row={row} />)
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-netflix-light-gray text-lg">TV Shows unavailable. Please check your API configuration.</p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
