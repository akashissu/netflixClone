'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from './icons';
import MovieCard from './MovieCard';
import { Movie } from '@/types';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (!rowRef.current) return;
    const scrollAmount = rowRef.current.clientWidth * 0.75;
    rowRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
  };

  return (
    <div className="mb-8 group/row">
      <h2 className="text-white font-semibold text-lg md:text-xl px-4 md:px-8 lg:px-16 mb-3">
        {title}
      </h2>

      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-20 w-12 bg-black/50 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-black/80"
            aria-label="Scroll left"
          >
            <ChevronLeft size={28} className="text-white" />
          </button>
        )}

        {/* Movies */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex gap-2 overflow-x-auto row-scroll px-4 md:px-8 lg:px-16"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-36 md:w-44 lg:w-52">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-20 w-12 bg-black/50 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-black/80"
            aria-label="Scroll right"
          >
            <ChevronRight size={28} className="text-white" />
          </button>
        )}
      </div>
    </div>
  );
}
