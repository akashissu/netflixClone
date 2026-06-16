import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { TMDBTitle } from '@/types';

/**
 * Merge Tailwind CSS class names with clsx and tailwind-merge.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * TMDB image base URL
 */
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

type ImageSize =
  | 'w92'
  | 'w154'
  | 'w185'
  | 'w342'
  | 'w500'
  | 'w780'
  | 'w1280'
  | 'original';

/**
 * Build a full TMDB image URL from a path.
 * Returns null if path is null/undefined/empty.
 */
export function getImageUrl(
  path: string | null | undefined,
  size: ImageSize = 'w500'
): string | null {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

/**
 * Get the display title from a TMDBTitle (handles both movies and TV shows).
 */
export function getTitleText(title: TMDBTitle): string {
  return title.title ?? title.name ?? title.original_title ?? title.original_name ?? 'Unknown Title';
}

/**
 * Get the display release date/year from a TMDBTitle.
 */
export function getDisplayDate(title: TMDBTitle): string {
  const dateStr = title.release_date ?? title.first_air_date ?? '';
  if (!dateStr) return '';
  const year = new Date(dateStr).getFullYear();
  return isNaN(year) ? '' : String(year);
}

/**
 * Truncate text to a maximum length, appending ellipsis if needed.
 */
export function truncateText(text: string | undefined | null, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}

/**
 * Format a vote average to one decimal place.
 */
export function formatVoteAverage(voteAverage: number): string {
  return voteAverage.toFixed(1);
}

/**
 * Format a large number with commas.
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

/**
 * Convert a genre ID to a human-readable genre name.
 */
const GENRE_MAP: Record<number, string> = {
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
  878: 'Sci-Fi',
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

export function getGenreNames(genreIds: number[]): string[] {
  return genreIds
    .map((id) => GENRE_MAP[id])
    .filter((name): name is string => Boolean(name));
}

/**
 * Check if a TMDBTitle is a TV show.
 */
export function isTVShow(title: TMDBTitle): boolean {
  return title.media_type === 'tv' || Boolean(title.first_air_date && !title.release_date);
}

/**
 * Build a URL-safe slug from a title string.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
