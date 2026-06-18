export interface Title {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath?: string;
  voteAverage: number;
  releaseYear: number;
  mediaType: 'movie' | 'tv';
  genres?: string[];
  maturityRating?: string;
  duration?: string;
  seasons?: number;
  isNetflixOriginal?: boolean;
  cast?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  myList: Array<string | number>;
}

export interface Genre {
  id: number;
  name: string;
}

export interface SearchResult {
  titles: Title[];
  totalResults: number;
  page: number;
  totalPages: number;
}

export type MediaType = 'movie' | 'tv';

export type MaturityRating =
  | 'G'
  | 'PG'
  | 'PG-13'
  | 'R'
  | 'NC-17'
  | 'TV-Y'
  | 'TV-G'
  | 'TV-PG'
  | 'TV-14'
  | 'TV-MA';

export interface ContentRowProps {
  title: string;
  items: Title[];
}

export interface ContentGridProps {
  title: string;
  items: Title[];
}

export interface PageBannerProps {
  title: string;
  description?: string;
}

export interface HeroBannerProps {
  movie: Title;
}

export interface TitleCardProps {
  title: Title;
}

export interface TitleDetailProps {
  title: Title;
}

export interface Movie {
  id: string | number;
  title: string;
  description: string;
  year: string | number;
  rating: string;
  duration: string;
  type: MediaType;
  thumbnail?: string;
  thumbnailUrl?: string;
  backdrop?: string;
  backdropUrl?: string;
  genre?: string;
  genres?: string[];
  score?: number;
  matchScore?: number;
  isTrending?: boolean;
  isNew?: boolean;
  cast?: string[];
  director?: string;
  badge?: string;
  name?: string;
  overview?: string;
  media_type?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
  vote_count?: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids?: number[];
  original_language?: string;
  runtime?: number;
  number_of_seasons?: number;
  similar?: TMDBTitle[];
}

export interface MovieRow {
  id: string;
  title: string;
  movies: Movie[];
}

export interface MovieDetails extends Movie {
  videos?: Video[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBTitle {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count?: number;
  release_date?: string;
  first_air_date?: string;
  media_type?: string;
  genre_ids?: number[];
  genres?: TMDBGenre[];
  original_language?: string;
  popularity?: number;
  runtime?: number;
  number_of_seasons?: number;
  similar?: TMDBTitle[];
}

export interface TMDBResponse {
  results: TMDBTitle[];
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  album: string;
  albumId: string;
  duration: number;
  coverUrl: string;
  explicit?: boolean;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  releaseYear: number;
  coverUrl: string;
  tracks?: Track[];
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  verified?: boolean;
  monthlyListeners: number;
  bio: string;
  genres: string[];
  topTracks: Track[];
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  owner: string;
  coverUrl: string;
  followers?: number;
  tracks: Track[];
}

export interface Category {
  id: string;
  name: string;
  color: string;
  imageUrl: string;
}
