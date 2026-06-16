'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { TMDBTitle } from '@/types';
import { getImageUrl, getTitleText, getDisplayDate, formatVoteAverage } from '@/lib/utils';

interface DetailModalProps {
  title: TMDBTitle;
  onClose: () => void;
}

export default function DetailModal({ title, onClose }: DetailModalProps) {
  const backdropUrl = getImageUrl(title.backdrop_path, 'w1280');
  const posterUrl = getImageUrl(title.poster_path, 'w342');
  const titleText = getTitleText(title);
  const releaseYear = getDisplayDate(title);
  const matchScore = Math.round(title.vote_average * 10);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Modal */}
      <div
        className="relative bg-netflix-dark-gray rounded-lg overflow-hidden w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-netflix-dark-gray/80 flex items-center justify-center text-white hover:bg-netflix-mid-gray transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Hero image */}
        <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
          {backdropUrl ? (
            <Image
              src={backdropUrl}
              alt={titleText}
              fill
              className="object-cover"
              sizes="(max-width: 672px) 100vw, 672px"
            />
          ) : posterUrl ? (
            <Image
              src={posterUrl}
              alt={titleText}
              fill
              className="object-cover object-top"
              sizes="(max-width: 672px) 100vw, 672px"
            />
          ) : (
            <div className="absolute inset-0 bg-netflix-black" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark-gray via-transparent to-transparent" />

          {/* Play button overlay */}
          <div className="absolute bottom-4 left-4 flex items-center gap-3">
            <button className="netflix-btn-primary text-sm px-5 py-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </button>
            <button className="w-9 h-9 rounded-full border-2 border-white/60 flex items-center justify-center hover:border-white transition-colors">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button className="w-9 h-9 rounded-full border-2 border-white/60 flex items-center justify-center hover:border-white transition-colors">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex gap-4">
            {/* Main info */}
            <div className="flex-1">
              <h2 className="text-white text-2xl font-bold mb-2">{titleText}</h2>

              {/* Meta row */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="text-green-400 font-semibold">{matchScore}% Match</span>
                {releaseYear && <span className="text-white/60 text-sm">{releaseYear}</span>}
                <span className="border border-white/40 text-white/60 text-xs px-1.5 py-0.5 rounded">
                  {title.media_type === 'tv' ? 'TV-MA' : 'PG-13'}
                </span>
                <span className="text-white/60 text-sm">
                  ⭐ {formatVoteAverage(title.vote_average)}
                </span>
                {title.vote_count > 0 && (
                  <span className="text-white/40 text-xs">
                    ({title.vote_count.toLocaleString()} votes)
                  </span>
                )}
              </div>

              {/* Overview */}
              <p className="text-white/80 text-sm leading-relaxed">
                {title.overview || 'No description available.'}
              </p>
            </div>
          </div>

          {/* Additional details */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-white/40">Type: </span>
                <span className="text-white/80 capitalize">
                  {title.media_type === 'tv' ? 'TV Show' : 'Movie'}
                </span>
              </div>
              <div>
                <span className="text-white/40">Language: </span>
                <span className="text-white/80 uppercase">
                  {title.original_language || 'EN'}
                </span>
              </div>
              <div>
                <span className="text-white/40">Popularity: </span>
                <span className="text-white/80">
                  {Math.round(title.popularity).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-white/40">Rating: </span>
                <span className="text-white/80">
                  {formatVoteAverage(title.vote_average)} / 10
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
