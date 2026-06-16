export interface Movie {
  id: string;
  title: string;
  description: string;
  year: string;
  rating: string;
  duration: string;
  matchScore: number;
  genres: string[];
  thumbnailUrl: string;
  backdropUrl: string;
  cast?: string[];
  director?: string;
  badge?: string;
  type: 'movie' | 'tv';
  seasons?: number;
  episodes?: number;
}

export interface MovieRow {
  id: string;
  title: string;
  movies: Movie[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'basic' | 'standard' | 'premium';
  myList: string[];
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
}

export interface SearchResult {
  movies: Movie[];
  query: string;
  total: number;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroContent {
  movie: Movie;
  autoPlay?: boolean;
  muted?: boolean;
}

export type ContentType = 'movie' | 'tv' | 'all';

export type SortOption = 'trending' | 'newest' | 'rating' | 'alphabetical';

export interface FilterOptions {
  genre?: string;
  type?: ContentType;
  sort?: SortOption;
  year?: string;
}
