'use client';

import { useState, useEffect } from 'react';
import type { TMDBTitle } from '@/types';
import { searchTitles } from '@/lib/tmdb';
import MovieCard from '@/components/MovieCard';

interface SearchResultsProps {
  query: string;
}

export default function SearchResults({ query }: SearchResultsProps) {
  const [results, setResults] = useState<TMDBTitle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchTitles(query);
        setResults(data);
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to fetch search results. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  if (!query.trim()) {
    return (
      <div className="px-4 md:px-12">
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <svg className="w-16 h-16 text-white/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-white/50 text-lg">Start typing to search for movies and TV shows</p>
          <p className="text-white/30 text-sm mt-2">Search by title, genre, or keyword</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="px-4 md:px-12">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-netflix-red border-t-transparent rounded-full animate-spin" />
            <span className="text-white/60">Searching...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 md:px-12">
        <div className="flex items-center justify-center h-64">
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="px-4 md:px-12">
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <svg className="w-16 h-16 text-white/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-white/50 text-lg">No results found for &ldquo;{query}&rdquo;</p>
          <p className="text-white/30 text-sm mt-2">Try a different search term</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-12">
      <p className="text-white/50 text-sm mb-6">
        Found {results.length} result{results.length !== 1 ? 's' : ''}
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
        {results.map((title) => (
          <MovieCard key={`${title.id}-${title.media_type}`} title={title} />
        ))}
      </div>
    </div>
  );
}
