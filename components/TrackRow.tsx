'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDuration } from '@/lib/utils';
import type { Track } from '@/types';

interface TrackRowProps {
  track: Track;
  index: number;
  showAlbum?: boolean;
}

export default function TrackRow({ track, index, showAlbum = false }: TrackRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className="grid grid-cols-[16px_1fr_80px] sm:grid-cols-[16px_1fr_1fr_80px] gap-4 px-4 py-2 rounded-md hover:bg-white/10 transition-colors group items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Index / Play button */}
      <div className="flex items-center justify-center">
        {isHovered ? (
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white"
          >
            {isPlaying ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        ) : (
          <span className={`text-sm ${isPlaying ? 'text-spotify-green' : 'text-spotify-lightgray'}`}>
            {isPlaying ? (
              <svg className="w-4 h-4 text-spotify-green" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            ) : (
              index
            )}
          </span>
        )}
      </div>

      {/* Title + Artist */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative w-10 h-10 flex-shrink-0 rounded overflow-hidden">
          <Image
            src={track.coverUrl}
            alt={track.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className={`text-sm font-medium truncate ${isPlaying ? 'text-spotify-green' : 'text-white'}`}>
            {track.title}
            {track.explicit && (
              <span className="ml-2 text-xs bg-spotify-lightgray/30 text-spotify-lightgray px-1 py-0.5 rounded uppercase">
                E
              </span>
            )}
          </p>
          <Link
            href={`/artist/${track.artistId}`}
            className="text-spotify-lightgray text-xs hover:text-white hover:underline truncate block"
          >
            {track.artist}
          </Link>
        </div>
      </div>

      {/* Album */}
      {showAlbum && (
        <div className="hidden sm:block min-w-0">
          <Link
            href={`/playlist/${track.albumId}`}
            className="text-spotify-lightgray text-sm hover:text-white hover:underline truncate block"
          >
            {track.album}
          </Link>
        </div>
      )}

      {/* Duration */}
      <div className="flex items-center justify-end gap-3">
        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-spotify-lightgray hover:text-white">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <span className="text-spotify-lightgray text-sm">{formatDuration(track.duration)}</span>
      </div>
    </div>
  );
}
