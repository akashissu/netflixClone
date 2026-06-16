import type { TMDBTitle, TMDBResponse, TMDBSearchResponse } from '@/types';

const TMDB_API_KEY = process.env.TMDB_API_KEY ?? '';
const TMDB_BASE_URL = process.env.TMDB_BASE_URL ?? 'https://api.themoviedb.org/3';

type MovieCategory = 'popular' | 'top_rated' | 'now_playing' | 'upcoming';
type TVCategory = 'popular' | 'top_rated' | 'on_the_air' | 'airing_today';
type TrendingMediaType = 'all' | 'movie' | 'tv' | 'person';
type TrendingTimeWindow = 'day' | 'week';

async function fetchFromTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  if (!TMDB_API_KEY) {
    throw new Error('TMDB_API_KEY is not configured');
  }

  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.set('api_key', TMDB_API_KEY);
  url.searchParams.set('language', 'en-US');

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 },
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function getTrendingTitles(
  mediaType: TrendingMediaType = 'all',
  timeWindow: TrendingTimeWindow = 'week'
): Promise<TMDBTitle[]> {
  const data = await fetchFromTMDB<TMDBResponse<TMDBTitle>>(
    `/trending/${mediaType}/${timeWindow}`
  );
  return data.results.map((item) => ({
    ...item,
    media_type: item.media_type ?? (mediaType !== 'all' ? mediaType : 'movie'),
  }));
}

export async function getMoviesByCategory(category: MovieCategory): Promise<TMDBTitle[]> {
  const data = await fetchFromTMDB<TMDBResponse<TMDBTitle>>(`/movie/${category}`);
  return data.results.map((item) => ({
    ...item,
    media_type: 'movie' as const,
  }));
}

export async function getTVByCategory(category: TVCategory): Promise<TMDBTitle[]> {
  const data = await fetchFromTMDB<TMDBResponse<TMDBTitle>>(`/tv/${category}`);
  return data.results.map((item) => ({
    ...item,
    media_type: 'tv' as const,
  }));
}

export async function searchTitles(query: string): Promise<TMDBTitle[]> {
  if (!query.trim()) return [];

  const data = await fetchFromTMDB<TMDBSearchResponse<TMDBTitle>>('/search/multi', {
    query: query.trim(),
    include_adult: 'false',
  });

  return data.results
    .filter((item) => item.media_type === 'movie' || item.media_type === 'tv')
    .map((item) => ({
      ...item,
      media_type: item.media_type ?? 'movie',
    }));
}

export async function getMovieDetails(movieId: number): Promise<TMDBTitle> {
  const data = await fetchFromTMDB<TMDBTitle>(`/movie/${movieId}`);
  return { ...data, media_type: 'movie' as const };
}

export async function getTVDetails(tvId: number): Promise<TMDBTitle> {
  const data = await fetchFromTMDB<TMDBTitle>(`/tv/${tvId}`);
  return { ...data, media_type: 'tv' as const };
}

export async function getSimilarTitles(
  mediaType: 'movie' | 'tv',
  id: number
): Promise<TMDBTitle[]> {
  const data = await fetchFromTMDB<TMDBResponse<TMDBTitle>>(`/${mediaType}/${id}/similar`);
  return data.results.map((item) => ({
    ...item,
    media_type: mediaType,
  }));
}
