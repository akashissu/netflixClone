'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Movie } from '@/types';

interface HeroBannerProps {
  movie: Movie;
}

export function HeroBanner({ movie }: HeroBannerProps) {
  const [muted, setMuted] = useState(true);

  return (
    <div
      className="relative w-full h-[85vh] bg-cover bg-center flex items-end"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%), linear-gradient(to top, #141414 0%, transparent 30%), url(${movie.backdrop})`
      }}
    >
      {/* Content */}
      <div className="px-8 md:px-16 pb-32 max-w-2xl">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
          {movie.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4 text-sm">
          <span className="text-green-400 font-bold text-base">{movie.score}% Match</span>
          <span className="text-gray-300">{movie.year}</span>
          <span className="border border-gray-500 px-2 py-0.5 text-gray-300 text-xs">{movie.rating}</span>
          <span className="text-gray-300">{movie.duration}</span>
        </div>

        {/* Description */}
        <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-6 line-clamp-3">
          {movie.description}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <Link
            href={`/title/${movie.id}`}
            className="flex items-center gap-2 bg-white text-black font-bold px-8 py-3 rounded text-lg hover:bg-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play
          </Link>
          <Link
            href={`/title/${movie.id}`}
            className="flex items-center gap-2 bg-gray-600 bg-opacity-70 text-white font-bold px-8 py-3 rounded text-lg hover:bg-opacity-90 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            More Info
          </Link>
        </div>
      </div>

      {/* Mute button */}
      <button
        onClick={() => setMuted(!muted)}
        className="absolute bottom-32 right-8 md:right-16 w-10 h-10 border-2 border-gray-400 rounded-full flex items-center justify-center text-white hover:border-white transition-colors"
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-3.536-9.536a5 5 0 000 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button>

      {/* Age rating badge */}
      <div className="absolute bottom-32 right-24 md:right-32 border-l-4 border-gray-400 bg-black/50 px-3 py-1">
        <span className="text-white text-sm font-medium">{movie.rating}</span>
      </div>
    </div>
  );
}

export default HeroBanner;
