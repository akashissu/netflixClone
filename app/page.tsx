import { HeroSection } from '@/components/HeroSection';
import { CategoryRow } from '@/components/CategoryRow';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { getTrending, getTopRated, getByGenre, getTVShows } from '@/lib/tmdb';
import { Suspense } from 'react';

async function HomeContent() {
  const [trending, topRated, action, tvShows] = await Promise.all([
    getTrending(),
    getTopRated(),
    getByGenre(28),
    getTVShows(),
  ]);

  const hero = trending[0];

  return (
    <>
      <HeroSection title={hero} />
      <div className="relative z-10 -mt-32 pb-16 space-y-8">
        <CategoryRow title="Trending Now" items={trending} />
        <CategoryRow title="Top Rated" items={topRated} />
        <CategoryRow title="Action & Adventure" items={action} />
        <CategoryRow title="Popular TV Shows" items={tvShows} />
      </div>
    </>
  );
}

export default function HomePage() {
  return (
    <div className="bg-netflix-black">
      <Suspense fallback={<LoadingSkeleton />}>
        <HomeContent />
      </Suspense>
    </div>
  );
}
