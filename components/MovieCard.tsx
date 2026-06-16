'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DetailModal } from '@/components/DetailModal';
import { getImageUrl } from '@/lib/utils';
import type { TMDBTitle } from '@/types';

interface MovieCardProps {
  title: TMDBTitle;
  variant?: 'row' | 'grid';
}

export function MovieCard({ title, variant = 'row' }: MovieCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [imageError, setImageError] = useState(false);

  const displayTitle = title.title || title.name || 'Unknown';
  const mediaType = title.media_type || 'movie';
  const imageUrl = getImageUrl(
    variant === 'grid' ? title.poster_path : (title.backdrop_path || title.poster_path),
    variant === 'grid' ? 'w342' : 'w500'
  );

  const aspectClass = variant === 'grid' ? 'aspect-[2/3]' : 'aspect-video';

  return (
    <>
      <div
        className={`relative ${aspectClass} rounded-md overflow-hidden cursor-pointer movie-card group`}
        onClick={() => setShowModal(true)}
      >
        {imageUrl && !imageError ? (
          <Image
            src={imageUrl}
            alt={displayTitle}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 144px, (max-width: 1024px) 176px, 208px"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-netflix-dark-gray flex items-center justify-center">
            <div className="text-center px-2">
              <div className="text-3xl mb-2">🎬</div>
              <p className="text-gray-400 text-xs text-center line-clamp-2">{displayTitle}</p>
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300" />

        {/* Hover info */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-xs font-semibold truncate">{displayTitle}</p>
          <div className="flex items-center gap-2 mt-1">
            {title.vote_average && (
              <span className="text-green-400 text-xs">
                {Math.round(title.vote_average * 10)}%
              </span>
            )}
            <div className="flex gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Add to list logic handled in modal
                }}
                className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center hover:border-white transition-colors"
                aria-label="Add to list"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <Link
                href={`/title/${title.id}?type=${mediaType}`}
                onClick={(e) => e.stopPropagation()}
                className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center hover:border-white transition-colors"
                aria-label="More info"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <DetailModal title={title} onClose={() => setShowModal(false)} isModal />
      )}
    </>
  );
}
