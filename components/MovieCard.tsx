'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { TMDBTitle } from '@/types';
import { getImageUrl, getTitleText, getDisplayDate, truncateText } from '@/lib/utils';
import DetailModal from '@/components/DetailModal';

interface MovieCardProps {
  title: TMDBTitle;
}

export default function MovieCard({ title }: MovieCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const posterUrl = getImageUrl(title.poster_path, 'w342');
  const backdropUrl = getImageUrl(title.backdrop_path, 'w500');
  const titleText = getTitleText(title);
  const releaseYear = getDisplayDate(title);
  const matchScore = Math.round(title.vote_average * 10);

  const displayImage = isHovered ? (backdropUrl || posterUrl) : posterUrl;

  return (
    <>
      <div
        className="relative w-32 md:w-44 lg:w-52 cursor-pointer group/card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowModal(true)}
      >
        {/* Card image */}
        <div
          className={`relative overflow-hidden rounded transition-all duration-300 ${
            isHovered ? 'scale-110 shadow-2xl z-10' : 'scale-100'
          }`}
          style={{ aspectRatio: isHovered ? '16/9' : '2/3' }}
        >
          {displayImage && !imgError ? (
            <Image
              src={displayImage}
              alt={titleText}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 128px, (max-width: 1024px) 176px, 208px"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 bg-netflix-dark-gray flex items-center justify-center">
              <div className="text-center px-2">
                <svg className="w-8 h-8 text-white/30 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
                <p className="text-white/50 text-xs leading-tight">{titleText}</p>
              </div>
            </div>
          )}

          {/* Hover overlay */}
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-2">
                {/* Action buttons */}
                <div className="flex items-center gap-1 mb-1">
                  <button
                    className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-white/80 transition-colors"
                    aria-label="Play"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <button
                    className="w-7 h-7 rounded-full border-2 border-white/60 flex items-center justify-center hover:border-white transition-colors"
                    aria-label="Add to list"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  <button
                    className="w-7 h-7 rounded-full border-2 border-white/60 flex items-center justify-center hover:border-white transition-colors"
                    aria-label="Like"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                  </button>
                  <button
                    className="w-7 h-7 rounded-full border-2 border-white/60 flex items-center justify-center hover:border-white transition-colors ml-auto"
                    aria-label="More info"
                    onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
                  >
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-green-400 text-xs font-semibold">{matchScore}%</span>
                  {releaseYear && <span className="text-white/60 text-xs">{releaseYear}</span>}
                </div>

                {/* Title */}
                <p className="text-white text-xs font-medium mt-0.5 leading-tight line-clamp-1">
                  {titleText}
                </p>

                {/* Overview snippet */}
                {title.overview && (
                  <p className="text-white/60 text-xs mt-0.5 line-clamp-2 leading-tight">
                    {truncateText(title.overview, 80)}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Title below card (non-hovered) */}
        {!isHovered && (
          <p className="text-white/70 text-xs mt-1 truncate px-0.5">{titleText}</p>
        )}
      </div>

      {showModal && (
        <DetailModal title={title} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
