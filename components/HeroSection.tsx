'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiPlay, FiInfo } from 'react-icons/fi';
import { Movie } from '@/types';
import { getImageUrl } from '@/lib/tmdb';

interface HeroSectionProps {
  featured: Movie | null;
}

export default function HeroSection({ featured }: HeroSectionProps) {
  const router = useRouter();
  const [imgError, setImgError] = useState(false);

  if (!featured) {
    return (
      <div className="relative w-full h-[56.25vw] max-h-[80vh] min-h-[400px] bg-netflix-dark flex items-center justify-center">
        <p className="text-netflix-lightgray">No featured content available</p>
      </div>
    );
  }

  const backdropUrl = featured.backdrop_path
    ? getImageUrl(featured.backdrop_path, 'original')
    : null;

  const title = featured.title || featured.name || 'Unknown Title';
  const overview = featured.overview || '';
  const mediaType = featured.media_type || 'movie';

  return (
    <div className="relative w-full h-[56.25vw] max-h-[85vh] min-h-[400px] overflow-hidden">
      {/* Backdrop Image */}
      {backdropUrl && !imgError ? (
        <Image
          src={backdropUrl}
          alt={title}
          fill
          priority
          className="object-cover object-center"
          onError={() => setImgError(true)}
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-netflix-black" />
      )}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-netflix-black to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 lg:px-16 pb-32 md:pb-40">
        <div className="max-w-2xl">
          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight drop-shadow-lg">
            {title}
          </h1>

          {/* Overview */}
          <p className="text-sm md:text-base lg:text-lg text-white/90 mb-6 line-clamp-3 drop-shadow max-w-xl">
            {overview}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(`/title/${featured.id}?type=${mediaType}`)}
              className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded font-bold text-sm md:text-base hover:bg-gray-200 transition-colors"
            >
              <FiPlay size={20} fill="black" />
              Play
            </button>

            <button
              onClick={() => router.push(`/title/${featured.id}?type=${mediaType}`)}
              className="flex items-center gap-2 bg-gray-500/70 text-white px-6 md:px-8 py-2 md:py-3 rounded font-bold text-sm md:text-base hover:bg-gray-500/90 transition-colors backdrop-blur-sm"
            >
              <FiInfo size={20} />
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Rating badge */}
      {featured.vote_average && featured.vote_average > 0 && (
        <div className="absolute top-1/3 right-4 md:right-8 lg:right-16 flex items-center gap-2 border-l-4 border-netflix-lightgray pl-3">
          <span className="text-white font-semibold text-sm md:text-base">
            {Math.round(featured.vote_average * 10)}% Match
          </span>
        </div>
      )}
    </div>
  );
}
