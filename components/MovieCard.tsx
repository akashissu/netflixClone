'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play, Plus, ThumbsUp, Info } from './icons';
import { Movie } from '@/types';
import { cn } from '@/lib/utils';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);

  return (
    <div
      className={cn(
        'relative rounded overflow-hidden cursor-pointer transition-all duration-300',
        isHovered ? 'scale-110 z-20 shadow-2xl' : 'scale-100 z-0'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-800">
        <Image
          src={movie.thumbnailUrl}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 144px, (max-width: 1024px) 176px, 208px"
        />
        {!isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        )}
      </div>

      {/* Hover Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-netflix-dark rounded overflow-hidden shadow-2xl" style={{ top: '100%', left: '-10%', right: '-10%', width: '120%' }}>
          {/* Preview Image */}
          <div className="relative aspect-video bg-gray-800">
            <Image
              src={movie.thumbnailUrl}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="250px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark/80 to-transparent" />
          </div>

          {/* Info */}
          <div className="p-3">
            {/* Action buttons */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Play size={14} className="text-black ml-0.5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setAdded(!added); }}
                  className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition-colors"
                >
                  <Plus size={14} className="text-white" />
                </button>
                <button className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition-colors">
                  <ThumbsUp size={14} className="text-white" />
                </button>
              </div>
              <button className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition-colors">
                <Info size={14} className="text-white" />
              </button>
            </div>

            {/* Match & Rating */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-green-400 text-xs font-semibold">{movie.matchScore}% Match</span>
              <span className="border border-gray-500 text-gray-300 text-xs px-1">{movie.rating}</span>
            </div>

            {/* Title */}
            <p className="text-white text-xs font-semibold truncate mb-1">{movie.title}</p>

            {/* Genres */}
            <div className="flex items-center gap-1 flex-wrap">
              {movie.genres.slice(0, 3).map((genre, i) => (
                <span key={genre} className="text-gray-400 text-xs">
                  {genre}{i < Math.min(movie.genres.length, 3) - 1 ? ' •' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
