'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TrackRow from '@/components/TrackRow';
import AlbumCard from '@/components/AlbumCard';
import ArtistCard from '@/components/ArtistCard';
import { SAMPLE_ARTISTS, SAMPLE_ALBUMS, formatNumber } from '@/lib/utils';

export default function ArtistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const artist = SAMPLE_ARTISTS.find((a) => a.id === id) ?? SAMPLE_ARTISTS[0];
  const artistAlbums = SAMPLE_ALBUMS.filter((a) => a.artistId === artist.id);
  const relatedArtists = SAMPLE_ARTISTS.filter((a) => a.id !== artist.id).slice(0, 5);

  return (
    <div className="min-h-screen bg-spotify-darkgray">
      {/* Hero Banner */}
      <div className="relative h-64 sm:h-80 lg:h-96">
        <Image
          src={artist.imageUrl}
          alt={artist.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-spotify-darkgray via-spotify-darkgray/40 to-transparent" />
        <div className="absolute bottom-0 left-0 px-6 pb-6">
          {artist.verified && (
            <div className="flex items-center gap-1 mb-2">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <span className="text-white text-xs font-semibold">Verified Artist</span>
            </div>
          )}
          <h1 className="text-white text-5xl sm:text-6xl lg:text-8xl font-black mb-2">{artist.name}</h1>
          <p className="text-white/80 text-sm">
            {formatNumber(artist.monthlyListeners)} monthly listeners
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-6 flex items-center gap-4">
        <button className="w-14 h-14 bg-spotify-green rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg">
          <svg className="w-7 h-7 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
        <button className="border border-white/40 text-white text-sm font-semibold px-5 py-1.5 rounded-full hover:border-white transition-colors">
          Follow
        </button>
        <button className="text-spotify-lightgray hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>

      <div className="px-6">
        {/* Popular Tracks */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Popular</h2>
          <div className="space-y-1">
            {artist.topTracks.slice(0, 5).map((track, index) => (
              <TrackRow key={track.id} track={track} index={index + 1} showAlbum />
            ))}
          </div>
        </section>

        {/* Discography */}
        {artistAlbums.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Discography</h2>
              <button className="text-spotify-lightgray hover:text-white text-sm font-semibold transition-colors">
                Show all
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {artistAlbums.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          </section>
        )}

        {/* About */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">About</h2>
          <div className="relative rounded-xl overflow-hidden">
            <div className="relative h-64">
              <Image
                src={artist.imageUrl}
                alt={artist.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-white font-bold text-xl mb-1">
                {formatNumber(artist.monthlyListeners)} monthly listeners
              </p>
              <p className="text-white/80 text-sm leading-relaxed line-clamp-3">{artist.bio}</p>
            </div>
          </div>
        </section>

        {/* Genres */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-3">Genres</h2>
          <div className="flex flex-wrap gap-2">
            {artist.genres.map((genre) => (
              <span
                key={genre}
                className="bg-spotify-gray text-white text-sm px-4 py-1.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
              >
                {genre}
              </span>
            ))}
          </div>
        </section>

        {/* Fans Also Like */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Fans also like</h2>
            <button className="text-spotify-lightgray hover:text-white text-sm font-semibold transition-colors">
              Show all
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {relatedArtists.map((relatedArtist) => (
              <ArtistCard key={relatedArtist.id} artist={relatedArtist} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
