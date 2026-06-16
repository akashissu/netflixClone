import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContentGrid } from '@/components/ContentGrid';
import { PageBanner } from '@/components/PageBanner';
import { POPULAR_MOVIES, TRENDING_NOW, NEW_RELEASES } from '@/lib/mockData';

export default function MoviesPage() {
  const allMovies = [...POPULAR_MOVIES, ...TRENDING_NOW, ...NEW_RELEASES].filter(
    (item) => item.mediaType === 'movie'
  );

  return (
    <div className="bg-netflix-black min-h-screen">
      <PageBanner
        title="Movies"
        description="Explore our vast collection of movies across every genre."
      />
      <div className="px-4 md:px-8 lg:px-16 py-8">
        <ContentGrid title="All Movies" items={allMovies} />
      </div>
    </div>
  );
}
