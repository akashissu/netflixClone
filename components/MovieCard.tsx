'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import type { Movie, TMDBTitle } from '@/types';
import { getImageUrl } from '@/lib/utils';

interface MovieCardProps {
  movie?: Movie;
  title?: TMDBTitle;
  variant?: 'default' | 'row';
}

function normalizeItem(movie?: Movie, title?: TMDBTitle): Movie {
  if (movie) {
    return {
      ...movie,
      thumbnail: movie.thumbnail ?? movie.thumbnailUrl ?? getImageUrl(movie.poster_path, 'w500'),
      thumbnailUrl: movie.thumbnailUrl ?? movie.thumbnail ?? getImageUrl(movie.poster_path, 'w500'),
      backdrop: movie.backdrop ?? movie.backdropUrl ?? getImageUrl(movie.backdrop_path, 'w780'),
      backdropUrl: movie.backdropUrl ?? movie.backdrop ?? getImageUrl(movie.backdrop_path, 'w780'),
      genre: movie.genre ?? movie.genres?.join(', ') ?? '',
      score: movie.score ?? movie.matchScore ?? (movie.vote_average ? Math.round(movie.vote_average * 10) : 0),
      matchScore: movie.matchScore ?? movie.score ?? (movie.vote_average ? Math.round(movie.vote_average * 10) : 0),
    };
  }

  return {
    id: title?.id ?? 'unknown',
    title: title?.title ?? title?.name ?? 'Unknown Title',
    description: title?.overview ?? '',
    overview: title?.overview ?? '',
    year: title?.release_date?.slice(0, 4) ?? title?.first_air_date?.slice(0, 4) ?? '—',
    rating: 'PG-13',
    duration: '—',
    type: title?.media_type === 'tv' ? 'tv' : 'movie',
    thumbnail: getImageUrl(title?.poster_path, 'w500'),
    thumbnailUrl: getImageUrl(title?.poster_path, 'w500'),
    backdrop: getImageUrl(title?.backdrop_path, 'w780'),
    backdropUrl: getImageUrl(title?.backdrop_path, 'w780'),
    genre: '',
    genres: [],
    score: Math.round((title?.vote_average ?? 0) * 10),
    matchScore: Math.round((title?.vote_average ?? 0) * 10),
    media_type: title?.media_type,
    poster_path: title?.poster_path,
    backdrop_path: title?.backdrop_path,
    vote_average: title?.vote_average,
    vote_count: title?.vote_count,
    release_date: title?.release_date,
    first_air_date: title?.first_air_date,
    genre_ids: title?.genre_ids,
    original_language: title?.original_language,
    name: title?.name,
  };
}

export function MovieCard({ movie, title, variant = 'default' }: MovieCardProps) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const item = normalizeItem(movie, title);
  const thumbnailSrc = item.thumbnailUrl || item.thumbnail || `https://picsum.photos/seed/${item.id}/400/225`;
  const genres = item.genres && item.genres.length > 0 ? item.genres : item.genre ? item.genre.split(', ').filter(Boolean) : [];

  return (
    <Link href={`/title/${item.id}`}>
      <div
        className="relative group cursor-pointer rounded overflow-hidden movie-card-hover"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className={`relative ${variant === 'row' ? 'aspect-video' : 'aspect-video'} bg-gray-800`}>
          <Image
            src={imgError ? `https://picsum.photos/seed/${item.id}/400/225` : thumbnailSrc}
            alt={item.title}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />

          <div className="absolute top-2 left-2 flex gap-1">
            {item.isNew && (
              <span className="bg-netflix-red text-white text-xs font-bold px-2 py-0.5 rounded">
                NEW
              </span>
            )}
            {item.isTrending && (
              <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded">
                TRENDING
              </span>
            )}
          </div>
        </div>

        {hovered && (
          <div className="absolute inset-0 bg-netflix-dark-gray border border-gray-700 rounded shadow-2xl z-10 flex flex-col animate-fade-in">
            <div className="relative aspect-video bg-gray-800">
              <Image
                src={imgError ? `https://picsum.photos/seed/${item.id}/400/225` : thumbnailSrc}
                alt={item.title}
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
                <span className="text-green-400 font-bold">{item.matchScore ?? item.score ?? 0}% Match</span>
                <span className="border border-gray-500 px-1 text-gray-400">{item.rating}</span>
                <span className="text-gray-400">{item.duration}</span>
              </div>
              <p className="text-gray-300 text-xs line-clamp-2">{item.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {genres.slice(0, 2).map((genre) => (
                  <span key={genre} className="text-gray-400 text-xs">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="p-2">
          <p className="text-white text-sm font-medium truncate">{item.title}</p>
          <p className="text-gray-400 text-xs">{item.year}</p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
