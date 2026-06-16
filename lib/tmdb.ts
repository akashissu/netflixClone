import type { TMDBTitle, TMDBResponse } from '@/types';
import seedData from '@/data/seed.json';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || process.env.TMDB_API_KEY || '';

const hasApiKey = () => !!API_KEY && API_KEY !== 'your_tmdb_api_key_here';

async function fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  if (!hasApiKey()) {
    throw new Error('No TMDB API key');
  }

  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('language', 'en-US');
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function normalizeSeedItem(item: Record<string, unknown>): TMDBTitle {
  return {
    id: item.id as number,
    title: item.title as string | undefined,
    name: item.name as string | undefined,
    overview: item.overview as string,
    poster_path: item.poster_path as string | null,
    backdrop_path: item.backdrop_path as string | null,
    vote_average: item.vote_average as number,
    vote_count: item.vote_count as number | undefined,
    release_date: item.release_date as string | undefined,
    first_air_date: item.first_air_date as string | undefined,
    media_type: item.media_type as string | undefined,
    genre_ids: item.genre_ids as number[] | undefined,
    original_language: item.original_language as string | undefined,
    popularity: item.popularity as number | undefined,
  };
}

export async function getTrending(): Promise<TMDBTitle[]> {
  try {
    const data = await fetchTMDB<TMDBResponse>('/trending/all/week');
    return data.results.slice(0, 20);
  } catch {
    return (seedData.trending as Record<string, unknown>[]).map(normalizeSeedItem);
  }
}

export async function getTopRated(): Promise<TMDBTitle[]> {
  try {
    const data = await fetchTMDB<TMDBResponse>('/movie/top_rated');
    return data.results.slice(0, 20);
  } catch {
    return (seedData.topRated as Record<string, unknown>[]).map(normalizeSeedItem);
  }
}

export async function getByGenre(genreId: number): Promise<TMDBTitle[]> {
  try {
    const data = await fetchTMDB<TMDBResponse>('/discover/movie', {
      with_genres: genreId.toString(),
      sort_by: 'popularity.desc',
    });
    return data.results.slice(0, 20);
  } catch {
    return (seedData.action as Record<string, unknown>[]).map(normalizeSeedItem);
  }
}

export async function getTVShows(): Promise<TMDBTitle[]> {
  try {
    const data = await fetchTMDB<TMDBResponse>('/tv/popular');
    return data.results.slice(0, 20).map((item) => ({ ...item, media_type: 'tv' }));
  } catch {
    return (seedData.tvShows as Record<string, unknown>[]).map(normalizeSeedItem);
  }
}

export async function searchTitles(query: string): Promise<TMDBTitle[]> {
  if (!query.trim()) return [];
  try {
    const data = await fetchTMDB<TMDBResponse>('/search/multi', { query });
    return data.results
      .filter((item) => item.media_type !== 'person')
      .slice(0, 20);
  } catch {
    const q = query.toLowerCase();
    const allItems = [
      ...(seedData.trending as Record<string, unknown>[]),
      ...(seedData.topRated as Record<string, unknown>[]),
      ...(seedData.action as Record<string, unknown>[]),
      ...(seedData.tvShows as Record<string, unknown>[]),
    ];
    const seen = new Set<number>();
    return allItems
      .filter((item) => {
        const t = ((item.title || item.name) as string || '').toLowerCase();
        return t.includes(q);
      })
      .filter((item) => {
        if (seen.has(item.id as number)) return false;
        seen.add(item.id as number);
        return true;
      })
      .map(normalizeSeedItem)
      .slice(0, 20);
  }
}

export async function getTitleDetails(id: string, mediaType: string = 'movie'): Promise<TMDBTitle> {
  try {
    const [details, similar] = await Promise.all([
      fetchTMDB<TMDBTitle>(`/${mediaType}/${id}`),
      fetchTMDB<TMDBResponse>(`/${mediaType}/${id}/similar`).catch(() => ({ results: [] })),
    ]);
    return {
      ...details,
      media_type: mediaType,
      similar: similar.results?.slice(0, 6) || [],
    };
  } catch {
    const allItems = [
      ...(seedData.trending as Record<string, unknown>[]),
      ...(seedData.topRated as Record<string, unknown>[]),
      ...(seedData.action as Record<string, unknown>[]),
      ...(seedData.tvShows as Record<string, unknown>[]),
    ];
    const found = allItems.find((item) => String(item.id) === String(id));
    if (found) {
      return normalizeSeedItem(found);
    }
    throw new Error(`Title ${id} not found`);
  }
}
