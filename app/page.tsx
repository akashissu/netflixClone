import { HeroBanner } from '@/components/HeroBanner';
import { ContentRow } from '@/components/ContentRow';
import { FEATURED_MOVIE, TRENDING_NOW, POPULAR_MOVIES, TOP_RATED_TV, NEW_RELEASES } from '@/lib/mockData';

export default function HomePage() {
  return (
    <div className="bg-netflix-black">
      <HeroBanner movie={FEATURED_MOVIE} />
      <div className="relative z-10 -mt-32 pb-16 space-y-8">
        <ContentRow title="Trending Now" items={TRENDING_NOW} />
        <ContentRow title="Popular Movies" items={POPULAR_MOVIES} />
        <ContentRow title="Top Rated TV Shows" items={TOP_RATED_TV} />
        <ContentRow title="New Releases" items={NEW_RELEASES} />
      </div>
    </div>
  );
}
