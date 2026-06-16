'use client';

import { useState, useEffect } from 'react';
import { MovieCard } from '@/components/MovieCard';
import type { TMDBTitle } from '@/types';

export default function MyListPage() {
  const [myList, setMyList] = useState<TMDBTitle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('netflix-my-list');
    if (stored) {
      try {
        setMyList(JSON.parse(stored));
      } catch {
        setMyList([]);
      }
    }
  }, []);

  const removeFromList = (id: number) => {
    const updated = myList.filter((item) => item.id !== id);
    setMyList(updated);
    localStorage.setItem('netflix-my-list', JSON.stringify(updated));
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-netflix-black pt-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="skeleton h-8 w-48 rounded mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="skeleton aspect-[2/3] rounded-md" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black pt-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">My List</h1>
          {myList.length > 0 && (
            <p className="text-gray-400 mt-2">{myList.length} title{myList.length !== 1 ? 's' : ''}</p>
          )}
        </div>

        {myList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-6">📋</div>
            <h2 className="text-2xl font-semibold text-white mb-3">Your list is empty</h2>
            <p className="text-gray-400 max-w-md mb-8">
              Add movies and TV shows to your list by clicking the + button on any title. They&apos;ll
              appear here for easy access.
            </p>
            <a
              href="/"
              className="bg-netflix-red hover:bg-netflix-red-dark text-white font-semibold px-8 py-3 rounded transition-colors duration-200"
            >
              Browse Titles
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {myList.map((item) => (
              <div key={item.id} className="relative group">
                <MovieCard title={item} variant="grid" />
                <button
                  onClick={() => removeFromList(item.id)}
                  className="absolute top-2 right-2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
                  aria-label="Remove from list"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
