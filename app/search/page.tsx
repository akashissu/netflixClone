'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MovieCard from '@/components/MovieCard';
import { searchMovies } from '@/lib/data';
import { Movie } from '@/types';
import { Search } from '@/components/icons';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState(query);

  useEffect(() => {
    if (searchTerm.trim()) {
      const found = searchMovies(searchTerm);
      setResults(found);
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-netflix-black pt-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-xl">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search movies, shows, genres..."
              className="w-full bg-gray-800 border border-gray-600 text-white pl-10 pr-4 py-3 rounded-md focus:outline-none focus:border-white transition-colors"
              autoFocus
            />
          </div>
        </div>

        {searchTerm && (
          <p className="text-gray-400 mb-6">
            {results.length > 0
              ? `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${searchTerm}"`
              : `No results found for "${searchTerm}"`}
          </p>
        )}

        {results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : searchTerm ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-4">🎬</div>
            <h2 className="text-2xl font-semibold text-white mb-2">No results found</h2>
            <p className="text-gray-400 max-w-md">
              We couldn&apos;t find anything matching &quot;{searchTerm}&quot;. Try different keywords or browse our categories.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold text-white mb-2">Search StreamFlix</h2>
            <p className="text-gray-400">Find your favorite movies, TV shows, and more.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <div className="min-h-screen bg-netflix-black pt-24 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      }>
        <SearchContent />
      </Suspense>
      <Footer />
    </>
  );
}
