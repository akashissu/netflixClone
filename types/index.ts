export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  backdropUrl: string;
  year: number;
  rating: string;
  duration: string;
  matchScore: number;
  genres: string[];
  type: 'movie' | 'tv';
  badge?: string;
  isFeatured?: boolean;
  trailerUrl?: string;
  cast?: string[];
  director?: string;
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
  avatarUrl?: string;
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
  total: number;
  query: string;
}

export interface NavLink {
  href: string;
  label: string;
  icon?: string;
}

export interface HeroAction {
  label: string;
  variant: 'primary' | 'secondary';
  onClick: () => void;
}
