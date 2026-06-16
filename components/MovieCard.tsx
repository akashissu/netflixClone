'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import type { Movie } from '@/types';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={`/title/${movie.id}`}>
      <div
        className="relative group cursor-pointer rounded overflow-hidden movie-card-hover"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gray-800">
          <Image
            src={imgError ? `https://picsum.photos/seed/${movie.id}/400/225` : movie.thumbnail}
            alt={movie.title}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex gap-1">
            {movie.isNew && (
              <span className="bg-netflix-red text-white text-xs font-bold px-2 py-0.5 rounded">
                NEW
              </span>
            )}
            {movie.isTrending && (
              <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded">
                TRENDING
              </span>
            )}
          </div>
        </div>

        {/* Hover overlay */}
        {hovered && (
          <div className="absolute inset-0 bg-netflix-dark-gray border border-gray-700 rounded shadow-2xl z-10 flex flex-col animate-fade-in">
            <div className="relative aspect-video bg-gray-800">
              <Image
                src={imgError ? `https://picsum.photos/seed/${movie.id}/400/225` : movie.thumbnail}
                alt={movie.title}
                fill
                className="object-cover rounded-t"
                onError={() => setImgError(true)}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-3 flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-2">
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <svg className="w-4 h-4 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <button className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition-colors">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                <button className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition-colors">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2 text-xs mb-2">
                <span className="text-green-400 font-bold">{movie.score}% Match</span>
                <span className="border border-gray-500 px-1 text-gray-400">{movie.rating}</span>
                <span className="text-gray-400">{movie.duration}</span>
              </div>
              <p className="text-gray-300 text-xs line-clamp-2">{movie.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {movie.genre.split(', ').slice(0, 2).map((g) => (
                  <span key={g} className="text-gray-400 text-xs">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Title below card (non-hover) */}
        <div className="p-2">
          <p className="text-white text-sm font-medium truncate">{movie.title}</p>
          <p className="text-gray-400 text-xs">{movie.year}</p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
