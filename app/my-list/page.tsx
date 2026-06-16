'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MovieCard from '@/components/MovieCard';
import { getMyListMovies } from '@/lib/data';

export default function MyListPage() {
  const [movies] = useState(getMyListMovies());

  return (
    <>
      <Header />
      <main className="min-h-screen bg-netflix-black pt-24 px-4 md:px-8 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">My List</h1>
          <p className="text-gray-400 mb-8">Your saved movies and shows</p>

          {movies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="text-6xl mb-4">📋</div>
              <h2 className="text-2xl font-semibold text-white mb-2">Your list is empty</h2>
              <p className="text-gray-400 max-w-md mb-6">
                Add movies and shows to your list to watch them later. Click the + button on any title.
              </p>
              <a
                href="/movies"
                className="bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200 transition-colors"
              >
                Browse Movies
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
