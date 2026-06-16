'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play, Info, Plus, Volume2 } from './icons';
import { Movie } from '@/types';
import { cn } from '@/lib/utils';

interface HeroBannerProps {
  movie: Movie;
}

export default function HeroBanner({ movie }: HeroBannerProps) {
  const [muted, setMuted] = useState(true);
  const [added, setAdded] = useState(false);

  return (
    <div className="relative w-full h-[56vw] min-h-[400px] max-h-[800px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={movie.backdropUrl}
          alt={movie.title}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      {/* Gradients */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute bottom-0 left-0 right-0 h-48 hero-bottom-gradient" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-32 px-4 md:px-8 lg:px-16">
        <div className="max-w-xl animate-fade-in">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-netflix-red text-white text-xs font-bold px-2 py-0.5 rounded">
              {movie.badge || 'TOP PICK'}
            </span>
            <span className="text-gray-300 text-sm">{movie.year}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 leading-tight">
            {movie.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-green-400 font-semibold text-sm">{movie.matchScore}% Match</span>
            <span className="border border-gray-500 text-gray-300 text-xs px-1.5 py-0.5">{movie.rating}</span>
            <span className="text-gray-300 text-sm">{movie.duration}</span>
            <span className="border border-gray-500 text-gray-300 text-xs px-1.5 py-0.5">HD</span>
          </div>

          {/* Description */}
          <p className="text-gray-200 text-sm md:text-base line-clamp-3 mb-6 max-w-lg">
            {movie.description}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded font-bold text-sm md:text-base hover:bg-gray-200 transition-colors">
              <Play size={20} />
              Play
            </button>

            <button className="flex items-center gap-2 bg-gray-600/70 text-white px-6 py-2.5 rounded font-semibold text-sm md:text-base hover:bg-gray-500/70 transition-colors">
              <Info size={20} />
              More Info
            </button>

            <button
              onClick={() => setAdded(!added)}
              className={cn(
                'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors',
                added ? 'border-white bg-white/20' : 'border-gray-400 hover:border-white'
              )}
              aria-label="Add to My List"
            >
              <Plus size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Mute button */}
      <button
        onClick={() => setMuted(!muted)}
        className="absolute bottom-32 right-4 md:right-8 lg:right-16 flex items-center justify-center w-10 h-10 rounded-full border border-gray-400 text-white hover:border-white transition-colors"
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        <Volume2 size={18} />
      </button>
    </div>
  );
}
