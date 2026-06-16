'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DetailModal } from '@/components/DetailModal';
import { getImageUrl, truncateText } from '@/lib/utils';
import type { TMDBTitle } from '@/types';

interface HeroSectionProps {
  title: TMDBTitle;
}

export function HeroSection({ title }: HeroSectionProps) {
  const [showModal, setShowModal] = useState(false);

  const backdropUrl = getImageUrl(title.backdrop_path, 'original');
  const displayTitle = title.title || title.name || 'Unknown Title';
  const overview = truncateText(title.overview || '', 200);
  const mediaType = title.media_type || 'movie';

  return (
    <>
      <div className="relative w-full h-[85vh] min-h-[500px] overflow-hidden">
        {/* Background image */}
        {backdropUrl ? (
          <Image
            src={backdropUrl}
            alt={displayTitle}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700" />
        )}

        {/* Gradient overlays */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute bottom-0 left-0 right-0 h-48 hero-bottom-gradient" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-32 px-8 md:px-16 max-w-3xl">
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg animate-fade-in">
            {displayTitle}
          </h1>

          {/* Metadata */}
          <div className="flex items-center gap-3 mb-4 text-sm">
            {title.vote_average && (
              <span className="text-green-400 font-semibold">
                {Math.round(title.vote_average * 10)}% Match
              </span>
            )}
            {title.release_date && (
              <span className="text-gray-300">{new Date(title.release_date).getFullYear()}</span>
            )}
            {title.first_air_date && (
              <span className="text-gray-300">{new Date(title.first_air_date).getFullYear()}</span>
            )}
            <span className="maturity-badge">16+</span>
            {title.original_language && (
              <span className="text-gray-300 uppercase">{title.original_language}</span>
            )}
          </div>

          {/* Overview */}
          {overview && (
            <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-6 max-w-xl drop-shadow">
              {overview}
            </p>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <Link
              href={`/title/${title.id}?type=${mediaType}`}
              className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-2.5 rounded hover:bg-gray-200 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </Link>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-gray-600 bg-opacity-70 hover:bg-opacity-90 text-white font-semibold px-6 py-2.5 rounded transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              More Info
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <DetailModal title={title} onClose={() => setShowModal(false)} isModal />
      )}
    </>
  );
}
