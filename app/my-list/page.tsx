'use client';

import { useState, useEffect } from 'react';
import MovieCard from '@/components/MovieCard';
import { Movie } from '@/types';
import { getMyList } from '@/lib/myList';
import { FiBookmark } from 'react-icons/fi';
import Link from 'next/link';

export default function MyListPage() {
  const [myList, setMyList] = useState<Movie[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMyList(getMyList());
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-netflix-black pt-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">My List</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-netflix-dark rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black pt-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">My List</h1>

        {myList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <FiBookmark className="text-netflix-gray mb-4" size={64} />
            <h2 className="text-xl font-semibold text-white mb-2">Your list is empty</h2>
            <p className="text-netflix-lightgray mb-6">
              Add movies and TV shows to your list to watch them later.
            </p>
            <Link
              href="/"
              className="bg-netflix-red text-white px-6 py-3 rounded font-semibold hover:bg-red-700 transition-colors"
            >
              Browse Content
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {myList.map((item) => (
              <MovieCard key={`${item.id}-${item.media_type}`} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
