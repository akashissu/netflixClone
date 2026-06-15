export interface Movie {
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
  adult?: boolean;
  original_language?: string;
  original_title?: string;
  popularity?: number;
}

export interface Genre {
  id: number;
  name: string;
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

export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}

export interface MovieDetails extends Movie {
  genres?: Genre[];
  runtime?: number;
  episode_run_time?: number[];
  status?: string;
  tagline?: string;
  budget?: number;
  revenue?: number;
  homepage?: string;
  imdb_id?: string;
  production_companies?: Array<{
    id: number;
    name: string;
    logo_path: string | null;
  }>;
  credits?: Credits;
  videos?: {
    results: Video[];
  };
  number_of_seasons?: number;
  number_of_episodes?: number;
  networks?: Array<{
    id: number;
    name: string;
    logo_path: string | null;
  }>;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface SearchResult extends Movie {
  media_type: string;
}
