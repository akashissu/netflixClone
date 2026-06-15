'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { allMovies, tvShows } from '@/lib/data';
import MovieCard from '@/components/MovieCard';
import { Movie } from '@/types';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const allContent: Movie[] = [...allMovies, ...tvShows];

  const results = query.length > 1
    ? allContent.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.genre.some((g) => g.toLowerCase().includes(query.toLowerCase())) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const trending = allContent.slice(0, 12);

  return (
    <div className="min-h-screen bg-netflix-black pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Input */}
        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, shows, genres..."
            className="w-full bg-zinc-800 text-white placeholder-gray-500 pl-12 pr-12 py-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-netflix-red border border-zinc-700 focus:border-transparent"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Results */}
        {query.length > 1 ? (
          <>
            <h2 className="text-xl font-semibold text-white mb-6">
              {results.length > 0
                ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
                : `No results for "${query}"`}
            </h2>
            {results.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {results.map((item) => (
                  <MovieCard key={item.id} movie={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Search className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Try searching for a movie, show, or genre</p>
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-white mb-6">Trending Searches</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {trending.map((item) => (
                <MovieCard key={item.id} movie={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
