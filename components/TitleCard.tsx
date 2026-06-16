'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Title } from '@/types';
import { cn } from '@/lib/utils';

interface TitleCardProps {
  title: Title;
}

export function TitleCard({ title }: TitleCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={`/title/${title.id}`}>
      <div
        className={cn(
          'relative flex-shrink-0 w-40 md:w-48 cursor-pointer transition-transform duration-300 rounded overflow-hidden',
          isHovered && 'scale-105 z-10 shadow-2xl'
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Poster */}
        <div className="relative aspect-[2/3] bg-netflix-dark">
          {!imgError ? (
            <Image
              src={title.posterPath}
              alt={title.title}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
              sizes="(max-width: 768px) 160px, 192px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-netflix-dark">
              <span className="text-netflix-gray text-xs text-center px-2">{title.title}</span>
            </div>
          )}

          {/* Hover Overlay */}
          {isHovered && (
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-3">
              <p className="text-white text-xs font-semibold line-clamp-2 mb-1">{title.title}</p>
              <div className="flex items-center space-x-2">
                <span className="text-green-400 text-xs">
                  {Math.round(title.voteAverage * 10)}% Match
                </span>
                <span className="text-netflix-lightgray text-xs">{title.releaseYear}</span>
              </div>
              <div className="flex items-center space-x-1 mt-2">
                <button
                  className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-white/80"
                  aria-label="Play"
                  onClick={(e) => e.preventDefault()}
                >
                  <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <button
                  className="w-7 h-7 border border-netflix-gray rounded-full flex items-center justify-center hover:border-white"
                  aria-label="Add to list"
                  onClick={(e) => e.preventDefault()}
                >
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
