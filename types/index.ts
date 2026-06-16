// =============================================================================
// TMDB API Types
// These are the canonical types used across the entire application.
// All components and lib files must import from this file.
// =============================================================================

/**
 * Core TMDB title type — represents both movies and TV shows.
 * This is the unified type used repo-wide (replaces the old `Movie` type).
 */
export interface TMDBTitle {
  /** TMDB unique identifier */
  id: number;

  // --- Movie-specific fields ---
  /** Movie title (undefined for TV shows) */
  title?: string;
  /** Original movie title */
  original_title?: string;
  /** Movie release date (YYYY-MM-DD) */
  release_date?: string;

  // --- TV-specific fields ---
  /** TV show name (undefined for movies) */
  name?: string;
  /** Original TV show name */
  original_name?: string;
  /** TV show first air date (YYYY-MM-DD) */
  first_air_date?: string;

  // --- Shared fields ---
  /** Plot summary */
  overview: string;
  /** Poster image path (relative, use with TMDB image base URL) */
  poster_path: string | null;
  /** Backdrop image path (relative, use with TMDB image base URL) */
  backdrop_path: string | null;
  /** Average vote score (0–10) */
  vote_average: number;
  /** Total number of votes */
  vote_count: number;
  /** Array of genre IDs */
  genre_ids: number[];
  /** Media type discriminator */
  media_type?: 'movie' | 'tv' | 'person';
  /** Whether the title is adult content */
  adult: boolean;
  /** Popularity score */
  popularity: number;
  /** ISO 639-1 language code */
  original_language: string;
  /** Whether a video is available */
  video?: boolean;
}

/**
 * Generic paginated TMDB API response wrapper.
 */
export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

/**
 * TMDB search response — extends the base response with no additional fields
 * but is typed separately for clarity at call sites.
 */
export type TMDBSearchResponse<T> = TMDBResponse<T>;

/**
 * TMDB genre object.
 */
export interface TMDBGenre {
  id: number;
  name: string;
}

/**
 * Extended TMDB movie details (returned by /movie/{id}).
 */
export interface TMDBMovieDetails extends TMDBTitle {
  budget: number;
  revenue: number;
  runtime: number | null;
  status: string;
  tagline: string;
  homepage: string;
  imdb_id: string | null;
  genres: TMDBGenre[];
  production_companies: TMDBProductionCompany[];
  production_countries: TMDBProductionCountry[];
  spoken_languages: TMDBSpokenLanguage[];
  belongs_to_collection: TMDBCollection | null;
}

/**
 * Extended TMDB TV show details (returned by /tv/{id}).
 */
export interface TMDBTVDetails extends TMDBTitle {
  number_of_episodes: number;
  number_of_seasons: number;
  episode_run_time: number[];
  status: string;
  tagline: string;
  homepage: string;
  in_production: boolean;
  type: string;
  genres: TMDBGenre[];
  networks: TMDBNetwork[];
  production_companies: TMDBProductionCompany[];
  seasons: TMDBSeason[];
  created_by: TMDBCreator[];
  languages: string[];
  origin_country: string[];
}

/**
 * TMDB production company.
 */
export interface TMDBProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

/**
 * TMDB production country.
 */
export interface TMDBProductionCountry {
  iso_3166_1: string;
  name: string;
}

/**
 * TMDB spoken language.
 */
export interface TMDBSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

/**
 * TMDB movie collection (belongs_to_collection).
 */
export interface TMDBCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

/**
 * TMDB TV network.
 */
export interface TMDBNetwork {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

/**
 * TMDB TV season summary.
 */
export interface TMDBSeason {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  episode_count: number;
  air_date: string | null;
}

/**
 * TMDB TV show creator.
 */
export interface TMDBCreator {
  id: number;
  name: string;
  gender: number;
  profile_path: string | null;
  credit_id: string;
}

/**
 * TMDB cast member.
 */
export interface TMDBCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  credit_id: string;
  gender: number | null;
  known_for_department: string;
  original_name: string;
  popularity: number;
  cast_id?: number;
}

/**
 * TMDB crew member.
 */
export interface TMDBCrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
  credit_id: string;
  gender: number | null;
  known_for_department: string;
  original_name: string;
  popularity: number;
}

/**
 * TMDB credits response.
 */
export interface TMDBCredits {
  id: number;
  cast: TMDBCastMember[];
  crew: TMDBCrewMember[];
}

/**
 * TMDB video (trailer, teaser, etc.).
 */
export interface TMDBVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: 'Trailer' | 'Teaser' | 'Clip' | 'Featurette' | 'Behind the Scenes' | 'Bloopers';
  official: boolean;
  published_at: string;
  iso_639_1: string;
  iso_3166_1: string;
}

/**
 * TMDB videos response.
 */
export interface TMDBVideosResponse {
  id: number;
  results: TMDBVideo[];
}

// =============================================================================
// Application-level types
// =============================================================================

/**
 * A row of titles displayed in the UI (e.g. "Trending Now", "Popular Movies").
 * Previously called `MovieRow` — kept for backward compatibility.
 */
export interface MovieRow {
  id: string;
  title: string;
  titles: TMDBTitle[];
}

/**
 * @deprecated Use `TMDBTitle` instead.
 * Kept for backward compatibility during migration.
 */
export type Movie = TMDBTitle;

/**
 * User profile type.
 */
export interface UserProfile {
  id: string;
  name: string;
  avatarUrl: string | null;
  isKidsProfile: boolean;
}

/**
 * Watchlist item.
 */
export interface WatchlistItem {
  titleId: number;
  mediaType: 'movie' | 'tv';
  addedAt: string;
}

/**
 * App-level error type.
 */
export interface AppError {
  message: string;
  code?: string | number;
  details?: unknown;
}
