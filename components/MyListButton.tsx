'use client';

import { useState, useEffect } from 'react';
import { Movie } from '@/types';
import { isInMyList, addToMyList, removeFromMyList } from '@/lib/myList';

interface MyListButtonProps {
  item: Movie;
  className?: string;
}

export default function MyListButton({ item, className = '' }: MyListButtonProps) {
  const [inList, setInList] = useState(false);

  useEffect(() => {
    setInList(isInMyList(item.id));
  }, [item.id]);

  const handleToggle = () => {
    if (inList) {
      removeFromMyList(item.id);
      setInList(false);
    } else {
      addToMyList(item);
      setInList(true);
    }
    window.dispatchEvent(new Event('myListUpdated'));
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-2 border-2 border-gray-400 text-white px-4 py-2 rounded font-semibold hover:border-white transition-colors ${
        inList ? 'bg-white/10' : ''
      } ${className}`}
      aria-label={inList ? 'Remove from My List' : 'Add to My List'}
    >
      {inList ? (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>In My List</span>
        </>
      ) : (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>My List</span>
        </>
      )}
    </button>
  );
}
