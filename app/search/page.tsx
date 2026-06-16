'use client';

import { useState, useEffect, useCallback } from 'react';
import { MovieCard } from '@/components/MovieCard';
import { SearchBar } from '@/components/SearchBar';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { searchTitles, getTrending } from '@/lib/tmdb';
import type { TMDBTitle } from '@/types';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<TMDBTitle[]>([]);
  const [trending, setTrending] = useState<TMDBTitle[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const loadTrending = async () => {
      const data = await getTrending();
      setTrending(data);
    };
    loadTrending();
  }, []);

  const handleSearch = useCallback(async (searchQuery: string) => {
    setQuery(searchQuery);
    if (!searchQuery.trim()) {
      setResults([]);
      setHasSearched(false);
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

  const displayItems = hasSearched ? results : trending;
  const sectionTitle = hasSearched
    ? results.length > 0
      ? `Results for "${query}"`
      : `No results for "${query}"`
    : 'Trending Searches';

  return (
    <div className="min-h-screen bg-netflix-black pt-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} initialValue={query} />
        </div>

        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-white">{sectionTitle}</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="skeleton aspect-[2/3] rounded-md" />
            ))}
          </div>
        ) : displayItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {displayItems.map((item) => (
              <MovieCard key={item.id} title={item} variant="grid" />
            ))}
          </div>
        ) : hasSearched ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl font-semibold text-white mb-2">No results found</h3>
            <p className="text-gray-400 max-w-md">
              We couldn&apos;t find anything matching &quot;{query}&quot;. Try searching for a different title,
              actor, director, or genre.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
