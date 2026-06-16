'use client';

import Link from 'next/link';
import Image from 'next/image';
import PlaylistCard from '@/components/PlaylistCard';
import ArtistCard from '@/components/ArtistCard';
import AlbumCard from '@/components/AlbumCard';
import TrackRow from '@/components/TrackRow';
import { SAMPLE_PLAYLISTS, SAMPLE_ARTISTS, SAMPLE_ALBUMS, SAMPLE_TRACKS } from '@/lib/utils';

export default function HomePage() {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const recentlyPlayed = SAMPLE_PLAYLISTS.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-spotify-darkgray to-spotify-darkgray">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-indigo-900/80 to-transparent backdrop-blur-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">{greeting()}</h1>
          <div className="flex items-center gap-3">
            <button className="bg-white text-black text-sm font-semibold px-4 py-1.5 rounded-full hover:scale-105 transition-transform">
              Upgrade
            </button>
            <div className="w-8 h-8 bg-spotify-green rounded-full flex items-center justify-center text-black font-bold text-sm">
              U
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-8">
        {/* Recently Played Quick Access */}
        <section className="mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {recentlyPlayed.map((playlist) => (
              <Link
                key={playlist.id}
                href={`/playlist/${playlist.id}`}
                className="flex items-center bg-white/10 hover:bg-white/20 rounded-md overflow-hidden transition-colors group"
              >
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={playlist.coverUrl}
                    alt={playlist.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="px-3 font-semibold text-sm text-white truncate">{playlist.name}</span>
                <div className="ml-auto mr-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 bg-spotify-green rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Playlists */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Featured Playlists</h2>
            <Link href="/browse" className="text-spotify-lightgray hover:text-white text-sm font-semibold transition-colors">
              Show all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {SAMPLE_PLAYLISTS.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </section>

        {/* Top Artists */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Popular Artists</h2>
            <Link href="/browse" className="text-spotify-lightgray hover:text-white text-sm font-semibold transition-colors">
              Show all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {SAMPLE_ARTISTS.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </section>

        {/* New Releases */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">New Releases</h2>
            <Link href="/browse" className="text-spotify-lightgray hover:text-white text-sm font-semibold transition-colors">
              Show all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {SAMPLE_ALBUMS.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>

        {/* Trending Tracks */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Trending Right Now</h2>
          </div>
          <div className="bg-spotify-gray/30 rounded-lg overflow-hidden">
            {SAMPLE_TRACKS.slice(0, 5).map((track, index) => (
              <TrackRow key={track.id} track={track} index={index + 1} showAlbum />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
