import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import CategoryRow from '@/components/CategoryRow';
import Footer from '@/components/Footer';
import { getTrendingTitles, getMoviesByCategory, getTVByCategory } from '@/lib/tmdb';
import type { TMDBTitle, MovieRow } from '@/types';

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  let heroTitle: TMDBTitle | null = null;
  let rows: MovieRow[] = [];

  try {
    const [trending, popularMovies, topRatedMovies, popularTV, actionMovies, horrorMovies] =
      await Promise.allSettled([
        getTrendingTitles('all', 'week'),
        getMoviesByCategory('popular'),
        getMoviesByCategory('top_rated'),
        getTVByCategory('popular'),
        getMoviesByCategory('now_playing'),
        getMoviesByCategory('upcoming'),
      ]);

    const trendingTitles =
      trending.status === 'fulfilled' ? trending.value : [];
    const popularMoviesList =
      popularMovies.status === 'fulfilled' ? popularMovies.value : [];
    const topRatedList =
      topRatedMovies.status === 'fulfilled' ? topRatedMovies.value : [];
    const popularTVList =
      popularTV.status === 'fulfilled' ? popularTV.value : [];
    const nowPlayingList =
      actionMovies.status === 'fulfilled' ? actionMovies.value : [];
    const upcomingList =
      horrorMovies.status === 'fulfilled' ? horrorMovies.value : [];

    heroTitle = trendingTitles[0] ?? null;

    rows = [
      { id: 'trending', title: 'Trending Now', titles: trendingTitles },
      { id: 'popular-movies', title: 'Popular Movies', titles: popularMoviesList },
      { id: 'top-rated', title: 'Top Rated', titles: topRatedList },
      { id: 'popular-tv', title: 'Popular on TV', titles: popularTVList },
      { id: 'now-playing', title: 'Now Playing in Theaters', titles: nowPlayingList },
      { id: 'upcoming', title: 'Coming Soon', titles: upcomingList },
    ].filter((row) => row.titles.length > 0);
  } catch (error) {
    console.error('Failed to fetch homepage data:', error);
    // Render with fallback static data
    rows = getFallbackRows();
    heroTitle = getFallbackHero();
  }

  return (
    <main className="min-h-screen bg-netflix-black">
      <Header />
      {heroTitle && <HeroBanner title={heroTitle} />}
      <div className="relative z-10 -mt-32 pb-20">
        {rows.map((row) => (
          <CategoryRow key={row.id} row={row} />
        ))}
      </div>
      <Footer />
    </main>
  );
}

function getFallbackHero(): TMDBTitle {
  return {
    id: 1,
    title: 'Stranger Things',
    name: 'Stranger Things',
    original_title: 'Stranger Things',
    original_name: 'Stranger Things',
    overview:
      'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.',
    poster_path: '/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    backdrop_path: '/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
    vote_average: 8.7,
    vote_count: 15000,
    release_date: '2016-07-15',
    first_air_date: '2016-07-15',
    genre_ids: [18, 10765, 9648],
    media_type: 'tv',
    adult: false,
    popularity: 500,
    original_language: 'en',
    video: false,
  };
}

function getFallbackRows(): MovieRow[] {
  const fallbackTitles: TMDBTitle[] = [
    {
      id: 1,
      title: 'Inception',
      name: 'Inception',
      original_title: 'Inception',
      original_name: 'Inception',
      overview: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
      poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      backdrop_path: '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
      vote_average: 8.4,
      vote_count: 34000,
      release_date: '2010-07-16',
      first_air_date: '',
      genre_ids: [28, 878, 12],
      media_type: 'movie',
      adult: false,
      popularity: 300,
      original_language: 'en',
      video: false,
    },
    {
      id: 2,
      title: 'The Dark Knight',
      name: 'The Dark Knight',
      original_title: 'The Dark Knight',
      original_name: 'The Dark Knight',
      overview: 'Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and DA Harvey Dent.',
      poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      backdrop_path: '/hkBaDkMWbLaf8B1lsWsqX7an5lu.jpg',
      vote_average: 9.0,
      vote_count: 30000,
      release_date: '2008-07-18',
      first_air_date: '',
      genre_ids: [28, 80, 18],
      media_type: 'movie',
      adult: false,
      popularity: 280,
      original_language: 'en',
      video: false,
    },
    {
      id: 3,
      title: 'Interstellar',
      name: 'Interstellar',
      original_title: 'Interstellar',
      original_name: 'Interstellar',
      overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
      poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      backdrop_path: '/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
      vote_average: 8.6,
      vote_count: 32000,
      release_date: '2014-11-07',
      first_air_date: '',
      genre_ids: [12, 18, 878],
      media_type: 'movie',
      adult: false,
      popularity: 260,
      original_language: 'en',
      video: false,
    },
  ];

  return [
    { id: 'trending', title: 'Trending Now', titles: fallbackTitles },
    { id: 'popular', title: 'Popular Movies', titles: [...fallbackTitles].reverse() },
  ];
}
