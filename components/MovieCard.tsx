'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaPlay, FaPlus, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import { Movie } from '@/types';
import DetailModal from './DetailModal';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [inList, setInList] = useState(false);

  return (
    <>
      <div
        className="relative flex-shrink-0 w-36 md:w-48 lg:w-56 cursor-pointer group/card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Thumbnail */}
        <div className="relative w-full aspect-video rounded overflow-hidden card-hover">
          <Image
            src={movie.thumbnailUrl}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 144px, (max-width: 1024px) 192px, 224px"
          />

          {/* Hover overlay */}
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <button className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-all">
                <FaPlay className="text-black" size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Expanded card on hover */}
        {isHovered && (
          <div className="absolute top-full left-0 right-0 z-30 bg-netflix-dark rounded-b-lg shadow-2xl animate-scale-in">
            <div className="p-3">
              {/* Action buttons */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <button className="bg-white rounded-full p-2 hover:bg-gray-200 transition-colors">
                    <FaPlay className="text-black" size={10} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setInList(!inList);
                    }}
                    className={`border-2 rounded-full p-2 transition-colors ${
                      inList
                        ? 'border-white bg-white text-black'
                        : 'border-gray-400 text-white hover:border-white'
                    }`}
                  >
                    <FaPlus size={10} />
                  </button>
                  <button className="border-2 border-gray-400 text-white rounded-full p-2 hover:border-white transition-colors">
                    <FaThumbsUp size={10} />
                  </button>
                  <button className="border-2 border-gray-400 text-white rounded-full p-2 hover:border-white transition-colors">
                    <FaThumbsDown size={10} />
                  </button>
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="border-2 border-gray-400 text-white rounded-full p-2 hover:border-white transition-colors"
                >
                  <FiChevronDown size={10} />
                </button>
              </div>

              {/* Info */}
              <div className="flex items-center gap-2 mb-1">
                <span className="text-green-400 text-xs font-semibold">{movie.matchScore}%</span>
                <span className="border border-netflix-lightgray text-netflix-lightgray text-xs px-1">
                  {movie.rating}
                </span>
                <span className="text-netflix-lightgray text-xs">{movie.duration}</span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-1">
                {movie.genres.slice(0, 3).map((genre, i) => (
                  <span key={genre} className="text-netflix-lightgray text-xs">
                    {genre}{i < Math.min(movie.genres.length, 3) - 1 ? ' •' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <DetailModal movie={movie} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
