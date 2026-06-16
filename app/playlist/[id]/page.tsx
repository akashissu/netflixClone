'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TrackRow from '@/components/TrackRow';
import { SAMPLE_PLAYLISTS, formatNumber, formatDuration } from '@/lib/utils';

export default function PlaylistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const playlist = SAMPLE_PLAYLISTS.find((p) => p.id === id) ?? SAMPLE_PLAYLISTS[0];

  const totalDuration = playlist.tracks.reduce((acc, track) => acc + track.duration, 0);
  const totalMinutes = Math.floor(totalDuration / 60);

  return (
    <div className="min-h-screen bg-spotify-darkgray">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-indigo-800 to-spotify-darkgray">
        <div className="px-6 pt-6 pb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex-shrink-0 shadow-2xl rounded-md overflow-hidden">
              <Image
                src={playlist.coverUrl}
                alt={playlist.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-white text-xs font-semibold uppercase tracking-widest mb-2">Playlist</p>
              <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                {playlist.name}
              </h1>
              <p className="text-spotify-lightgray text-sm mb-3">{playlist.description}</p>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-sm">
                <span className="text-white font-semibold">{playlist.owner}</span>
                <span className="text-spotify-lightgray">•</span>
                {playlist.followers && (
                  <>
                    <span className="text-spotify-lightgray">{formatNumber(playlist.followers)} likes</span>
                    <span className="text-spotify-lightgray">•</span>
                  </>
                )}
                <span className="text-spotify-lightgray">
                  {playlist.tracks.length} songs, about {totalMinutes} min
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-4 flex items-center gap-4">
        <button className="w-14 h-14 bg-spotify-green rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg">
          <svg className="w-7 h-7 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
        <button className="text-spotify-lightgray hover:text-white transition-colors">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <button className="text-spotify-lightgray hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>

      {/* Track List */}
      <div className="px-6">
        {/* Header row */}
        <div className="grid grid-cols-[16px_1fr_1fr_80px] gap-4 px-4 py-2 text-spotify-lightgray text-sm border-b border-white/10 mb-2">
          <span className="text-center">#</span>
          <span>Title</span>
          <span className="hidden sm:block">Album</span>
          <span className="text-right">
            <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
            </svg>
          </span>
        </div>

        {playlist.tracks.map((track, index) => (
          <TrackRow key={track.id} track={track} index={index + 1} showAlbum />
        ))}
      </div>

      {/* Recommended */}
      <div className="px-6 py-8">
        <h2 className="text-2xl font-bold text-white mb-1">Recommended</h2>
        <p className="text-spotify-lightgray text-sm mb-4">Based on what&apos;s in this playlist</p>
        <div className="space-y-1">
          {SAMPLE_PLAYLISTS.filter((p) => p.id !== playlist.id)
            .slice(0, 3)
            .flatMap((p) => p.tracks.slice(0, 1))
            .map((track, index) => (
              <TrackRow key={`rec-${track.id}-${index}`} track={track} index={index + 1} showAlbum />
            ))}
        </div>
      </div>
    </div>
  );
}
