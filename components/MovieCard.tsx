'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiPlay, FiPlus, FiCheck, FiThumbsUp } from 'react-icons/fi';
import { Movie } from '@/types';
import { getImageUrl } from '@/lib/tmdb';
import { isInMyList, addToMyList, removeFromMyList } from '@/lib/myList';

interface MovieCardProps {
  item: Movie;
}

export default function MovieCard({ item }: MovieCardProps) {
  const router = useRouter();
  const [inList, setInList] = useState(() => isInMyList(item.id));
  const [imgError, setImgError] = useState(false);

  const posterUrl = item.poster_path
    ? getImageUrl(item.poster_path, 'w342')
    : null;

  const title = item.title || item.name || 'Unknown';
  const mediaType = item.media_type || 'movie';
  const year = item.release_date
    ? new Date(item.release_date).getFullYear()
    : item.first_air_date
    ? new Date(item.first_air_date).getFullYear()
    : null;

  const handleCardClick = () => {
    router.push(`/title/${item.id}?type=${mediaType}`);
  };

  const handleListToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
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
    <div
      className="movie-card relative cursor-pointer group w-32 sm:w-36 md:w-44 lg:w-48 flex-shrink-0"
      onClick={handleCardClick}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] rounded overflow-hidden bg-netflix-dark">
        {posterUrl && !imgError ? (
          <Image
            src={posterUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, (max-width: 1024px) 176px, 192px"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
            <span className="text-white text-xs text-center px-2 font-medium">{title}</span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="card-overlay absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-2">
          <div className="flex items-center gap-1 mb-1">
            <button
              className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Play"
              onClick={handleCardClick}
            >
              <FiPlay size={12} fill="black" className="text-black" />
            </button>
            <button
              className="w-7 h-7 bg-gray-700/80 border border-gray-500 rounded-full flex items-center justify-center hover:border-white transition-colors"
              aria-label={inList ? 'Remove from My List' : 'Add to My List'}
              onClick={handleListToggle}
            >
              {inList ? (
                <FiCheck size={12} className="text-white" />
              ) : (
                <FiPlus size={12} className="text-white" />
              )}
            </button>
            <button
              className="w-7 h-7 bg-gray-700/80 border border-gray-500 rounded-full flex items-center justify-center hover:border-white transition-colors ml-auto"
              aria-label="Like"
              onClick={(e) => e.stopPropagation()}
            >
              <FiThumbsUp size={12} className="text-white" />
            </button>
          </div>

          {year && (
            <span className="text-white text-xs font-medium">{year}</span>
          )}

          {item.vote_average && item.vote_average > 0 && (
            <span className="text-green-400 text-xs font-bold">
              {Math.round(item.vote_average * 10)}% Match
            </span>
          )}
        </div>
      </div>

      {/* Title below card */}
      <p className="mt-1 text-xs text-netflix-lightgray truncate group-hover:text-white transition-colors">
        {title}
      </p>
    </div>
  );
}
