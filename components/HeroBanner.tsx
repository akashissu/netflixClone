'use client';

import Link from 'next/link';
import { Title } from '@/types';

interface HeroBannerProps {
  movie: Title;
}

export function HeroBanner({ movie }: HeroBannerProps) {
  return (
    <div className="relative w-full h-[85vh] min-h-[500px] overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${movie.backdropPath || movie.posterPath})`,
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 lg:px-16 pb-32 md:pb-40">
        <div className="max-w-2xl">
          {/* Badge */}
          {movie.isNetflixOriginal && (
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-netflix-red font-bold text-sm tracking-widest uppercase">
                N
              </span>
              <span className="text-white text-sm tracking-widest uppercase font-light">
                Series
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {movie.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-green-400 font-semibold text-sm">
              {movie.voteAverage * 10}% Match
            </span>
            <span className="text-netflix-lightgray text-sm">{movie.releaseYear}</span>
            {movie.maturityRating && (
              <span className="border border-netflix-gray text-netflix-lightgray text-xs px-1.5 py-0.5">
                {movie.maturityRating}
              </span>
            )}
            {movie.duration && (
              <span className="text-netflix-lightgray text-sm">{movie.duration}</span>
            )}
          </div>

          {/* Description */}
          <p className="text-white text-sm md:text-base line-clamp-3 mb-6 max-w-xl">
            {movie.overview}
          </p>

          {/* Buttons */}
          <div className="flex items-center space-x-3">
            <Link
              href={`/title/${movie.id}`}
              className="flex items-center space-x-2 bg-white text-black px-6 py-2.5 rounded font-semibold hover:bg-white/80 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>Play</span>
            </Link>
            <Link
              href={`/title/${movie.id}`}
              className="flex items-center space-x-2 bg-netflix-gray/50 text-white px-6 py-2.5 rounded font-semibold hover:bg-netflix-gray/40 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>More Info</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
