'use client';

import { useState } from 'react';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
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
      <div
        className="w-full aspect-video bg-zinc-800 bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.thumbnailUrl})` }}
      >
        {/* Fallback gradient */}
        <div
          className="w-full h-full flex items-end p-2"
          style={{
            background: `linear-gradient(135deg, ${movie.color || '#1a1a2e'} 0%, ${movie.colorEnd || '#16213e'} 100%)`,
          }}
        >
          {!movie.thumbnailUrl && (
            <span className="text-white text-xs font-bold line-clamp-2">{movie.title}</span>
          )}
        </div>
      </div>

      {/* Hover Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-netflix-dark rounded overflow-hidden animate-fade-in">
          {/* Preview Image */}
          <div
            className="w-full h-28 bg-cover bg-center"
            style={{
              backgroundImage: `url(${movie.backdropUrl || movie.thumbnailUrl})`,
              background: !movie.backdropUrl
                ? `linear-gradient(135deg, ${movie.color || '#1a1a2e'} 0%, ${movie.colorEnd || '#16213e'} 100%)`
                : undefined,
            }}
          >
            <div className="w-full h-full bg-gradient-to-t from-netflix-dark to-transparent flex items-center justify-center">
              <Play className="w-10 h-10 text-white fill-white opacity-80" />
            </div>
          </div>

          {/* Card Info */}
          <div className="p-3">
            {/* Action Buttons */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Play className="w-4 h-4 text-black fill-black" />
                </button>
                <button
                  onClick={() => setAdded(!added)}
                  className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition-colors"
                >
                  <Plus className={cn('w-4 h-4', added ? 'text-netflix-red' : 'text-white')} />
                </button>
                <button className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition-colors">
                  <ThumbsUp className="w-4 h-4 text-white" />
                </button>
              </div>
              <button className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition-colors">
                <ChevronDown className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Title */}
            <p className="text-white text-xs font-bold mb-1 line-clamp-1">{movie.title}</p>

            {/* Match & Info */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-400 text-xs font-semibold">{movie.matchPercent}% Match</span>
              <span className="border border-gray-500 text-gray-400 text-xs px-1">{movie.ageRating}</span>
              <span className="text-gray-400 text-xs">{movie.duration}</span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-1">
              {movie.genre.slice(0, 2).map((g, i) => (
                <span key={g} className="text-gray-400 text-xs">
                  {g}{i < Math.min(movie.genre.length, 2) - 1 ? ' •' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
