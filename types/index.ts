export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string;
  year: number;
  rating: string;
  score: number;
  duration: string;
  thumbnail: string;
  backdrop: string;
  isTrending: boolean;
  isNew: boolean;
  type: 'movie' | 'tv';
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
  tvShows: Movie[];
  total: number;
}

export interface NavLink {
  href: string;
  label: string;
}
