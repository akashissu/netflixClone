'use client';

import { useRef, useState } from 'react';
import { MovieCard } from '@/components/MovieCard';
import type { TMDBTitle } from '@/types';

interface CategoryRowProps {
  title: string;
  items: TMDBTitle[];
}

export function CategoryRow({ title, items }: CategoryRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (!rowRef.current) return;
    const scrollAmount = rowRef.current.clientWidth * 0.8;
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

  if (!items || items.length === 0) return null;

  return (
    <div className="px-4 md:px-8 group/row">
      <h2 className="text-lg md:text-xl font-semibold text-white mb-3 hover:text-gray-300 cursor-pointer transition-colors">
        {title}
        <span className="text-netflix-red text-sm ml-2 opacity-0 group-hover/row:opacity-100 transition-opacity">
          Explore All ›
        </span>
      </h2>

      <div className="relative">
        {/* Left arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-black bg-opacity-50 hover:bg-opacity-70 flex items-center justify-center text-white transition-all duration-200 rounded-r"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Scrollable row */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex gap-2 overflow-x-auto row-scroll pb-2"
        >
          {items.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-36 md:w-44 lg:w-52">
              <MovieCard title={item} variant="row" />
            </div>
          ))}
        </div>

        {/* Right arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-black bg-opacity-50 hover:bg-opacity-70 flex items-center justify-center text-white transition-all duration-200 rounded-l"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
