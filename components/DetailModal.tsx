'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { FaPlay, FaPlus, FaThumbsUp } from 'react-icons/fa';
import { FiX, FiVolume2 } from 'react-icons/fi';
import { Movie } from '@/types';

interface DetailModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function DetailModal({ movie, onClose }: DetailModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop p-4"
      onClick={onClose}
    >
      <div
        className="bg-netflix-dark rounded-lg overflow-hidden w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Image */}
        <div className="relative w-full aspect-video">
          <Image
            src={movie.backdropUrl}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 672px) 100vw, 672px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark via-transparent to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-netflix-dark rounded-full p-2 hover:bg-gray-700 transition-colors"
          >
            <FiX className="text-white" size={20} />
          </button>

          {/* Volume button */}
          <button className="absolute bottom-4 right-4 border border-netflix-lightgray rounded-full p-2 hover:border-white transition-colors">
            <FiVolume2 className="text-white" size={16} />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-4 left-6">
            <h2 className="text-white text-3xl font-black">{movie.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Action buttons */}
          <div className="flex items-center gap-3 mb-6">
            <button className="flex items-center gap-2 bg-white text-black font-bold px-6 py-2 rounded hover:bg-gray-200 transition-colors">
              <FaPlay size={14} />
              Play
            </button>
            <button className="border-2 border-gray-400 text-white rounded-full p-2 hover:border-white transition-colors">
              <FaPlus size={16} />
            </button>
            <button className="border-2 border-gray-400 text-white rounded-full p-2 hover:border-white transition-colors">
              <FaThumbsUp size={16} />
            </button>
          </div>

          {/* Meta info */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-green-400 font-semibold">{movie.matchScore}% Match</span>
                <span className="text-netflix-lightgray text-sm">{movie.year}</span>
                <span className="border border-netflix-lightgray text-netflix-lightgray text-xs px-1">
                  {movie.rating}
                </span>
                <span className="text-netflix-lightgray text-sm">{movie.duration}</span>
              </div>
              <p className="text-white text-sm leading-relaxed">{movie.description}</p>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-netflix-lightgray text-sm">Cast: </span>
                <span className="text-white text-sm">{movie.cast?.join(', ')}</span>
              </div>
              <div>
                <span className="text-netflix-lightgray text-sm">Genres: </span>
                <span className="text-white text-sm">{movie.genres.join(', ')}</span>
              </div>
              {movie.director && (
                <div>
                  <span className="text-netflix-lightgray text-sm">Director: </span>
                  <span className="text-white text-sm">{movie.director}</span>
                </div>
              )}
            </div>
          </div>

          {/* More like this */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">More Like This</h3>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-800 rounded overflow-hidden">
                  <div className="aspect-video bg-gray-700 flex items-center justify-center">
                    <FaPlay className="text-gray-500" size={20} />
                  </div>
                  <div className="p-2">
                    <p className="text-white text-xs font-medium">Similar Title {i}</p>
                    <p className="text-netflix-lightgray text-xs mt-1">2024 • Action</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
