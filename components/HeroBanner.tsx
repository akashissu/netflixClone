'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { TMDBTitle } from '@/types';
import { getImageUrl, getTitleText, getDisplayDate, truncateText } from '@/lib/utils';
import DetailModal from '@/components/DetailModal';

interface HeroBannerProps {
  title: TMDBTitle;
}

export default function HeroBanner({ title }: HeroBannerProps) {
  const [showModal, setShowModal] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const backdropUrl = getImageUrl(title.backdrop_path, 'original');
  const titleText = getTitleText(title);
  const releaseYear = getDisplayDate(title);
  const description = truncateText(title.overview, 200);

  return (
    <>
      <div className="relative w-full h-[56.25vw] max-h-[80vh] min-h-[400px] overflow-hidden">
        {/* Background image */}
        {backdropUrl ? (
          <Image
            src={backdropUrl}
            alt={titleText}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-netflix-dark-gray to-netflix-black" />
        )}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/90 via-netflix-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-netflix-black to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-12 pb-16">
          <div className="max-w-xl animate-slide-up">
            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-3 text-shadow-lg leading-tight">
              {titleText}
            </h1>

            {/* Meta info */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-green-400 font-semibold text-sm">
                {Math.round(title.vote_average * 10)}% Match
              </span>
              {releaseYear && (
                <span className="text-white/70 text-sm">{releaseYear}</span>
              )}
              <span className="border border-white/40 text-white/70 text-xs px-1.5 py-0.5 rounded">
                {title.media_type === 'tv' ? 'TV-MA' : 'PG-13'}
              </span>
              {title.media_type === 'tv' && (
                <span className="text-white/70 text-sm">Multiple Seasons</span>
              )}
            </div>

            {/* Description */}
            <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6 text-shadow">
              {description}
            </p>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <button className="netflix-btn-primary text-sm md:text-base px-6 py-2.5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="netflix-btn-secondary text-sm md:text-base px-6 py-2.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                More Info
              </button>
            </div>
          </div>
        </div>

        {/* Mute button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-24 right-4 md:right-12 w-10 h-10 rounded-full border-2 border-white/50 flex items-center justify-center text-white hover:border-white transition-colors"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-3.536-9.536a5 5 0 000 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>

        {/* Age rating badge */}
        <div className="absolute bottom-24 right-16 md:right-24 border-l-4 border-white/60 bg-black/40 px-3 py-1">
          <span className="text-white/80 text-sm font-medium">
            {title.media_type === 'tv' ? 'TV-MA' : 'PG-13'}
          </span>
        </div>
      </div>

      {showModal && (
        <DetailModal title={title} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
