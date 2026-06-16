'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaPlay, FaPlus } from 'react-icons/fa';
import { Movie } from '@/types';
import DetailModal from './DetailModal';

interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="group relative cursor-pointer rounded overflow-hidden card-hover"
            onClick={() => setSelectedMovie(movie)}
          >
            {/* Thumbnail */}
            <div className="relative aspect-video">
              <Image
                src={movie.thumbnailUrl}
                alt={movie.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-3">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <button className="bg-white rounded-full p-2 hover:bg-gray-200 transition-colors">
                    <FaPlay className="text-black" size={10} />
                  </button>
                  <button className="border-2 border-gray-300 text-white rounded-full p-2 hover:border-white transition-colors">
                    <FaPlus size={10} />
                  </button>
                </div>
                <p className="text-white text-xs font-semibold truncate">{movie.title}</p>
                <p className="text-netflix-lightgray text-xs">{movie.year} • {movie.genres[0]}</p>
              </div>
            </div>

            {/* Match score badge */}
            <div className="absolute top-2 left-2 bg-netflix-red text-white text-xs font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {movie.matchScore}%
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <DetailModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </>
  );
}
