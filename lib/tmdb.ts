import { Movie, MovieDetails, Video } from '@/types';
import seedData from '@/data/seed.json';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export function getImageUrl(path: string, size: string = 'w500'): string {
  if (!path) return '';
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

async function tmdbFetch(endpoint: string): Promise<unknown> {
  if (!API_KEY) {
    throw new Error('No API key');
  }

  const url = `${TMDB_BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}`;

  const response = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  return response.json();
}

export async function fetchTrending(): Promise<Movie[]> {
  try {
    const data = await tmdbFetch('/trending/all/week') as { results: Movie[] };
    return data.results?.slice(0, 20) || [];
  } catch {
    return seedData.trending as Movie[];
  }
}

export async function fetchTopRated(): Promise<Movie[]> {
  try {
    const data = await tmdbFetch('/movie/top_rated') as { results: Movie[] };
    return (data.results?.slice(0, 20) || []).map((m) => ({ ...m, media_type: 'movie' }));
  } catch {
    return seedData.topRated as Movie[];
  }
}

export async function fetchByGenre(genreId: number): Promise<Movie[]> {
  try {
    const data = await tmdbFetch(`/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`) as { results: Movie[] };
    return (data.results?.slice(0, 20) || []).map((m) => ({ ...m, media_type: 'movie' }));
  } catch {
    return seedData.action as Movie[];
  }
}

export async function fetchTVShows(): Promise<Movie[]> {
  try {
    const data = await tmdbFetch('/tv/popular') as { results: Movie[] };
    return (data.results?.slice(0, 20) || []).map((m) => ({ ...m, media_type: 'tv' }));
  } catch {
    return seedData.tvShows as Movie[];
  }
}

export async function searchTitles(query: string): Promise<Movie[]> {
  try {
    const data = await tmdbFetch(`/search/multi?query=${encodeURIComponent(query)}&include_adult=false`) as { results: Movie[] };
    return data.results?.filter((r) => r.media_type !== 'person').slice(0, 30) || [];
  } catch {
    const allItems = [
      ...seedData.trending,
      ...seedData.topRated,
      ...seedData.action,
      ...seedData.tvShows,
    ] as Movie[];
    const lowerQuery = query.toLowerCase();
    return allItems.filter(
      (item) =>
        (item.title || item.name || '').toLowerCase().includes(lowerQuery) ||
        (item.overview || '').toLowerCase().includes(lowerQuery)
    );
  }
}

export async function fetchMovieDetails(id: number, mediaType: string = 'movie'): Promise<MovieDetails> {
  try {
    const data = await tmdbFetch(`/${mediaType}/${id}?append_to_response=credits,videos`) as MovieDetails;
    return data;
  } catch {
    const allItems = [
      ...seedData.trending,
      ...seedData.topRated,
      ...seedData.action,
      ...seedData.tvShows,
    ] as Movie[];
    const found = allItems.find((item) => item.id === id);
    if (found) {
      return {
        ...found,
        genres: (found.genre_ids || []).map((gid) => ({
          id: gid,
          name: genreIdToName(gid),
        })),
        runtime: 120,
        status: 'Released',
        credits: { cast: [], crew: [] },
      } as MovieDetails;
    }
    throw new Error('Not found');
  }
}

export async function fetchMovieVideos(id: number, mediaType: string = 'movie'): Promise<Video[]> {
  try {
    const data = await tmdbFetch(`/${mediaType}/${id}/videos`) as { results: Video[] };
    return data.results || [];
  } catch {
    return [];
  }
}

export function getFeaturedTitle(items: Movie[]): Movie | null {
  if (!items || items.length === 0) return null;
  const withBackdrop = items.filter((item) => item.backdrop_path);
  if (withBackdrop.length === 0) return items[0];
  return withBackdrop[Math.floor(Math.random() * Math.min(withBackdrop.length, 5))];
}

function genreIdToName(id: number): string {
  const genres: Record<number, string> = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
    10759: 'Action & Adventure',
    10762: 'Kids',
    10763: 'News',
    10764: 'Reality',
    10765: 'Sci-Fi & Fantasy',
    10766: 'Soap',
    10767: 'Talk',
    10768: 'War & Politics',
  };
  return genres[id] || 'Unknown';
}
