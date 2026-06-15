'use client';

import { useState, useEffect, useCallback } from 'react';
import MovieCard from '@/components/MovieCard';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import SearchBar from '@/components/SearchBar';
import { searchTitles } from '@/lib/tmdb';
import { Movie } from '@/types';
import { FiSearch } from 'react-icons/fi';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHasSearched(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const data = await searchTitles(searchQuery);
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 400);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  return (
    <div className="min-h-screen bg-netflix-black pt-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">Search</h1>
        
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search for movies, TV shows, genres..."
        />

        <div className="mt-8">
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <LoadingSkeleton key={i} />
              ))}
            </div>
          )}

          {!loading && hasSearched && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <FiSearch className="text-netflix-gray mb-4" size={64} />
              <h2 className="text-xl font-semibold text-white mb-2">No results found</h2>
              <p className="text-netflix-lightgray">
                We couldn&apos;t find anything matching &quot;{query}&quot;. Try a different search term.
              </p>
            </div>
          )}

          {!loading && !hasSearched && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <FiSearch className="text-netflix-gray mb-4" size={64} />
              <h2 className="text-xl font-semibold text-white mb-2">Search for something</h2>
              <p className="text-netflix-lightgray">
                Find your favorite movies, TV shows, and more.
              </p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <>
              <p className="text-netflix-lightgray mb-4 text-sm">
                {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {results.map((item) => (
                  <MovieCard key={`${item.id}-${item.media_type}`} item={item} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
