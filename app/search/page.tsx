import { ContentGrid } from '@/components/ContentGrid';
import { PageBanner } from '@/components/PageBanner';
import { ALL_TITLES } from '@/lib/mockData';

export default function SearchPage() {
  return (
    <div className="bg-netflix-black min-h-screen">
      <PageBanner
        title="Search"
        description="Find your next favorite movie or TV show."
      />
      <div className="px-4 md:px-8 lg:px-16 py-8">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search titles, people, genres..."
            className="w-full max-w-2xl bg-netflix-dark border border-netflix-gray text-white placeholder-netflix-gray px-6 py-4 rounded-md text-lg focus:outline-none focus:border-white transition-colors"
          />
        </div>
        <ContentGrid title="All Titles" items={ALL_TITLES} />
      </div>
    </div>
  );
}
