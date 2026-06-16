import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContentGrid } from '@/components/ContentGrid';
import { PageBanner } from '@/components/PageBanner';
import { TOP_RATED_TV, TRENDING_NOW } from '@/lib/mockData';

export default function TVShowsPage() {
  const allTVShows = [...TOP_RATED_TV, ...TRENDING_NOW].filter(
    (item) => item.mediaType === 'tv'
  );

  return (
    <div className="bg-netflix-black min-h-screen">
      <PageBanner
        title="TV Shows"
        description="Binge-watch the best series from around the world."
      />
      <div className="px-4 md:px-8 lg:px-16 py-8">
        <ContentGrid title="All TV Shows" items={allTVShows} />
      </div>
    </div>
  );
}
