import { Movie } from '@/types';

const MY_LIST_KEY = 'netflix_clone_my_list';

type MovieId = Movie['id'];

export function getMyList(): Movie[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(MY_LIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addToMyList(item: Movie): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getMyList();
    if (!list.find((i) => i.id === item.id)) {
      list.push(item);
      localStorage.setItem(MY_LIST_KEY, JSON.stringify(list));
    }
  } catch {
    console.error('Failed to add to My List');
  }
}

export function removeFromMyList(id: MovieId): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getMyList();
    const filtered = list.filter((i) => i.id !== id);
    localStorage.setItem(MY_LIST_KEY, JSON.stringify(filtered));
  } catch {
    console.error('Failed to remove from My List');
  }
}

export function isInMyList(id: MovieId): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const list = getMyList();
    return list.some((i) => i.id === id);
  } catch {
    return false;
  }
}

export function clearMyList(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(MY_LIST_KEY);
  } catch {
    console.error('Failed to clear My List');
  }
}
