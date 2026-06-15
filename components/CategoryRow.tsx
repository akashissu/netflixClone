'use client';

import { useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import MovieCard from './MovieCard';
import { Movie } from '@/types';

interface CategoryRowProps {
  title: string;
  items: Movie[];
  mediaType?: string;
}

export default function CategoryRow({ title, items, mediaType }: CategoryRowProps) {
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
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="px-4 md:px-8 lg:px-16">
      <h2 className="text-lg md:text-xl font-bold text-white mb-3">{title}</h2>

      <div className="relative group">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-10 w-10 md:w-12 bg-black/50 hover:bg-black/80 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            aria-label="Scroll left"
          >
            <FiChevronLeft className="text-white" size={28} />
          </button>
        )}

        {/* Scrollable Row */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex gap-2 overflow-x-auto hide-scrollbar pb-2"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {items.map((item) => (
            <div
              key={`${item.id}-${item.media_type || mediaType}`}
              className="flex-shrink-0"
              style={{ scrollSnapAlign: 'start' }}
            >
              <MovieCard
                item={{
                  ...item,
                  media_type: item.media_type || mediaType || 'movie',
                }}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-10 w-10 md:w-12 bg-black/50 hover:bg-black/80 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            aria-label="Scroll right"
          >
            <FiChevronRight className="text-white" size={28} />
          </button>
        )}
      </div>
    </div>
  );
}
