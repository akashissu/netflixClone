export interface Track {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  album: string;
  albumId: string;
  duration: number;
  coverUrl: string;
  audioUrl?: string;
  explicit?: boolean;
  popularity?: number;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  owner: string;
  tracks: Track[];
  followers?: number;
  isPublic?: boolean;
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  imageUrl: string;
  genres: string[];
  followers: number;
  monthlyListeners: number;
  topTracks: Track[];
  albums: Album[];
  verified?: boolean;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  coverUrl: string;
  releaseYear: number;
  tracks: Track[];
  genre?: string;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  color: string;
}

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  shuffle: boolean;
  repeat: 'off' | 'all' | 'one';
}

export interface SearchResult {
  tracks: Track[];
  artists: Artist[];
  albums: Album[];
  playlists: Playlist[];
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}
