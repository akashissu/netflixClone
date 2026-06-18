import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Album, Artist, Category, Playlist, Track } from '@/types';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

export function formatVoteAverage(vote: number): string {
  return `${Math.round(vote * 10)}%`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
}

export function getImageUrl(
  path: string | null | undefined,
  size: 'w300' | 'w500' | 'w780' | 'w1280' | 'original' = 'w500'
): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export const SAMPLE_TRACKS: Track[] = [
  {
    id: 'track-neon-run',
    title: 'Neon Run',
    artist: 'The Echo Lines',
    artistId: 'artist-echo-lines',
    album: 'Midnight Drive',
    albumId: 'playlist-midnight-drive',
    duration: 208,
    coverUrl: 'https://picsum.photos/seed/neon-run/300/300',
    explicit: false,
  },
  {
    id: 'track-city-lights',
    title: 'City Lights',
    artist: 'The Echo Lines',
    artistId: 'artist-echo-lines',
    album: 'Midnight Drive',
    albumId: 'playlist-midnight-drive',
    duration: 194,
    coverUrl: 'https://picsum.photos/seed/city-lights/300/300',
    explicit: false,
  },
  {
    id: 'track-sunrise-static',
    title: 'Sunrise Static',
    artist: 'Nova Bloom',
    artistId: 'artist-nova-bloom',
    album: 'Aurora Dreams',
    albumId: 'playlist-aurora-dreams',
    duration: 223,
    coverUrl: 'https://picsum.photos/seed/sunrise-static/300/300',
    explicit: true,
  },
  {
    id: 'track-halo-hearts',
    title: 'Halo Hearts',
    artist: 'Nova Bloom',
    artistId: 'artist-nova-bloom',
    album: 'Aurora Dreams',
    albumId: 'playlist-aurora-dreams',
    duration: 237,
    coverUrl: 'https://picsum.photos/seed/halo-hearts/300/300',
    explicit: false,
  },
  {
    id: 'track-tidal-memory',
    title: 'Tidal Memory',
    artist: 'Coast Arcade',
    artistId: 'artist-coast-arcade',
    album: 'Ocean Echoes',
    albumId: 'playlist-ocean-echoes',
    duration: 201,
    coverUrl: 'https://picsum.photos/seed/tidal-memory/300/300',
    explicit: false,
  },
  {
    id: 'track-blue-hour',
    title: 'Blue Hour',
    artist: 'Coast Arcade',
    artistId: 'artist-coast-arcade',
    album: 'Ocean Echoes',
    albumId: 'playlist-ocean-echoes',
    duration: 245,
    coverUrl: 'https://picsum.photos/seed/blue-hour/300/300',
    explicit: false,
  },
];

export const SAMPLE_ALBUMS: Album[] = [
  {
    id: 'playlist-midnight-drive',
    title: 'Midnight Drive',
    artist: 'The Echo Lines',
    artistId: 'artist-echo-lines',
    releaseYear: 2024,
    coverUrl: 'https://picsum.photos/seed/midnight-drive/400/400',
    tracks: SAMPLE_TRACKS.filter((track) => track.artistId === 'artist-echo-lines'),
  },
  {
    id: 'playlist-aurora-dreams',
    title: 'Aurora Dreams',
    artist: 'Nova Bloom',
    artistId: 'artist-nova-bloom',
    releaseYear: 2025,
    coverUrl: 'https://picsum.photos/seed/aurora-dreams/400/400',
    tracks: SAMPLE_TRACKS.filter((track) => track.artistId === 'artist-nova-bloom'),
  },
  {
    id: 'playlist-ocean-echoes',
    title: 'Ocean Echoes',
    artist: 'Coast Arcade',
    artistId: 'artist-coast-arcade',
    releaseYear: 2023,
    coverUrl: 'https://picsum.photos/seed/ocean-echoes/400/400',
    tracks: SAMPLE_TRACKS.filter((track) => track.artistId === 'artist-coast-arcade'),
  },
];

export const SAMPLE_ARTISTS: Artist[] = [
  {
    id: 'artist-echo-lines',
    name: 'The Echo Lines',
    imageUrl: 'https://picsum.photos/seed/echo-lines/800/800',
    verified: true,
    monthlyListeners: 2412500,
    bio: 'An indie electronic trio blending late-night synth textures with cinematic hooks built for long drives and louder headphones.',
    genres: ['Indie Pop', 'Synthwave', 'Alternative'],
    topTracks: SAMPLE_TRACKS.filter((track) => track.artistId === 'artist-echo-lines'),
  },
  {
    id: 'artist-nova-bloom',
    name: 'Nova Bloom',
    imageUrl: 'https://picsum.photos/seed/nova-bloom/800/800',
    verified: true,
    monthlyListeners: 3894100,
    bio: 'Nova Bloom writes luminous alt-pop songs with enormous choruses, sharp production, and a voice that floats over every mix.',
    genres: ['Alt Pop', 'Electropop', 'Dance'],
    topTracks: SAMPLE_TRACKS.filter((track) => track.artistId === 'artist-nova-bloom'),
  },
  {
    id: 'artist-coast-arcade',
    name: 'Coast Arcade',
    imageUrl: 'https://picsum.photos/seed/coast-arcade/800/800',
    verified: false,
    monthlyListeners: 1768200,
    bio: 'A coastal dream-pop project known for shimmering guitars, warm bass lines, and lyrics that feel like postcards from summer.',
    genres: ['Dream Pop', 'Indie Rock', 'Chill'],
    topTracks: SAMPLE_TRACKS.filter((track) => track.artistId === 'artist-coast-arcade'),
  },
];

export const SAMPLE_PLAYLISTS: Playlist[] = [
  {
    id: 'playlist-midnight-drive',
    name: 'Midnight Drive',
    description: 'Warm synths and after-hours anthems for neon city streets.',
    owner: 'Spotify',
    coverUrl: 'https://picsum.photos/seed/playlist-midnight-drive/500/500',
    followers: 1204500,
    tracks: [SAMPLE_TRACKS[0], SAMPLE_TRACKS[1], SAMPLE_TRACKS[2]],
  },
  {
    id: 'playlist-aurora-dreams',
    name: 'Aurora Dreams',
    description: 'Bright pop songs with sky-high hooks and glossy production.',
    owner: 'Spotify',
    coverUrl: 'https://picsum.photos/seed/playlist-aurora-dreams/500/500',
    followers: 981230,
    tracks: [SAMPLE_TRACKS[2], SAMPLE_TRACKS[3], SAMPLE_TRACKS[0]],
  },
  {
    id: 'playlist-ocean-echoes',
    name: 'Ocean Echoes',
    description: 'A mellow set of coastal indie and reflective late-night tracks.',
    owner: 'Spotify',
    coverUrl: 'https://picsum.photos/seed/playlist-ocean-echoes/500/500',
    followers: 642110,
    tracks: [SAMPLE_TRACKS[4], SAMPLE_TRACKS[5], SAMPLE_TRACKS[1]],
  },
  {
    id: 'playlist-top-hits',
    name: 'Top Hits Weekly',
    description: 'The biggest songs in the world this week, refreshed every Friday.',
    owner: 'Spotify',
    coverUrl: 'https://picsum.photos/seed/top-hits-weekly/500/500',
    followers: 5421200,
    tracks: [SAMPLE_TRACKS[2], SAMPLE_TRACKS[0], SAMPLE_TRACKS[5], SAMPLE_TRACKS[3]],
  },
  {
    id: 'playlist-indie-mix',
    name: 'Indie Mix',
    description: 'Underground favorites, left-field gems, and endlessly replayable cuts.',
    owner: 'Cascade',
    coverUrl: 'https://picsum.photos/seed/indie-mix/500/500',
    followers: 284330,
    tracks: [SAMPLE_TRACKS[1], SAMPLE_TRACKS[4], SAMPLE_TRACKS[3], SAMPLE_TRACKS[5]],
  },
];

export const SAMPLE_CATEGORIES: Category[] = [
  {
    id: 'cat-pop',
    name: 'Pop',
    color: '#8D67AB',
    imageUrl: 'https://picsum.photos/seed/cat-pop/300/300',
  },
  {
    id: 'cat-indie',
    name: 'Indie',
    color: '#E8115B',
    imageUrl: 'https://picsum.photos/seed/cat-indie/300/300',
  },
  {
    id: 'cat-chill',
    name: 'Chill',
    color: '#148A08',
    imageUrl: 'https://picsum.photos/seed/cat-chill/300/300',
  },
  {
    id: 'cat-workout',
    name: 'Workout',
    color: '#777777',
    imageUrl: 'https://picsum.photos/seed/cat-workout/300/300',
  },
  {
    id: 'cat-focus',
    name: 'Focus',
    color: '#27856A',
    imageUrl: 'https://picsum.photos/seed/cat-focus/300/300',
  },
  {
    id: 'cat-electronic',
    name: 'Electronic',
    color: '#509BF5',
    imageUrl: 'https://picsum.photos/seed/cat-electronic/300/300',
  },
];
