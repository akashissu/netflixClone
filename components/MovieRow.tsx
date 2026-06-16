'use client';

import { useRef } from 'react';
import { MovieCard } from '@/components/MovieCard';
import type { Movie } from '@/types';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export function MovieRow({ title, movies }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.75;
      rowRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="px-4 md:px-12 group/row">
      <h2 className="text-white text-lg md:text-xl font-semibold mb-3">{title}</h2>
      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-10 w-10 bg-black/50 text-white opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/80"
          aria-label="Scroll left"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Movie cards */}
        <div
          ref={rowRef}
          className="flex gap-2 overflow-x-auto movie-row-scroll pb-2"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-none w-40 md:w-48 lg:w-56">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-10 w-10 bg-black/50 text-white opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/80"
          aria-label="Scroll right"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default MovieRow;
