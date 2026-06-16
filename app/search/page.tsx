'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TrackRow from '@/components/TrackRow';
import ArtistCard from '@/components/ArtistCard';
import AlbumCard from '@/components/AlbumCard';
import PlaylistCard from '@/components/PlaylistCard';
import SearchBar from '@/components/SearchBar';
import { SAMPLE_TRACKS, SAMPLE_ARTISTS, SAMPLE_ALBUMS, SAMPLE_PLAYLISTS, SAMPLE_CATEGORIES } from '@/lib/utils';
import type { Track, Artist, Album, Playlist } from '@/types';

interface SearchResults {
  tracks: Track[];
  artists: Artist[];
  albums: Album[];
  playlists: Playlist[];
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults | null>(null);

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    if (!searchQuery.trim()) {
      setResults(null);
      return;
    }

    const q = searchQuery.toLowerCase();
    const filteredTracks = SAMPLE_TRACKS.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.artist.toLowerCase().includes(q) ||
        t.album.toLowerCase().includes(q)
    );
    const filteredArtists = SAMPLE_ARTISTS.filter((a) =>
      a.name.toLowerCase().includes(q)
    );
    const filteredAlbums = SAMPLE_ALBUMS.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.artist.toLowerCase().includes(q)
    );
    const filteredPlaylists = SAMPLE_PLAYLISTS.filter((p) =>
      p.name.toLowerCase().includes(q)
    );

    setResults({
      tracks: filteredTracks,
      artists: filteredArtists,
      albums: filteredAlbums,
      playlists: filteredPlaylists,
    });
  }, []);

  const hasResults =
    results &&
    (results.tracks.length > 0 ||
      results.artists.length > 0 ||
      results.albums.length > 0 ||
      results.playlists.length > 0);

  return (
    <div className="min-h-screen bg-spotify-darkgray">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-spotify-darkgray/95 backdrop-blur-sm px-6 py-4">
        <h1 className="text-2xl font-bold text-white mb-4">Search</h1>
        <SearchBar onSearch={handleSearch} initialValue={query} />
      </div>

      <div className="px-6 py-6">
        {!query && (
          <>
            <h2 className="text-2xl font-bold text-white mb-4">Browse all</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {SAMPLE_CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  href={`/search?category=${category.name.toLowerCase()}`}
                  className="relative overflow-hidden rounded-lg aspect-square cursor-pointer group"
                  style={{ backgroundColor: category.color }}
                >
                  <div className="absolute inset-0 p-4">
                    <span className="text-white font-bold text-lg leading-tight">{category.name}</span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 transform rotate-12 translate-x-2 translate-y-2 group-hover:scale-110 transition-transform">
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover rounded-md shadow-lg"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {query && !hasResults && (
          <div className="text-center py-20">
            <p className="text-white text-2xl font-bold mb-2">No results found for &ldquo;{query}&rdquo;</p>
            <p className="text-spotify-lightgray">Please make sure your words are spelled correctly, or use fewer or different keywords.</p>
          </div>
        )}

        {hasResults && results && (
          <div className="space-y-8">
            {/* Top Result + Tracks */}
            {results.tracks.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Result */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Top result</h2>
                  <Link
                    href={`/playlist/${results.tracks[0].albumId}`}
                    className="block bg-spotify-gray hover:bg-white/20 rounded-lg p-5 transition-colors group cursor-pointer"
                  >
                    <div className="relative w-24 h-24 mb-4 rounded-md overflow-hidden shadow-lg">
                      <Image
                        src={results.tracks[0].coverUrl}
                        alt={results.tracks[0].title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-white text-3xl font-bold mb-1">{results.tracks[0].title}</h3>
                    <p className="text-spotify-lightgray text-sm">
                      <span className="bg-spotify-gray/80 text-white text-xs px-2 py-0.5 rounded-full mr-2">Song</span>
                      {results.tracks[0].artist}
                    </p>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Tracks */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Songs</h2>
                  <div>
                    {results.tracks.slice(0, 4).map((track, index) => (
                      <TrackRow key={track.id} track={track} index={index + 1} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Artists */}
            {results.artists.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Artists</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {results.artists.map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} />
                  ))}
                </div>
              </section>
            )}

            {/* Albums */}
            {results.albums.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Albums</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {results.albums.map((album) => (
                    <AlbumCard key={album.id} album={album} />
                  ))}
                </div>
              </section>
            )}

            {/* Playlists */}
            {results.playlists.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Playlists</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {results.playlists.map((playlist) => (
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
