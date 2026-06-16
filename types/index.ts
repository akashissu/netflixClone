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
  genres?: Genre[];
  original_language?: string;
  original_title?: string;
  original_name?: string;
  popularity?: number;
  adult?: boolean;
  video?: boolean;
  runtime?: number;
  number_of_seasons?: number;
  number_of_episodes?: number;
  status?: string;
  tagline?: string;
  homepage?: string;
  budget?: number;
  revenue?: number;
  similar?: TMDBTitle[];
  credits?: Credits;
  videos?: VideoResults;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface VideoResult {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface VideoResults {
  results: VideoResult[];
}

export interface TMDBResponse {
  page: number;
  results: TMDBTitle[];
  total_pages: number;
  total_results: number;
}

export interface SearchResult {
  query: string;
  results: TMDBTitle[];
  totalResults: number;
}

export interface MyListItem extends TMDBTitle {
  addedAt: string;
}

export interface NavLink {
  href: string;
  label: string;
  icon?: string;
}

export interface CategoryRowProps {
  title: string;
  items: TMDBTitle[];
  loading?: boolean;
}

export type MediaType = 'movie' | 'tv' | 'person';

export type ImageSize =
  | 'w92'
  | 'w154'
  | 'w185'
  | 'w300'
  | 'w342'
  | 'w500'
  | 'w780'
  | 'w1280'
  | 'original';
