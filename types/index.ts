export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  backdropUrl: string;
  year: number;
  rating: string;
  duration: string;
  genre: string[];
  type: 'movie' | 'tv';
  matchPercent: number;
  ageRating: string;
  color?: string;
  colorEnd?: string;
  cast?: string[];
  director?: string;
  seasons?: number;
  episodes?: number;
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
  tvShows: Movie[];
  total: number;
}

export interface NavLink {
  href: string;
  label: string;
  icon?: string;
}

export type ContentType = 'movie' | 'tv' | 'all';

export type SortOption = 'trending' | 'rating' | 'newest' | 'alphabetical';
