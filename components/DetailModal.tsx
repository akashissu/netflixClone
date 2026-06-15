'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiX, FiPlay, FiPlus, FiCheck, FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { MovieDetails } from '@/types';
import { getImageUrl } from '@/lib/tmdb';
import { isInMyList, addToMyList, removeFromMyList } from '@/lib/myList';
import VideoPlayer from './VideoPlayer';
import GenreBadge from './GenreBadge';

interface DetailModalProps {
  details: MovieDetails;
  trailerKey: string | null;
  mediaType: string;
}

export default function DetailModal({ details, trailerKey, mediaType }: DetailModalProps) {
  const router = useRouter();
  const [inList, setInList] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setInList(isInMyList(details.id));
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [details.id]);

  const handleClose = () => {
    router.back();
  };

  const handleListToggle = () => {
    if (inList) {
      removeFromMyList(details.id);
      setInList(false);
    } else {
      addToMyList({
        id: details.id,
        title: details.title,
        name: details.name,
        poster_path: details.poster_path,
        backdrop_path: details.backdrop_path,
        overview: details.overview,
        vote_average: details.vote_average,
        release_date: details.release_date,
        first_air_date: details.first_air_date,
        media_type: mediaType,
        genre_ids: details.genres?.map((g) => g.id) || [],
      });
      setInList(true);
    }
    window.dispatchEvent(new Event('myListUpdated'));
  };

  const title = details.title || details.name || 'Unknown Title';
  const releaseYear = details.release_date
    ? new Date(details.release_date).getFullYear()
    : details.first_air_date
    ? new Date(details.first_air_date).getFullYear()
    : null;

  const backdropUrl = details.backdrop_path
    ? getImageUrl(details.backdrop_path, 'w1280')
    : null;

  const runtime = details.runtime
    ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`
    : details.episode_run_time?.[0]
    ? `${details.episode_run_time[0]}m per episode`
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto modal-backdrop bg-black/75"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-3xl mx-auto my-8 bg-netflix-dark rounded-lg overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-netflix-dark rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
          aria-label="Close"
        >
          <FiX size={20} className="text-white" />
        </button>

        {/* Hero / Trailer Area */}
        <div className="relative aspect-video bg-black">
          {showTrailer && trailerKey ? (
            <VideoPlayer trailerKey={trailerKey} title={title} />
          ) : (
            <>
              {backdropUrl && !imgError ? (
                <Image
                  src={backdropUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  onError={() => setImgError(true)}
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-netflix-black" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark via-transparent to-transparent" />

              {/* Play Trailer Button Overlay */}
              {trailerKey && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="absolute inset-0 flex items-center justify-center group"
                  aria-label="Play trailer"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors backdrop-blur-sm">
                    <FiPlay size={28} className="text-white ml-1" fill="white" />
                  </div>
                </button>
              )}
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title and Action Buttons */}
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white pr-4">{title}</h1>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => trailerKey && setShowTrailer(true)}
              className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200 transition-colors disabled:opacity-50"
              disabled={!trailerKey}
            >
              <FiPlay size={18} fill="black" />
              {trailerKey ? 'Play Trailer' : 'No Trailer'}
            </button>

            <button
              onClick={handleListToggle}
              className="w-10 h-10 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition-colors"
              aria-label={inList ? 'Remove from My List' : 'Add to My List'}
              title={inList ? 'Remove from My List' : 'Add to My List'}
            >
              {inList ? (
                <FiCheck size={18} className="text-white" />
              ) : (
                <FiPlus size={18} className="text-white" />
              )}
            </button>

            <button
              className="w-10 h-10 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition-colors"
              aria-label="Like"
            >
              <FiThumbsUp size={16} className="text-white" />
            </button>

            <button
              className="w-10 h-10 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition-colors"
              aria-label="Dislike"
            >
              <FiThumbsDown size={16} className="text-white" />
            </button>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {/* Stats Row */}
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                {details.vote_average && details.vote_average > 0 && (
                  <span className="text-green-400 font-bold text-sm">
                    {Math.round(details.vote_average * 10)}% Match
                  </span>
                )}
                {releaseYear && (
                  <span className="text-netflix-lightgray text-sm">{releaseYear}</span>
                )}
                {runtime && (
                  <span className="text-netflix-lightgray text-sm">{runtime}</span>
                )}
                {details.adult === false && (
                  <span className="border border-gray-500 text-netflix-lightgray text-xs px-1 py-0.5 rounded">
                    PG-13
                  </span>
                )}
              </div>

              {/* Overview */}
              <p className="text-white text-sm leading-relaxed">{details.overview}</p>
            </div>

            <div className="space-y-3">
              {/* Genres */}
              {details.genres && details.genres.length > 0 && (
                <div>
                  <span className="text-netflix-gray text-sm">Genres: </span>
                  <div className="inline-flex flex-wrap gap-1 mt-1">
                    {details.genres.map((genre) => (
                      <GenreBadge key={genre.id} name={genre.name} />
                    ))}
                  </div>
                </div>
              )}

              {/* Cast */}
              {details.credits?.cast && details.credits.cast.length > 0 && (
                <div>
                  <span className="text-netflix-gray text-sm">Cast: </span>
                  <span className="text-white text-sm">
                    {details.credits.cast
                      .slice(0, 5)
                      .map((c) => c.name)
                      .join(', ')}
                  </span>
                </div>
              )}

              {/* Director */}
              {details.credits?.crew && (
                <div>
                  {(() => {
                    const director = details.credits?.crew?.find(
                      (c) => c.job === 'Director'
                    );
                    return director ? (
                      <>
                        <span className="text-netflix-gray text-sm">Director: </span>
                        <span className="text-white text-sm">{director.name}</span>
                      </>
                    ) : null;
                  })()}
                </div>
              )}

              {/* Status */}
              {details.status && (
                <div>
                  <span className="text-netflix-gray text-sm">Status: </span>
                  <span className="text-white text-sm">{details.status}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
