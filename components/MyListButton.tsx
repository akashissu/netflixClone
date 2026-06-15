'use client';

import { useState, useEffect } from 'react';
import { FiPlus, FiCheck } from 'react-icons/fi';
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
          <FiCheck size={18} />
          <span>In My List</span>
        </>
      ) : (
        <>
          <FiPlus size={18} />
          <span>My List</span>
        </>
      )}
    </button>
  );
}
