'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MovieGrid from '@/components/MovieGrid';
import { getAllMovies } from '@/lib/movieData';
import { Movie } from '@/types';

export default function MyListPage() {
  const allMovies = getAllMovies();
  // Simulate a saved list with first 6 movies
  const [myList] = useState<Movie[]>(allMovies.slice(0, 6));

  return (
    <main className="bg-netflix-black min-h-screen">
      <Header />
      <div className="pt-24 pb-20 px-4 md:px-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">My List</h1>
          <p className="text-netflix-lightgray mt-2 text-lg">
            {myList.length} {myList.length === 1 ? 'title' : 'titles'} saved to your list
          </p>
        </div>

        {myList.length > 0 ? (
          <MovieGrid movies={myList} />
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="text-6xl mb-6">📋</div>
            <h2 className="text-2xl font-semibold text-white mb-3">Your list is empty</h2>
            <p className="text-netflix-lightgray max-w-md">
              Add movies and TV shows to your list by clicking the + button on any title.
              Your saved content will appear here.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
