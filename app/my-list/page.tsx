import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContentGrid } from '@/components/ContentGrid';
import { PageBanner } from '@/components/PageBanner';
import { MY_LIST_ITEMS } from '@/lib/mockData';

export default function MyListPage() {
  return (
    <div className="bg-netflix-black min-h-screen">
      <PageBanner
        title="My List"
        description="Your saved movies and TV shows, all in one place."
      />
      <div className="px-4 md:px-8 lg:px-16 py-8">
        {MY_LIST_ITEMS.length > 0 ? (
          <ContentGrid title="Saved Titles" items={MY_LIST_ITEMS} />
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <svg
              className="w-24 h-24 text-netflix-gray mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-white mb-2">Your list is empty</h2>
            <p className="text-netflix-lightgray max-w-md">
              Add movies and TV shows to your list by clicking the + button on any title.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
