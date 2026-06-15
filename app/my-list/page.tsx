'use client';

import { Heart, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { myListMovies } from '@/lib/data';
import MovieCard from '@/components/MovieCard';

export default function MyListPage() {
  return (
    <div className="min-h-screen bg-netflix-black pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-netflix-red fill-netflix-red" />
            <h1 className="text-3xl font-bold text-white">My List</h1>
          </div>
          {myListMovies.length > 0 && (
            <button className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {myListMovies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <Heart className="w-20 h-20 text-gray-700 mb-6" />
            <h2 className="text-2xl font-semibold text-gray-400 mb-3">Your list is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md">
              Add movies and TV shows to your list to watch them later. Click the + button on any title to add it here.
            </p>
            <Link
              href="/"
              className="bg-netflix-red hover:bg-red-700 text-white font-semibold px-8 py-3 rounded transition-colors"
            >
              Browse Content
            </Link>
          </div>
        ) : (
          <>
            <p className="text-gray-400 text-sm mb-6">{myListMovies.length} titles saved</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {myListMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
