'use client';

import { useState } from 'react';
import { Play, Info, VolumeX, Volume2 } from 'lucide-react';
import { Movie } from '@/types';
import { cn } from '@/lib/utils';

interface HeroBannerProps {
  movie: Movie;
}

export default function HeroBanner({ movie }: HeroBannerProps) {
  const [muted, setMuted] = useState(true);

  return (
    <div className="relative w-full h-[85vh] min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${movie.backdropUrl})` }}
      />

      {/* Gradients */}
      <div className="hero-gradient absolute inset-0" />
      <div className="hero-bottom-gradient absolute bottom-0 left-0 right-0 h-48" />
      <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent opacity-60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full pb-40 px-4 sm:px-8 lg:px-16 max-w-3xl">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-netflix-red text-white text-xs font-bold px-2 py-1 rounded">
            {movie.type === 'movie' ? 'FILM' : 'SERIES'}
          </span>
          <span className="text-gray-300 text-sm">{movie.year}</span>
          <span className="text-gray-300 text-sm">•</span>
          <span className="text-gray-300 text-sm">{movie.rating}</span>
          <span className="text-gray-300 text-sm">•</span>
          <span className="text-gray-300 text-sm">{movie.duration}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
          {movie.title}
        </h1>

        {/* Genres */}
        <div className="flex flex-wrap gap-2 mb-4">
          {movie.genre.map((g) => (
            <span key={g} className="text-gray-300 text-sm">
              {g}
            </span>
          )).reduce((acc: React.ReactNode[], el, i, arr) => {
            acc.push(el);
            if (i < arr.length - 1) acc.push(<span key={`dot-${i}`} className="text-gray-500">•</span>);
            return acc;
          }, [])}
        </div>

        {/* Description */}
        <p className="text-gray-200 text-base sm:text-lg leading-relaxed mb-8 line-clamp-3">
          {movie.description}
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-white text-black font-bold px-8 py-3 rounded hover:bg-gray-200 transition-colors text-base">
            <Play className="w-5 h-5 fill-black" />
            Play
          </button>
          <button className="flex items-center gap-2 bg-gray-500/70 text-white font-semibold px-6 py-3 rounded hover:bg-gray-500/90 transition-colors text-base backdrop-blur-sm">
            <Info className="w-5 h-5" />
            More Info
          </button>
        </div>
      </div>

      {/* Mute Button */}
      <button
        onClick={() => setMuted(!muted)}
        className={cn(
          'absolute bottom-40 right-8 lg:right-16 z-10 w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center text-white hover:border-white transition-colors',
          'bg-black/30 backdrop-blur-sm'
        )}
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
