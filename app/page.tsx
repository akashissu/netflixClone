import HeroSection from '@/components/HeroSection';
import CategoryRow from '@/components/CategoryRow';
import { fetchTrending, fetchTopRated, fetchByGenre, fetchTVShows, getFeaturedTitle } from '@/lib/tmdb';

export default async function HomePage() {
  const [trending, topRated, actionMovies, tvShows] = await Promise.all([
    fetchTrending(),
    fetchTopRated(),
    fetchByGenre(28), // Action
    fetchTVShows(),
  ]);

  const featured = getFeaturedTitle(trending);

  return (
    <div className="bg-netflix-black min-h-screen">
      <HeroSection featured={featured} />
      <div className="relative z-10 -mt-32 pb-16 space-y-8">
        <CategoryRow title="Trending Now" items={trending} />
        <CategoryRow title="Top Rated" items={topRated} />
        <CategoryRow title="Action Movies" items={actionMovies} />
        <CategoryRow title="TV Shows" items={tvShows} mediaType="tv" />
      </div>
    </div>
  );
}
