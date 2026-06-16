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
  myList: number[];
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

export type MaturityRating = 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17' | 'TV-Y' | 'TV-G' | 'TV-PG' | 'TV-14' | 'TV-MA';

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
