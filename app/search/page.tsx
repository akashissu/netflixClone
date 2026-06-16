import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchResults from '@/components/SearchResults';

export const metadata: Metadata = {
  title: 'Search — Find Movies & TV Shows',
  description: 'Search for your favorite movies and TV shows on NetflixClone.',
};

interface SearchPageProps {
  searchParams: { q?: string };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q ?? '';

  return (
    <main className="min-h-screen bg-netflix-black">
      <Header />
      <div className="pt-24 pb-20">
        <div className="px-4 md:px-12 mb-8">
          {query ? (
            <h1 className="text-2xl md:text-3xl font-semibold text-white">
              Search results for:{' '}
              <span className="text-netflix-light-gray">&ldquo;{query}&rdquo;</span>
            </h1>
          ) : (
            <h1 className="text-2xl md:text-3xl font-semibold text-white">Search</h1>
          )}
        </div>
        <SearchResults query={query} />
      </div>
      <Footer />
    </main>
  );
}
