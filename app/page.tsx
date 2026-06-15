import HeroBanner from '@/components/HeroBanner';
import MovieRow from '@/components/MovieRow';
import { featuredMovie, trendingNow, topRated, actionMovies, comedyMovies, documentaries } from '@/lib/data';

export default function HomePage() {
  return (
    <div className="bg-netflix-black">
      <HeroBanner movie={featuredMovie} />
      <div className="relative z-10 -mt-32 pb-20 space-y-8">
        <MovieRow title="Trending Now" movies={trendingNow} />
        <MovieRow title="Top Rated" movies={topRated} />
        <MovieRow title="Action & Adventure" movies={actionMovies} />
        <MovieRow title="Comedy" movies={comedyMovies} />
        <MovieRow title="Documentaries" movies={documentaries} />
      </div>
    </div>
  );
}
