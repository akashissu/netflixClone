'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { VideoPlayer } from '@/components/VideoPlayer';
import { getImageUrl, formatRuntime, formatDate } from '@/lib/utils';
import type { TMDBTitle } from '@/types';

interface DetailModalProps {
  title: TMDBTitle;
  onClose?: () => void;
  isModal?: boolean;
}

export function DetailModal({ title, onClose, isModal = false }: DetailModalProps) {
  const [inMyList, setInMyList] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [mounted, setMounted] = useState(false);

  const displayTitle = title.title || title.name || 'Unknown Title';
  const backdropUrl = getImageUrl(title.backdrop_path, 'w1280');
  const mediaType = title.media_type || 'movie';
  const year = title.release_date
    ? new Date(title.release_date).getFullYear()
    : title.first_air_date
    ? new Date(title.first_air_date).getFullYear()
    : null;

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('netflix-my-list');
    if (stored) {
      try {
        const list: TMDBTitle[] = JSON.parse(stored);
        setInMyList(list.some((item) => item.id === title.id));
      } catch {
        setInMyList(false);
      }
    }
  }, [title.id]);

  useEffect(() => {
    if (isModal) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isModal]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const toggleMyList = () => {
    if (!mounted) return;
    const stored = localStorage.getItem('netflix-my-list');
    let list: TMDBTitle[] = [];
    if (stored) {
      try { list = JSON.parse(stored); } catch { list = []; }
    }
    if (inMyList) {
      list = list.filter((item) => item.id !== title.id);
    } else {
      list.push(title);
    }
    localStorage.setItem('netflix-my-list', JSON.stringify(list));
    setInMyList(!inMyList);
  };

  const content = (
    <div
      className={`bg-netflix-dark-gray rounded-lg overflow-hidden ${
        isModal ? 'max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto' : 'w-full'
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Backdrop / Video */}
      <div className="relative aspect-video w-full">
        {showPlayer ? (
          <VideoPlayer title={displayTitle} />
        ) : (
          <>
            {backdropUrl ? (
              <Image
                src={backdropUrl}
                alt={displayTitle}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark-gray via-transparent to-transparent" />

            {/* Play button overlay */}
            <button
              onClick={() => setShowPlayer(true)}
              className="absolute inset-0 flex items-center justify-center group"
              aria-label="Play trailer"
            >
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-200 backdrop-blur-sm">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </>
        )}

        {/* Close button */}
        {isModal && onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-netflix-dark-gray rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors z-10"
            aria-label="Close"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Title overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">{displayTitle}</h2>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Action buttons */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setShowPlayer(true)}
            className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-2 rounded hover:bg-gray-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play
          </button>

          <button
            onClick={toggleMyList}
            className="w-10 h-10 rounded-full border-2 border-gray-400 hover:border-white flex items-center justify-center transition-colors"
            aria-label={inMyList ? 'Remove from My List' : 'Add to My List'}
          >
            {inMyList ? (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            )}
          </button>

          <button
            className="w-10 h-10 rounded-full border-2 border-gray-400 hover:border-white flex items-center justify-center transition-colors"
            aria-label="Like"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
          </button>

          {isModal && (
            <Link
              href={`/title/${title.id}?type=${mediaType}`}
              className="ml-auto w-10 h-10 rounded-full border-2 border-gray-400 hover:border-white flex items-center justify-center transition-colors"
              aria-label="View full details"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          )}
        </div>

        {/* Metadata row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3 text-sm">
              {title.vote_average && (
                <span className="text-green-400 font-semibold">
                  {Math.round(title.vote_average * 10)}% Match
                </span>
              )}
              {year && <span className="text-gray-300">{year}</span>}
              {title.runtime && (
                <span className="text-gray-300">{formatRuntime(title.runtime)}</span>
              )}
              {title.number_of_seasons && (
                <span className="text-gray-300">
                  {title.number_of_seasons} Season{title.number_of_seasons !== 1 ? 's' : ''}
                </span>
              )}
              <span className="maturity-badge">16+</span>
            </div>

            {title.overview && (
              <p className="text-gray-300 text-sm leading-relaxed">{title.overview}</p>
            )}
          </div>

          <div className="space-y-2 text-sm">
            {title.genres && title.genres.length > 0 && (
              <div>
                <span className="text-gray-500">Genres: </span>
                <span className="text-gray-300">
                  {title.genres.map((g) => g.name).join(', ')}
                </span>
              </div>
            )}
            {title.vote_average && (
              <div>
                <span className="text-gray-500">Rating: </span>
                <span className="text-gray-300">
                  ⭐ {title.vote_average.toFixed(1)} / 10
                </span>
              </div>
            )}
            {title.vote_count && (
              <div>
                <span className="text-gray-500">Votes: </span>
                <span className="text-gray-300">{title.vote_count.toLocaleString()}</span>
              </div>
            )}
            {title.original_language && (
              <div>
                <span className="text-gray-500">Language: </span>
                <span className="text-gray-300 uppercase">{title.original_language}</span>
              </div>
            )}
            {title.release_date && (
              <div>
                <span className="text-gray-500">Release Date: </span>
                <span className="text-gray-300">{formatDate(title.release_date)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Similar titles placeholder */}
        {title.similar && title.similar.length > 0 && (
          <div className="mt-8">
            <h3 className="text-white font-semibold mb-4">More Like This</h3>
            <div className="grid grid-cols-3 gap-3">
              {title.similar.slice(0, 6).map((item) => (
                <Link
                  key={item.id}
                  href={`/title/${item.id}?type=${mediaType}`}
                  className="group"
                >
                  <div className="relative aspect-video rounded overflow-hidden mb-1">
                    {item.backdrop_path ? (
                      <Image
                        src={getImageUrl(item.backdrop_path, 'w300') || ''}
                        alt={item.title || item.name || ''}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="200px"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-800" />
                    )}
                  </div>
                  <p className="text-gray-300 text-xs truncate group-hover:text-white transition-colors">
                    {item.title || item.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (!isModal) return content;

  return (
    <div
      className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      {content}
    </div>
  );
}
