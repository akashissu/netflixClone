'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';
import { Movie } from '@/types';
import DetailModal from './DetailModal';

interface HeroBannerProps {
  movie: Movie;
}

export default function HeroBanner({ movie }: HeroBannerProps) {
  const [muted, setMuted] = useState(true);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="relative w-full h-[85vh] min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={movie.backdropUrl}
            alt={movie.title}
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
        </div>

        {/* Gradients */}
        <div className="hero-gradient absolute inset-0" />
        <div className="hero-bottom-gradient absolute bottom-0 left-0 right-0 h-48" />

        {/* Content */}
        <div className="absolute bottom-32 left-4 md:left-12 max-w-lg animate-fade-in">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-netflix-red text-white text-xs font-bold px-2 py-1 rounded">
              {movie.badge || 'TOP 10'}
            </span>
            <span className="text-netflix-lightgray text-sm">#1 in Movies Today</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            {movie.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-green-400 font-semibold text-sm">{movie.matchScore}% Match</span>
            <span className="text-netflix-lightgray text-sm">{movie.year}</span>
            <span className="border border-netflix-lightgray text-netflix-lightgray text-xs px-1">
              {movie.rating}
            </span>
            <span className="text-netflix-lightgray text-sm">{movie.duration}</span>
          </div>

          {/* Description */}
          <p className="text-white text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
            {movie.description}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded hover:bg-gray-200 transition-colors text-sm md:text-base">
              <FaPlay size={16} />
              Play
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-gray-600 bg-opacity-70 text-white font-semibold px-6 py-3 rounded hover:bg-opacity-50 transition-colors text-sm md:text-base"
            >
              <FaInfoCircle size={16} />
              More Info
            </button>
          </div>
        </div>

        {/* Mute button */}
        <button
          onClick={() => setMuted(!muted)}
          className="absolute bottom-32 right-4 md:right-12 border border-netflix-lightgray text-white p-2 rounded-full hover:border-white transition-colors"
        >
          {muted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
        </button>

        {/* Age rating badge */}
        <div className="absolute bottom-32 right-16 md:right-24 border-l-4 border-netflix-lightgray bg-black bg-opacity-50 px-3 py-1">
          <span className="text-netflix-lightgray text-sm">{movie.rating}</span>
        </div>
      </div>

      {showModal && (
        <DetailModal movie={movie} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
